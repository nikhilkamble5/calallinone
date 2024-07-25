const UserModel = require('../models/UserModel.js')
const bcrypt = require('bcryptjs')

const LoginUser = async (req, res) => {
    // console.log(req.body)

    const login_email = req.body.email
    const login_password = req.body.password
    console.log(login_email, login_password)

    if (!login_email == '' && !login_password == '') {
        try {
            const login_user_data = await UserModel.findOne({ email: login_email })
            // console.log(login_user_data.name)
            const isPasswordMatch = await bcrypt.compare(login_password, login_user_data.password)
            if (isPasswordMatch) {
                const token = await login_user_data.GenerateJWTToken()
                console.log(token)
                res.json({ msg: 'Login Successful', token, statusCode:200,name : login_user_data.fname })
            } else {
                res.json({ msg: 'Invalid Credientials' })
            }
        } catch (err) {
            res.json({ msg: 'Invalid Credientials' })
            // console.log(err)
        }
    } else {
        res.json({ msg: 'All fields are required' })
    }
}


const RegisterUser = async (req, res) => {
    // console.log(req.body)

    const fname = req.body.fname
    const email = req.body.email
    const phone = req.body.phone
    const password = req.body.password
    const confirmpassword = req.body.cpassword

    // console.log(name,email,password)
    if (!fname == '' && !email == '' && !phone == '' && !password == '' && !confirmpassword == '') {
        if (password === confirmpassword) {
            try {

                const hash_password = await bcrypt.hash(password, 10)
                const newUser = new UserModel(
                    {
                        fname: fname,
                        email: email,
                        phone:phone,
                        password: hash_password,

                    }
                )
                console.log(newUser)
                // const token = await newUser.GenerateJWTToken()
                // console.log(token)

                await newUser.save()
                res.json({ msg: 'Registration Successful',statusCode:200 })

            } catch (err) {
                console.log(err)
                if (err.code == 11000) {
                    res.json({ msg: 'email Is Already Exits' })
                }
                else {
                    res.json({ msg: 'Registration Unsuccessful' })
                }
            }
        } else {
            res.json({ msg: 'Password Not Match' })
        }
    } else {
        res.json({ msg: 'All Fields Are Required' })
    }
}
module.exports = { LoginUser, RegisterUser }