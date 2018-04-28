<template>
  <div id="app">
    <h1>华宇元典前端vue 使用指南</h1>
    <router-view/>
    <transition enter-active-class="animated fadeIn" :duration="{ enter: 1000, leave: 500 }" leave-active-class="animated fadeOut">
      <div class="mask" v-if="rightMaskControl.flag.length||centerMaskControl.flag.length" @click="closeMasker"></div>
    </transition>
    <transition enter-active-class="animated fadeInRight" :duration="{ enter: 2020, leave: 1000 }" leave-active-class="animated fadeOutRight">
      <div class="right-alyer" v-if="rightMaskControl.flag.length">
        <component :is="rightMaskControl.flag[0]"></component>
      </div>
    </transition>
    <transition enter-active-class="animated fadeIn" :duration="{ enter: 2020, leave: 1000 }" leave-active-class="animated fadeOut">
      <div class="center-alyer" v-if="centerMaskControl.flag.length">
        <component :is="centerMaskControl.flag[0]"></component>
      </div>
    </transition>
  </div>
</template>

<script>
import PersonType from "@/components/masks/PersonType";
import centerLayer from "@/components/common/centerLayer";
import { mapGetters, mapActions } from "vuex"; // 引入工具方法
import * as types from '@/store/types'; 
export default {
  name: "App",
  data(){
    return {
      s:1
    }
  },
  computed: {
    ...mapGetters(["rightMaskControl","centerMaskControl"])
  },
  mounted(){
    console.log(this.rightMaskControl)
  },
  methods:{
    ...mapActions([
      "dispatch"
    ]),
    closeMasker(){
      this.dispatch({url:types.MASKCONTROL})
    }
  },
  components:{
    PersonType,
    centerLayer
  }
};
</script>

<style lang="less">
@import "../static/css/func.less";
@import "../static/css/animate.css";
@import "../static/css/index.less";
#app {
  font-family: "微软雅黑";
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  // padding: 40px;
}
.hello {
  // .el-collapse-item__header {
  //   background-color: red;
  // }
  .el-collapse-item__content {
    background-color: aliceblue;
    padding: 30px;
  }
}

.font-red {
  color: red;
  font-size: 12px;
  margin-bottom: 15px;
}
</style>
