<template>
  <div id="list">
    <div v-if="data.page.totalPage" class="cont">
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
          <input v-model="searchstr" placeholder="案号，案由，当事人" @keydown="toolsSearch"/>
          <span class="search-btn" @click="searchFn"></span>
        </div>
      </div>

      <div class="head-crumb" v-show="ajaxData.searchstr"><span class="crumb-reload" @click="crumbReload">量刑列表</span><span>/</span><span class="grey">搜索出{{data.page.totalPage}}条结果</span></div>

      <div v-if="!loading" id="js-list" class="list">
        <div class="list-wheel jsWheel">
          <div class="ul-loadover">
            <ul>
              <template v-for="(v,k) in data.result">
                 <li>
                   <h5 class="text-ellipsis list-title" :title="v.hinttitle" v-html="v.title"></h5>
                   <p class="grey list-info">
                     <span v-html="v.ah"></span><span v-html="v.lasj"></span><span>距离审限<mark class="pink" v-html="v.tolimit"></mark>天</span>
                   </p>
                   <a class="list-detail button-font" @click="poltEditBtn">量刑分析</a>
                 </li>
              </template>
            </ul>
            <div v-if="data.page.totalPage===data.page.currPage" class="list-load-over"><span class="grey">数据已全部加载</span></div>
          </div>
          <page v-if="data.page.totalPage>1" v-bind:callback="dispatch" :counts="data.page.totalPage" :totalcount="data.totalcount"></page>
        </div>
        <div class="jsGdt gdt"><span class="grey"></span></div>
       </div>
       <loading v-if="loading"></loading>
     </div>
     <emptyVue v-if="!data.page.totalPage"></emptyVue>
  </div>
</template>

<script>
  //import Scroll from '@/module/scroll/scroll.js'
  import page from './public/page'

  export default {
    name: 'SentenceTable',
    components:{'page':page},
    mounted: function(){
      //this.$store.state.count = 13;
      //this.$store.dispatch('lawCaseAjax');
      this.$store.dispatch('fetchUrl',{url:'LAWCASEAJAX',setStore:true})

      this.lawData = this.data;
      setTimeout(()=>{
        this.loading = false;
      },100)
    },
    data () {
      return {
        loading: true,
        lawData: {},
        searchstr: ''
      }
    },
    computed: {
      data () {
        console.log(this.$store.state.lawCase,this.$store.state.lawCase.data)
        return this.$store.state.lawCase.data
      },
      ajaxData(){
        return this.$store.state.lawCase.ajaxData
      }
    },
    methods: {
      toolsSearch (ev){
        if (ev.keyCode === 13) {
          this.searchFn();
        }
      },
      crumbReload(){
        this.searchstr = ''
        this.searchFn()
      },
      searchFn(){
        this.ajaxData.searchstr = this.searchstr || undefined;
        this.dispatch(1)
      },
      toolsChose(ev){
        let span = $(ev.target).closest('span')
        let type = span.closest('.js-class').attr('type');
        if ( span.hasClass('active') ) {
          span.removeClass('active');
          this.ajaxData[type] = undefined;
        } else {
          span.addClass('active').siblings('.active').removeClass('active');
          this.ajaxData[type] = span.attr('data')*1;
        }
        this.dispatch(1)
      },
      toolsSort(ev){
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
        this.dispatch(1)
      },

      dispatch: function(page){
        this.loading = true;
        this.ajaxData.currPage = page;
        this.$store.dispatch('fetchUrl')
        //this.$store.dispatch('lawCaseAjax')
      },
      poltEditBtn: function(ev){
        $(ev.target).addClass('active');
        let _url = window.location.href;
        _url = _url.replace(/\#.+/,'\#/poltEdit')
        let win = window.open(_url,'_block');
      },
      scrollInit: function(){
         var scrollHei = $(window).height()-50;
         if (this.ajaxData.searchstr) {
            scrollHei -= 33
         }
          setTimeout(function(){
            var bar = new Scroll($('#js-list')[0]);
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
          this.loading = false;
          this.scrollInit();
        },
        deep: true
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
#list,
#list .cont{
  height: 100%;
}
#list {
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
    border: 1px solid @grey-99;
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
  .head-crumb {
    padding-bottom: 10px;
    padding-left: 10px;
    line-height: 22px;
  }
  .head-crumb span {
    padding-left: 7px;
  }
  .head-crumb span.crumb-reload {
    padding: 0;
    cursor: pointer;
  }
  .head-crumb span.crumb-reload:hover {
    color: #20C8FF;
  }
  .list {
    height: 100%;
  }
  .list-wheel {
    width: 100%;
    overflow: hidden;
  }
  .ul-loadover {
    min-height: 450px;
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
  .list .list-detail.active {
    color: #4C5E70;
  }
  .list-more-btn-par {
    padding-bottom: 10px;
  }
  .list-more-btn {
    display: block;
    margin: 0 auto;
  }
  .list-load-over {
    padding-top: 17px;
    text-align: center;
  }
  .list-load-over span {
    position: relative;
    display: inline-block;
    padding: 0 75px;
    line-height: 22px;
  }
  .list-load-over span:before,
  .list-load-over span:after {
    content: '';
    display: block;
    position: absolute;
    bottom: 10px;
    height: 2px;
    width: 65px;
    background-color: #999;
  }
  .list-load-over span:before {
    left: 0;
  }
  .list-load-over span:after {
    right: 0;
  }
}
</style>
