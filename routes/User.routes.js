const express = require('express');
const { register } = require('../controller/admin.controller');
// const { register } = require('module');
const UserRoutes = express.Router();

UserRoutes.post("/register",register),


module.exports = UserRoutes;