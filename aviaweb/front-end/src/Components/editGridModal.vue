<template>
    <div>
      <button class='edit' @click='showModal'>Редактировать</button>
      <b-modal id="dataLine"
      centered ref="MyModal"
      hide-footer title="Enter actual title for modal">
        <div text-center>
          Data in this line
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
        data () {
            return {
                dataFromGrid: []
            }
        },
        methods:{
            showModal(){
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