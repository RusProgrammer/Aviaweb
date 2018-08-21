import axios from 'axios'

function getHeaders({state, dispatch, commit}) {
    const url = 'http://localhost:3000/heads'
    axios.get(url).then(function(resp){
        const headers = resp.data;
        commit('set', {type: 'tableheaders', items: headers});
    })
}

async function getSubversions({state, dispatch, commit}){
    const url = 'http://localhost:3000/api/data/subversion'
    let res = await axios.get(url, 
        {headers: 
        {'Authorization':'Bearer ' + this.getters.userToken}})
    const Tables = res.data.tables;
    return Tables;
}

async function getTree({state, dispatch, commit}, requestData){
    const url = ' http://localhost:3000/api/data/tree'
    /* const Headers ={
        headers:[
            {'Access-Control-Allow-Origin': ['*']},
            {'Authorization':'Bearer ' + this.getters.userToken}
        ]
    } */
    const headers ={
        'Authorization':'Bearer ' + this.getters.userToken
    }
    axios.defaults.headers.common['Authorization'] = 'Bearer ' +  this.getters.userToken
    let res = await axios.post(url,requestData, headers)
    const Tree = res.data.tree;
    console.log('tree', Tree)
    commit('updateTree', Tree);
    return Tree;
}

export {getHeaders, getSubversions, getTree};