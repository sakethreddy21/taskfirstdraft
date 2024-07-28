var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const productSchema = new Schema( {
	name: String,
	desc: String,
	price: Number,
	image: String,
	discount: Number,
	user_id: Schema.ObjectId,
	is_delete: { type: Boolean, default: false },
	date : { type : Date, default: Date.now }
});

var productModel = mongoose.model('product', productSchema);

module.exports = productModel;