<template>
    <el-col  class="vermenu">
        <VerticalNav/>
    </el-col>
</template>

<script>
    import VerticalNav from "./VerticalNav";

    export default {
        name: "MyGroup",
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