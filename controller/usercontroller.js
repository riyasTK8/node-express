import { hash } from 'bcrypt';
import { usermodel } from '../models/user.js';



const showUser = async (req, res) => {
   
    let users = await usermodel.find()
    res.render('adminpanel', { users })
   res.send('admin not logged')
   
}

const addUser = async (req, res) => {

    req.body.password = await hash(req.body.password, 10)

    await usermodel.insertOne(req.body)
    res.redirect('adminpanel')
    console.log('user insert succussgully')
}

const updateUser = async (req, res) => {
    console.log('funct');

    const user_id = req.params.id
    console.log(user_id);


    await usermodel.findByIdAndUpdate(user_id, {
        name: req.body.name,
        email: req.body.email,
        place: req.body.place,
        phone: req.body.phone,
        status: req.body.status

    })
    console.log('updated successfully')

    res.redirect('/adminpanel')
}


const findUser = async (req, res) => {
    const id = req.params.id
    const user = await usermodel.findById(id)
    res.render('updateuser', { user })
}


const deleteUser = async (req, res) => {
    const user_id = req.params.id
    await usermodel.findByIdAndDelete(user_id)
    res.redirect('/adminpanel')
}


export { addUser, updateUser, deleteUser, findUser, showUser }

