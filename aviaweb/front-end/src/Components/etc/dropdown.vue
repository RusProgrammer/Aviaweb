<template>
    <div id="droped">
        <div class="btn-group dropright">
            <button type="button" class="btn btn-secondary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              Dropright
            </button>
            <div class="dropdown-menu">
                <a class="dropdown-item" href="#">Action</a>
                <a class="dropdown-item" href="#">Another action</a>
                <a class="dropdown-item" href="#">Something else here</a>
            </div>
        </div>
        <b-dropdown id="ddown1" text="Все таблицы" class="m-md-2">
            <b-dropdown-item v-for="(item, index) in data" :key="index" @click="setSelectedTable({item})">{{item}}</b-dropdown-item>
        </b-dropdown>
        <h3>{{selectedTable}}</h3>
    </div>
</template>

<script>
    import Vue from 'vue'
    import BootstrapVue from 'bootstrap-vue'
    import bDropdown from 'bootstrap-vue/es/components/dropdown/dropdown'

    Vue.use(BootstrapVue);
    export default{
        data:function(){
            return{
                data:[],
                Tableselected: ""
            }
        },
        comments:{
            'b-dropdown': bDropdown
        },
        computed:{
            selectedTable: function(){
                return this.Tableselected
            }
        },
        methods:{
            async getTables(){
                var resp = await this.$store.dispatch('gettables');
                this.data = resp;
                console.log(this.data)
            },
            setSelectedTable(name){
                // Пока не понятно, почему появляются пустые элементы в списке
                if(name.item != null)
                {
                    console.log(name.item)
                    this.Tableselected = name.item
                    this.$store.state.tableselected = this.Tableselected
                    this.$router.push({ name: '/refs', query: { redirect: '/refs'}});
                    this.$router.push(this.$route.query.redirect)
                }
            }
        },
        created() {
            this.getTables()
        },
    }


</script>