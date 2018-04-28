<template>
  <div class="table">

    <el-table :data="companytabledata" style="width: 100%" v-loading="loading">
      <el-table-column prop="c_name" label="中文名" width="180">
      </el-table-column>
      <el-table-column prop="c_address" label="地址" width="180">
      </el-table-column>
      <el-table-column prop="d_create_date" label="日期">
        <template slot-scope="scope">
          {{scope.row.d_create_date | toDate('YYYY-MM-DD hh:mm')}}
        </template>
      </el-table-column>
    </el-table>
    <el-button type="danger" @click="addItem">我新增一条数据</el-button>

  </div>
</template>

<script>
import * as types from "@/store/types";
import { mapGetters, mapActions } from "vuex"; // 引入工具方法
export default {
  name: "HelloWorld",
  data() {
    return {
      msg: "Welcome to Your Vue.js App",
      loading: true
    };
  },
  mounted() {
    this.fetchUrl({
      url: types.GETTABLE,
      data: {
        word: "",
        tags: "",
        pageNum: 1,
        pageSize: 15,
        isTeam: false,
        filter: JSON.stringify([])
      },
      method: "get",
      setStore: true
    }).then(res => {
      this.loading = false;
    });
  },
  computed: {
    ...mapGetters(["companytabledata", "rightMaskControl"])
  },
  methods: {
    ...mapActions(["dispatch", "fetchUrl"]),
    addItem() {
      const that = this;
      this.dispatch({
        url: types.MASKCONTROL,
        data: {
          position: "center",
          name: "centerLayer",
          payload: {
            buttons: [
              {
                text: "新增数据",
                color: "red",
                fn() {
                  that.fetchUrl({
                    url: types.ADDITEM,
                    data: {
                      cName: "张博亚",
                      nSex: 1,
                      cPhone: "",
                      cEmail: "",
                      cInfo: "",
                      nSource: "",
                      cZw: "",
                      cMz: "",
                      cCorp: "",
                      cAddress: "北京",
                      cTel: "",
                      cZjhm: "",
                      team: false,
                      tagList: [],
                      dCsrq: null
                    },
                    method: "post"
                  }).then(res => {
                    // 刷新接口
                    that.fetchUrl({
                      url: types.GETTABLE,
                      data: {
                        word: "",
                        tags: "",
                        pageNum: 1,
                        pageSize: 15,
                        isTeam: false,
                        filter: JSON.stringify([])
                      },
                      method: "get",
                      setStore: true
                    });
                  });
                }
              }
            ]
          }
        }
      });
      // // 新增一条数据
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
