require('dotenv').config()
const express = require('express')
const AuthRouter = require('../routes/auth_routes')
const ConnectDB = require('../db/ConnectDB')
const auth = require('../middleware/auth')
const ProfileRoute = require('../routes/profile_routes')
const CalculatorRoute = require('../routes/calculator_routes')
const app = express()
const PORT = process.env.PORT || 2206
const cors = require('cors')
app.use(express.json())

app.use(cors())
app.get("/", (req, res) => {
    res.json({ msg: 'Techplement Group Project API' })
})

app.use('/private', auth, (req, res) => {
    res.json({ statusCode: 200, status: "Valid User", UserData: req.user })
})
app.use('/auth/', AuthRouter)
app.use('/profile/', auth, ProfileRoute)
app.use('/Calculator/', auth, CalculatorRoute)

const start = async () => {

    const isDB_Connected = await ConnectDB()
    if (isDB_Connected === 1) {
        console.log('database Connected')
        app.listen(PORT, () => {
            console.log(`Server Is Listen At Port http://localhost:${PORT}`);
        })
    } else {
        console.log('Database Not Connected')
    }
}

start()