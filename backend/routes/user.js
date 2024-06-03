const express = require('express');
const zod = require('zod');
const { User } = require('../db');
const { JWT_SECRET } = require('../config');

const router = express.Router();

const signupBody = zod.object({
    username: zod.string.email(),
    password: zod.string(),
    firstName: zod.string(),
    lastName: zod.string(),
})

router.post('/signup', async(req,res) => {
    const { success } = signupBody.safeParse(req.body);

    if (!success) {
        return res.status(411).json({
            message: "Email already taken / Incorrect inputs"
        })
    }

    const existingUser = await User.findOne(({
        username: req.body.username
    }))

    if(existingUser) {
        return res.status(411).json({
            message: "Email already taken / Incorrect inputs"
        })
    }

    // create a new user and return new created user from db
    const user = await User.create({
        username: req.body.username,
        password: req.body.password,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
    })
    const userId = user._id;
    const token = jwt.sign({
        userId,
    }, JWT_SECRET)

    return res.status(200).json({
        message: "User created successfully",
        token: token
    })
    
})

const signinBody = zod.object({
    username: zod.string().email(),
    password: zod.string(),
})

router.post('/signin', async (req,res) => {
    const { success } = signinBody.safeParse(req.body);

    if(!success) {
        return res.status(411).json({
            message: "Incorrect Inputs"
        })
    }

    const user = await User.findOne({
        username: req.body.username,
        password: user.body.password,
    })

    if (user) {
        const token = jwt.sign({
            userId: user._id
        }, JWT_SECRET)

        return res.json({
            token: token
        })
    }

    res.status(411).json({
        message: "Error while logging in"
    })
    
})


module.exports = router;