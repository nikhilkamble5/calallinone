const mongoose = require('mongoose')

const CalculatorSchema = new mongoose.Schema({
    userid: {
        type: String,
        required: true
    },
    calculator_name: {
        type: String,
        required: true
    },
    inputs: {
        type: JSON
    },
    outputs: {
        type: JSON
    },
    date: {
        type: Date,
        default: new Date().getTime()
    }
})


module.exports = new mongoose.model('Calculation', CalculatorSchema)