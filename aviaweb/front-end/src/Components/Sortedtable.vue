<template>
    <div id="sortedTable">
        <v-client-table :columns="columns" :data="ApiMet" :options="options">
            <a slot="uri" slot-scope="props" target="_blank" :href="props.row.uri" class="glyphicon glyphicon-eye-open"></a>
        </v-client-table>
        <button @click="getApiData()">aaa</button>
    </div>
</template>

<script>
    import Vue from 'vue'
    import axios from 'axios'
    import {ServerTable, ClientTable, Event} from 'vue-tables-2';
    import modalWindowTemp from './editGridModal.vue';
    Vue.use(ClientTable);
    export default{
        async created() {
            const url = 'http://localhost:3000/api/data/tables/cases'
                const headers ={
                    headers:{
                    'Authorization': 'Bearer ' + this.$store.getters.userToken
                    }
                }
                let resp = await axios.get(url, headers)
                this.ApiMet = resp.data.data
                console.log(this.ApiMet)
        },
        data: function(){
            return {
                ApiMet: [],
                columns: ['CASE_ID', 'PHASE_ID', 'SIDE_ID', 'TEXT', 'testedAlert'],
                data: [],
                options: {
                    headings: {
                        CASE_ID: 'Идентификатор кейза',
                        PHASE_ID: 'Этап',
                        SIDE_ID: 'Сторона',
                        testedAlert: ''
                    },
                    sortable: ['CASE_ID', 'code'],
                    filterable: ['CASE_ID', 'code'],
                    templates:{
                        testedAlert: 'edit'
                    }
                }
        }
    },
    methods:{
        modalWindow(){
            alert("modalWindow method WORK!");
        },
        getApiData: async function(){
            const url = 'http://localhost:3000/api/data/tables/cases'
            const headers ={
                headers:{
                'Authorization': 'Bearer ' + this.$store.getters.userToken
                }
            }
            console.log(headers)
            let response = await axios.get(url, headers)
            console.log(response.data)
            //return response.data
            this.ApiMet = response.data
            /* .then((resp)=>{
            const logged = resp.data;
            console.log(response)
            commit('set', {type: 'logged', items: logged});
            })
            .catch((err)=>{
                console.log(err);
            }) */
        }
    }
}
   Vue.component('modalEditor', modalWindowTemp)

    Vue.component('edit', {
        props: ['data', 'index', 'column'],
        template: `<modalEditor></modalEditor>`
        // methods: {
        //     testedAlert(){
        //         alert("index curent line: "+ this.index);
        //         this.modalWindowTemp.showModal();
        //     }
        //}
    })

</script>

<style>
    .VuePagination {
    text-align: center;
    }

    .vue-title {
    text-align: center;
    margin-bottom: 10px;
    }

    .vue-pagination-ad {
    text-align: center;
    }

    .glyphicon.glyphicon-eye-open {
    width: 16px;
    display: block;
    margin: 0 auto;
    }

    th:nth-child(3) {
    text-align: center;
    }

    .VueTables__child-row-toggler {
    width: 16px;
    height: 16px;
    line-height: 16px;
    display: block;
    margin: auto;
    text-align: center;
    }

    .VueTables__child-row-toggler--closed::before {
    content: "+";
    }

    .VueTables__child-row-toggler--open::before {
    content: "-";
    }
</style>
