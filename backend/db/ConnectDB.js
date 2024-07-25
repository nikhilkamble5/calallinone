const mongoose = require('mongoose')

const ConnectDB = async () => {
    try {
        const connect = (await mongoose.connect(process.env.MONGOOSE_URL))
        // console.log('database Connected')
        return 1
    } catch (err) {
         console.log(err)
        return 0
    }
}


module.exports = ConnectDB