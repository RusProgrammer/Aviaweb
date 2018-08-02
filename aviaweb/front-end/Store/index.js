import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import searchusr from './searchuser.js'
import authusr from './searchuser.js'

Vue.use(Vuex);

const strore = new Vuex.Store({
    state:{
        results:[],
        logged: false
    },
    getters:{
        results(state){
            return state.results
        },
        logged(state){
            return state.logged
        }
    },
    mutations:{
        set(state, {type, items}){
            state[type] = items;
        }
    },
    actions:{
        search:searchusr,
        login:authusr
    }
})

export default strore;