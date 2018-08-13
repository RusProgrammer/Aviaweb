var mysql = require('mysql')
var activMenu='menu2';

var connectionis = mysql.createConnection({
    host: '172.20.1.47',
    user: 'ishchenko',
    password: 'toor',
    database: 'ishchenko'
  })

function getMainMenu(){
  var mySelect='select * from mainmenu;';
  console.log("ANSWER FROM BACK");
  console.log('connect ok');
  return new Promise(function(resolve, reject){
    var resultGetMenu = connectionis.query(mySelect, function(error, results, fields){
      if (error){
        var error = new Error(this.statusText);
        error.code = this.status;
        reject(error);
      } else {
        let arrParent=[]
        for (var k=0; k<results.length; k++){
          if ((results[k].parent_id!==0) && (arrParent.indexOf(results[k].parent_id)===-1)){
            arrParent.push(results[k].parent_id)
          }
        }
        for (var z=0; z<results.length; z++){
          if (arrParent.indexOf(results[z].id) !== -1){
            results[z].child='true';
          }
        }
        console.log("RESULTS::: ", arrParent);
        resolve(results);
      }
    })
  })
}

exports.getMainMenu = getMainMenu;