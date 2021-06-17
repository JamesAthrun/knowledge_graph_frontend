<template>

    <el-container id="top">

        <el-main id="main-zone">
          <div id="msg-box">
            <div v-for="item of this.chatMsgList" class="msg-item">
              <div v-if="item.position==='left'" class="msg-item-left">
                <el-avatar class="user-avatar" icon="el-icon-user-solid"></el-avatar>
                <label class="user-name">{{ item.name }}：</label>
                <div class="msg-item-text">{{ item.content }}</div>
              </div>
              <div v-else-if="item.position==='right'" class="msg-item-right">
                <el-avatar class="user-avatar" icon="el-icon-user-solid"></el-avatar>
                <label class="user-name">{{ item.name }}：</label>
                <div class="msg-item-text">{{ item.content }}</div>
              </div>
            </div>
          </div>
          <div id="text-box">
            <el-input
                v-model="textToSend"
                placeholder="请输入问题"
                type="textarea">
            </el-input>
            <el-button class="round-button" round style="margin: 15px 20px 15px 80%;align-self: flex-end"
                       v-on:click="send">发送
            </el-button>
          </div>

        </el-main>

    </el-container>

</template>

<script>
import {$ajax} from "../plugins/request";

export default {
  name: "login",
  data() {
    return {
      textToSend: "",
      chatMsgList: [],
    }
  },
  methods: {
    send() {
      this.chatMsgList.push({position: "right", name: this.$cookies.get("user_name"), content: this.textToSend})
      $ajax("KG/ask", "POST", this.textToSend).then((response) => {
        if (response.code != 1) {
          this.chatMsgList.push({position: "left", name: "知识图谱", content: "抱歉，我不知道您在说什么"})
        } else {
          let res = JSON.parse(response.data)
          let tempMsg = ""
          if(res.help!=""){
            tempMsg = res.help + '\n'
          }
          for(let i=0,len=res.table.length; i<len;i ++){
            console.log(res.table[i])
            tempMsg = tempMsg + '（'+ (i+1) + '）' + res.table[i][i] + '\n'
          }
          console.log(tempMsg)
          this.chatMsgList.push({position: "left", name: "知识图谱", content: tempMsg})
        }
        this.textToSend = ""
      })
    },
  },
}

</script>

<style>

#top {
  position: absolute;
  top: 10%;
  left: 10%;
  right: 10%;
  width: 80%;
  height: 90%;
}

#main-zone {
  background-color: rgba(233, 233, 233, 0.5);
  margin: 10px 15px 20px 10px;
  border-radius: 10px;
}

.round-button {
  font-family: 阿里汉仪智能黑体, serif;
  font-size: 30px;
  height: 60px;
  width: 120px;
}

#msg-box {
  display: flex;
  flex-direction: column;
  background-color: rgba(233, 233, 233, 0.4);
  border-radius: 10px;
  height: 70%;
  max-height: 600px;
  overflow-y: scroll;
}

#text-box {
  margin-top: 40px;
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
}

.msg-item {
  display: flex;
  flex-direction: column;
}

.user-avatar {
  background-color: rgba(233, 233, 233, 0.8);
  margin: 5px;
}

.user-name {
  color: rgba(120, 180, 210, 0.8);
  position: relative;
  padding: 5px 0 5px 5px;
}

.msg-item-text {
  padding: 5px 0 5px 5px;
  max-width: 800px;
  word-wrap: break-word;
  word-break: break-all;
  white-space: pre-wrap;
}

.msg-item-left {
  border-radius: 5px;
  background-color: rgba(50, 50, 130, 0.75);
  margin: 10px 10px 10px 10px;
  padding: 5px 5px 5px 5px;
  width: max-content;
  font-family: 阿里汉仪智能黑体, serif;
  font-size: 30px;
  color: aliceblue;;
  align-self: flex-start;
  display: flex;
  flex-direction: row;
}

.msg-item-right {
  border-radius: 5px;
  background-color: rgba(50, 50, 130, 0.75);
  margin: 10px 10px 10px 10px;
  padding: 5px 5px 5px 5px;
  width: max-content;
  font-family: 阿里汉仪智能黑体, serif;
  font-size: 30px;
  color: aliceblue;
  align-self: flex-end;
  /*flex-end是靠右,flex-start靠左*/
  display: flex;
  flex-direction: row;
}
</style>