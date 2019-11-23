const express = require('express')
const bodyParser = require('body-parser')
const Datastore = require('nedb')
const app = express()
const port = 8000;

var db = new Datastore({ filename: './datastore/data', autoload: true });
app.use(bodyParser.json());

var BASE_API_PATH = "/api/v1";

var contacts = [
    {
        "name":"Peter",
        "phone":"654789123"
    },
    {
        "name":"Jhon",
        "phone":"612345678"
    }
]

app.get('/', (req, res) => res.send('Hello World!'))

app.get(BASE_API_PATH + "/contacts", (req,res) => {
    console.log(Date() + " - GET /contacts");
    db.find({},{ name: 1, phone: 1, _id: 0 }, function (err, docs) {
        res.send(docs);
    });
});

app.post(BASE_API_PATH + "/contacts", (req,res) => {
    console.log(Date() + " - POST /contacts");
    let contact = req.body;
    db.insert(contact);
    res.sendStatus(201);
});

app.listen(port, () => console.log('Example app listening on port 3000!'))
