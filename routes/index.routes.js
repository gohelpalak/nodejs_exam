const express = require('express');
const indexRouter = express.Router();


indexRouter.use('/Admin', require('../routes/Admin.routes') );
indexRouter.use('/user',require('../routes/User.routes'))

module.exports = indexRouter;


