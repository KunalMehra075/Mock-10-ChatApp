const UserModel = require("../Models/User.model");
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken");
const { sendMail } = require("../Config/sendmail");

const UserRouter = require("express").Router();
let frontend = "https://mock-10-chat-app-frontend.vercel.app"
let HOST = "http://:4500"
// ! GET ALL USERS ROUTE
UserRouter.get("/", async (req, res) => {
    try {
        const Users = await UserModel.find();
        res.status(200).json({ Users });
    } catch (err) {
        console.log(err);
        res.status(400).json({ Error: err })
    }
});
// ! SIGNUP ROUTE
UserRouter.post("/signup", async (req, res) => {
    let { email, password } = req.body
    let user = req.body
    try {
        const users = await UserModel.find({ email });
        if (users.length > 0) {
            res.status(200).json({ Message: "You Have Already Registered, Redirecting to Chat App", success: true, exist: true });
        } else {
            bcrypt.hash(password, 10, async (err, hash) => {
                if (hash) {
                    user.password = hash
                    let instance = new UserModel(user)
                    await instance.save()
                    sendMail("Chat app: Signup Successful", `Please click on this link to verify your email <a href="${HOST}/users/verify/${instance._id}">Click Here to verify email</a>`, instance.email)
                    res.status(201).json({ Message: "Signup Successful. Now, Please verify Email by clicking on link revieved in email", success: true, exist: false, instance });
                } else {
                    res.status(400).json({ Message: "Bcrypt Error", success: false, exist: false });
                }
            })
        }
    } catch (err) {
        console.log(err);
        res.status(400).json({ Error: err })
    }
});
// ! LOGIN ROUTE
UserRouter.post("/login", async (req, res) => {
    let { email, password } = req.body
    try {
        let Data = await UserModel.find({ email })
        if (Data.length == 0) {
            res.status(200).json({ Message: "You are not registered with Us, Please Signup", success: false, exist: false });
        } else {
            let user = Data[0]
            bcrypt.compare(password, user.password, (err, result) => {
                if (result) {
                    jwt.sign({ userID: user._id }, process.env.key, (err, token) => {
                        if (token) {
                            res.status(200).json({ Message: "Login Successful", token, success: true, exist: true, user });
                        } else {
                            res.status(400).json({ Message: "JWT error", success: false, exist: true });
                        }
                    });
                } else {
                    res.status(200).json({ Message: "Wrong Credentials", success: false, exist: true });
                }

            })
        }
    } catch (err) {
        console.log(err);
        res.status(400).json({ Error: err, success: false, exist: true })
    }
});
// ! EMAIL VERIFICATION
UserRouter.get("/verify/:id", async (req, res) => {

    let id = req.params.id
    let payload = { verified: true }
    try {
        let User = await UserModel.findByIdAndUpdate({ _id: id }, payload)
        res.redirect(`${frontend}/verified.html`)
    } catch (err) {
        console.log(err);
        res.status(400).json({ Error: err, success: false, exist: true })
    }
});

module.exports = UserRouter;