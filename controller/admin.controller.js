const Admin = require('../model/Admin.model');
const recipe = require('../model/recipe.model')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const path = require('path');
const fs = require('fs');


exports.register = async (req, res) => {
    try {
        let findadmin = await Admin.findOne({ email: req.body.email });
        if (findadmin) {
            return res.status(400).json({ message: "admin already Exit !!! Please login " });

        } else {
            let imagePath = "";
            if (req.file) {
                imagePath = `/uploads/admin/${req.file.filename}`;
            }
            req.body.adminImage = imagePath;

            let hashPassword = await bcrypt.hash(req.body.password, 10);
            // generate salt to hash password
            // const salt = await bcrypt.genSalt(10);

            // now we set user password to hashed password
            // const hashPassword = await bcrypt.hash(req.body.password);

            req.body.role = 'Admin';
            let addadmin = await Admin.create({ ...req.body, password: hashPassword });
            return res.status(201).json({ message: "admin Register Success", Admin: addadmin });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Server Error" });

    }
}

exports.login = async (req, res) => {
    try {
        let findadmin = await Admin.findOne({ email: req.body.email });
        console.log(Admin);
        if (!findadmin) {

            return res.status(404).json({ message: "Admin not Found" });
        }
        let checkedPass = await bcrypt.compare(req.body.password, findadmin.password);
        console.log(checkedPass);
        if (checkedPass) {
            let token = jwt.sign({
                adminId: findadmin._id
            }, "secret");
            return res.status(200).json({ message: "Login success", token });

        } else {
            return res.status(400).json({ message: "Password is not Matched! " })
        }


    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Server Error" });

    }
}

exports.profile = (req, res) => {
    try {
        return res.json({ message: "Profile Found", Admin: req.Admin })
    } catch (error) {
        console.log(error);
        return res.json({ message: "Server Error" });

    }
}

exports.updateAdmin = async (req, res) => {
    try {
        let findAdmin = await Admin.findById(req.params.id);
        if (findAdmin) {
            if (req.file) {
                let imagePath = findAdmin.adminImage;
                if (imagePath != "" && imagePath) {
                    imagePath = path.join(__dirname, "..", imagePath);
                    try {
                        fs.unlinkSync(imagePath);
                    } catch (error) {
                        return res.status(404).res.json({ message: "File Missing...." })
                    }
                }
                req.body.adminImage = `/uploads/admin/${req.file.filename}`; //Saves the new image path in req.body.adminImage
            }
            else {
                req.body.adminImage = findAdmin.adminImage
            }
            let updateAdmin = await Admin.findByIdAndUpdate(req.params.id, req.body, { new: true });
            return res.status(200).json({ message: "Admin updated successfully", data: updateAdmin });
        }
        else {
            return res.status(400).json({ message: "Admin not found" });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Something went wrong" });
    }
}
exports.addRecipe = async (req, res) => {
    try {
        let findsamerecipe = await recipe.findOne({ recipeName: req.body.recipeName });
        if (!findsamerecipe) {
            let imagePath = "";
            if (req.file) {
                imagePath = `/uploads/recipe/${req.file.filename}`;

            }
            req.body.recipeImage = imagePath;
            req.body.author = req.body.username;
            let addrecipe = await recipe.create(req.body);
            return res.status(200).json({ message: "Recipe added successfully", data: addrecipe });
        } else {
            return res.status(400).json({ message: "recipe already exit" });

        }
    } catch (error) {
        console.log("Error adding recipe", error);
        return res.status(500).json({ message: "Server Error", error: error.message });


    }

}

exports.getAllRecipe = async (req, res) => {
    try {
        let allrecipe = await recipe.find();
        return res.status(200).json({ message: "recipe Fetched Successfully", allrecipe });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: " Somthing went Wrong" });

    }
}
exports.getSingleRecipe = async (req, res) => {
    try {
        let singleRecipe = await recipe.findById(req.params.id);
        console.log(singleRecipe,"hyyy");
        if (!singleRecipe) {
            return res.status(404).json({ message: "Recipe not found" });
        }
        return res.status(200).json({ message: "Recipe fetches successfully", Recipe: singleRecipe })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Server Error" });

    }
}

