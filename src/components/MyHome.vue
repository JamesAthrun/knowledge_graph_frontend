<template>
    <main class="myHome">
        <h1>Hi,{{this.$state.user}}</h1>
<!--        <div class="listOfGraph">-->
<!--            <el-table :data="graphList" ref="table" @row-click="getDetail">-->
<!--                <el-table-column type="expand">-->
<!--                    <template slot-scope="props">-->
<!--                        <el-form label-position="left" inline class="demo-table-expand">-->
<!--                            <el-form-item label="">-->
<!--                                <span>{{ props.row.description }}</span>-->
<!--                            </el-form-item>-->
<!--                        </el-form>-->
<!--                    </template>-->
<!--                </el-table-column>-->
<!--                <el-table-column prop="tableId" label="编号"></el-table-column>-->
<!--                <el-table-column prop="name" label="名称"></el-table-column>-->
<!--                <el-table-column prop="ver" label="最新版本"></el-table-column>-->

<!--            </el-table>-->
<!--        </div>-->
    </main>
</template>

<script>
    import {$ajax} from "../plugins/request";
    export default {
        data(){
            return{
                graphList: null,
            }
        },
        methods:{
            getDetail(row){
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
        }
    }
</script>

<style scoped>
    .listOfGraph{
        display: flex;
        justify-content: center;
        align-items: center;
        width: 80%;
    }

</style>