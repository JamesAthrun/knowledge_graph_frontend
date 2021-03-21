<template>
    <nav class="menu">
        <router-link :to="{ name: 'home' }" exact>Home</router-link>
        <router-link :to="{ name: 'check' }">Check</router-link>
        <router-link :to="{ name: 'createNew' }">CreateNew</router-link>
        <!--<router-link :to="{ name: 'download' }">Download</router-link>-->
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