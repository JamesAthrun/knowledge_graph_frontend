<template>

    <div>
        <div id="pic-box">
          <div id="main-area">
            <div class="curtain">
              <div class="center-container">
                <label id="headline">NKG知识图谱</label>
              </div>
            </div>

          </div>
          <div id="bottom-area">
            <div class="curtain" style="display: flex;flex-direction: row;">
              <div id="intro-item" v-for="introItem of this.introItemList">
                <div class="center-container">
                  <label id="intro-item-head">{{introItem.itemHead}}</label>
                  <label id="intro-item-body">{{introItem.itemBody}}</label>
                </div>
              </div>
              </div>
          </div>
        </div>

    </div>

</template>

<script>
    import Store from "../utils/store";

    import {$ajax} from "../plugins/request";
    import {$fadeIn, $fadeOut} from "../plugins/anime"
    export default {
        data() {
            return {
              introItemList:[
                {
                  itemHead:"功能",
                  itemBody:"功能详情"
                },
                {
                  itemHead:"功能",
                  itemBody:"功能详情"
                },
                {
                  itemHead:"功能",
                  itemBody:"功能详情"
                },
              ],
              search: "", //当前输入框的值
                isFocus: false, //是否聚焦
                isSearched: false, //是否确认搜索
                hotSearchList: ["暂无热门搜索"], //热门搜索数据
                historySearchList: [], //历史搜索数据
                searchResultList: ["暂无数据"], //搜索返回数据,
                history: false,
                types: ["", "success", "info", "warning", "danger"] //搜索历史tag式样
            };
        },
        mounted(){
          $fadeIn(100,0.5,document.getElementById("pic-box"))
        },
      // beforeDestroy() {
      //     $fadeOut(100,0.1,document.getElementById("pic-box"))
      // },
      methods: {
            focus() {
                this.isFocus = true;
                this.historySearchList =
                    Store.loadHistory() == null ? [] : Store.loadHistory();
                this.history = this.historySearchList.length == 0 ? false : true;
            },
            blur() {
                const self = this;
                this.searchBoxTimeout = setTimeout(function() {
                    self.isFocus = false;
                }, 300);
            },
            enterSearchBoxHanlder() {
                clearTimeout(this.searchBoxTimeout);
            },
            async searchHandler() {
                //随机生成搜索历史tag式样
                //let n = RandomUtil.getRandomNumber(0, 5);
                let exist =
                    this.historySearchList.filter(value => {
                        return value.name == this.search;
                    }).length == 0
                        ? false
                        : true;
                if (!exist) {
                    this.historySearchList.push({ name: this.search, type: this.types[0] });
                    Store.saveHistory(this.historySearchList);
                }
                this.history = this.historySearchList.length == 0 ? false : true;
                $ajax("KG/search","GET", {keywords: this.search, ver: "0"}
                ).then(res=>{
                    console.log("ok")
                    this.searchResultList = JSON.parse(res.data).data;
                    this.isSearched = true;
                })

            },
            closeHandler(search) {
                this.historySearchList.splice(this.historySearchList.indexOf(search), 1);
                Store.saveHistory(this.historySearchList);
                clearTimeout(this.searchBoxTimeout);
                if (this.historySearchList.length == 0) {
                    this.history = false;
                }
            },
            removeAllHistory() {
                Store.removeAllHistory();
            },
            getEntity(id) {
                this.isSearched = false;
                this.$router.push(`/entity/${id}`);
            },
        },
        computed: {
            isHistorySearch() {
                return this.isFocus && !this.search;
            },
            isSearchList() {
                return this.isSearched && this.search;
            },
            isSearch() {
                return this.isFocus;
            }
        }
    };
</script>

<style scoped>
    .searchBox{
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .center {
        justify-content: center;
        align-items: center;
    }
    #search {
        background-color: #ffffff;
        border-radius: 0%;
    }
    .search-title {
        color: #bdbaba;
        font-size: 15px;
        margin-bottom: 5px;
    }
    .remove-history {
        color: #bdbaba;
        font-size: 15px;
        float: right;
        margin-top: -22px;
    }
    #search-box {
        width: 555px;
        height: 300px;
        margin-top: 0px;
        padding-bottom: 20px;
    }
    #main-area{
    }
    #headline{
      font-size: 90px;
      font-family: 华文新魏;
      color: white;
      margin-top: 280px;
    }
    #pic-box{
      width: 100%;
      background-image: url("https://gitee.com/lconq/my-img-oss/raw/master/img/bg.png");
      background-repeat: no-repeat;
      background-size: cover;
      height: 100%;
      position: absolute;
      z-index: -1;
    }
    #bottom-area{
      margin-top: 180px;
    }
    #intro-item{
      font-family: 华文新魏;
      width: 33%;
      height: 200px;
      padding-top: 100px;
    }

    #intro-item #intro-item-head{
      color: white;
      font-size: 45px;

    }

    #intro-item #intro-item-body{
      margin-top: 40px;
      color: white;
      font-size: 25px;
    }

    .center-container{
      display: flex;
      flex-direction: column;
      align-items: center;
      /*使子组件居中对齐*/
      /*默认是竖直轴线上的居中*/
    }
    .curtain{
      background-color: rgba(10,10,10,0.3);
      height: 100%;
      width: 2000px;
    }

</style>