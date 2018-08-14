<template>
    <div id="droped">
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
                // TODO: Определить декорацию для метода
                //this.$store.state.dropdownmethod = 'gettables'
                var resp = await this.$store.dispatch(this.$store.state.dropdownmethod);
                this.data = resp;
                this.$store.state.dropdownmethod = ''
            },
            setSelectedTable(name){
                console.log(name.item)
                this.Tableselected = name.item
                this.$store.state.tableselected = this.Tableselected
                // Пока отключим переход по таблицам
                //this.$router.push({ name: '/refs', query: { redirect: '/refs'}});
                //this.$router.push(this.$route.query.redirect)
            }
        },
        created() {
            this.getTables()
        },
    }


</script>