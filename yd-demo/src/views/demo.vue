<template>
  <div class="hello demo" style="overflow:auto;height:800px;">
    <el-collapse v-model="activeNames">
      <el-collapse-item title="axios封装与使用/登陆逻辑处理" name="1">
        <div>处理逻辑件 iAxios 文件</div>
        <el-button type="primary" @click="sendAjax">点击发送请求</el-button>
        <pre>{{allTags}}</pre>
      </el-collapse-item>
      <el-collapse-item title="公用方法的使用" name="2">
        <div>{{myBrowser}}</div>
      </el-collapse-item>
      <el-collapse-item title="组件传参-父子组件" name="3">
        <father-to-child :transData="transData"></father-to-child>
      </el-collapse-item>
      <el-collapse-item title="组件传参-兄弟组件" name="4">
        <brother-one></brother-one>
        <brother-two></brother-two>
      </el-collapse-item>
      <el-collapse-item title="指令" name="5">
        <!--lodash 的使用-->
        <el-form label-width="200px" v-if="_.includes(activeNames,'5')">
          <el-form-item label="自动获取焦点">
            <el-input class="l edit-info-input" v-auto-focus :maxlength="10"></el-input>
          </el-form-item>
          <el-form-item label="只能输入数字的表单">
            <el-input class="l edit-info-input" v-number :maxlength="10"></el-input>
          </el-form-item>
        </el-form>
      </el-collapse-item>
      <el-collapse-item title="过滤器" name="6">
        <span class="date-text">{{dStartTime | toDate('YYYY年MM月DD日')}}</span>
        <span class="date-text">{{dStartTime | toDate('YYYY-MM-DD')}}</span>
        <span class="date-text">{{dStartTime | toDate('YYYY-MM-DD HH:mm')}}</span>
      </el-collapse-item>
      <el-collapse-item title="全局安装 jquery/moment 等模块" name="7">
        <pre>
            修改：build/webpack.base.conf.js
             plugins: [
              new webpack.ProvidePlugin({ // webpack 的内置模块，引入的模块不需要通过require 和 import 的方式引入自动加载
                $: 'jquery',
                jQuery: 'jquery'
              }),
              new webpack.ProvidePlugin({
                moment: "moment",
              }),
              new webpack.ContextReplacementPlugin( // webpack 会通过正则比配找到文件夹，只保留 第二个参数匹配的文件
                /moment[\\\/]locale$/,
                /(zh-cn)\.js/
              ),
            ]
          </pre>
      </el-collapse-item>
      <el-collapse-item title="less 处理兼容性问题" name="8">
        <div class="has-box-shadow"></div>
      </el-collapse-item>
      <el-collapse-item title="操作数据后 抓起dom 元素" name="9">
        <div class="font-red">nextTick:在下次 DOM 更新循环结束之后执行延迟回调。在修改数据之后立即使用这个方法，获取更新后的 DOM</div>
        <el-button type="primary" @click="changeFlag">主要按钮</el-button>
        <el-tag v-if="tagFlag" class="tag-item">标签一</el-tag>
      </el-collapse-item>
      <el-collapse-item title="联调配置" name="10">
        <pre>
            修改 config/index.js proxyTable 属性
             proxyTable: {
              '/api/v1/': { // 将以此开头的全部接口重定向
                target: 'http://172.23.4.194:9090', // 接口重定向地址
                changeOrigin: true, // 是否允许跨域
                secure: false // 是否保密
              }
            },
          </pre>
      </el-collapse-item>
      <el-collapse-item title="打包优化问题" name="11">
        <div>1.抽离公用模块 （http://www.css88.com/doc/webpack/plugins/commons-chunk-plugin/）</div>
        <pre>
          修改webpack.base.conf.js 文件
          引入文件：
          var webpack = require('webpack');
          var CommonsChunkPlugin = require("webpack/lib/optimize/CommonsChunkPlugin"); // 提取公用模块插件
          拆分公用模块
          vendor: ['vue', 'vue-router', 'moment', 'jquery','lodash'],
          vendor1:['element-ui'],
          利用打包
          new webpack.optimize.CommonsChunkPlugin({
            names: ['vendor1','vendor'], // 注意不要.js后缀 并且顺序和引入的顺序是相反的
            minChunks:Infinity
          })
        </pre>
        <div>2.路由懒加载()</div>
        <div class="font-red">懒加载后需要修改 config/index.js assetsPublicPath:'./' 否则打包后文件路径找不到</div>
        <pre>
        component: a => {
            require(['@/views/chances/chanceDetails/chanceDetails.vue'], a)
        }
        </pre>
      </el-collapse-item>
      <el-collapse-item title="加了scoped 属性样式不生效了？如何处理样式?scoped 的原理是什么" name="12">
        <div class="font-red">由于加了scoped 属性,样式私有化，只在当前组件生效，并且不会传递给子组件，scoped 解决样式私有化问题，但却造成了样式不易修改的问题</div>
        <div>解决的办法：</div>
        <div>1.不加scoped 属性，给每个组件的最外层，设定一个单独的class，将组件内的样式写在改样式中同时做到私有化</div>
        <div>2.加scoped 属性，给每个组件的最外层，设定一个单独的class，将组件内的样式写在改样式但是提到公用的文件中，同时做到私有化</div>
        <pre>
          总结一下scoped三条渲染规则
              给HTML的DOM节点加一个不重复data属性(形如：data-v-2311c06a)来表示他的唯一性
              在每句css选择器的末尾（编译后的生成的css语句）加一个当前组件的data属性选择器（如[data-v-2311c06a]）来私有化样式
              如果组件内部包含有其他组件，只会给其他组件的最外层标签加上当前组件的data属性
        </pre>
      </el-collapse-item>
      <el-collapse-item title="图片资源引入" name="13">
        <div>修改webpack.base.conf.js 文件 设置别名 'img': path.resolve(__dirname, '../src/assets/img'),</div>
        <img src="~img/logo.png" class="add-more-pic">
      </el-collapse-item>
      <el-collapse-item title="引入线上iconfont" name="14">
        <span class="header-icon icon iconfont icon-chance"></span>
      </el-collapse-item>
      <el-collapse-item title="vuedraggable" name="15">
        <div>https://github.com/738326776zby/draggable-example</div>
        <div class="row">
          <div class="col-md-3">
            <draggable class="list-group" element="ul" v-model="list" :options="dragOptions" :move="onMove">
              <transition-group type="transition" :name="'flip-list'">
                <li class="list-group-item" v-for="element in list" :key="element.order">
                  <i :class="element.fixed? 'fa fa-anchor' : 'glyphicon glyphicon-pushpin'" @click=" element.fixed=! element.fixed" aria-hidden="true"></i>
                  {{element.name}}
                  <span class="badge">{{element.order}}</span>
                </li>
              </transition-group>
            </draggable>
          </div>
          <div class="col-md-3">
            <draggable element="span" v-model="list2" :options="dragOptions" :move="onMove">
              <transition-group type="transition" :name="'flip-list'">
                <li class="list-group-item" v-for="element in list2" :key="element.order">
                  <i :class="element.fixed? 'fa fa-anchor' : 'glyphicon glyphicon-pushpin'" @click=" element.fixed=! element.fixed" aria-hidden="true"></i>
                  {{element.name}}
                  <span class="badge">{{element.order}}</span>
                </li>
              </transition-group>
            </draggable>
          </div>
        </div>
      </el-collapse-item>
      <el-collapse-item title="ckeditor 富文本插件" name="16">
        <div></div>
        <textarea id="editor1"></textarea>
      </el-collapse-item>
      <el-collapse-item title="js-cookie" name="17">
        <el-button type="success" @click="getCookie">获取cookie</el-button>
        {{msg}}
      </el-collapse-item>
      <el-collapse-item title="弹框控制器/同步操作vuex使用" name="18">
        <el-button type="primary" @click="openLayer({position:'right',name:'PersonType'})">左弹框</el-button>
      </el-collapse-item>
      <el-collapse-item title="枚举类型的使用" name="19">
        <pre>{{nNoticeTimeType}}</pre>
        <el-select v-model="value" placeholder="请选择">
          <el-option v-for="(item,index) in nNoticeTimeType" :key="item.index" :label="item" :value="index">
          </el-option>
        </el-select>
      </el-collapse-item>
      <el-collapse-item title="假数据Mock" name="20">
        <el-button type="primary" @click="sendAjax">点击发送请求</el-button>
        {{allTags}}
      </el-collapse-item>
      <el-collapse-item title="favicon" name="21">
        将icon 放在项目跟目录下 修改webpack.dev.conf
        <pre>
           new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'index.html',
            inject: true,
            favicon: path.resolve('favicon.ico')
          }),
         </pre>
      </el-collapse-item>
      <el-collapse-item title="vuex 处理表单" name="22">
        https://vuex.vuejs.org/zh-cn/forms.html 错误的写法
        <el-input v-model="test" placeholder="请输入内容"></el-input>
        正确
        <el-input v-model="name" placeholder="请输入内容"></el-input>

      </el-collapse-item>
      <el-collapse-item title="借用nginx 反向代理访问打包后的文件" name="23">
        <pre>
            修改nginx.conf 配置
              server {
                listen       8007;
                server_name  localhost;
                charset utf-8;
                add_header Access-Control-Allow-Origin *;
                add_header Access-Control-Allow-Headers Origin,X-Requested-Width,Content-Type,Accept;
                location ~* \.(eot|ttf|woff|svg|otf)$ {
                    add_header Access-Control-Allow-Origin *;
                }
                location / {
                    root   D:\crm-service\crm-web\dist;
                    index  index.html;
                }
                error_page   500 502 503 504  /50x.html;
                location = /50x.html {
                    root   html;
                }
                autoindex on;
                index index.html index.htm index.shtml;
                add_header Access-Control-Allow-Origin *;
                add_header Access-Control-Allow-Headers X-Requested-With;
                add_header Access-Control-Allow-Methods GET,POST,OPTIONS;
                    location /api/v1 {
                      include  uwsgi_params;
                      proxy_pass   http://172.16.124.16:23333;
                    }
             }

          </pre>
      </el-collapse-item>
      <el-collapse-item title="异步action/demo?将异步操作封装到action 中的好处？那些数据是不需要放在vuex 中的" name="24">
        <span class="font-red">统一把异步请求放在action 中分为同步和异步</span><br>
        <el-button type="info" @click="jumpRouter()">路由跳转</el-button>
      </el-collapse-item>
      <el-collapse-item title="export/export default" name="25">

      </el-collapse-item>
      <el-collapse-item title="new Promise" name="26">
        <pre>
         http://es6.ruanyifeng.com/#docs/promise
          const promise = new Promise(function(resolve, reject) {
            // ... some code

            if (/* 异步操作成功 */){
              resolve(value);
            } else {
              reject(error);
            }
          });
          </pre>
      </el-collapse-item>
      <el-collapse-item title="vue-detools" name="27">

      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script>
