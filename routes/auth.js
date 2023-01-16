const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = mongoose.model("User");
const bcrypt = require('bcryptjs')

router.get('/', (req, res) => {
    res.send("hello");
})
router.post('/signup', (req, res) => {
    const { name, email, password } = req.body
    if (!email || !password || !name) {
        return res.status(422).json({ error: "Please add all the fields" })
    }
    User.findOne({ email: email })
        .then((savedUser) => {
            if (savedUser) {
                return res.status(422).json({ error: "User already exists with that email" })
            }
            bcrypt.hash(password)
            const user = new User({
                email,
                password,
                name
            })
            user.save()
                .then(user => {
                    res.json({ message: "saved successfully!!" })
                })
                .catch(err => {
                    console.log(err)
                })
        })
        .catch(err=>{