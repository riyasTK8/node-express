import express from 'express'
const userrouter = express.Router
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








export default userrouter