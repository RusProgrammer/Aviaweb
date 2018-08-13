<template>
    <vue-tree-navigation :items="items" :defaultOpenLevel="1" />
</template>

<script>
    import Vue from 'vue'
    import VueTreeNavigation from 'vue-tree-navigation';
    Vue.use(VueTreeNavigation);

    export default{
        data: function(){
            return{
                items: [
                    { name: 'Products', route: 'products' },        // #products
                    { name: 'About', route: 'about', children: [    // #about
                        { name: 'Contact', children: [              // category label
                        { name: 'E-mail', route: 'email' },         // #email
                        { name: 'Phone', route: 'phone' },          // #phone
                        ]},
                    ]},
                ]
            }
        },
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

