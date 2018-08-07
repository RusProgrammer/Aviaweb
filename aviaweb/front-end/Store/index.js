import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import {searchusr, authusr, login} from './searchuser.js'
import {getHeaders} from './tablehelper.js'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex);

const strore = new Vuex.Store({
    state:{
        results:[],
        logged: false,
        tableheaders: [],
        userToken: ''
    },
    getters:{
        results(state){
            return state.results
        },
        logged(state){
            return state.logged
        },
        userToken(state){
            return state.userToken
        },
        tableheaders(state){
            return state.tableheaders
        }
    },
    mutations:{
        set(state, {type, items}){
            state[type] = items;
        }
    },
    actions:{
        search:searchusr,
        login:login,
        getheads:getHeaders
    },
    plugins: [createPersistedState()]
})

export default strore;