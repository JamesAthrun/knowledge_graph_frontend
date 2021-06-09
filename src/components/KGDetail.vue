<template>
    <main class="KGDetail">
        <el-row >
            <el-col class="left">
                <div class="description">
                    <h1>{{this.tableName}}</h1>
                    <h2>{{this.graphInfo.description}}}</h2>
                </div>
                <div class="functionArea">
                    <button style="background: white;border: none" v-on:click="goToSearch">
                        <i class="el-icon-search" style="color: deepskyblue;height: 28px;width: 28px"/>
                    </button>
                    <button style="background: white;border: none" v-on:click="goToQuestion">
                        <i class="el-icon-question" style="color: deepskyblue; height: 50px; width: 50px"/>
                    </button>
                </div>
            </el-col>
            <el-col class="right">
                <div class="history"></div>
            </el-col>
        </el-row>


    </main>
</template>

<script>
    import NavMenu from "./NavMenu";
    import {$ajax} from "../plugins/request";
    export default {
        data(){
            return{
                isAuthorized: true,
                tableId: null,
                tableName: "",
                graphInfo: {},
                graphHistory: {},
            }
        },

        methods:{
            goToSearch(){
                this.$router.push({path:'/search'})
            },
            goToQuestion(){
                this.$router.push({path:'/question'})
            }
        },

        async created(){
            this.tableId = this.$cookies.get("table_id")
            $ajax("KG/getGraphInfo","GET",{tableId: this.tableId}
            ).then(res=>{
                if(res.code!=1){
                    this.isAuthorized = false
                }
                else{
                    this.graphInfo=JSON.parse(res.data)
                    this.tableName=this.graphInfo.name
                    console.log(this.tableName)
                }
            })
            $ajax("KG/getGraphHistory","GET",{tableId: this.tableId}
            ).then(res=>{
                if(res.code!=1){
                    this.isAuthorized = false
                }
                else{
                    this.graphHistory=JSON.parse(res.data)
                    console.log(this.graphHistory)
                }
            })
            if(!this.isAuthorized){
                this.$cookies.remove("table_id")
                this.$router.go(-1)
                this.$message({
                    type: 'error',
                    message: '您没有权限访问该知识图谱！'
                });
            }
        },
    }
</script>

<style scoped>
    .KGDetail{
        width: 90%;
        padding: 2px;
    }

    .left{
        width: 60%;
    }
    .right{
        width: 40%;
    }

    .description{
        position: relative;
        /*line-height: 50px;*/
    }
    .searchEntity{
        position: relative;
        height: 500px;
        overflow-y: auto; /* 当内容过多时y轴出现滚动条 */

    }
    .history{
        position: relative;
        padding: 10px;
        overflow-y: auto; /* 当内容过多时y轴出现滚动条 */
        background-color: #232323;
    }
</style>