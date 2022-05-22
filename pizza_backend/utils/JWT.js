const jwt = require('jsonwebtoken')
const User = require('../models/userModel')
const cookie = require('cookie-parser')
const alert = require('alert')
const createToken=(id)=>{
    return jwt.sign({id}, process.env.JWT_SECRET_KEY, { expiresIn:'1m' })
}

// console.log("process.env.SMPT_PORT3: ", typeof (process.env.SMPT_SERVICE))
const loginRequired= async (req, res, next)=>{
    const token = req.cookies['access-token']
    if(token)
    {
        const validatetoken = await jwt.verify(token, process.env.JWT_SECRET_KEY)
        if (validatetoken)
        {
            res.user = validatetoken.id
            next()
        }
        else{
            console.log('token expire')
            res.redirect('/login')
        }
    }
    else{
        console.log('token not found')
        res.redirect('/login')
    }
}

const verifyEmail=async (req, res, next)=>{
    try {
        const user = await User.findOne({email: req.body.email})
        if(user.isVerified)
        {
            next()
        }
        else{
            console.log('Please check your email')
        }
    } catch (error) {
        console.log(error)
    }
}

const logoutRequired =async (req, res, next) => {
    const token = req.cookies['access-token']
    console.log('cookies: ', token)
    if(token) {
        alert("You are Already Logged In")
        res.redirect('/')
    }
    else{
        next()
    }
}

module.exports = {
        createToken,
        loginRequired,
        logoutRequired,
        verifyEmail,
}