const UpdateProfile = require('../controllers/profile_controllers')

const ProfileRoute = require('express').Router()

ProfileRoute.put('/updateProfile/:id',UpdateProfile)
module.exports = ProfileRoute