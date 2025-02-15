const mongoose = require('mongoose');
const multer = require('multer');
const { type } = require('os');
const path = require('path');

const recipeSchema = mongoose.Schema({
    recipeImage: {
        type:String
    },
    recipeName: {
        type: String,
    },
    recipeDescription: {
        type: String,
    },
    author : {
        type : String
    },
    // comments: [{
        // type: mongoose.Schema.Types.ObjectId,
        // ref: 'Comment'
        // }]
},
{
    timestamps: true
});

const recipeStorage = multer.diskStorage({
    destination: (req,file,cb)=>{
        cb(null,path.join(__dirname,"..","uploads/recipe"));
    },
    filename: (req,file,cb)=>{
        cb(null,`${file.fieldname}-${Date.now()}`);
    }
});

recipeSchema.statics.uploadImage = multer({ storage: recipeStorage }).single('recipeImage');
const recipe = mongoose.model("recipe", recipeSchema);
module.exports = recipe;