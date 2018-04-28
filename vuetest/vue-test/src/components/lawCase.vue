<template>
  <div id="list">
    <div class="cont" v-if="!loading">
      <div class="head-tools clear">
        <div class="tools-single button-single-chose js-class" @click="toolsChose" type="zmstate">
          <span class="first" data="1">未量刑</span><span class="last" data="2">已量刑</span>
        </div>
        <div class="tools-single button-single-chose js-class" @click="toolsChose" type="joinstate">
          <span class="first" data="2">我承办</span><span class="last" data="1">我参与</span>
        </div>
        <div class="tools-single button-single-chose js-class" @click="toolsChose" type="kindstate">
          <span class="first" data="1">诉裁</span><span data="2">简易</span><span class="last" data="3">普通</span>
        </div>
        <div class="tools-single sort desc js-sort" data="desc" type="lasj" @click="toolsSort">立案日期</div>
        <div class="last tools-single sort js-sort" type="tolimit" @click="toolsSort">审限剩余天数</div>
        <div class="tools-search js-tools-search">
          <input value="" placeholder="案号，案由，当事人" @keydown="toolsSearch"/>
          <span class="search-btn" @click="toolsSearchClick"></span>
        </div>
      </div>

      <div class="head-crumb">面包屑</div>
      <div class="list">
        <div class="list-wheel jsWheel">
          <ul>
            <template v-for="(v,k) in data.result">
               <li>
                 <h5 class="text-ellipsis list-title" :title="v.bgrname.join('、')+v.zm.join('、')+'一案'" v-html="v.bgrname.join('、')+v.zm.join('、')+'一案'"></h5>
                 <p class="grey list-info">
                   <span v-html="v.ah"></span><span v-html="v.lasj"></span><span>距离审限<mark class="pink" v-html="v.tolimit"></mark>天</span>
                 </p>
                 <a class="list-detail button-font">量刑分析</a>
               </li>
            </template>
          </ul>
          <div v-if="data.page.totalPage>1 && data.page.totalPage!=data.page.currPage" class="list-more-btn-par"><span class="list-more-btn button button-one" @click="loadMore">查看更多</span></div>
          <div class="jsGdt gdt"><span></span></div>
        </div>
       </div>
     </div>
     <div class="loading" v-if="loading">loading</div>
  </div>
</template>

<script>

  import Scroll from './../module/scroll/scroll.js'
  import $ from 'jquery'

  export default {
    name: 'SentenceTable',
    mounted: function(){
      this.$store.state.count = 13;
      this.$store.dispatch('lawCaseAjax');
      this.loading = false;
      this.lawData = this.data
    },
    data () {
      return {
        loading: true,
        lawData: {}
      }
    },
    computed: {
      data () {
        return this.$store.state.lawCase.data
      },
      ajaxData(){
        return this.$store.state.lawCase.ajaxData
      }
    },
    methods: {
      toolsSearch (ev){
        console.log(ev.keyCode)
        if (ev.keyCode === 13) {
          this.searchFn($(ev.target).val());
        }
      },
      toolsSearchClick(ev){
        this.searchFn($(ev.target).closest('.js-tools-search').find('input').val());
      },
      searchFn(str){
        this.ajaxData.searchstr = str || undefined;
        this.$store.dispatch('lawCaseAjax')
      },
      toolsChose: function(ev){
        let span = $(ev.target).closest('span')
        let type = span.closest('.js-class').attr('type');
        if ( span.hasClass('active') ) {
          span.removeClass('active');
          this.ajaxData[type] = undefined;
        } else {
          span.addClass('active').siblings('.active').removeClass('active');
          this.ajaxData[type] = span.attr('data')*1;
        }
        this.ajaxData.currPage = 1;
        this.$store.dispatch('lawCaseAjax')
      },
      toolsSort: function(ev){
        var sortEle = $(ev.target);
        var sibSortEle = sortEle.siblings('.js-sort');
        var eType = sortEle.attr('type')
        var eData = sortEle.attr('data');
        var sibType = sibSortEle.attr('type');
        var dataJson = {
          'desc': 2,
          'asc': 1
        }
        if ( eData ) {
          sortEle.removeClass('desc asc');
          eData = eData==='asc'?'desc':'asc';
        } else {
          sibSortEle.attr('data','').removeClass('desc asc');
          this.ajaxData[sibType] = undefined;
          eData = 'desc';
        }
        sortEle.attr('data',eData).addClass(eData);
        this.ajaxData[eType] = dataJson[eData];
        this.ajaxData.currPage = 1;
        this.$store.dispatch('lawCaseAjax')
      },
      loadMore: function(){
        this.ajaxData.currPage++;
        this.$store.dispatch('lawCaseAjax')
      },
      jumpPoltEdit: function(){
        window.location.hash = '/poltEdit';
      },
      scrollInit: function(){
         var scrollHei = 699;
          setTimeout(function(){
            var bar = new Scroll($('.list')[0]);
            bar.init({
              zeroFlag: true,
              maxH: scrollHei,
              wheelEle: '.jsWheel'
            });
          },200)
      }
    },
    watch: {
      'data':{
        handler: function (val, oldVal) {
          console.log(val)
          this.scrollInit();
        },
        deep: true
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import  url(./../module/scroll/scroll.css);
#list,
#list .cont{
  height: 100%;
}
.head-tools {
  padding: 12px 10px;
}
.tools-single {
  float: left;
  margin-right: 15px;
}
.tools-single.last {
  margin-right: 0;
}
.tools-search {
  float: right;
  position: relative;
  margin-top: -3px;
  margin-bottom: -3px;
  padding-right: 30px;
  padding-left: 10px;
  height: 30px;
  width: 220px;
  border: 1px solid #B5B5B5;
  box-sizing: border-box;
  background-color: #fff;
  border-radius: 2px;
  line-height: 28px;
}
.tools-search input {
  border: none;
  background: none;
  display: block;
  height: 100%;
  width: 100%;
  line-height: 26px;
  padding: 0;
  box-sizing: border-box;
}
.tools-search .search-btn {
  position: absolute;
  top: 0;
  right: 0;
  width: 28px;
  height: 28px;
  background: url(../assets/magn.png) no-repeat center;
  cursor: pointer;
}
.list {
  height: calc(100% - 70px);
}
.list-wheel {
  width: 100%;
  overflow: hidden;
}
.list li {
  position: relative;
  margin-bottom: 10px;
  padding: 8px 10px 4px;
  padding-right: 100px;
  height: 57px;
  box-sizing: border-box;
  background-color: #fff;
}
.list h5 {
  font-size: 16px;
  line-height: 22px;
}
.list .list-info {
  line-height: 22px;
}
.list .list-info span {
  padding-right: 20px;
}
.list .list-detail {
  position: absolute;
  top: 18px;
  right: 40px;
  line-height: 20px;
}
.list-more-btn-par {
  padding-bottom: 10px;
}
.list-more-btn {
  display: block;
  margin: 0 auto;
}
</style>
