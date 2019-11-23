const express = require('express')
const bodyParser = require('body-parser')
const Datastore = require('nedb')
const app = express()
const port = 8000;

var BASE_API_PATH = "/api/v1";
var DB_FILE_NAME = __dirname + "/datastore/data";

var db = new Datastore({ filename: DB_FILE_NAME, autoload: true });

app.use(bodyParser.json());



app.get('/', (req, res) => res.send('Hello World!'))

app.get(BASE_API_PATH + "/contacts", (req,res) => {
    console.log(Date() + " - GET /contacts");
    db.find({},{ name: 1, phone: 1, _id: 0 }, function (err, contacts) {
        if(err) {
            console.log(Date() + " - " + err);
            res.sendStatus(500);
        } else {
            res.send(contacts);
        }  
    });
});

app.post(BASE_API_PATH + "/contacts", (req,res) => {
    console.log(Date() + " - POST /contacts");
    let contact = req.body;
    db.insert(contact, (err) => {
        if(err) {
            console.log(Date() + " - " + err);
            res.sendStatus(500);
        } else {
            res.sendStatus(201);
        }
    });
});

app.listen(port, () => console.log('Example app listening on port 3000!'))
