import axios from 'axios'

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
    console.log(requestData.name)
    console.log(requestData.pass)
    console.log(requestData)
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

export default authusr
