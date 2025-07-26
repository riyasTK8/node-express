import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name:      { type: String},
  price:     { type: Number},
  category:  { type: String},
  quantity:  { type: Number }
});

const productmodel = mongoose.model('products', productSchema, 'productdetails');
export default productmodel;
