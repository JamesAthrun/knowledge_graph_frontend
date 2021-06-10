<template>
    <main class="myKG">
        <el-col  class="vermenu">
            <VerticalNav/>
        </el-col>
        <el-col>
            <div class="listOfGraph">
                <el-table :data="graphList" ref="table" @row-click="getDetail">
                    <el-table-column type="expand">
                        <template slot-scope="props">
                            <el-form label-position="left" inline class="demo-table-expand">
                                <el-form-item label="">
                                    <span>{{ props.row.description }}</span>
                                </el-form-item>
                            </el-form>
                        </template>
                    </el-table-column>
                    <el-table-column prop="tableId" label="编号"></el-table-column>
                    <el-table-column prop="name" label="名称"></el-table-column>
                    <el-table-column prop="ver" label="最新版本"></el-table-column>
                </el-table>
            </div>
        </el-col>

    </main>
</template>

<script>
    import {$ajax} from "../plugins/request";
    import VerticalNav from "./VerticalNav";
    export default {
        data(){
            return{
                graphList: null,
            }
        },
        methods:{
            getDetail(row){
                this.$cookies.set("table_id", row.tableId)
                this.$router.push(`/KGDetail/${row.tableId}`)
                console.log(row.tableId)
            }
        },
        async created() {
            $ajax("KG/getAllGraphInfo","GET"
            ).then(res=>{
                this.graphList=JSON.parse(res.data)
                console.log(this.graphList)
            })
        },
        components:{
            VerticalNav
        }
    }
</script>

<style scoped>
    .vermenu{
        width: 15%;
    }
</style>