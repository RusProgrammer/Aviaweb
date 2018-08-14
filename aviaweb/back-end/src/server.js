var async = require('async');
var express = require('express');
var bodyParser = require("body-parser");
var serv = express();
var mysql = require('mysql')
//Auth modules
const jwt = require('jsonwebtoken');
const getMainMenu = require('./menu/mainMenu.js')

var Tree =  require('./treegen')


jwtsecret = 'fedosov'
serv.use(bodyParser.json());

serv.use(async (req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  next();
});

var connection = mysql.createConnection({
  host: '172.20.1.47',
  user: 'fedosov',
  password: '321',
  database: 'sid_fwa_09_07_2018_version_09c'
})

var connectionzah = mysql.createConnection({
  host: '172.20.1.47',
  user: 'fedosov',
  password: '321',
  database: 'kardailskiy'
})


var connectionis = mysql.createConnection({
  host: '172.20.1.47',
  user: 'ishchenko',
  password: 'toor',
  database: 'ishchenko'
})

// Импортированная функция для формирования дерева
serv.get('/api/data/subversion', verifyToken, Tree.GetSubversions);
serv.post('/api/data/tree', verifyToken, Tree.CreateTree);


// Функция, позволяющая удалить элемент из списка/массива
Array.prototype.remove = function() {
  var what, a = arguments, L = a.length, ax;
  while (L && this.length) {
      what = a[--L];
      while ((ax = this.indexOf(what)) !== -1) {
          this.splice(ax, 1);
      }
  }
  return this;
};

// Пример написания функции с использованием токена авторизации
serv.post('/api/posts', verifyToken, function(req, res){
  jwt.verify(req.token, jwtsecret, (err, authdata)=>{
    if(err){
      res.sendStatus(403)
    }else{
      res.json({
        message:'Post created',
        authdata
      })
    }
  })  
})

// Тестовая функция получения меню
connectionis.connect();
serv.post('/api/testedmenu', function(req, res){
  res.set('Access-Control-Allow-Origin', ['*']);
  getMainMenu.getMainMenu()
  .then(
    response => {
      let resultDB = response;
      console.log('RESP: ', resultDB);
      res.json({
        data:resultDB
      })
  },
    error => console.log('ERR: ', error)
  );
})

// Функция для получения токена авторизации
serv.post('/api/login', function(req, res){
  res.set('Access-Control-Allow-Origin', ['*']);
  var name = req.body.name
  var pass = req.body.pass
  console.log(name)
  console.log(pass)
  //TODO: log the entered user
  var querry = 'select * from users where BINARY Surname ="' + name + '" and Password ="' + pass + '";'
  connectionzah.query(querry, function(err, rows){  
    if (err) 
    {
      console.log("Auth Error");
      res.json({
        token:'AuthError'
      });
    }
    if(rows.length===1)
    {
      jwt.sign(req.body, jwtsecret, (err,token)=>{
        res.json({
          token
        });
      })
    }
    else
    {
      console.log("Auth length Error")
      res.json({
        token:'AuthError'
      });
    }
  }) 
})

// Формат токена
// Authorization: Bearer <access_token>
function verifyToken(req, res, next){
  // Get auth header value
  const bearerHeader = req.headers['authorization']
  if(typeof bearerHeader !== 'undefined')
  {
    const bearer = bearerHeader.split(' ')
    const bearerToken = bearer[1]
    //set token
    req.token = bearerToken;
    next();
  }else{
    //forbidden
    console.log('Token wasn\'t set ')
    res.sendStatus(403);
  }
}


// Получаем доступные заголовки выводимой таблицы
serv.get('/heads', function (req, res) {
  var querry = "select * from discrete;"
  connection.query(querry, function(err, rows){
    if (err) console.log(err)
    // Create the headers array
    var headers = [];
    for(var item in rows[0])
        headers.push(item);
    enabledHeaders = checkForShow(headers);
    res.set('Access-Control-Allow-Origin', ['*'])
    res.send(enabledHeaders);
  })
})

