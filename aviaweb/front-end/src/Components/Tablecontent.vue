<template>
    <div class="tablecontent">
      <vuetable ref="vuetable"
            api-url="http://localhost:3000/bab"
            :fields="fieldss"
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
        }
    },
    methods:{
        getFields() {
            let data =  axios({
              method: 'get',
              url: 'http://localhost:3000/heads',
            }).then(response => {
               return response.data
            })
            console.log(data)
        },
        setField(){
            this.fieldss = ['Name']
        },
        handleSuccess(resp){
            this.fieldss = resp.data
        }
    },
    created(){
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
        console.log(imgType)
        /* let self = this;
        var conf ={
            timeout: 8000
        }
        axios.get('http://localhost:3000/heads')
        .then((resp)=>{
            self.fieldss = resp.data;
            console.log(self.fieldss)
        })
        .catch(function (err){
            throw err;
        })
        
        console.log(self.fieldss) */
        
    }

}  

</script>