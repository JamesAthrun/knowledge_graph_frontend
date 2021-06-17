<template>

  <main class="create">
    <h1>新建知识图谱</h1>
    <div class="howToCreate" v-if="selectBox">
      <el-button type="primary" @click="leadInJSON" class="createButton">通过JSON文件导入</el-button>
      <el-button type="primary" @click="save" class="createButton">手动创建</el-button>
    </div>
    <div v-if="createByJSON">
      <div class="upload">
        <el-upload
                :before-remove="beforeRemove"
                :file-list="fileList"
                :limit="1"
                :on-exceed="handleExceed"
                :on-preview="handlePreview"
                :on-remove="handleRemove"
                :on-success="onSuccess"
                action="KG/uploadFile"
                class="upload-demo"
                drag>
          <i class="el-icon-upload"/>
          <div class="el-upload__text">将文件拖到此处</div>
          <div slot="tip" class="el-upload__tip">只能上传json文件，且不超过5MB</div>
        </el-upload>
        <div class="checkBox">
          <el-button type="primary" @click="cancel">取消</el-button>
          <el-button type="primary" @click="save">确定</el-button>
        </div>
      </div>
    </div>


  </main>
</template>

<script>
import baseUrl from "../main"
import {$ajax} from "../plugins/request";

export default {
  data() {
    return {
      createByWhiteBoard: false,
      createByJSON: false,
      uploadUrl:baseUrl+"KG/uploadFile",
      fileList: [],
      uploadData: [],
      newGraphData: [],
    };
  },

  methods: {
    leadInJSON(){
      if(this.$cookies.get("user_name") == null){
        this.$message({
          type: 'error',
          message: '您还没有登录！'
        });
      }
      else{
        this.createByJSON = true;
      }
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    handleExceed(files, fileList) {
      this.$message.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
    },
    beforeRemove(file, fileList) {
      this.fileList = [];
    },
    onSuccess(res, file, fileList) {
      let reader = new FileReader()
      reader.readAsText(file.raw, 'utf-8')
      reader.onload = ((e) => {
        let textStr = (e.target.result).toString()
        this.uploadData = JSON.parse(textStr)
      })
    },
    save() {
      $ajax("KG/createGraphByJsonStr", "POST",
          JSON.stringify(this.uploadData)
      ).then(() => {
        console.log("ok")
        this.$message({
          type: 'success',
          message: '您还没有登录！'
        });
        this.$router.push("/user/myKG")
      })
    },
    cancel(){
      this.createByJSON=false;
      this.createByWhiteBoard = false;
    }
  },
  computed: {
    selectBox(){
      console.log(!this.createByJSON && !this.createByWhiteBoard)
      return !this.createByJSON && !this.createByWhiteBoard;
    },
  }
}
</script>

<style>
  .howToCreate{
    position: relative;
    width: 15%;
    left: 42.5%;
    top: 100px;
  }
  .createButton{
    position: relative;
    width: 95%;
    margin-left: 10px;
    margin-top: 100px;
  }
  .upload {
    position: relative;
    width: 20%;
    left: 40%;
    top: 100px;
  }
  .checkBox{
    position: relative;
    margin-top: 10px;
    left: 25%;
  }
</style>