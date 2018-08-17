<template>
    <div>
      <b-modal id="dataLine"
      centered ref="MyModal"
      hide-footer title="Редактируемые данные">
        <div text-center>
            <table>
            <tr v-for="(item, index) in newData" :key="index">
                        <td>{{ index }}</td>
                        <!-- <td><input type="text" :placeholder="intData[index]" @input="newData[index]=$event.target.value"></td> -->
                        <!-- <td><input type="text" value="intData[index]" ></td> -->
                        <!-- <td><input type="text" v-model="intData[index]" @change="changedValue(index, intData[index])"></td> -->
                        <td><input type="text" v-model="newData[index]"/></td>
            </tr>
            </table>
        </div>
        <div>
          <b-btn class="mt-3" variant="outline-success" @click="pressSave(newData)">Сохранить</b-btn>
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
        <div>
        <b-navbar type="light" variant="light" style="position: fixed; bottom: 0%; width: 100%;">
            <a>Выбрано:
                <input type="text" readonly="readonly" :value="Object.keys(intData)[0]" :size="String(Object.keys(intData)[0]).length"/>
                <input type="text" readonly="readonly" :value="intData[Object.keys(intData)[0]]" :size="String(intData[Object.keys(intData)[0]]).length"/>
            </a>
            <b-button class="btn btn-outline-success my-2 my-sm-0" @click='showModal' left>Редактировать</b-button>
        </b-navbar>
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
                indexFromGrid: 0,
                newData: {},
                oldData: {}
            }
        },
        methods:{
            showModal(){
                //this.keys = Object.keys(this.intData);
                if(this.intIndex===0){
                    this.$refs.incorrectData.show()
                }else{
                    this.$refs.MyModal.show()
                this.newData=this.intData;
                this.oldData=JSON.stringify(this.intData);
                console.log("!INT", this.intIndex);
                console.log("!DATA: ", this.intData);
                console.log("!DATA new: ", this.newData);
                return
                }
            },
            pressCancel(){
                if (this.oldData!==JSON.stringify(this.newData)){
                    this.newData=JSON.parse(this.oldData);
                }
                console.log("curent data new: ", this.newData);
                console.log("curent data new: ", this.intData);
                // this.newData=null;
                this.$refs.MyModal.hide()
            },
            pressSave(newInput){
                console.log("New data:", newInput);
                console.log("Old data:", this.oldData);
                if (this.oldData===JSON.stringify(this.newData)){
                    alert("equal1");
                }else{
                    alert("equal2");
                }
                // this.newData=null;
                this.$refs.MyModal.hide()
            },
            changedValue(chanIndex, chanData){
                console.log("INPUT DATA:",chanIndex, "  ", chanData);
                console.log("Old data:", this.oldData);
            }
        }
        // mounted() {
        //     this.startScript();
        // }
    }
</script>