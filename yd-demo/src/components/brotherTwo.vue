<template>
  <div class="hello">
    兄弟组件2接受的数据是：{{msg}}
  </div>
</template>

<script>
import commonEvent from "@/utils/commonEvent";
export default {
  name: "HelloWorld",
  data(){
    return {
      msg:''
    }
  },
  mounted() {
    commonEvent.$on("send", res => {
      this.msg = res.msg
    });
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
