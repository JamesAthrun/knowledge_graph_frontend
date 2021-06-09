<template>
    <main class="myHome">
        <h1>Hi,{{this.$state.user}}</h1>
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