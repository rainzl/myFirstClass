<template>
  <!--提示类型中心弹框公用组件-->
  <div class="mask-inner" style="overflow-x: hidden">
    我是左弹框
    <el-button type="primary" @click="openLayer({position:'center',name:'centerLayer'})">中心弹框</el-button>
  </div>
</template>

<script>
import common from "@/utils/common";
import { mapGetters, mapActions } from "vuex";
import * as types from "@/store/types";
export default {
  name: "centerLayer",
  computed: {
    ...mapGetters(["isTeam"])
  },
  data() {
    return {};
  },
  methods: {
    ...mapActions(["dispatch"]),
    openLayer(data) {
      this.dispatch({
        url: types.MASKCONTROL,
        data: {
          payload: {
            buttons: [
              {
                text: "保存",
                color: "red",
                fn() {
                  alert(1);
                }
              },
              {
                text: "取消",
                color: "#ddd",
                fn() {
                  alert(2);
                }
              }
            ],
            title: "这是自定义公用组件",
            hintContent: "这个已经封装好了"
          },
          ...data
        }
      });
    }
  }
};
</script>
<style lang="less" scopedSlots>
.validate-input {
  .el-form-item__error {
    top: -21px;
    left: 60px;
  }
}
</style>
