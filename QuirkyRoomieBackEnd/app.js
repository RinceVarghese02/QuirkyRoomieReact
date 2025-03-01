const express = require('express');
const app = express();
const cors = require('cors');
const {userModel,complaintModel,} = require('./models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
dotenv.config();
const database=require('./models/db');
database();

app.use(cookieParser())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.post('/api/auth/register', async function (req, res) {

    const { name, flatcode, email, password } = req.body;


    const createduser = await userModel.create({
        name, flatcode, email, password,
    })


    res.send({user:createduser, token:createduser.generateToken()})
})
app.post('/api/auth/login', async function (req, res) {

    const {email, password } = req.body;
// console.log(email,password)
    userModel.findOne({email:email})
    .then((data) => {
        if (!data) {
            return res.send({ message: 'Email not found', success: false });
        }
        res.send({ message: 'Email found', success: true, data: data });
    })
    .catch((err)=>{
        res.send({message:'email not found',success:false,err:err})
    })
})

app.post('/api/complaints', async function (req, res) {

    const { title, description, type, severity } = req.body;


    const createdcomplaints = await complaintModel.create({
        title, description, type, severity,
    })
    .then((data)=>{
        res.send({message:'Complaints created successfully!', success:true, complaints:data })
    })
    .catch((err)=>{
        res.send({message:'Complaints retrieved unsuccessfully!', success:false })
    })


    // res.send(createdcomplaints)
})
app.get('/api/complaints', async function (req, res) {

    const alldata=complaintModel.find()
    .then((data)=>{
        res.send({message:'Complaints retrieved successfully!', success:true, allcomplaints:data })
    })
    .catch((err)=>{
        res.send({message:'Complaints retrieved unsuccessfully!', success:false })
    })
})
app.get('/api/resolve', async function (req, res) {

    console.log(req.query.id)
    let resolvedcomp= await complaintModel.findByIdAndDelete(req.query.id)
    .then((data)=>{
        res.send({message:'Complaints deleted successfully!', success:true, resolvedcomplaints:data })
    })
    .catch((err)=>{
        res.send({message:'Complaints deletion unsuccessfully!', success:false })
    })
    // res.redirect('/complaints')
    // console.log(resolvedcomp)
    // res.send(resolvedcomp)
    
})

app.listen(3000)

