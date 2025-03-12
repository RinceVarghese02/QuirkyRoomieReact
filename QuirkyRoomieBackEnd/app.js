const express = require('express');
const app = express();
const cors = require('cors');
const { userModel, complaintModel, } = require('./models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
dotenv.config();
const database = require('./models/db');
database();

app.use(cookieParser())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.post('/api/auth/register', async function (req, res) {

    const { name, flatcode, email, password } = req.body;



    const userexist = await userModel.findOne({ email })
    if (userexist) {
        res.send({ msg: 'User Already Exist' })
    }
    else {
        const createduser = await userModel.create({
            name, flatcode, email, password,
        })
        res.send({ user: createduser, token: createduser.generateToken() })
    }

})
app.post('/api/auth/login', async function (req, res) {

    try {
        const { email, password } = req.body;
        // console.log(email,password)
        const userexist = await userModel.findOne({ email: email })
        // console.log(userexist.password)
        if (!userexist) {
            res.send({ msg: 'Invalid credential', success: false })
        }
        const user = await bcrypt.compare(req.body.password, userexist.password)
        // console.log(user)
        if (user) {
            res.send({ msg: 'login success', data: userexist, success: true, token: await userexist.generateToken() })
        }
        else{
            res.send({msg:'Invalid Email or Password'})
        }

    } catch (error) {
        res.send({ msg: 'error', err: error })
    }

})


app.post('/api/complaints', async function (req, res) {

    const { title, description, type, severity } = req.body;


    const createdcomplaints = await complaintModel.create({
        title, description, type, severity,
    })
        .then((data) => {
            res.send({ message: 'Complaints created successfully!', success: true, complaints: data })
        })
        .catch((err) => {
            res.send({ message: 'Complaints retrieved unsuccessfully!', success: false })
        })


    // res.send(createdcomplaints)
})
app.get('/api/complaints', async function (req, res) {

    const alldata = complaintModel.find()
        .then((data) => {
            res.send({ message: 'Complaints retrieved successfully!', success: true, allcomplaints: data })
        })
        .catch((err) => {
            res.send({ message: 'Complaints retrieved unsuccessfully!', success: false })
        })
})
app.get('/api/resolve', async function (req, res) {

    console.log(req.query.id)
    let resolvedcomp = await complaintModel.findByIdAndDelete(req.query.id)
        .then((data) => {
            res.send({ message: 'Complaints deleted successfully!', success: true, resolvedcomplaints: data })
        })
        .catch((err) => {
            res.send({ message: 'Complaints deletion unsuccessfully!', success: false })
        })
    // res.redirect('/complaints')
    // console.log(resolvedcomp)
    // res.send(resolvedcomp)

})

app.get('/allusers', async function (req, res) {
    try {
        await userModel.find()
            .then((data) => {
                res.send({ msg: "All Users Found", users: data })
            })
            .catch((err) => {
                res.send({ msg: "Users not Found", err: err })
            })
    } catch (error) {
        res.send({ msg: "Server Error", err: error })
    }
})

app.get('/deleteuser', async function (req, res) {
    try {
        // const {id}=req.query;
        // console.log(id)
        await userModel.findByIdAndDelete(req.query.id)
            .then((data) => {
                res.send({ msg: 'User found', user: data, deleted: true })
            })
            .catch((err) => {
                res.send({ msg: "Users not Found", err: err, deleted: false })
            })
        // res.send({msg:'user deleted', success:true})
    } catch (error) {
        res.send({ msg: "Server Error", err: error })
    }
})

app.listen(3000)

