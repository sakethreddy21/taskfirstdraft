//disable eslint



const express = require("express");
const app = express();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const bodyParser = require('body-parser');

var mongoose = require("mongoose");
const dotenv = require('dotenv');


dotenv.config();




app.use(cors());
app.use(bodyParser.json());       
app.use(bodyParser.urlencoded({     
  extended: false
}));

const connectMongoDB = async () => {
  const uri = process.env.MONGODB_URI;

  if (!uri) {
    console.error("MongoDB URI is not defined in environment variables");
    return;
  }

  try {
    await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB: ", (error as any).message);
  }
};

connectMongoDB();




const product = require("./model/product.ts");
const user = require("./model/user.ts");





app.use("/", (req:any, res:any, next:any) => {
  try {
    console.log('sakehhh')
    if (req.path == "/login" || req.path == "/register" || req.path == "/") {
      next();
    } else {
      /* decode 
      jwt token if authorized*/
      console.log('sakehhh')
      jwt.verify(req.headers.token, 'shhhhh11111', function (err: any, decoded: { user: any; }) {
        if (decoded && decoded.user) {
          req.user = decoded;
          next();
        } else {
          return res.status(401).json({
            errorMessage: 'User unauthorized!',
            status: false
          });
        }
      })
    }
  } catch (e) {
    res.status(400).json({
      errorMessage: 'Something went wrong!',
      status: false
    });
  }
})

app.get("/", (req:any, res:any) => {
  res.status(200).json({
    status: true,
    title: 'Apis'
  });
});

/* login api */
app.post("/login", async (req:any, res:any) => {
  try {
    console.log("Request Body:", req.body.usermail);

    const { usermail, password } = req.body;

    if (usermail && password) {
      // Log the received email and password for debugging
      console.log(`Received email: ${usermail}`);
      
      // Retrieve the user by email
      const userData = await user.findOne({usermail });
      console.log("Find User Result:", userData);

      if (userData) {
        // Log the stored password hash for debugging
        console.log(`Stored password hash: ${userData.password}`);

        // Compare the provided password with the stored hash
        const isPasswordValid = await bcrypt.compare(password, userData.password);

        if (isPasswordValid) {
          // Generate a token
          const token = jwt.sign({ user: userData.username, id: userData._id }, process.env.JWT_SECRET || 'defaultSecret', { expiresIn: '1d' });

          return res.status(200).json({
            message: 'Login Successful.',
            token: token,
            status: true
          });
        } else {
          return res.status(400).json({
            errorMessage: 'Incorrect password!',
            status: false
          });
        }
      } else {
        return res.status(400).json({
          errorMessage: 'No user found with this email!',
          status: false
        });
      }
    } else {
      return res.status(400).json({
        errorMessage: 'Email and password are required!',
        status: false
      });
    }
  } catch (e) {
    console.error("Catch block error:", e);
    return res.status(500).json({
      errorMessage: 'Something went wrong!',
      status: false
    });
  }
});
/* register api */
app.post("/register", async (req: any, res: any) => {
  try {
    console.log("Request Body:", req.body);

    if (req.body && req.body.username && req.body.password && req.body.usermail) {
      const existingUser = await user.find({ usermail: req.body.usermail });

      console.log("Find User Result:", existingUser);

      if (existingUser.length == 0) {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        let newUser = new user({
          usermail:req.body.usermail,
          username: req.body.username,
          password: hashedPassword
        });

        await newUser.save();
        console.log("User saved successfully");

        return res.status(200).json({
          status: true,
          title: 'Registered Successfully.'
        });
      } else {
        console.log(`Email ${req.body.usermail} already exists`);
        return res.status(400).json({
          errorMessage: `Email ${req.body.usermail} Already Exists!`,
          status: false
        });
      }
    } else {
      console.log('Invalid request parameters:', req.body);
      return res.status(400).json({
        errorMessage: 'Add proper parameter first!',
        status: false
      });
    }
  } catch (e) {
    console.error("Catch block error:", e);
    return res.status(400).json({
      errorMessage: 'Something went wrong!',
      status: false
    });
  }
});

