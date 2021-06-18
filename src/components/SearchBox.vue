<template>
  <main>
    <div>
      <el-row class="searchBox">
        <el-col :span="8" class="center">
          <el-input
              v-model="search"
              placeholder="Please enter the entity"
              @blur="blur"
              @focus="focus"
              @keyup.enter.native="searchHandler"
          >
            <el-button id="search" slot="append" icon="el-icon-search" @click="searchHandler"></el-button>
          </el-input>
          <!---设置z-index优先级,防止被走马灯效果遮挡-->
          <el-card
              v-if="isSearch"
              id="search-box"
              class="box-card"
              style="position:relative;z-index:15"
              @mouseenter="enterSearchBoxHanlder"
          >
            <dl v-if="isHistorySearch">
              <dt v-show="history" class="search-title">历史搜索</dt>
              <dt v-show="history" class="remove-history" @click="removeAllHistory">
                <i class="el-icon-delete"></i>清空历史记录
              </dt>
              <el-tag
                  v-for="search in historySearchList"
                  :key="search.id"
                  :type="search.type"
                  closable
                  style="margin-right:5px; margin-bottom:5px;"
                  @close="closeHandler(search)"
              >{{ search.name }}
              </el-tag>
              <dt class="search-title">热门搜索</dt>
              <dd v-for="search in hotSearchList" :key="search.id">{{ search }}</dd>
            </dl>
          </el-card>
        </el-col>
        <button class="chooseVerButton" @click="chooseVerMode=true">当前版本：{{currentVer}}</button>
      </el-row>
    </div>

    <el-dialog
            v-if="chooseVerMode"
            :visible="chooseVerMode"
            title="选择版本"
            width="30%">
      <el-form
              class="demo-form-inline"
              label-width="80px"
      >
        <el-form-item label="版本：" required>
          <el-select value-key="ver" style="width: 50%" v-model="currentVer">
            <el-option
                    v-for="item in verList"
                    :key="item.ver"
                    :label="item.text"
                    :value="item.ver"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item style="text-align: right;">
          <el-button @click="chooseVerMode = false">取 消</el-button>
          <el-button type="primary" @click="change">确 定</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>


    <div v-if="isSearchList">
      <section class="list" style="margin-top: 20px; margin-left:30%">
        <article v-for="searchResult of currentDisplayList" @click="getEntity(searchResult.id)">
          <h2 v-if="searchResult.data.name != ''" v-html="searchResult.data.name"></h2>
          <h2 v-else v-html="searchResult.data.title"></h2>
          <p>id: {{ searchResult.data.id }}</p>
          <p>title: {{ searchResult.data.title }}</p>
          <p>division: {{ searchResult.data.division }}</p>
        </article>
      </section>

      <div class="block" style="margin-top: 50px; margin-left:40%">
        <el-pagination
            :current-page.sync="currentPage"
            :page-size="pageSize"
            :total="total"
            layout="total, prev, pager, next"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange">
        </el-pagination>
      </div>
    </div>


  </main>
</template>

<script>
import Store from "../utils/store";

import {$ajax} from "../plugins/request";

export default {
  data() {
    return {
      search: "", //当前输入框的值
      isFocus: false, //是否聚焦
      isSearched: false, //是否确认搜索
      hotSearchList: ["防疫措施","学生","公共交通"], //热门搜索数据
      historySearchList: [], //历史搜索数据
      searchResultList: ["暂无数据"], //搜索返回数据,
      history: false,
      types: ["", "success", "info", "warning", "danger"], //搜索历史tag式样
      currentPage: 1,
      pageSize: 10,
      total: 20,
      displayList: [],
      currentDisplayList: [],
      currentVer: 0,
      verList: [],
      chooseVerMode: false,
    };
  },
  methods: {
    focus() {
      this.isFocus = true;
      this.historySearchList =
          Store.loadHistory() == null ? [] : Store.loadHistory();
      this.history = this.historySearchList.length == 0 ? false : true;
    },
    blur() {
      const self = this;
      this.searchBoxTimeout = setTimeout(function () {
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
        this.historySearchList.push({name: this.search, type: this.types[0]});
        Store.saveHistory(this.historySearchList);
      }
      this.history = this.historySearchList.length == 0 ? false : true;
      console.log(document.cookie)
      $ajax("KG/search", "GET", {keywords: this.search, ver: this.currentVer}
      ).then(res => {
        //重置
        this.currentDisplayList = []
        this.displayList = []

        console.log("ok")
        this.searchResultList = JSON.parse(res.data).data;
        console.log(this.searchResultList)
        this.isSearched = true;

        this.total = this.searchResultList.length

        let i = 0
        while (i < this.total) {
          let currentList = []
          for (var j = 0; j < 10; j++) {
            //console.log(this.searchResultList[i])
            if (i == this.searchResultList.length) {
              break
            }
            currentList.push(this.searchResultList[i])
            i += 1
          }
          this.displayList.push(currentList)
        }
        //console.log(this.displayList)

        this.currentDisplayList = this.displayList[0]
        //console.log(this.currentDisplayList)

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
    handleSizeChange(val) {
      this.pageSize = val;
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.currentDisplayList = this.displayList[val - 1]
      console.log(`当前页: ${val}`);
    },
    change(){
      this.$cookies.set("table_currentVer", this.currentVer)
      console.log("版本切换为："+this.currentVer)
      this.chooseVerMode = false
    }
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
  },
  async created(){
    this.currentVer=this.$cookies.get("table_currentVer")==null? this.$cookies.get("table_latestVer"):this.$cookies.get("table_currentVer")
    this.$cookies.set("table_currentVer", this.currentVer)
    for(let i=0;i<=this.$cookies.get("table_latestVer");i++){
      this.verList.push({ver:i, text:i})
    }
    console.log(this.verList)
  }
};
</script>

<style scoped>
.searchBox {
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
  .chooseVerButton{
    position: relative;
    left: 10px;
    color: #232323;
    background-color: white;
    border: none;
  }
</style>