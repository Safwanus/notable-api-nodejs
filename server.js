const express      = require('express');
const MongoClient  = require('mongodb').MongoClient;
const bodyParser   = require('body-parser');
const routes       = require('./app/routes');
const db           = require('./config/db')
const app          = express();
const port         = 8000;

app.use(bodyParser.urlencoded({ extended: true}))



const client = new MongoClient(db.url, { useNewUrlParser: true });
client.connect(err => {
    const database = client.db("notable")
    routes(app, database);
    app.listen(port, ()=>{
        console.log('we are Live & Listening on '+port);
    });
});