import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import router from './routes/routes.js' 
import session from 'express-session'
import MongoStore from 'connect-mongo'
import bcrypt from 'bcryptjs'
import cookieParser from 'cookie-parser'

dotenv.config()

const app = express()
app.use(session({
  secret:"12345456",
  resave:false,
  saveUninitialized:false,
  store:MongoStore.create(({
    mongoUrl:process.env.DBURL,
    collectionName:'session'
  }))
}))


app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.set('view engine', 'ejs')

app.use(router)

mongoose.connect(process.env.DBURL)
  .then(() => {
    console.log('database connected')
    app.listen(process.env.PORT, () => {
      console.log(`Server started on http://localhost:3000`)
    })
  })
  .catch(err => {
    console.error(' Database connection error:', err)
  })
