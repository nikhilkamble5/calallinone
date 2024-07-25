const CalculatorModel = require('../models/calculatorModel')

const SaveCalculations = async (req, res) => {
    var { calculator_name, inputs, outputs } = req.body
    console.log(calculator_name, JSON.stringify(inputs), JSON.stringify(outputs))
    // inputs = JSON.stringify(inputs)
    const calculation_data = new CalculatorModel(
        {
            userid:req.id, calculator_name, inputs, outputs
        }
    )
    await calculation_data.save()
    res.json({ msg: 'Calculations Save' })
}

const GetSaveCalculations = async (req, res) => {
    try {
        let id = req.id
        console.log("ID",id.toString())
        const data = await CalculatorModel.find({userid: id.toString()})
        console.log(data)
        res.json(data)
    } catch (err) {
        console.log('error')
        res.json({})
    }
}
module.exports = { SaveCalculations, GetSaveCalculations } 