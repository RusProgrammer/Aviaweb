<template>
    <div>
        <b-button-group>
        <div v-for="(item, index) in mainMenu" :key="index" v-if="item.child==='true'">
            <b-dropdown v-bind:text="item.name" @toggle="findDropMenu(item.id)">
            <b-dropdown-item v-for="(itemDrop, indexDrop) in dropMenu" :key="indexDrop" @click="getMainMenu(itemDrop.id)"> {{ itemDrop.name }} </b-dropdown-item>
            </b-dropdown>     
        </div>
        <div v-else>
            <b-button @click="findDropMenu(item.id)" :href=item.opers> {{ item.name }} </b-button>
        </div>
        </b-button-group>
    </div>
</template>

<script>
    import Vue from 'vue'
    import BootstrapVue from 'bootstrap-vue'
    Vue.use(BootstrapVue);
    export default {
        data () {
            return {
                // dataMenu: [{id:'1', name: 'menu_1', parent_id: '0', child: 'true', reference: ''}, {id:'2', name: 'menu_2', parent_id: '1', child: 'false', reference: 'getMainMenu()'}, {id:'3', name: 'menu_3', parent_id: '1', child: 'false', reference: ''}, {id:'4', name: 'menu_4', parent_id: '0', child: 'false', reference: 'getMainMenu()'}, {id:'5', name: 'menu_5', parent_id: '0', child: 'false', reference: ''}, {id:'6', name: 'menu_6', parent_id: '0', child: 'true', reference: ''}, {id:'7', name: 'menu_7', parent_id: '6', child: 'false', reference: ''}, {id:'8', name: 'menu_8', parent_id: '6', child: 'false', reference: ''}, {id:'9', name: 'menu_9', parent_id: '0', child: 'true', reference: ''}, {id:'10', name: 'menu_10', parent_id: '9', child: 'false', reference: ''}],
                dataMenu: [],
                mainMenu: [],
                dropMenu: [],
                dataFromDb: [],
                mydata: 'tested data'
            }
        },
        methods:{
            sortMainMenu(){
                console.log("START");
                console.log('after start: ', this.dataMenu[0].parent_id)
                this.mainMenu.length=0;
                for (var j=0; j<this.dataMenu.length; j++){
                    this.dataMenu[j].opers="#"+this.dataMenu[j].opers;
                    if(this.dataMenu[j].parent_id===0){
                        this.mainMenu.push(this.dataMenu[j]);
                    }
                }
            },
            findDropMenu(activItemId){
                this.dropMenu.length=0;
                console.log("==> ACTIV ITEM: ", activItemId);
                for (var i=0; i<this.dataMenu.length; i++){
                    if(this.dataMenu[i].parent_id===activItemId){
                        this.dropMenu.push(this.dataMenu[i]);
                    }
                }
            },
            async getMainMenu(){
                const response = await this.$store.dispatch('testedmenu');
                this.dataFromDb = response;
                console.log("RESPONSE: ", response.data);
                this.dataMenu = response.data
                console.log('\\\\\\\\\\\\\\\\\\\\\\\\\\\\');
                console.log(this.dataMenu[0]);
                this.sortMainMenu();
            }
        },
        mounted() {
            this.getMainMenu();
        }
    }
</script>