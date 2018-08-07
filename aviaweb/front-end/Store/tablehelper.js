import axios from 'axios'
function getHeaders({state, dispatch, commit}) {
    const url = 'http://localhost:3000/heads'
    axios.get(url).then(function(resp){
        const headers = resp.data;
        commit('set', {type: 'tableheaders', items: headers});
    })
}

export {getHeaders};