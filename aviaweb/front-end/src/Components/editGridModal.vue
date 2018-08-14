<template>
    <div>
      <button class='edit' @click='showModal'>Редактировать</button>
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
          <b-btn class="mt-3" variant="outline-danger" @click="pressCancel">Отменить</b-btn>
          <b-btn class="mt-3" variant="outline-success" @click="pressSave">Сохранить</b-btn>
        </div>
      </b-modal>
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
                dataFromGrid: []
            }
        },
        methods:{
            showModal(){
                this.keys = Object.keys(this.intData);
                this.$refs.MyModal.show()
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
        }
    }
</script>