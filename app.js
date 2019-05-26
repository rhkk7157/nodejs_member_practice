const express = require('express');
const nunjucks = require('nunjucks');
const logger = require('morgan');
const bodyParser = require('body-parser');

// db 관련
const db = require('./models');

// DB authentication
db.sequelize.authenticate()
.then(() => {
    console.log('Connection has been established successfully.');
    // return db.sequelize.sync();
})
.then(() => {
    console.log('DB Sync complete.');
})
.catch(err => {
    console.error('Unable to connect to the database:', err);
});

const contacts = require('./routes/contacts');

const app = express();
const port = 3000;

//라우팅 위에 위치.
nunjucks.configure('template',{
    autoescape : true,
    express : app
});

//미들웨어 셋팅, 라우팅 위에 위치.
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : false}));

app.get('/', function(req,res){
    res.send('first app12');
});

app.get('/contacts',function (req,res){
    res.send('contacts app');
});

app.use('/contacts',contacts);

app.listen( port, function(){
    console.log('Express listening on port', port);
});