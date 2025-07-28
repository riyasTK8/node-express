import productmodel from "../models/products.js";


const showProduct = async (req, res) => {
  const products = await productmodel.find();
  res.render('adminproduct', { products });
};

const addProduct = async (req, res) => {
  await productmodel.create(req.body);
  console.log('Product inserted successfully');
  res.redirect('/adminproduct');
 }
 
  const updateProduct = async (req, res) => {
  const product_id = req.params.id;
  await productmodel.findByIdAndUpdate(product_id, {
    name: req.body.name,
    price: req.body.price,
    category: req.body.category,
    quantity: req.body.quantity
  });
  console.log('Product updated successfully');
  res.redirect('/adminproduct');
  }

const findProduct = async (req, res) => {
  const id = req.params.id;

    const product = await productmodel.findById(id);
  res.render('updateproduct', { product });
  }
 
  const deleteProduct = async (req, res) => {
  const product_id = req.params.id;
  await productmodel.findByIdAndDelete(product_id);
  res.redirect('/adminproduct');
 }


export { addProduct, findProduct, updateProduct, deleteProduct, showProduct };
