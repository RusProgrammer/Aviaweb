import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import {searchusr, authusr, login, logout, getTables, getMainMenu, setTable} from './searchuser.js'
import {getHeaders, getSubversions, getTree} from './tablehelper.js'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex);

const strore = new Vuex.Store({
    state:{
        results:[],
        logged: false,
        tableheaders: [],
        dropdownmethod:'',
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
        },
        dropdownmethod(state){
            return state.dropdownmethod
        },
        tableselected(state){
            return state.tableselected
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
        testedmenu: getMainMenu,
        getsubversions: getSubversions,
        gettree:getTree,
        settable:setTable
    },
    plugins: [createPersistedState()]
})

export default strore;