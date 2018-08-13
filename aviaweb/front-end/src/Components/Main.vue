<template>
    <div class="components-container">
      <split-pane v-on:resize="resize" :min-percent='20' split="vertical">
        <template slot="paneL">
          <my-tree></my-tree>
        </template>
        

        <template slot="paneR">

          <split-pane split="horizontal">

            <template slot="paneL">
             B
            </template>

            <template slot="paneR">
              <split-pane v-on:resize="resize" split="vertical" :default-percent='30'>

                <template slot="paneL">
                 C
                </template>

                <template slot="paneR">
                 D
                </template>

              </split-pane>
            </template>

          </split-pane>

        </template>
      </split-pane>
    </div>
    </template>

<script>
    import Vue from 'vue'
    import splitPane from 'vue-splitpane'
    import Tree from './Projecttree.vue'
    //Vue.use(splitPane);
    
    export default{
        components:{
            'split-pane': splitPane,
            'my-tree' : Tree
        },
        methods:{
            resize(){
                console.log("Resize");
            }
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
