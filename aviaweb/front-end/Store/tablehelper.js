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

export {getHeaders, getSubversions};