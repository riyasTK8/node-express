import express from 'express';
import {
  addUser,
  deleteUser, findUser, showUser,
  updateUser
} from '../controller/usercontroller.js';

import {
  addProduct, deleteProduct, findProduct, showProduct, updateProduct
} from '../controller/productcontroller.js';


import { adminmodel } from '../models/admin.js';
import { usermodel } from '../models/user.js';

import bcrypt from 'bcrypt';
import productmodel from '../models/products.js';

const router = express.Router();



router.get('/', (req, res) => {

  res.render('login')

})


router.post('/login', async (req, res) => {





  const email = req.body.username
  const password = req.body.password
  

  const userdata = await usermodel.findOne({ email })

  const admindata = await adminmodel.findOne({ email })







  if (admindata) {



    if (req.body.username == admindata.email && req.body.password == admindata.password) {
      console.log(admindata);
      return res.redirect('/adminpanel')


    }
  }





  if (!userdata) {
    return res.send('user not found')
  }

  const passwordMatched = await bcrypt.compare(password, userdata.password)

  if (!passwordMatched) {

    return res.send('password not matched')

  }

  req.session.userId = userdata._id;

  if(userdata.status='deactivate'){
    res.render('error')
  }

 else{
  res.redirect('userproduct')
 }


 

})




router.get('/adminpanel', async (req, res) => {
  const users = await usermodel.find();
  res.render('adminpanel', { users });
});


router.get('/adduser', (req, res) => res.render('adduser'));
router.post('/adduser', addUser);
router.get('/adminpanel/users', showUser);
router.get('/updateuser/:id', findUser);
router.post('/update-user/:id', updateUser);
router.get('/adminpanel/users/:id', deleteUser);


router.get('/addproduct', (req, res) => res.render('addproduct'));
router.get('/adminproduct', showProduct);
router.post('/addproduct', addProduct);
router.get('/updateproduct/:id', findProduct);
router.post('/update-product/:id', updateProduct);
router.get('/adminproduct/:id', deleteProduct);



router.get('/userproduct', async (req, res) => {
  
    const products = await productmodel.find();
    res.render('userproduct', { products });

});


router.get('/error',(req,res)=>{

res.render('error')

})
  





export default router;








