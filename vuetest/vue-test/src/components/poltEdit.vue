<template>
  <div class="polt-edit pink">这是第{{count}}个页面</div>
</template>
<script>


  export default {
    name: 'PoltEdit',
    data(){
      return {}
    },
    computed: {
      count () {
        return ''
      }
    },
    methods: {

    }
  }
</script>
<style two>
.polt-edit {
  font-size: 20px;
}
</style>
