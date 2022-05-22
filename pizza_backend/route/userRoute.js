const express = require("express")
const router = express.Router()
const rnadomString = require('randomstring')
const crypto = require('crypto')
const bcrypt = require('bcrypt')
const cookie = require('cookie-parser')
const User = require("../models/userModel")
const JWT = require("../utils/JWT")
const transporter = require("../utils/mail")


router.post("/register", async (req, res) => {
    const { name, email, password } = req.body
    const newUser = new User({
        name,
        email,
        password,
        emailToken: crypto.randomBytes(64).toString('hex'),
        isVerified: false
    })
    try {
        const existuser = await User.find({ name, email })
        if (existuser.length > 0) {
            res.status(200).json({
                success: false,
                warning: true,
                message: "User Already Exist2"
            })
        }
        else {
            const salt = bcrypt.genSaltSync(10)
            const hashPassword = await bcrypt.hash(newUser.password, salt)
            newUser.password = hashPassword
            await newUser.save()
            
            const mailOptions = {
                from: process.env.SMPT_MAIL,
                to: newUser.email,
                subject: "PizzaShop - verification email",
                //text: "hii!! this is me"
                html: `<h2>${newUser.name}! thanks for registering on our site</h2>
                   <h4>Please verify your mail to continue...</h4>
                   <a href="${req.protocol}://${req.headers.host}/api/users/verify-email?token=${newUser.emailToken}">Click Here to Verify Your Email</a><br/><p>Do not reply to this email</p>`
            }
            //send mail
            transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    console.log('mail-sending-error: ', error.message)
                }
                else {
                    console.log('verification email is send to user gmail:')
                }
            })
            res.status(200).json({
                success: true,
                warning: false,
                message: "User Register Successfully, Please check your email"
            })
        }
    }
    catch {
        return res.status(400).json({ message: error })
    }
});

router.get('/verify-email', async (req, res) => {
    try {
        const token = req.query.token
        const user = await User.findOne({ emailToken: token })
        if (user) {
            user.emailToken = null
            user.isVerified = true
            await user.save()
            res.redirect('http://localhost:3000/login')
        }
        else {
            res.redirect('http://localhost:3000/register')
            console.log('Email is not verified')
        }

    }
    catch (error) {
        console.log(error)
    }
})


router.post("/login", JWT.verifyEmail, async (req, res) => {
    const { email, password } = req.body
    try {
        const findUser = await User.findOne({ email: email });
        if (findUser) {
            const match = await bcrypt.compare(password, findUser.password)
            if (match) {
                //create token
                const token = JWT.createToken(findUser._id)
                // console.log('matched: ', findUser.id)
                // console.log('token: ', token)
                const currentUser = {
                    name: findUser.name,
                    email: findUser.email,
                    isAdmin: findUser.isAdmin,
                    _id: findUser._id
                }
                res.cookie('access-token', token)
                res.send(currentUser)
            }
            else {
                return res.status(400).json({ message: 'User Login Failed' })
            }
        }
        else {
            return res.status(400).json({ message: 'User Login Failed' })
        }
    }
    catch (error) {
        return res.status(400).json({ message: 'Something went wrong' })
    }
})

router.get('/logout', async (req, res)=>{
    try {
        res.clearCookie('access-token')
        
        res.status(200).json({
            success: true,
            message: 'Log Out Successfully'
        })
        //res.redirect('http://localhost:3000/login')
    } catch (error) {
        res.status(500).json({
            success: false,
            message:error
        })
    }
})
router.get("/getallusers", async (req, res) => {
    try {
        const users = await User.find({});
        //console.log('userRoute: ', users)
        res.send(users)
    }
    catch (error) {
        return res.status(400).json({ message: error });
    }
})

router.post("/getuserbyid", async (req, res) => {
    const userId = req.body.userid
    try {
        const user = await User.findOne({ _id: userId })
        res.send(user)
    }
    catch (error) {
        return res.status(400).json({ message: error });
    }
})

router.post("/editrole", async (req, res) => {
    const editUser = req.body.editeduser
    try {
        const user = await User.findById({ _id: editUser.id })
        user.role = editUser.role
        if (user.role == 'admin') {
            user.isAdmin = true
        }
        else {
            user.role = 'user'
            user.isAdmin = false
        }
        await user.save()
        const updatedduser = {
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            _id: user._id
        }
        // console.log('updatedduser: ', updatedduser)
        //res.send(updatedduser)
        res.status(200).json({
            updatedduser,
            message:'all user have been received'
        })
    }
    catch (err) {
        return res.status(400).json({ message: error });
    }
})



router.post("/forgot_password", JWT.logoutRequired, async (req, res)=>{
    try {
        const email = req.body.email;
        console.log('f_user_email: ', email)
        const userData = await User.findOne({email: email})
        if(userData)
        {
            //console.log("userData1:", userData)
            if(userData.isVerified === true)
            {
                const randomStr = rnadomString.generate();
                //console.log("randomStr:", randomStr)
                const updateUserData = await User.updateOne({ email: email }, { $set: { forgetPassword_token:randomStr }})
                //console.log("userData2:", updateUserData)
                //console.log("userData3:", userData)
                const mailOptions = {
                    from: process.env.SMPT_MAIL,
                    to: email,
                    subject: "PizzaShop - Password Reset mail",
                    html: `<h2>Hi ${userData.name}! thanks for registering on our site</h2>
                   <h4>For reset your password click the below link</h4>
                   <a href="${req.protocol}://${req.headers.host}/reset_password/${randomStr}">Reset Your Password</a>`
                }
                //send mail
                transporter.sendMail(mailOptions, function (error, info) {
                    if (error) {
                        console.log('mail-sending-error: ', error)
                    }
                    else {
                        console.log('Password Reset email is send to user gmail:')
                    }
                })
                res.status(200).json({
                    'success': true,
                    'message':"Password Reset Link Has been sent to your email"
                })
            }
        }
        else{
            return res.status(400).json({
                success: false,
                message: "User Email not exist"
            })
        }
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error
        })
        //console.log(error)
    }
})


router.post('/reset_password', JWT.logoutRequired, async(req, res)=>{
    try {
        //const forgetPassToken = req.body.reset_token
        const {reset_token, password, cpassword} = req.body
        // console.log('password: ',password)
        // console.log('cpassword: ', cpassword)
        // console.log('reset_token: ', reset_token)
        //console.log('f_tokenData1: ', forgetPassToken)
        const tokenData = await User.findOne({ forgetPassword_token: reset_token})
        // console.log('f_tokenData2: ',tokenData)
        if(tokenData)
        {
            tokenData.forgetPassword_token = null
            const salt = bcrypt.genSaltSync(10)
            const hashPassword = await bcrypt.hash(password, salt)
            //console.log("hashed P: ", hashPassword)
            tokenData.password = hashPassword
            await tokenData.save()
           
            res.status(200).json({
                success: true,
                message: 'Password Reset Successfully'
            })
        }
        else{
            res.status(404).json({
                success: false,
                message: 'page not found'
            })
        }

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error
        })        
    }
})
module.exports = router;
