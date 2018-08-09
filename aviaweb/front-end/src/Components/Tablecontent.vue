<template>
    <div class="tablecontent">
      <vuetable ref="vuetable"
            api-url="http://localhost:3000/bab"
            :fields="fieldss"
            :http-options = httpOptions
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
    data: function(){
        return{
            fieldss:[],
            httpOptions: {headers:{Authorization: 'Bearer ' + this.$store.getters.userToken}}
        }
    },
    methods:{
        getFields() {

        },
    },
    created(){
        /* let response = this.$store.dispatch('getheads');
        this.fieldss = response
        console.log(this.fieldss)
        console.log(this.$store.getters.tableheaders) */
/*         this.$store.dispatch('getheads');
        console.log(this.$store.getters.tableheaders) */
        var xhr = new XMLHttpRequest();
        xhr.open('GET', 'http://localhost:3000/heads', false);
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