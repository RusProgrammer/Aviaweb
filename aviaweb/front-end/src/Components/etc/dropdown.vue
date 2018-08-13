<template>
    <div id="droped">
        <b-dropdown id="ddown1" text="Dropdown Button" class="m-md-2">
            <b-dropdown-item v-for="(item, index) in data" :key="index">{{item}}</b-dropdown-item>
            <b-dropdown-item>Second Action</b-dropdown-item>
            <b-dropdown-item>Third Action</b-dropdown-item>
            <b-dropdown-divider></b-dropdown-divider>
            <b-dropdown-item>Something else here...</b-dropdown-item>
            <b-dropdown-item disabled>Disabled action</b-dropdown-item>
        </b-dropdown>
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
                data:['first', 'second']
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