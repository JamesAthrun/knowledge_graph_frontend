<template>
  <div class="menu">
    <button style="background: white;border: none" v-on:click="backHome">
      <img class="img" src="https://gitee.com/lconq/my-img-oss/raw/master/img/logo.png"/>
    </button>
    <div class="spacer"></div>
    <el-menu class="el-menu-demo" default-active="/" mode="horizontal" router @select="handleSelect">
      <el-menu-item index="/">首页</el-menu-item>
      <el-menu-item disabled index="/check">问答</el-menu-item>
      <el-submenu index="/user">
        <template slot="title">我的主页</template>
        <div v-if="this.$state.user==null">
          <el-menu-item index="/login">登录</el-menu-item>
        </div>
        <div v-else>
          <el-menu-item index="/user/home">{{ this.$state.user }}</el-menu-item>
          <el-menu-item index="/user/myKG">知识图谱</el-menu-item>
          <el-menu-item index="/user/myGroup">用户组</el-menu-item>
          <el-menu-item index="/user" @click="logout">注销</el-menu-item>

        </div>

      </el-submenu>
    </el-menu>
  </div>
</template>

<script>

export default {
  data() {
    return {
      activeIndex: '1',
    };
  },
  async created() {
    if (this.$cookies.isKey("user_name")) {
      this.$state.user = this.$cookies.get("user_name")
    }
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
    backHome() {
      this.$router.push({path: '/'})
    },
    async logout() {
      console.log(this.$state.user)
      this.$state.user = null
      this.$cookies.remove("user_key")
      this.$cookies.remove("user_name")
      this.$cookies.remove("table_id")
      this.backHome()
    },
  },
}


</script>

<style lang="stylus" scoped>
@import '../style/imports'

.menu {
  display flex;
};
.star-btn {
  display flex;
  justify-content center;
  align-items center;
}
</style>