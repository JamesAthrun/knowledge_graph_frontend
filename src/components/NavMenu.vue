<template>
<!--    <nav class="menu">-->
<!--        <button style="height: 20px;width: 20px;background: white" class="star-btn" v-on:click="backHome">-->
<!--            <img class="img" src="assets/logo.svg"/>-->
<!--        </button>-->
<!--        <div class="spacer"></div>-->
<!--        <router-link :to="{ name: 'home' }" exact>Home</router-link>-->
<!--        <router-link :to="{ name: 'check' }">Check</router-link>-->
<!--        <router-link :to="{ name: 'createNew' }">CreateNew</router-link>-->
<!--        &lt;!&ndash;<router-link :to="{ name: 'download' }">Download</router-link>&ndash;&gt;-->

<!--        <template v-if="$state.user">-->
<!--            <a>{{ $state.user.username }}</a>-->
<!--            <a @click="logout">Logout</a>-->
<!--        </template>-->
<!--        <router-link v-else :to="{name: 'login'}">Login</router-link>-->
<!--    </nav>-->
    <div class="menu">
        <button style="background: white;border: none" v-on:click="backHome">
            <img class="img" src="assets/logo.svg"/>
        </button>
        <div class="spacer"></div>
        <el-menu default-active="/" class="el-menu-demo" mode="horizontal" router @select="handleSelect">
            <el-menu-item index="/">首页</el-menu-item>
            <el-menu-item index="/check" disabled>问答</el-menu-item>
            <el-menu-item index="/createNew">新建</el-menu-item>
            <el-submenu :index="this.$state.user">
                <template slot="title">我的主页</template>
                <div v-if="this.$state.user==null">
                    <el-menu-item index="/login">登录</el-menu-item>
                </div>
                <div v-else>
                    <el-menu-item index="1" @click="userPage">{{this.$state.user}}</el-menu-item>
                    <el-menu-item index="2" @click="graphPage">知识图谱</el-menu-item>
                    <el-menu-item index="3" @click="logout">注销</el-menu-item>
<!--                    <el-menu-item route="this.$state.user">{{this.$state.user}}</el-menu-item>-->
<!--                    <el-menu-item route={path:'/:user/myKG',name:'myHome'}>知识图谱</el-menu-item>-->
<!--                    <el-menu-item route="this.$state.user" @click="logout">注销</el-menu-item>-->
                </div>

            </el-submenu>
        </el-menu>
    </div>
</template>

<script>
    import router from "../router";

    export default {
        data() {
            return {
                activeIndex: '1',
            };
        },
        async mounted() {
            if(this.$cookies.isKey("user_name")){
                this.$state.user=this.$cookies.get("user_name")
            }
        },
        methods: {
            handleSelect(key, keyPath) {
                console.log(key, keyPath);
            },
            backHome(){
                this.$router.push({path:'/'})
            },
            async logout () {
                console.log(this.$state.user)
                this.$state.user = null
                this.$cookies.remove("user_key")
                this.$cookies.remove("user_name")
                this.$cookies.remove("table_id")
                this.backHome()
            },
            userPage(){
                this.$router.push({path:`${this.$state.user}`})
            },
            graphPage(){
                this.$router.push({path:`${this.$state.user}/myKG`})
            }
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