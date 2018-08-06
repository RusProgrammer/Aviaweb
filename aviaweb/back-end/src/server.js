var express = require('express');
var bodyParser = require("body-parser");
var serv = express();
var mysql = require('mysql')
//Auth modules
const jwt = require('jsonwebtoken');


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

//Delete item from list
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

serv.post('/api/login', function(req, res){
  const user ={
    id: 1,
    username: 'brad',
    email: 'brad@gmail.com'
  }
  
  jwt.sign({user}, jwtsecret, (err,token)=>{
    res.json({
      token
    });
  })
})

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

// FORMAT OF TOKEN
// Authorization: Bearer <access_token>
function verifyToken(req, res, next){
  // Get auth header value
  const bearerHeader = req.headers['authorization']
  console.log(req.headers)
  console.log(bearerHeader)
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

serv.post('/auth', function (req, res){
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
      console.log("Auth Error")
      res.send(false)  
    }
    if(rows.length===1)
    {
      console.log("All ok")
      res.send(true);
    }
    else
    {
      console.log("Auth length Error")
      res.send(false);
    }
  }) 
})

serv.get('/bab', function (req, res) {
  //res.send('Hello World!');
  var querry = "select * from discrete;"
  connection.query(querry, function(err, rows){
    if (err) console.log(err)

    // Create the headers array
    var headers = [];
    var data = [];
    for(var item in rows[0])
        headers.push(item);
    
    // Get only the enabled headers
    enabledHeaders = checkForShow(headers);

    console.log(JSON.stringify(rows))
    // Get all data from RowDataPacket
    /* rows.forEach(row => {
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
    
    res.send({headers: headers, data: data}); */
    res.set('Access-Control-Allow-Origin', ['*'])
    res.send({data:rows});
   /*  console.log(headers)  
    console.log(data)  */ 
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

function execQuerry(connection, querry){
  connection.query(querry, function(err, rows){
    if (err) console.log(err)
    // Create the headers array
    return rows;
  })
}