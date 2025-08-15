const express = require('express')
const mongoose = require('mongoose')
const cors = require("cors")
const EmployeeModel = require('./models/Employee')

const app = express()
app.use(cors())
app.use(express.json())

mongoose.connect("mongodb://127.0.0.1:27017/employee"); 

app.post('/login', (req, res) => {
    const {email, password} = req.body;
    EmployeeModel.findOne({email:email})
    .then(user =>{
        if(user){
            if(user.password === password){
                res.json({Status: "Success", role: "employee"})
            } else {
                res.json({Status: "Failed", message: "Incorrect Password"})
            }
        } else {
            res.json("No record existed")
        }
    })
})

app.post('/register',  (req, res) => {
   EmployeeModel.create(req.body)
    .then(employee => res.json("Employee Registered") )
    .catch(err => res.json("Error registering employee"))
})

app.listen(3001, () => {
    console.log("Server is Running");
})