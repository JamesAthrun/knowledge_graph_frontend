<template>
    <main class="myHome">
        <el-col  class="vermenu">
            <VerticalNav/>
        </el-col>
        <el-col>
            <h1>Hi,{{this.$state.user}}</h1>
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
                this.$router.push(`/KGDetail/${row.tableId}`)
                console.log(row.tableId)
            }
        },
        async created() {
            // $ajax("KG/getAllGraphInfo","GET"
            // ).then(res=>{
            //     this.graphList=JSON.parse(res.data)
            //     console.log(this.graphList)
            // })
        },
        components:{
            VerticalNav
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

    .vermenu{
        width: 15%;
    }
</style>