import draggable from "vuedraggable";
import Cookies from "js-cookie";
const message = ["这是", "拖拽", "插件", "vue", "draggable"];
import common from "@/utils/common";
import { nNoticeTimeType } from "@/utils/enumeration";
import FatherToChild from "@/components/FatherToChild";
import brotherOne from "@/components/brotherOne";
import brotherTwo from "@/components/brotherTwo";
import * as types from "@/store/types";
import { mapGetters, mapActions } from "vuex"; // 引入工具方法
export default {
  name: "HelloWorld",
  data() {
    return {
      nNoticeTimeType: nNoticeTimeType,
      value: "",
      activeNames: [""],
      allTags: "",
      msg: "",
      myBrowser: "",
      transData: {
        data: "父组件"
      }, // 父组件的数据,
      dStartTime: 1524557668,
      tagFlag: false,
      list: message.map((name, index) => {
        return { name, order: index + 1, fixed: false };
      }),
      list2: message.map((name, index) => {
        return { name, order: index + 1, fixed: false };
      }),
      editable: true,
      isDragging: false,
      delayedDragging: false
    };
  },
  mounted() {
    this.myBrowser = common.myBrowser();
    this.initCk();
    Cookies.set("zby", "哈哈哈");
  },
  computed: {
    ...mapGetters(["listdetails", "test"]),
    name: {
      get() {
        return this.listdetails.name;
      },
      set(value) {
        this.dispatch({ url: types.UPDATEDETAILS, data: value });
      }
    },
    dragOptions() {
      return {
        animation: 0,
        group: "description",
        ghostClass: "ghost" // 拖拽元素的样式
      };
    },
    listString() {
      return JSON.stringify(this.list, null, 2);
    },
    list2String() {
      return JSON.stringify(this.list2, null, 2);
    }
  },
  methods: {
    ...mapActions(["dispatch"]),
    jumpRouter() {
      // 路由跳转
      this.$router.push({ path: `/list` });
    },
    openLayer(data) {
      // 触发弹框
      this.dispatch({ url: types.MASKCONTROL, data });
    },
    initCk() {
      // 初始化
      const that = this;
      var config = {}; // 编辑器样式，有三种：'kama'（默认）、'office2003'、'v2' // 背景颜色 //工具栏（基础'Basic'、全能'Full'、自定义）plugins/toolbar/plugin.js
      config.toolbar = [
        ["Bold", "Italic", "Underline", "Strike"],
        ["Link", "Unlink"],
        ["TextColor", "BGColor", "Font", "FontSize"],
        ["NumberedList", "BulletedList"],
        ["RemoveFormat", "Cut"],
        ["JustifyLeft", "JustifyCenter", "JustifyRight", "JustifyBlock"],
        ["Maximize"]
      ];
      config.height = 160;
      config.font_names =
        "宋体/SimSun;新宋体/NSimSun;仿宋_GB2312/FangSong_GB2312;楷体_GB2312/KaiTi_GB2312;黑体/SimHei;微软雅黑/Microsoft YaHei;";
      config.font_defaultLabel = "宋体/SimSun";
      config.language = "zh-cn";
      CKEDITOR.replace("editor1", config);
    },
    onMove({ relatedContext, draggedContext }) {
      // 拖拽的元素，即将拖拽到该位置的元素
      const relatedElement = relatedContext.element;
      const draggedElement = draggedContext.element;
      return (
        (!relatedElement || !relatedElement.fixed) && !draggedElement.fixed
      );
    },
    sendAjax() {
      // 发送ajax 请求
      let that = this;
      this.iAxios.get(
        types.api.GETTABLE,
        {
          word: "",
          tags: "",
          pageNum: 1,
          pageSize: 15,
          isTeam: false,
          filter: JSON.stringify([])
        },
        res => {
          this.allTags = res;
        }
      );
    },
    changeFlag() {
      this.tagFlag = true;
      // alert($(".tag-item").length); // length 为0
      this.$nextTick(() => {
        alert($(".tag-item").length);
      });
    },
    getCookie() {
      this.msg = Cookies.get("zby");
    }
  },
  components: {
    FatherToChild,
    brotherOne,
    brotherTwo,
    draggable
  },
  watch: {
    isDragging(newValue) {
      if (newValue) {
        this.delayedDragging = true;
        return;
      }
      this.$nextTick(() => {
        this.delayedDragging = false;
      });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
@import "../../static/css/func.less";
// .one .el-collapse-item__header,.el-icon-arrow-right{
//   color:red;
// }
.demo {
  margin: 40px;
}
.hello.demo {
  .el-collapse-item__header {
    background-color: red;
  }
  .has-box-shadow {
    width: 40px;
    height: 40px;
    .box-shadow(0px 0px 5px 0px rgba(0,0,0,0.2));
  }
  .flip-list-move {
    transition: transform 0.5s;
  }
  .no-move {
    transition: transform 0s;
  }
  .ghost {
    opacity: 0.5;
    background: #c8ebfb;
  }
}

.list-group {
  min-height: 20px;
}
.list-group-item {
  cursor: move;
}
.list-group-item i {
  cursor: pointer;
}
</style>
