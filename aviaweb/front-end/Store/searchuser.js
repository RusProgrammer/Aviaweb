import axios from 'axios'
var async = require('async');

function searchusr({state, dispatch, commit}, querry){
    const url = 'http://localhost:3000/users'
    console.log(querry)
    axios.get(url).then((resp)=>{
        const results = resp.data;
        commit('set', {type: 'results', items: results});
    })
    .catch((err)=>{
        console.log(err);
    })
    
}

function authusr({state, dispatch, commit}, requestData){
    const url = 'http://localhost:3000/auth'
    const headers ={
        'Access-Control-Allow-Origin': ['*']
    }
    axios.post(url,requestData, headers).then((resp)=>{
        const logged = resp.data;
        console.log(logged)
        commit('set', {type: 'logged', items: logged});
    })
    .catch((err)=>{
        console.log(err);
    })
    
}

// Функция для получения токена доступа к данным
async function login({state, dispatch, commit}, requestData){
    const url = 'http://localhost:3000/api/login'
    const headers ={
        'Access-Control-Allow-Origin': ['*']
    }
    let res = await axios.post(url,requestData, headers)
    const uToken = res.data.token;
    commit('set', {type: 'userToken', items: uToken});
    return uToken;
}

async function logout({state, dispatch, commit}){
    commit('set', {type: 'userToken', items: ''});
}


function setTable({state, dispatch, commit}, data){
    commit('set', {type: 'tableselected', items: data.tableselected});
}


async function getTables({state, dispatch, commit}){
    const url = 'http://localhost:3000/api/tables'
    let res = await axios.get(url, 
        {headers: 
        {'Authorization':'Bearer ' + this.getters.userToken}})
    const Tables = res.data.tables;
    return Tables;
}

// тестовое получение меню
async function getMainMenu({state, dispatch, commit}, requestData){
    const url = 'http://localhost:3000/api/testedmenu'
    const headers ={
        'Access-Control-Allow-Origin': ['*']
    }
    let res = await axios.post(url, requestData, headers)
    const calcMenu = res.data;
    return calcMenu;
}

export {authusr, searchusr, login, logout, getTables, getMainMenu, setTable};
