const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');

const AdminSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String,
    role:{
        type : String,
        enum : ['Admin', 'User']
    },
    contactNo:String,
    adminImage: String
      
},
{
    timestamps:true
});

const userStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, "..",'uploads/admin'));
    },
    filename: (req, file, cb) => {
        cb(null,`${file.fieldname}-${Date.now()}`);
        }
});

AdminSchema.statics.uploadImage = multer({ storage: userStorage }).single('adminImage');

const Admin = mongoose.model('Admin', AdminSchema);
module.exports = Admin;
