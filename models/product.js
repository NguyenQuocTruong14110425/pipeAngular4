const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;


var ProductSchema = new Schema({
    nameproduct: { type: String,lowercase: true },
    description:{type:String,lowercase: true},
    size: { type: String},
    color: { type: String},
    price:{type:Number},
    image: {type: String },
    catalog:{ type: String},
});

module.exports = mongoose.model('Product', ProductSchema);