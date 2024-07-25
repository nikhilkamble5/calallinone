require('dotenv').config()
const jwt = require('jsonwebtoken')
const UserModel = require('../models/UserModel')

const auth = async (req, res, next) => {
    try {
        const token = req.headers.authorization
        //  console.log(token)
        const jwt_token = token.split(' ')[1]
        // console.log(jwt_token)
        const ValidUser = await jwt.verify(jwt_token, process.env.SECRET_KEY)
        // console.log(ValidUser._id)
        const User = await UserModel.findById({ _id: ValidUser._id })
        console.log(User)
        try {
            const { password, tokens, ...userData } = User._doc
            req.user = userData
            req.id = User._id
            // res.json({ statusCode: 200, status: "Valid User", UserData: userData })
            next()
        }
        catch (err) {
            res.status(500).json({ statusCode: 501, msg: 'Internal Server Error' })
        }

    } catch (err) {
        console.log(err)
        res.status(500).json({ statusCode: 500, msg: 'Internal Server Error' })
    }
}

module.exports = auth