<template>
<div>
  <b-pagination-nav size="lg" :link-gen="linkGen" :number-of-pages="10" v-model="currentPage" />
  <br>
  <div class="mt-4">currentPage: {{currentPage}}</div>
</div>
</template>

<script>
export default {
  data () {
    return {
      currentPage: 1
    }
  },
  methods: {
    linkGen (pageNum) {
      return '#page/' + pageNum + '/foobar'
    }
  }
}
</script>