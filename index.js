let express = require('express');
const app = express();
const port = 4010;
// const db = require('./config/dbConnection');\
app.use(express.urlencoded());
const db = require('./config/dbConnection');

app.use('/',require('./routes/index.routes'));
app.listen(port, (err) => {
    if (err) {
        console.log(err);
    }
    else {
        console.log(`Server is running on port http://localhost:${port}`);
    }
});

