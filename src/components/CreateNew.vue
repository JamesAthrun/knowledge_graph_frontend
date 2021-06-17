<template>

  <main class="create">
    <h1>Create a new knowledge graph</h1>
    <div class="upload">
      <el-upload
          :before-remove="beforeRemove"
          :file-list="fileList"
          :limit="1"
          :on-exceed="handleExceed"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :on-success="onSuccess"
          :action= uploadUrl
          class="upload-demo"
          drag>
        <i class="el-icon-upload"/>
        <div class="el-upload__text">将文件拖到此处</div>
        <div slot="tip" class="el-upload__tip">只能上传json文件，且不超过5MB</div>
      </el-upload>
      <el-button type="primary" @click="save">确定</el-button>
      <div class="Echarts">
        <div id="main" style="width: 800px;height:800px;"></div>
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
      uploadUrl:baseUrl+"KG/uploadFile",
      fileList: [],
      uploadData: [],
      newGraphData: [],
      headers: {'Content-type': 'application/json; charset=UTF-8',}
    };
  },

  methods: {
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
      })
    },
  }
}
</script>

<style>
.upload {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>