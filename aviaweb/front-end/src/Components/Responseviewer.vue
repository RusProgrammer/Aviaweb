<template>
    <div class="tablecontent">
        <vuetable ref="vuetable"
            :api-url = getApiUrl()
            :fields="fieldss"
            :http-options = httpOptions
            pagination-path=""
            :per-page="5"
        ></vuetable>
        <vuetable-pagination ref=""></vuetable-pagination>        
        </div>
</template>

<script>
import Vue from 'vue'
import * as Vuetable from 'vuetable-2'
import axios from 'axios';
Vue.use(Vuetable)
Vue.prototype.$http = axios

String.prototype.replaceAll = function(search, replacement) {
            var target = this;
            return target.split(search).join(replacement);
        };

export default {
    comments:{
        Vuetable
    },
    props:{
        apiurl: String
    },
    data: function(){
        return{
            fieldss:[],
            httpOptions: {headers:{Authorization: 'Bearer ' + this.$store.getters.userToken}}
        }
    },
    methods:{
        getApiUrl(){
            return 'http://localhost:3000/api/data/tables/' + this.$store.state.tableselected
        }
    },
    created(){
        console.log(this.$store.state.tableselected)
        var xhr = new XMLHttpRequest();
        xhr.open('GET', 'http://localhost:3000/api/data/headers/' + this.$store.state.tableselected, false);
        xhr.setRequestHeader("Authorization", "Bearer " + this.$store.getters.userToken)
        try {
          xhr.send();
        } catch(err) {
            return;
        };
        var imgType = xhr.response   
        imgType = imgType.replaceAll("\"","")       
        imgType = imgType.replaceAll(","," ")       
        imgType = imgType.replaceAll("[","")       
        imgType = imgType.replaceAll("]","")       
        this.fieldss = imgType.split(' ')   
    },

}  

</script>