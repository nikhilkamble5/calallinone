const express =  require('express')
const { LoginUser, RegisterUser } = require('../controllers/auth_controllers')
const AuthRouter = express.Router()

AuthRouter.post('/login',LoginUser)
AuthRouter.post('/register',RegisterUser)

module.exports = AuthRouter