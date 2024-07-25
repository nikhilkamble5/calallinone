const UserModel = require("../models/UserModel")
const bcrypt = require('bcryptjs')

const UpdateProfile = async (req, res) => {
    try {
        const id = req.params.id
        console.log(req.params.id, req.body,req.id.toString(), req.id == id)
        const { name, password, confirmpassword, username } = req.body
        if (id != req.id) {
            return res.json({ statusCode: 500, msg: 'Internal Server Error' })
        }
        if (!name == '' && !username == '') {
            if (password === confirmpassword) {
                try {

                    var data = {
                        name,
                        username,
                    }
                    if (password && confirmpassword) {
                        const hash_password = await bcrypt.hash(password, 10)
                        data.password = hash_password
                    }
                    console.log(data)
                    // const newUser = new UserModel(
                    //     {
                    //         name: name,
                    //         username: username,
                    //         password: hash_password,

                    //     }
                    // )
                    // console.log(newUser)

                    await UserModel.findOneAndUpdate({ _id: id }, data)
                    res.json({ msg: 'Profile Updation Successful' })

                } catch (err) {
                    console.log(err)
                    if (err.code == 11000) {
                        res.json({ msg: 'Username Is Already Exits' })
                    }
                    else {
                        res.json({ msg: 'Updation Unsuccessful' })
                    }
                }
            } else {
                res.json({ msg: 'Password Not Match' })
            }
        } else {
            res.json({ msg: 'All Fields Are Required' })
        }
    } catch (err) {
        res.json({ statusCode: 500, msg: 'Internal Server Error' })
    }
}

module.exports = UpdateProfile