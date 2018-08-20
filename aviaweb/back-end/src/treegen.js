var express = require('express');
var bodyParser = require("body-parser");
var serv = express();
var mysql = require('mysql')
//Auth modules
const jwt = require('jsonwebtoken');

var promiceQuery = require('./dbconfig.js').query;



jwtsecret = 'fedosov'
serv.use(bodyParser.json());
//TODO: use connectionPool from https://ru.stackoverflow.com/questions/499826/%D0%9E%D0%B1%D1%8A%D1%8F%D1%81%D0%BD%D0%B8%D1%82%D0%B5-%D1%80%D0%B0%D0%B7%D0%BD%D0%B8%D1%86%D1%83-%D0%BC%D0%B5%D0%B6%D0%B4%D1%83-mysql-createconnection-%D0%B8-mysql-createpool-%D0%B2-nodejs
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

//TODO: use connectionPool
// Функция для получения напроавлений/подсистем
exports.GetSubversions = function (req, res){
        jwt.verify(req.token, jwtsecret, (err, authdata)=>{
          if(err){
            res.sendStatus(403)
          }else{
            // Получим подсистемы
            var query = "select * from ref_subsystems;"
            connectionzah.query(query, function(err, subsystems){
              if (err) throw err
                res.set('Access-Control-Allow-Origin', ['*'])
                res.send({tables:subsystems.getArraybyId('SHORT_NAME')});
            })
          }
        }) 
}

exports.CreateTree = async function datar (req, res){
  res.set('Access-Control-Allow-Origin', ['*'])
  console.log('hello')
  var Tree = []
  jwt.verify(req.token, jwtsecret, async (err, authdata)=>{
    if(err){
      res.sendStatus(403)
    }else{
      var subsystem = req.body.subsystem
      console.log('subsystem',req.body)
      //var subsystem = req.query.subsystem
      // Получим номер в выбранной подсистемы
       var query = 'select * from ref_subsystems where ref_subsystems.SHORT_NAME = "'+ subsystem +'";'
       await promiceQuery(query)
       .then(async function(subsystem){
          if (subsystem.length != 1){
            //TODO: Записать ошибку в лог. Может существовать только 1 запись, описывающая направление по данному запросу.
            res.json({err:"Subsystem query error"});
          }
          // Получим все существующие проекты проекты по выбранной системе
          const subId = subsystem[0].SUBSYSTEM_ID
          var query = 'select PROJECT_ID, PROJECT_NUM from ref_projects where ref_projects.SUBSYSTEM_ID = "' + subId + '";'
          await promiceQuery(query)
          .then(async function(projects){
            // Теперь для всех проектов найдём существующие процедуры       
            for(var i = 0; i < projects.length; i++){
              var query = 'select PROCEDURE_ID, PROCEDURE_NUM from ref_procedures where ref_procedures.PROJECT_ID = "' + projects[i].PROJECT_ID + '";'
              await promiceQuery(query)
              .then(async function(procedures){
                if (procedures.length != 0)
                {
                  var procArray = []
                  // Теперь осталось лишь найти кейзы для процедур
                  for(var j = 0; j < procedures.length; j++)
                  {
                    var query = 'select CASE_ID, CASE_NUM from ref_cases where ref_cases.PROCEDURE_ID = "' + procedures[j].PROCEDURE_ID + '";'
                    await promiceQuery(query)
                    .then(async function(cases){
                      if (cases.length != 0){
                        // Тут уже добавляем полностью ноду в дерево
                        var caseChilren = []
                        for(var k = 0; k < cases.length; k++){
                          caseChilren.push({name:cases[k].CASE_NUM})
                        }
                        // Сама соль)
                        procArray.push({name: procedures[j].PROCEDURE_NUM, children: caseChilren})
                      }
                      else{
                        // Добавить в дерево процедуру без кейзов
                        Tree.push({name: projects[i].PROJECT_NUM, children: [{name: procedures[j].PROCEDURE_NUM}]})
                      }
                    })
                    .catch(function(err){
                      //TODO: Записать ошибку в лог. Ошибка SQL 
                      throw err;
                    })
                  }
                  if (procArray.length > 0)
                    Tree.push({name: projects[i].PROJECT_NUM, children: procArray})
                }
                else{
                  // Добавить в дерево проект без процедур
                  Tree.push(projects[i].PROJECT_NUM.toTree())
                }
              })
              .catch(function (err){
                //TODO: Записать ошибку в лог. Ошибка SQL 
                throw err;
              })
            };
          })
          .catch(function(err){
            //TODO: Записать ошибку в лог. Ошибка SQL 
            throw err;
          })
       })
       .catch(function(err){
         //TODO: Записать ошибку в лог. Ошибка SQL  
         throw err;
       })
      res.json({tree:Tree})
      console.log('flag')         
    }
  })
}

