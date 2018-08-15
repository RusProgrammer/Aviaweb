<template>
    <div>
      <b-modal id="dataLine"
      centered ref="MyModal"
      hide-footer title="Редактируемые данные">
        <div text-center>
            <table>
            <tr v-for="(item, index) in intData" :key="index">
                        <td>{{ index }}</td>
                        <td><input type="text" :value="item"></td>
            </tr>
            </table>
        </div>
        <div>
          <b-btn class="mt-3" variant="outline-success" @click="pressSave">Сохранить</b-btn>
          <b-btn class="mt-3" variant="outline-danger" @click="pressCancel">Отменить</b-btn>
        </div>
      </b-modal>
      <b-modal id="incorrectData"
      centered ref="incorrectData"
      hide-footer>
        <div text-center>
            Необходимо выбрать данные для редактирования
        </div>
      </b-modal>
        <div style="position: fixed; bottom: 2%; left: 50%;">
            <button class="btn btn-outline-success my-2 my-sm-0" @click='showModal'>Редактировать</button>
        </div>
    </div>
</template>

<script>
    import Vue from 'vue'
    import BootstrapVue from 'bootstrap-vue'
    Vue.use(BootstrapVue);
    export default {
        props: [ 'intIndex', 'intData' ],
        data () {
            return {
                keys: [],
                indexFromGrid: 0
            }
        },
        methods:{
            showModal(){
                //this.keys = Object.keys(this.intData);
                if(this.intIndex===0){
                    this.$refs.incorrectData.show()
                }else{
                    this.$refs.MyModal.show()
                console.log("!INT", this.intIndex);
                console.log("!DATA: ", this.intData);
                }
            },
            hideModal(){
                this.$refs.MyModal.hide()
            },
            pressSave(){
                alert("Result press pressSave!");
            },
            pressCancel(){
                alert("Result press pressCancel!");
            }
            // startScript(){
            //     console.log("DATA: ", this.intData);
            //     // console.log("INDEX: ", this.indexFromGrid);
            // }
        }
        // mounted() {
        //     this.startScript();
        // }
    }
</script>