// Функция для получения списка таблиц
serv.get('/api/tables', verifyToken, function(req, res){
  jwt.verify(req.token, jwtsecret, (err, authdata)=>{
    if(err){
      console.log(req.token)
      res.sendStatus(403)
    }else{
      var querry = 'SHOW TABLES LIKE "ref_%"'
      connectionzah.query(querry, function(err, rows){
        if (err) throw err
        res.set('Access-Control-Allow-Origin', ['*'])

        if (err){
           console.log("Tables SQL1 error in /api/tables")
           throw err
        }
        // Transform from RowDataPacket reprezentation
        if(rows.length>1) {   
          console.log("Tables is OK /api/tables")   
          var data = []
          rows.forEach(row => {
            for(var item in row)
            {
                // Add values only for the enabled headers
                console.log(typeof(row[item]))
                if(typeof(row[item])== 'string')
                  data.push(row[item]);
            }
          });
          console.log(data)
          res.json({tables:data});
        }
        else{
          console.log("Tables SQL error in /api/tables")
          res.sendStatus(403);
        }
      })
    }
  }) 
})

// Получение содержимого таблицы. Используется для отрисовки пользовательских
// данных в элементах vuetable
serv.get('/bab', verifyToken, function (req, res) {
  console.log(req.token)
  jwt.verify(req.token, jwtsecret, (err, authdata)=>{
    if(err){
      res.sendStatus(403)
    }else{
      var querry = "select * from discrete;"
      connection.query(querry, function(err, rows){
        if (err) throw err
        console.log(123)
        res.set('Access-Control-Allow-Origin', ['*'])
        res.send({data:rows});
      })
    }
  }) 
  /* var querry = "select * from discrete;"
  connection.query(querry, function(err, rows){
    if (err) console.log(err)
    //formatted output
    //console.log(JSON.stringify(rows))
    // Get all data from RowDataPacket
    rows.forEach(row => {
        var rowData = []
        var id = 0;
        for(var item in row)
        {
            // Add values only for the enabled headers
            if (enabledHeaders.indexOf(headers[id]) > -1)
                rowData.push(row[item]);
            id++;
        }
        data.push(rowData);  
    }); 
    res.set('Access-Control-Allow-Origin', ['*'])
    res.send({data:rows}); 
  })*/
});

// Получение содержимого указанной таблицы. Используется для отрисовки пользовательских
// данных в элементах vuetable
serv.get('/api/data/tables/:tablename', verifyToken, function (req, res) {
  console.log("in tablename")
  console.log(req.token)
  jwt.verify(req.token, jwtsecret, (err, authdata)=>{
    if(err){
      res.sendStatus(403)
    }else{
      const table = req.params.tablename;
      var querry = "select * from " + table + ";"
      connectionzah.query(querry, function(err, rows){
        if (err) throw err
        console.log(123)
        res.set('Access-Control-Allow-Origin', ['*'])
        res.send({data:rows});
      })
    }
  }) 
});

// Получение заголвков полей по имени таблицы. Используется для отрисовки пользовательских
// данных в элементах vuetable
serv.get('/api/data/headers/:tablename', verifyToken, function (req, res) {
  console.log("in tablename")
  console.log(req.token)
  jwt.verify(req.token, jwtsecret, (err, authdata)=>{
    if(err){
      console.log("in tablename all bad")
      res.sendStatus(403)
    }else{
      console.log("in tablename all ok")
      const table = req.params.tablename;
      var querry = "select * from "+ table + ";"
      connectionzah.query(querry, function(err, rows){
        if (err) console.log(err)
        // Create the headers array
        var headers = [];
        for(var item in rows[0])
            headers.push(item);
        enabledHeaders = checkForShow(headers);
        res.set('Access-Control-Allow-Origin', ['*'])
        res.send(enabledHeaders);
      })
    }
  }) 
});

serv.listen(3000, function () {
  console.log('Example app listening on port 3000!');
  connection.connect(function(err) {
    if (err) console.log(err)
  })
  connectionzah.connect(function(err) {
    if (err) console.log(err)
  })
});

function checkForShow(headersArray){
    /// TODO:
    /// Get list of the enabled headers
    /// and return them.
    /* field = 'Parameter_name'
    item_index = headersArray.indexOf(field)
    console.log(item_index)
    console.log(headersArray)
    if (item_index > -1){
      headersArray.remove(field)
    }
    console.log(headersArray) */
    return headersArray;
}