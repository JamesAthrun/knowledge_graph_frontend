<template>
    <main>
        <div>
            <el-row class="searchBox">
                <el-col :span="8" class="center">
                    <el-input
                            v-model="search"
                            @focus="focus"
                            @blur="blur"
                            @keyup.enter.native="searchHandler"
                            placeholder="Please enter the entity"
                    >
                        <el-button slot="append" icon="el-icon-search" id="search" @click="searchHandler"></el-button>
                    </el-input>
                    <!---设置z-index优先级,防止被走马灯效果遮挡-->
                    <el-card
                            @mouseenter="enterSearchBoxHanlder"
                            v-if="isSearch"
                            class="box-card"
                            id="search-box"
                            style="position:relative;z-index:15"
                    >
                        <dl v-if="isHistorySearch">
                            <dt class="search-title" v-show="history">历史搜索</dt>
                            <dt class="remove-history" v-show="history" @click="removeAllHistory">
                                <i class="el-icon-delete"></i>清空历史记录
                            </dt>
                            <el-tag
                                    v-for="search in historySearchList"
                                    :key="search.id"
                                    closable
                                    :type="search.type"
                                    @close="closeHandler(search)"
                                    style="margin-right:5px; margin-bottom:5px;"
                            >{{search.name}}</el-tag>
                            <dt class="search-title">热门搜索</dt>
                            <dd v-for="search in hotSearchList" :key="search.id">{{search}}</dd>
                        </dl>
                    </el-card>
                </el-col>
            </el-row>
        </div>


        <div v-if="isSearchList">
            <section class="list" style="margin-top: 20px; margin-left:30%">
                <article v-for="searchResult of currentDisplayList" @click="getEntity(searchResult.id)">
                    <h2 v-html="searchResult.data.name" v-if="searchResult.data.name != ''"></h2>
                    <h2 v-else v-html="searchResult.data.title"></h2>
                    <p>id: {{searchResult.data.id}}</p>
                    <p>title: {{searchResult.data.title}}</p>
                    <p>division: {{searchResult.data.division}}</p>
                </article>
            </section>

            <div class="block" style="margin-top: 50px; margin-left:40%">
                <el-pagination
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :current-page.sync="currentPage"
                        :page-size="pageSize"
                        layout="total, prev, pager, next"
                        :total="total">
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
                hotSearchList: ["暂无热门搜索"], //热门搜索数据
                historySearchList: [], //历史搜索数据
                searchResultList: ["暂无数据"], //搜索返回数据,
                history: false,
                types: ["", "success", "info", "warning", "danger"], //搜索历史tag式样

                currentPage: 1,
                pageSize: 10,
                total: 20,
                displayList: [],
                currentDisplayList: []

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
                console.log(document.cookie)
                $ajax("KG/search","GET", {keywords: this.search, ver: "0"}
                ).then(res=>{
                    //重置
                    this.currentDisplayList = []
                    this.displayList = []

                    console.log("ok")
                    this.searchResultList = JSON.parse(res.data).data;
                    console.log(this.searchResultList)
                    this.isSearched = true;

                    this.total = this.searchResultList.length

                    let i = 0
                    while (i < this.total){
                        let currentList = []
                        for (var j = 0; j < 10; j ++) {
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
</style>