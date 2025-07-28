import express from 'express';
import {
  addUser, deleteUser, findUser, showUser, updateUser
} from '../controller/usercontroller.js';
import {
  addProduct, deleteProduct, findProduct, showProduct, updateProduct
} from '../controller/productcontroller.js';
import { checkAdmin, checkUser, isAuthenticated } from '../middleware/authMidl.js';

import { adminmodel } from '../models/admin.js';
import { usermodel } from '../models/user.js';
import bcrypt from 'bcrypt';
import productmodel from '../models/products.js';

const router = express.Router();

router.get('/', (req, res) => {
  res.render('login');
});

router.post('/login', async (req, res) => {
  const { username: email, password } = req.body;

  const userdata = await usermodel.findOne({ email });
  const admindata = await adminmodel.findOne({ email });

  if (admindata && password === admindata.password) {
    req.session.isAdmin = true;
    req.session.userId = admindata._id;
    return res.redirect('/adminpanel');
  }

  if (!userdata) return res.send('User not found');

  const passwordMatched = await bcrypt.compare(password, userdata.password);
  if (!passwordMatched) return res.send('Password does not match');

  if (userdata.status === 'deactivate') return res.render('error');

  req.session.userId = userdata._id;
  req.session.isAdmin = false;
  res.redirect('/userproduct');
});

router.get('/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) {
      return res.send('Error logging out');
    }
    res.redirect('/');
  });
});


router.get('/adminpanel', checkAdmin, async (req, res) => {
  const users = await usermodel.find();
  res.render('adminpanel', { users });
});

router.get('/adduser', checkAdmin, (req, res) => res.render('adduser'));
router.post('/adduser', checkAdmin, addUser);
router.get('/adminpanel/users', checkAdmin, showUser);
router.get('/updateuser/:id', checkAdmin, findUser);
router.post('/update-user/:id', checkAdmin, updateUser);
router.get('/adminpanel/users/:id', checkAdmin, deleteUser);

router.get('/addproduct', checkAdmin, (req, res) => res.render('addproduct'));
router.get('/adminproduct', checkAdmin, showProduct);
router.post('/addproduct', checkAdmin, addProduct);
router.get('/updateproduct/:id', checkAdmin, findProduct);
router.post('/update-product/:id', checkAdmin, updateProduct);
router.get('/adminproduct/:id', checkAdmin, deleteProduct);

router.get('/userproduct', checkUser, async (req, res) => {
  const products = await productmodel.find();
  res.render('userproduct', { products });
});


router.get('/error', (req, res) => {
  res.render('error');
});

export default router;



