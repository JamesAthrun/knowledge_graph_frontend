<template>
  <main class="myHome">
    <el-row>
      <el-col class="vermenu">
        <VerticalNav/>
      </el-col>
      <el-col>
        <h1 class="headLine">你好,{{ this.$state.user }}</h1>
      </el-col>
    </el-row>
  </main>
</template>

<script>
import VerticalNav from "./VerticalNav";

export default {
  data() {
    return {
      graphList: null,
    }
  },
  methods: {

  },
  async created() {

  },
  components: {
    VerticalNav
  }
}
</script>

<style scoped>

.vermenu {
  width: 15%;
}
  .headLine{
    font-size: 60px;
    font-family: 华文新魏;
    color: black;
  }
</style>