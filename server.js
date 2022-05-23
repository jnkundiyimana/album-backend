const express = require('express');
const cors = require('cors');
const app = express();

var corsOptions ={
    origin: 'http://localhose:8081'
};

app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({extended: true}));

const db = require('./app/models/index.js');
db.sequelize.sync();

app.get('/',(req, resp) =>{
    resp.json({
        message: 'This is the API for album'
    });
});

require('./app/routes/requestRoute.js')(app);
//publish or develop in localhost at port 5000
const PORT = process.env.PORT || 5000;
//listen on environment port or 5000
app.listen(PORT,()=>{
    console.log(`Server is running on PORT ${PORT}`);
})

