<template>
  <div :style="{'padding':'26px 19px'}">
    <div class="delete-dialog delete-header">
      <span class="delete-header-text" v-if="payload.title">{{payload.title}}</span>
      <span class="r icon iconfont icon-close close-mask" @click="closeMasker"></span>
    </div>
    <div class="delete-dialog-content delete-dialog" v-if="payload.hintContent" v-html="payload.hintContent">
    </div>
    <div class="delete-btn-div" v-if="payload.buttons.length">
        <template v-for="(item,index) in payload.buttons">
            <button class="btn btn-right-spacing" @click="item.fn" :style="{'background-color':item.color}">{{item.text}}</button>
        </template>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import * as types from "@/store/types";
export default {
  name: "DeleteDialog",
  computed: {
    ...mapGetters(["centerMaskControl"]),
    payload(){
        console.log(this.centerMaskControl)
        return this.centerMaskControl.payload
    }
  },

  data() {
    return {
      hintContent: ""
    };
  },
  mounted(){
      console.log(this.payload)
  },
  methods: {
    ...mapActions(["dispatch"]),
    //删除
    deleteClick() {
      const that = this;
      var data = that.maskControl.data;
      var url = data.url;
      var req = data.req;
      that.iAxios[that.maskControl.data.methods || "deleteAjax"](
        url,
        req,
        function(res) {
          commonEv.$emit("showMask", {
            flag: -1,
           // props: `${that.maskControl.data.sign}Success`
          });
          if (that.maskControl.data.callback) {
            that.maskControl.data.callback(res);
          } else {
            that.$notify({
              title: "删除成功",
              position: "bottom-left"
            });
          }
        }
      );
    },
    //取消
    closeMasker(){
      this.dispatch({url:types.MASKCONTROL})
    }
  }
};
</script>
<style lang="less" scopedSlots>
.delete-dialog {
  margin-left: 19px;
  position: relative;
  .close-mask{
    position: absolute;
    top:-12px;
    right: 0;
  }
}
.delete-header-text {
  font-size: 16px;
  font-family: PingFangSC-Regular;
  color: #444a55;
  font-weight: bold;
}

.btn-right-spacing {
  margin-right: 20px !important;
}

.btn-primary-delete {
  color: #fff;
  background-color: #f7928f !important;
}

.delete-dialog-content {
  // width: 441px;
  margin-top: 11px;
  font-size: 14px;
  color: #a8afbf;
  margin-bottom: 23px;
}

.delete-btn-div {
  margin-top: 23px;
  margin-bottom: 15px;
  float: right;
  .btn {
    width: 100px;
    height: 40px;
  }
}
</style>
