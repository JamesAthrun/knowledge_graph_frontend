<template>

  <main class="create">
    <h1>新建知识图谱</h1>
    <div class="howToCreate" v-if="selectBox">
      <el-button type="primary" @click="leadInJSON" class="createButton">通过JSON文件导入</el-button>
      <el-button type="primary" @click="newWhiteBoard" class="createButton">手动创建</el-button>
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
                :action=uploadUrl
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
    <div v-if="createByWhiteBoard">
      <el-form class="createForm" label-width="120px">
        <el-form-item label="知识图谱名称" style="width:422px;height:51px;" required>
          <el-input v-model="graphName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="描述" style="width:422px;height:51px;" required>
          <el-input v-model="graphDes" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="用户组" style="width:422px;height:51px;" required>
          <el-select v-model="holdingGroup" value-key="id">
            <el-option v-for="item in groupList" :key="item.groupId" :label="item.name" :value="item.groupId">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="您的权限" style="width:422px;height:51px;" required>
          <el-select v-model="creatorRight" value-key="id">
            <el-option v-for="right in rightList" :key="right.auth" :label="right.des" :value="right.auth">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="用户组权限" style="width:422px;height:51px;" required>
          <el-select v-model="groupRight" value-key="id">
            <el-option v-for="right in rightList" :key="right.auth" :label="right.des" :value="right.auth">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="公开权限" style="width:422px;height:51px;" required>
          <el-select v-model="publicRight" value-key="id">
            <el-option v-for="right in rightList" :key="right.auth" :label="right.des" :value="right.auth">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm">下一步</el-button>
          <el-button @click="cancel">取消</el-button>
        </el-form-item>

      </el-form>
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
      groupList: [],
      defaultGraph: {
        "groupId": "",
        "authority": "210",
        "item": [
          {
            "title": "A1",
            "comment": "默认评论",
            "id": "1",
            "name": "始祖头",
            "division": "Abstract"
          },
          {
            "title": "A2",
            "comment": "默认评论",
            "id": "2",
            "name": "始祖关系",
            "division": "Abstract"
          },
          {
            "title": "A3",
            "comment": "默认评论",
            "id": "3",
            "name": "始祖尾",
            "division": "Abstract"
          }
        ],
        "description": "",
        "triple": [
          {
            "head": "1",
            "relation": "2",
            "tail": "3"
          }
        ],
        "name": ""
      },
      rightList: [{auth: 2,des:"可写"}, {auth: 1, des:"可读"}, {auth: 0, des:"无权限"}],
      graphName: "",
      holdingGroup: "",
      creatorRight: 2,
      groupRight: 1,
      publicRight: 0,
      graphDes: "",
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
    newWhiteBoard(){
      if(this.$cookies.get("user_name") == null){
        this.$message({
          type: 'error',
          message: '您还没有登录！'
        });
      }
      else{
        this.createByWhiteBoard = true;
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
      ).then((res) => {
        if(res.code==1){
          console.log("ok")
          this.$message({
            type: 'success',
            message: '创建成功，请点击进入知识图谱查看'
          });
          this.$router.push("/user/myKG")
        }
        else{
          this.$message({
            type: 'error',
            message: '创建失败'
          });
        }
      })
    },
    submitForm(){
      this.defaultGraph.name = this.graphName
      this.defaultGraph.description = this.graphDes
      this.defaultGraph.groupId = this.holdingGroup+""
      this.defaultGraph.authority = ""+this.creatorRight+""+this.groupRight+""+this.publicRight
      console.log(this.defaultGraph)
      $ajax("KG/createGraphByJsonStr", "POST",
              JSON.stringify(this.defaultGraph)
      ).then((res) => {
        if(res.code==1){
          console.log("ok")
          this.$message({
            type: 'success',
            message: '创建成功，请点击进入知识图谱编辑'
          });
          this.$router.push("/user/myKG")
        }
        else{
          this.$message({
            type: 'error',
            message: '创建失败'
          });
        }
      })
    },
    cancel(){
      this.createByJSON=false;
      this.createByWhiteBoard = false;
    },
  },
  async created(){
    if(this.$cookies.get("user_id") != null){
      $ajax("getGroupList", "GET", {userId: this.$cookies.get("user_id")}
      ).then(res => {
        if (res.code == 1) {
          this.groupList = JSON.parse(res.data)
          console.log(this.groupList)
        }
      })
    }
  },
  computed: {
    selectBox(){
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
  .createForm{
    background: white;
    position: relative;
    width: 30%;
    left: 35%;
    top: 50px;
  }
</style>