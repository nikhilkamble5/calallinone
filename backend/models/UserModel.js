const mongoose = require("mongoose")
const jwt = require("jsonwebtoken")

let UserSchema = mongoose.Schema({
    fname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phone:{
       type:Number,
       required:true 
    },
    password: {
        type: String,
        required: true
    },
    tokens: [{
        token: {
            type: String,
        }
    }]
})

UserSchema.methods.GenerateJWTToken = async function () {
    console.log('generate jwt token')
    try {

        const token = await jwt.sign({ _id: this._id }, process.env.SECRET_KEY)
        this.tokens = this.tokens.concat({token:token})
        await this.save()
        return token
    }
    catch (err) {
        return 0
    }

}

module.exports = new mongoose.model('User', UserSchema)