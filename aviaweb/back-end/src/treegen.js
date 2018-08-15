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

// Из DataRowPacket в формат JSON
Object.prototype.getArraybyId = function () {
  var field = arguments;
  var retData = []
  for(var i = 0; i < this.length; i ++){
    retData.push(this[i][field[0]])
  }
  return retData
}

Object.prototype.arrToTree = function () {
  var retData = []
  for(var i = 0; i < this.length; i ++){
    retData.push({name:this[i]})
  }
  return retData
}

Object.prototype.toTree = function () {
  return {name: this.toString()}
}

exports.GetSubversions = function (req, res){
        jwt.verify(req.token, jwtsecret, (err, authdata)=>{
          if(err){
            res.sendStatus(403)
          }else{
            // Получим подсистемы
            var querry = "select * from ref_subsystems;"
            connectionzah.query(querry, function(err, subsystems){
              if (err) throw err
                console.log(subsystems.getArraybyId('SHORT_NAME'))
                res.set('Access-Control-Allow-Origin', ['*'])
                res.send({tables:subsystems.getArraybyId('SHORT_NAME')});
            })
          }
        }) 
}

exports.CreateTree = async function datar (req, res){
  res.set('Access-Control-Allow-Origin', ['*'])
  var Tree = []
  jwt.verify(req.token, jwtsecret, async (err, authdata)=>{
    if(err){
      res.sendStatus(403)
    }else{
      //var subsystem = req.body.subsystem
      var subsystem = req.query.subsystem

      // Получим номер в ыбранной подсистемы
      var querry = 'select * from ref_subsystems where ref_subsystems.SHORT_NAME = "'+ subsystem +'";'
      let dbData  = await connectionzah.query(querry)
      console.log(dbData)
      res.json({err:dbData._result});
      
      
      /*,  function(err, subId){
        if (err) throw err
          if (subId.length != 1){
            res.set('Access-Control-Allow-Origin', ['*'])
            res.json({err:"Subsystem querry error"});
          }

          // В случае если всё - таки получилось определить ID выбранной подсистемы
          else{

            // Получим все существующие проекты проекты по выбранной системе
            subId = subId[0].SUBSYSTEM_ID
            var querry = 'select PROJECT_ID, PROJECT_NUM from ref_projects where ref_projects.SUBSYSTEM_ID = "' + subId + '";'
            await connectionzah.query(querry, function(err, projectsdata){
              if (err) throw err
              var projIds = projectsdata.getArraybyId('PROJECT_ID')
              var projNums = projectsdata.getArraybyId('PROJECT_NUM')

              // Теперь для всех проектов найдём существующие процедуры
              projectsdata.forEach(projectitem => {
                var querry = 'select PROCEDURE_ID, PROCEDURE_NUM from ref_procedures where ref_procedures.PROJECT_ID = "' + projectitem.PROJECT_ID + '";'
                await connectionzah.query(querry, function(err, proceduressdata){
                  if (err) throw err
                  if(proceduressdata.length !=0)
                  {
                    // Теперь осталось лишь найти кейзы для процедур
                    console.log('projId = ',projectitem.PROJECT_ID)
                    console.log('projNum = ',projectitem.PROJECT_NUM)
                    console.log(proceduressdata)
                  }
                  // Добавим в дерево проект без процедур
                  else{
                    var temp = projectitem.PROJECT_NUM.toTree()
                    Tree.push(temp)
                  }
                })               
              });
              console.log('fedosov')
              res.send({data:Tree});
            })
            console.log(subId)
            
            
          }
          /* console.log(subsystems.getArraybyId('SHORT_NAME'))
           
      } */
    }
  })
}

