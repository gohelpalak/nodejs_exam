const express = require('express');
const adminRoutes = express.Router();
const Admin = require('../model/Admin.model');
const recipe = require('../model/recipe.model')
const { register, login, profile, updateAdmin, addRecipe, getAllRecipe, getSingleRecipe } = require('../controller/admin.controller');
const { verifyToken } = require('../middleware/verifyToken');

adminRoutes.post("/register",register);
adminRoutes.post("/login",login);
adminRoutes.get("/profile", verifyToken,profile);
adminRoutes.put('/updateAdmin/:id',verifyToken,Admin.uploadImage,updateAdmin);

// adminRoutes.delete('/deleteAdmin/:id', verifyToken,deleteAdmin);


// ===============recipe ===========

adminRoutes.post('/addrecipe',verifyToken,recipe.uploadImage,addRecipe);

adminRoutes.get('/getAllRecipe',verifyToken,getAllRecipe);

adminRoutes.get('/getsingleRecipe/:id',verifyToken,recipe.uploadImage,getSingleRecipe);

module.exports = adminRoutes