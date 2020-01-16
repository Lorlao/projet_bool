var express = require('express');
var router = express.Router();
const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectId;
// Connection URL
const url = 'mongodb://localhost:27017';
// Database Name
const dbName = 'bemol';

//READ avec connexion à la db 
router.get('/', function(req, res, next) {

  //CONNECTER NODEJS A LA DB
  MongoClient.connect(url, function(err, client) {
    if(err){
      return
    }
    console.log("Connected successfully to server");

    const db = client.db(dbName);

    //DEFINIR LA FONCTION
    const findUsers = function(db, callback) {

      const collection = db.collection('users');

      collection.find({}).toArray(function(err, users) {
        if(err){
          return
        }
        console.log("Inscription OK");

        //RECUPERER LES USERS
        console.log(users)
        callback(users);

        //AFFICHER LES USERS
        res.render('index', { title: "ÇA S'AFFICHEEEEEEEE",list:users });
      });
    }
    //APPELER LA FONCTION
    findUsers(db, function(users) {
      client.close();
    });   
  }); 
});

//CREATE avec connexion à la db
router.post('/', function(request, response, next) {

  console.log(request.body.messageAjoute)

//CONNECTER NODEJS A LA DB
  MongoClient.connect(url, function(err, client) {
    if(err){
      return
    }
    console.log("on est connectééééé");

    const db = client.db(dbName);

//DEFINIR LA FONCTION
    db.collection('users').insertOne({
      name:request.body.name,
      firstname:request.body.firstname,
      adress:request.body.adress,
      postalcode:request.body.postalcode,
      city:request.body.city,
      email:request.body.email,
      date:new Date(),
    });
    client.close();
  }); 
});


module.exports = router;
