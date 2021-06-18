<template>

  <div>
    <div id="pic-box">
      <div id="main-area">
        <div class="curtain">
          <div class="center-container">
            <label id="headline">NKG知识图谱</label>
          </div>
        </div>

      </div>
      <div id="bottom-area">
        <div class="curtain" style="position:relative; display: flex;flex-direction: row;">
          <div v-for="introItem of this.introItemList" id="intro-item">
            <div class="center-container">
              <label id="intro-item-head">{{ introItem.itemHead }}</label>
              <label id="intro-item-body">{{ introItem.itemBody }}</label>
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>

</template>

<script>
import {$fadeIn} from "../plugins/anime"

export default {
  data() {
    return {
      introItemList: [
        {
          itemHead: "可视化",
          itemBody: "我们为您提供多样的知识图谱可视化展示"
        },
        {
          itemHead: "编辑",
          itemBody: "我们为您提供便捷的知识图谱编辑功能"
        },
        {
          itemHead: "版本控制",
          itemBody: "欢迎您和伙伴们共建知识图谱"
        },
      ],
    };
  },
  mounted() {
    $fadeIn(100, 0.5, document.getElementById("pic-box"))
  },
  methods: {

  },
};
</script>

<style scoped>

#main-area {
}

#headline {
  font-size: 90px;
  font-family: 华文新魏;
  color: white;
  margin-top: 280px;
}

#pic-box {
  width: 100%;
  background-image: url("https://gitee.com/lconq/my-img-oss/raw/master/img/bg.png");
  background-repeat: no-repeat;
  background-size: cover;
  height: 100%;
  position: absolute;
  z-index: -1;
}

#bottom-area {
  margin-top: 180px;
}

#intro-item {
  font-family: 华文新魏;
  width: 33%;
  height: 200px;
  padding-top: 100px;
}

#intro-item #intro-item-head {
  color: white;
  font-size: 45px;

}

#intro-item #intro-item-body {
  margin-top: 40px;
  color: white;
  font-size: 25px;
}

.center-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  /*使子组件居中对齐*/
  /*默认是竖直轴线上的居中*/
}

.curtain {
  background-color: rgba(10, 10, 10, 0.3);
  height: 100%;
  width: 2000px;
}

</style>