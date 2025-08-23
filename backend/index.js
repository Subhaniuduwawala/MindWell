
const express = require('express')
const mongoose = require('mongoose')
const cors = require("cors")
const bcrypt = require('bcrypt');
const EmployeeModel = require('./models/Employee')

const app = express()
app.use(cors())
app.use(express.json())

mongoose.connect("mongodb://127.0.0.1:27017/employee"); 

// ...existing code...

app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await EmployeeModel.findOne({ email: email });
        if (!user) {
            return res.status(404).json({ Status: "Failed", message: "No record existed" });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ Status: "Failed", message: "Incorrect Password" });
        }
        return res.status(200).json({ Status: "Success", role: "employee" });
    } catch (err) {
        res.status(500).json({ Status: "Error", message: "Server error" });
    }
});

// ...existing code...


app.post('/register', async (req, res) => {
    try {
        const { password, ...rest } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const employee = await EmployeeModel.create({ ...rest, password: hashedPassword });
        res.json("Employee Registered");
    } catch (err) {
        res.status(500).json({ Status: "Error", message: "Error registering employee" });
    }
});

app.listen(3001, () => {
    console.log("Server is Running");
})