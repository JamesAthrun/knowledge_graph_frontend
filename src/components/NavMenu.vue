<template>
    <nav class="menu">
        <button style="height: 20px;width: 20px;background: white" class="star-btn" v-on:click="backHome">
            <img class="img" src="assets/logo.svg"/>
        </button>
        <div class="spacer"></div>
        <router-link :to="{ name: 'home' }" exact>Home</router-link>
        <router-link :to="{ name: 'check' }">Check</router-link>
        <router-link :to="{ name: 'createNew' }">CreateNew</router-link>
        <!--<router-link :to="{ name: 'download' }">Download</router-link>-->

        <template v-if="$state.user">
            <a>{{ $state.user.username }}</a>
            <a @click="logout">Logout</a>
        </template>
        <router-link v-else :to="{name: 'login'}">Login</router-link>
    </nav>
</template>

<script>
    export default {
        methods: {
            async logout () {
                const result = await this.$fetch('logout')
                if (result.status === 'ok') {
                    this.$state.user = null
                }
            },

            backHome(){
                this.$router.push({path:'/'})
            }
        },
    }
</script>

<style lang="stylus" scoped>
    @import '../style/imports'

    .router-link-active {
        border-bottom-color: $primary-color;
    }

    .star-btn {
        display flex;
        justify-content center;
        align-items center;
    }
</style>