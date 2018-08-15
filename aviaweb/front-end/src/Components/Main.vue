<template>
    <div class="components-container">
      <d-down></d-down>
        <Split style="height: 2000px;" @onDragStart ="resize">
            <SplitArea>
                <my-tree :subversion="this.$store.state.tableselected"></my-tree>
            </SplitArea>
            <SplitArea>
                panel center
            </SplitArea>
        </Split>
    </div>
</template>

<script>
    import Vue from 'vue'
    //import splitPane from 'vue-split-panel'
    import Tree from './Projecttree.vue'
    import dDown from './etc/dropdown.vue'
    import VueSplit from 'vue-split-panel'
    Vue.use(VueSplit)
    //Vue.use(splitPane);
    
    export default{
        components:{
            'split-pane': VueSplit,
            'my-tree' : Tree,
            'd-down' : dDown
        },
        methods:{
            resize(){
                console.log("Resize");
                console.log(this.$store.getters.tableselected)
            }
        },
        created() {
            this.$store.state.dropdownmethod = 'getsubversions'
        }
    }
    
</script>
<style>
	.components-container {
		position: relative;
		height: 100vh;
	}

	/*.left-container {
		background-color: #F38181;
		height: 100%;
	}

	.right-container {
		background-color: #FCE38A;
		height: 200px;
	}

	.top-container {
		background-color: #FCE38A;
		width: 100%;
		height: 100%;
	}

	.bottom-container {
		width: 100%;
		background-color: #95E1D3;
		height: 100%;
	}*/

</style>
