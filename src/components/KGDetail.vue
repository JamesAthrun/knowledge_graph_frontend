<template>
    <main class="KGDetail">
        <el-row >
            <el-col class="left">
                <div class="description">
                    <h1>{{this.tableName}}</h1>
                    <h2>{{this.graphInfo.description}}}</h2>
                </div>
                <div class="functionArea">
                    <i class="el-icon-search" />
                    <i class="el-icon-question" />
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
                tableId: null,
                tableName: "",
                graphInfo: {},
                graphHistory: {},
            }
        },
        async created(){
            this.tableId = this.$route.params.id
            $ajax("KG/getGraphInfo","GET",{tableId: this.tableId}
            ).then(res=>{
                this.graphInfo=JSON.parse(res.data)
                this.tableName=this.graphInfo.name
                console.log(this.tableName)
            })
            $ajax("KG/getGraphHistory","GET",{tableId: this.tableId}
            ).then(res=>{
                this.graphHistory=JSON.parse(res.data)
                console.log(this.graphHistory)
            })
            console.log(this.tableId)
        },
        components: {
            NavMenu
        }
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