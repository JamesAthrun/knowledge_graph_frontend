<template>
    <nav class="menu">
        <router-link :to="{ name: 'home' }" exact>Home</router-link>
        <router-link :to="{ name: 'check' }">Check</router-link>
<<<<<<< HEAD
=======
        <router-link :to="{ name: 'createNew' }">CreateNew</router-link>
>>>>>>> 9f37d0e967b5eaac1b4ccb3220e33700a8fd412a
    </nav>
</template>

<script>
    export default {
        name: "NavMenu"
    }
</script>

<style lang="stylus" scoped>
    @import '../style/imports'

    .router-link-active {
        border-bottom-color: $primary-color;
    }
</style>