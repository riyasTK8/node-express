import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import cookieParser from 'cookie-parser';
import router from './routes/routes.js';

dotenv.config();

const app = express();


app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());


app.use(session({
  secret: '12345456', 
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 60 * 60 * 1000 
  },
  store: MongoStore.create({
    mongoUrl: process.env.DBURL,
    collectionName: 'sessions'
  })
}));


app.set('view engine', 'ejs');


app.use('/', router);


mongoose.connect(process.env.DBURL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('database connected');
    app.listen(process.env.PORT || 3000, () => {
      console.log(` Server running on http://localhost:${process.env.PORT || 3000}`);
    });
  })
  .catch(err => {
    console.error('connection error:', err);
  });
