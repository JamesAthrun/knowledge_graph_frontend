<template>
    <main class="KGDetail">
        <el-row >
            <el-col class="left">
                <el-row class="description">
                    <h1>{{this.tableName}}</h1>
                    <h2>{{this.graphInfo.description}}</h2>
                </el-row>
                <el-row class="functionArea">
                    <div class="buttonStyle">
                        <button style="background: white;border: none;" v-on:click="goToSearch">
                            <i class="el-icon-search" style="color: deepskyblue;height: 50px;width: 50px"/>
                        </button>
                    </div>
                    <div class="buttonStyle">
                        <button style="background: white;border: none;" v-on:click="goToQuestion">
                            <i class="el-icon-question" style="color: deepskyblue; height: 50px; width: 50px"/>
                        </button>
                    </div>
                </el-row>
            </el-col>
            <el-col class="right">
                <div class="history">
                    <el-table
                            :data="graphHistory"
                            ref="table"
                            @row-dblclick="rowback"
                            :show-header="false"
                    >
                        <el-table-column prop="ver" label="版本号" width="50"></el-table-column>
                        <el-table-column prop="detail" label="详情"></el-table-column>
                        <el-table-column prop="time" label="提交时间" sortable></el-table-column>
                        <el-table-column
                                prop="drop"
                                label="有效性"
                                :filters="[{ text: '', value: '' }, {text: '已失效', value: '已失效'}]"
                                :filter-method="filterHandler"
                        ></el-table-column>
                    </el-table>
                </div>
            </el-col>
        </el-row>


    </main>
</template>

<script>
    import {$ajax} from "../plugins/request";
    export default {
        data(){
            return{
                isAuthorized: true,
                tableId: null,
                tableName: "",
                graphInfo: {},
                graphHistory: null
            }
        },

        methods:{
            goToSearch(){
                this.$router.push({path:'/search'})
            },
            goToQuestion(){
                this.$router.push({path:'/question'})
            },
            rowback(row){
                if(row.drop == ""){
                    this.$confirm('确认要进行回滚操作吗？')
                        .then(_ => {
                            this.$confirm('该操作不可逆，是否确认继续进行？')
                                .then(_ => {
                                    $ajax("KG/rollBackChange","GET",{ver: row.ver}
                                    ).then(res=>{
                                        if(res.code==1){
                                            this.$message({
                                                type: 'success',
                                                message: '回滚成功，请刷新页面'
                                            })
                                        }
                                        else{
                                            this.$message({
                                                type: 'error',
                                                message: '回滚失败'
                                            })
                                        }
                                    })
                                })
                                .catch(_ => {});
                        })
                        .catch(_ => {});
                }
            },
            filterHandler(value, row, column) {
                const property = column['property'];
                return row[property] === value;
            }
        },

        async created(){
            this.tableId = this.$cookies.get("table_id")
            $ajax("KG/getGraphInfo","GET",{tableId: this.tableId}
            ).then(res=>{
                if(res.code!=1){
                    this.$cookies.remove("table_id")
                    this.$router.go(-1)
                    this.$message({
                        type: 'error',
                        message: '您没有权限访问该知识图谱！'
                    });
                }
                else{
                    this.graphInfo=JSON.parse(res.data)
                    this.tableName=this.graphInfo.name
                    console.log(this.graphInfo.description)
                }
            })
            $ajax("KG/getGraphHistory","GET"
            ).then(res=>{
                if(res.code!=1){}
                else{
                    this.graphHistory=JSON.parse(res.data)
                    for(let i=0, len=this.graphHistory.length; i<len; i++){
                        if(this.graphHistory[i].drop=="0"){
                            this.graphHistory[i].drop=""
                        }
                        else{
                            this.graphHistory[i].drop="已失效"
                        }
                    }
                    console.log(this.graphHistory)
                }
            })

        },
    }
</script>

<style scoped>
    .KGDetail{
        width: 90%;
        padding: 2px;
    }

    .left{
        padding: 10px;
        width: 60%;
    }
    .right{
        padding: 10px;
        width: 30%;
    }
    .functionArea{
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .buttonStyle{
        width: 50px;
        height: 50px;
    }
    .description{
        margin-top: 100px;
        position: relative;
        padding: 10px;
        /*line-height: 50px;*/
    }
    .searchEntity{
        position: relative;
        height: 500px;
        overflow-y: auto; /* 当内容过多时y轴出现滚动条 */

    }
    .history{
        position: relative;
        max-height: 800px;
        overflow-y: auto; /* 当内容过多时y轴出现滚动条 */
        background-color: #ffffff;
    }
</style>