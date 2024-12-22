import Product from '../models/product.js';

export const renderAddProductForm = (req, res) => {
  res.render('addProduct',
     { success: req.query.success || false }
    );
};

export const addProduct = async (req, res) => {
  try {
    const { name, description, price } = req.body;
    const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;

    await Product.create({ name, description, price, imageUrl });
    res.redirect('/products/add?success=true');
  } catch (error) {
    res.status(500).send('Error adding product');
  } 
};

export const listProducts = async (req, res) => {
  try {
    const products = await Product.findAll();
    res.render('productList', { products });
  } catch (error) {
    res.status(500).send('Error fetching products');
  }
};
