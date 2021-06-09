<template>
    <div class="vermenu">
        <el-menu default-active="/" class="el-ver-menu-demo" mode="vertical" router @select="handleSelect">
            <el-menu-item :index="this.$state.user">个人主页</el-menu-item>
            <el-menu-item :index="this.$state.user+'/myKG'"></el-menu-item>
            <el-menu-item :index="this.$state.user+'/myGroup'">用户组</el-menu-item>
        </el-menu>
    </div>
</template>

<script>
    export default {
        name: "VerticalNav"
    }
</script>

<style scoped>
    .el-ver-menu-demo{
        width: 15%;
    }
</style>