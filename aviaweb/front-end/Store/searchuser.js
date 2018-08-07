import axios from 'axios'
import { resolve } from 'path';
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

async function login({state, dispatch, commit}, requestData){
    const url = 'http://localhost:3000/api/login'
    const headers ={
        'Access-Control-Allow-Origin': ['*']
    }
    let res = await axios.post(url,requestData, headers)/* .then((resp)=>{
        const uToken = resp.data.token;
        commit('set', {type: 'userToken', items: uToken});
        resolve(uToken)
    })
    .catch((err)=>{
        throw err;
    }) */
    const uToken = res.data.token;
    commit('set', {type: 'userToken', items: uToken});
    return uToken;

}

export {authusr, searchusr, login};
