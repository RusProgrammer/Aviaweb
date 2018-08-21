<template>
    <div id="userTree">
        <h3>Выбранное направление: {{this.subversion}}</h3>
        <!-- <vue-tree-navigation :items="items" :defaultOpenLevel="1" @click.native="show($event)"/> -->
        <tree :data="this.$store.getters.treestore" :options="treeOptions" ref="tree" @node:selected="show"/>
    </div>
</template>

<script>
    import Vue from 'vue'
    import VueTreeNavigation from 'vue-tree-navigation';
    import LiquorTree from 'liquor-tree'

    Vue.use(VueTreeNavigation);
    Vue.use(LiquorTree)

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
                /* items: [] */
                items: [
                    {text: 'Item 1'},
                    {text: 'Item 2'},
                    {text: 'Item 3', children: [
                      {text: 'Item 3.1', children:[{text:  '3.1.1'},{text:'3.1.2'}]},
                      {text: 'Item 3.2'}
                    ]}
                ],
                treeOptions: {
                    checkbox: true,
                    propertyNames: {
                        text: 'text',
                        children: 'children'
                    },
                    store: {
                        store: this.$store,
                        key: 'treeStore',
                        mutations: ['initTree', 'updateTree']
                    }
                }
            }
        },
        watch:{
            subversion:async function(newVal, oldVal){
                await this.getItems();
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
                //console.log(resp)
                this.items = resp
                //console.log('items = ', this.items)
                console.log('Ilka1', this.$store.getters.treestore)
            },
            show(item){
                console.log(item)
                //item.append('123')
            }
        },
        created() {
            //this.$store.dispatch('initTree',{text:'123'});
            console.log(this.items)
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

