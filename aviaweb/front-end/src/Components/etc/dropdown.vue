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
        }
    }


</script>