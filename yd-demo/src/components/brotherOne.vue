<template>
    <div class="hello">
        兄弟组件1发送数据啊
        <el-button type="primary" @click="sendEmit">点击发送数据</el-button>
    </div>
</template>

<script>
import commonEv from '@/utils/commonEvent';
export default {
  name: "HelloWorld",
  data() {
    return {
      msg: "1"
    };
  },
  methods: {
    sendEmit() {
      commonEv.$emit('send',{msg:this.msg})
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
