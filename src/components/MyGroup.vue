<template>
  <main>
    <el-row>
      <el-col class="vermenu">
        <VerticalNav/>
      </el-col>
      <el-col class="groupTag">
        <dt class="search-title">我加入的用户组</dt>
        <el-tag
            v-for="group in groupList"
            :key="group.groupId"
            style="margin-right:100px; margin-bottom:50px; font-size: 18px"
            type="success"
            @click.native="viewDetail(group.groupId)"
        >{{ group.name }}
        </el-tag>
      </el-col>
      <el-col class="createGroup">
        <el-button type="text" @click="clickToCreate=true">新建用户组</el-button>
      </el-col>
      <el-col class="createGroup">
        <el-button type="text" @click="clickToAdd=true">加入用户组</el-button>
      </el-col>
    </el-row>
    <el-dialog
        :before-close="handleClose"
        :visible.sync="clickToCreate"
        title="新建用户组"
        width="30%">
      <el-form
          ref="formInfo"
          :model="formInfo"
          class="demo-form-inline"
          label-width="80px"
      >
        <el-form-item label="组名：" prop="name" required>
          <el-input v-model="formInfo.name"></el-input>
        </el-form-item>
        <el-form-item label="描述：" prop="description" required>
          <el-input v-model="formInfo.description"></el-input>
        </el-form-item>
        <el-form-item style="text-align: right;">
          <el-button @click="clickToCreate = false">取 消</el-button>
          <el-button type="primary" @click="submitCreate">确 定</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <el-dialog
            :before-close="handleClose"
            :visible.sync="clickToAdd"
            title="加入用户组"
            width="30%">
      <el-form
              ref="formInfo"
              :model="formInfo"
              class="demo-form-inline"
              label-width="80px"
      >
        <el-form-item label="组名：" prop="name" required>
          <el-input v-model="formInfo.name"></el-input>
        </el-form-item>
        <el-form-item style="text-align: right;">
          <el-button @click="clickToAdd = false">取 消</el-button>
          <el-button type="primary" @click="submitAdd">确 定</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <el-dialog
            :visible.sync="viewGroup"
            title="用户组详情"
            width="30%">
      <sapn>组名：{{groupName}}<br></sapn>
      <sapn>组号：{{groupId}}<br></sapn>
      <sapn>描述：{{groupDes}}<br></sapn>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="closeView">确 定</el-button>
      </span>
    </el-dialog>
  </main>

</template>

<script>
import VerticalNav from "./VerticalNav";
import {$ajax} from "../plugins/request";

export default {
  name: "MyGroup",
  data() {
    return {
      isAuthorized: true,
      groupList: null,
      clickToCreate: false,
      clickToAdd: false,
      viewGroup: false,
      formInfo: {name: '', description: ''},
      groupName: "",
      groupId: "",
      groupDes: ""
    }
  },
  components: {
    VerticalNav
  },
  methods: {
    viewDetail(gId) {
      for(let i=0,len=this.groupList.length; i<len; i++){
        if(this.groupList[i].groupId==gId){
          this.groupName = this.groupList[i].name
          this.groupId = gId
          this.groupDes = this.groupList[i].description
          this.viewGroup = true
        }
      }
    },
    closeView(){
      this.groupName = ""
      this.groupId = ""
      this.groupDes = ""
      this.viewGroup = false
    },
    handleClose(done) {
      this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {
          });
    },
    submitCreate() {
      $ajax('/addGroup', 'POST', JSON.stringify(this.formInfo)).then(res => {
        if (res.code != 1) {
          this.$alert('创建失败')
          console.log(res)
        } else {
          this.formInfo = {name: '', description: ''}
          this.clickToCreate = false
          this.$message({
            type: 'success',
            message: '创建成功'
          })
          console.log('ok')
        }
      })
    },
    submitAdd(){

    }
  },
  async created() {
    $ajax("getGroupList", "GET", {userId: this.$cookies.get("user_id")}
    ).then(res => {
      if (res.code != 1) {
        this.isAuthorized = false
      } else {
        this.groupList = JSON.parse(res.data)
        console.log(this.groupList)
      }
      if (!this.isAuthorized) {
        this.$router.go(-1)
        this.$message({
          type: 'error',
          message: '您没有权限访问用户组！'
        });
      }
    })
  }
}
</script>

<style scoped>
.vermenu {
  width: 15%;
}

.groupTag {
  width: 60%;
  padding: 30px;
}

.search-title {
  color: #232323;
  font-size: 15px;
  margin-bottom: 20px;
}

.createGroup {
  width: 25%;
  display: flex;
  justify-content: center;
  align-items: center;
}


</style>