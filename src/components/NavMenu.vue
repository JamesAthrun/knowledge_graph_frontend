<template>
  <nav class="menu">
    <router-link :to="{ name: 'home'}" exact>Home</router-link>

  </nav>
</template>

<script>
export default {
}
</script>

<style lang="stylus" scoped>
@import '../style/imports';

.router-link-active {
  border-bottom-color: $primary-color;
}
</style>
