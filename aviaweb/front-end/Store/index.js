import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import {searchusr, authusr, login, logout, getTables, getMainMenu} from './searchuser.js'
import {getHeaders} from './tablehelper.js'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex);

const strore = new Vuex.Store({
    state:{
        results:[],
        logged: false,
        tableheaders: [],
        tableselected: '',
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
        logout:logout,
        getheads:getHeaders,
        gettables:getTables,
        testedmenu: getMainMenu
    },
    plugins: [createPersistedState()]
})

export default strore;