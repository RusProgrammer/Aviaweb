<template>
    <div class="tablecontent">
      <vuetable ref="vuetable"
            api-url="http://localhost:3000/bab"
            :fields="['ID', 'Name', 'Surname']"
  >     </vuetable>
    </div>
</template>

<script>
import Vue from 'vue'
import * as Vuetable from 'vuetable-2'
import axios from 'axios';
Vue.use(Vuetable)

export default {
    comments:{
        Vuetable
    },
    data(){
        return{
            fieldss:[]
        }
    },
    methods:{
        getFields() {
            axios.get('http://localhost:3000/heads')
            .then((resp) =>{
                this.fieldss = resp.data;
                console.log(resp.data);
            })
            .catch((err) =>{
                throw err;
            })
        }
    },
    computed:{headers: function(){
        axios.get('http://localhost:3000/heads')
            .then((resp) =>{
                return resp.data;
                
            })
            .catch((err) =>{
                throw err;
            })
    }},
    created: function() {
        this.getFields();
    }
}   
</script>