<template>
  <div class="app-layout">
    <NavMenu/>
    <!--<header class="header">
        <div>
            <img class="img"
                 src="assets/logo.svg"/>
        </div>
        <div>Knowledge Graph</div>
    </header>-->

    <router-view/>
  </div>
</template>

<script>
import NavMenu from "./NavMenu";

export default {
  components: {
    NavMenu
  }
}
</script>

<style lang="stylus">
@import "../style/main"

</style>
<style lang="stylus" scoped>
.header {
  .img {
    width: 64px;
    height: 64px;
  }
}

</style>