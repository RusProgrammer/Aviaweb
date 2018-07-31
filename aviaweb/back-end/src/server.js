var express = require('express');
var serv = express();
var mysql = require('mysql')

var connection = mysql.createConnection({
  host: '172.20.1.47',
  user: 'fedosov',
  password: '321',
  database: 'fedosov'
})

serv.get('/heads', function (req, res) {
  var querry = "select * from names;"
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

serv.get('/bab', function (req, res) {
  //res.send('Hello World!');
  var querry = "select * from names;"
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
});

function checkForShow(headersArray){
    /// TODO:
    /// Get list of the enabled headers
    /// and return them.
    return headersArray;
}