function checkUserAndGenerateToken(data: { username: any; _id: any; }, req: any, res: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: { status: boolean; errorMessage: any; }): void; new(): any; }; }; json: (arg0: { message: string; token: any; status: boolean; }) => void; }) {
  jwt.sign({ user: data.username, id: data._id }, 'shhhhh11111', { expiresIn: '1d' }, (err: any, token: any) => {
    if (err) {
      res.status(400).json({
        status: false,
        errorMessage: err,
      });
    } else {
      res.json({
        message: 'Login Successfully.',
        token: token,
        status: true
      });
    }
  });
}

/* Api to add Product */
app.post("/add-product", (req: { body: { name: any; desc: any; price: any; discount: any; image: any; }; user: { id: any; }; }, res: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: { status: boolean; title?: string; errorMessage?: any; }): void; new(): any; }; }; }) => {
  try {
    if (req.body && req.body.name && req.body.desc && req.body.price && req.body.discount && req.body.image) {
      let Product = new product({
        name: req.body.name,
        desc: req.body.desc,
        price: req.body.price,
        discount: req.body.discount,
        image: req.body.image,
        user_id: req.user.id
      });
      Product.save((err: any, data: any) => {
        if (err) {
          res.status(400).json({
            errorMessage: err,
            status: false
          });
        } else {
          res.status(200).json({
            status: true,
            title: 'Product added.'
          });
        }
      });
    } else {
      res.status(400).json({
        errorMessage: 'Add proper parameter first!',
        status: false
      });
    }
  } catch (e) {
    res.status(400).json({
      errorMessage: 'Something went wrong!',
      status: false
    });
  }
});


/* Api to update Product */
app.post("/update-product", (req: { body: { id: any; name: any; desc: any; price: any; discount: any; image: any; }; }, res: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: { status: boolean; title?: string; errorMessage?: any; }): void; new(): any; }; }; }) => {
  try {
    if (req.body && req.body.id) {
      product.findByIdAndUpdate(req.body.id, req.body, { new: true }, (err: any, data: any) => {
        if (data) {
          res.status(200).json({
            status: true,
            title: 'Product updated.'
          });
        } else {
          res.status(400).json({
            errorMessage: err,
            status: false
          });
        }
      });
    } else {
      res.status(400).json({
        errorMessage: 'Add proper parameter first!',
        status: false
      });
    }
  } catch (e) {
    res.status(400).json({
      errorMessage: 'Something went wrong!',
      status: false
    });
  }
});

/* Api to delete Product */
app.post("/delete-product", (req: { body: { id: any; }; }, res: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: { status: boolean; title?: string; errorMessage?: any; }): void; new(): any; }; }; }) => {
  try {
    if (req.body && req.body.id) {
      product.findByIdAndUpdate(req.body.id, { is_delete: true }, { new: true }, (err: any, data: any) => {
        if (data) {
          res.status(200).json({
            status: true,
            title: 'Product deleted.'
          });
        } else {
          res.status(400).json({
            errorMessage: err,
            status: false
          });
        }
      });
    } else {
      res.status(400).json({
        errorMessage: 'Add proper parameter first!',
        status: false
      });
    }
  } catch (e) {
    res.status(400).json({
      errorMessage: 'Something went wrong!',
      status: false
    });
  }
});
/*Api to get and search product with pagination and search by name*/
app.get("/get-product", (req: { query: { page: any; limit: any; search: any; }; }, res: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: { status: boolean; title?: string; errorMessage?: any; data?: any; }): void; new(): any; }; }; }) => {
  try {
    let page = req.query.page || 1;
    let limit = req.query.limit || 10;
    let search = req.query.search || '';
    let query = { is_delete: false, name: { $regex: new RegExp(search, "i") } };
    product.find(query).skip((page - 1) * limit).limit(parseInt(limit)).exec((err: any, data: any) => {
      if (data) {
        res.status(200).json({
          status: true,
          data: data
        });
      } else {
        res.status(400).json({
          errorMessage: err,
          status: false
        });
      }
    });
  } catch (e) {
    res.status(400).json({
      errorMessage: 'Something went wrong!',
      status: false
    });
  }
});

app.listen(8080, () => {
  console.log("Server is Runing On port 8080");
});
