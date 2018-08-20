<template>
    <div id="userTree">
        <h3>Выбранное направление: {{this.subversion}}</h3>
        <vue-tree-navigation :items="items" :defaultOpenLevel="1" @click.native="show(this)"/>
    </div>
</template>

<script>
    import Vue from 'vue'
    import VueTreeNavigation from 'vue-tree-navigation';
    Vue.use(VueTreeNavigation);

    export default{
        props:{subversion:String},
        data: function(){
            return{
                /* items: [
                    { name: 'Products', route: 'products' },        // #products
                    { name: 'About', route: 'about', children: [    // #about
                        { name: 'Contact', children: [              // category label
                        { name: 'E-mail', route: 'email' },         // #email
                        { name: 'Phone', route: 'phone' },          // #phone
                        ]},
                    ]},
                ] */
                items: []
            }
        },
        watch:{
            subversion:function(newVal, oldVal){
                this.getItems();
                console.log('Prop changed: ', newVal, ' | was: ', oldVal)
            }
        },
        computed:{
            Treeitems(){
                return this.$store.state.tableselected
            }
        },      
        methods:{
            async getItems(){
                console.log(this.subversion)
                var resp = await this.$store.dispatch('gettree',{subsystem:this.subversion});
                this.items = resp
            },
            show(item ){
                console.log('Clicked!', item)
            }
        }
    }
</script>

<style>
.NavigationLevel__children {
    padding-left: 10px;
  }

  .NavigationLevel__parent {
    font-weight:    600;
    padding-bottom: 5px;
  }

  .NavigationItem {
    color:   #545454;
    padding: 0;
  }

  .NavigationItem--active {
    color: #42b883;
  }

  .NavigationToggle__icon {
    border-color: #42b883;
  }
</style>

