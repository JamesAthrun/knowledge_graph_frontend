<template>
    <div>
        <el-menu default-active="/" class="el-ver-menu-demo" mode="vertical" router>
            <el-menu-item index="/user/home">个人主页</el-menu-item>
            <el-menu-item index="/user/myKG">知识图谱</el-menu-item>
            <el-menu-item index="/user/myGroup">用户组</el-menu-item>
        </el-menu>
    </div>
</template>

<script>
    export default {
        name: "VerticalNav"
    }
</script>

<style scoped>

</style>