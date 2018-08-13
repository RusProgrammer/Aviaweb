var express = require('express');
var bodyParser = require("body-parser");
var serv = express();
var mysql = require('mysql')
//Auth modules
const jwt = require('jsonwebtoken');


jwtsecret = 'fedosov'
serv.use(bodyParser.json());
var connectionzah = mysql.createConnection({
    host: '172.20.1.47',
    user: 'fedosov',
    password: '321',
    database: 'kardailskiy'
})

// Из DataRowPacket в формат JSON
Object.prototype.parseSqlResult = function () {
    return JSON.parse(JSON.stringify(this[0]))
}

exports.CreateTree = function (req, res){
        jwt.verify(req.token, jwtsecret, (err, authdata)=>{
          if(err){
            res.sendStatus(403)
          }else{
            // Получим подсистемы
            var querry = "select * from ref_subsystems;"
            connectionzah.query(querry, function(err, subsystems){
              if (err) throw err
                console.log(subsystems)
                res.set('Access-Control-Allow-Origin', ['*'])
                res.send({data:subsystems});
            })
          }
        }) 
}

