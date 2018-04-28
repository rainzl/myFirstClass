<template>
  <div>
    <input type="button" value="调用vuex发送请求" @click="clickbtn">
    <div>{{count}}</div>
  </div>
</template>

<script>

export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 123
    }
  },
  computed: {
    count () {
      return this.$store.state.count
    }
  },
  methods: {
    clickbtn: function(){
      this.$store.dispatch('saveForm')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
