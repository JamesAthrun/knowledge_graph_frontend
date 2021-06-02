<template>
    <main class="KGDetail">
        <h1>Hi,{{this.tableId}}</h1>
    </main>
</template>

<script>
    export default {
        data(){
            return{
                tableId: null,
            }
        },
        async created(){
            this.tableId = this.$route.params.id
            console.log(this.tableId)
        }
    }
</script>

<style scoped>

</style>