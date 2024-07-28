import  connectMongoDB  from "@/lib/mongodb";
import User from "@/models/user";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(req:any, res:any) {

  await connectMongoDB();
  const { username, usermail, password } = await req.json();
  console.log(username, usermail, password);
    if (!username || !usermail || !password ) {
      return NextResponse.json({message: "filll the all details"}, {status:422})
      //res.status(422).json({ error: "filll the all details" });
      //console.log("bhai nathi present badhi details");
  };

  try {
    const preuser = await User.findOne({ usermail: usermail });
    if (preuser) {
      return NextResponse.json({message:"This email is already exist"}, {status:422})
      //res.status(422).json({ error: "This email is already exist" });
  }
  else {
    const hashedPassword = await bcrypt.hash(password, 10);

    const finaluser = new User({
        username, usermail, password:hashedPassword
    });
    
    
    const storedata = await finaluser.save();
    console.log(storedata + "user successfully added");
    return NextResponse.json({message:storedata},{status:201})
   // res.status(201).json(storedata);
}

    
  } catch (error) {
    return NextResponse.json(
       (error as Error).message,
      { status: 500 }
    );
  }
}