const express = require('express')
const CalculatorControllers = require('../controllers/calculator_controllers')
const CalculatorRoute = express.Router()

CalculatorRoute.post('/save',CalculatorControllers.SaveCalculations)
CalculatorRoute.get('/saveCalculations',CalculatorControllers.GetSaveCalculations)


module.exports = CalculatorRoute