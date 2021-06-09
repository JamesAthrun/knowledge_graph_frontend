<template>
    <main class="myHome">
        <el-col>
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
            if(this.$cookies.get("user_name") != this.$route.params.user){
                this.$router.push("/login")
            }
            else{
                $ajax("KG/getAllGraphInfo","GET"
                ).then(res=>{
                    this.graphList=JSON.parse(res.data)
                    console.log(this.graphList)
                })
            }
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

</style>