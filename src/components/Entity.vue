<template>
  <div>
    <div id="main-area">
      <div ref="myPage" style="height:calc(100vh - 50px);">
        <el-row style="top:30px; margin-bottom:30px;">
          <el-button v-if="isEditMode==false" round style="left: 0px; position: absolute;" type="primary"
                     @click="showTree">显示树图
          </el-button>
        </el-row>
        <el-row style="top:30px; margin-bottom:30px;">
          <el-button v-if="isEditMode==false" icon="el-icon-edit-outline" round style="right: 0px; position: absolute;"
                     type="primary" @click="startEdit">开始编辑
          </el-button>
        </el-row>
        <el-dialog v-if="addNewNode" :visible="addNode" title="添加节点" width="50%">
          <AddNodeModal v-show="addNode" @cancel="cancelNewNode" @submitForm='createNewNode'></AddNodeModal>
        </el-dialog>

        <el-dialog v-if="addNewLine" :visible="addLine" title="添加关系" width="50%">
          <AddLineModal v-show="addLine" :displayData="displayData" :propertyList="propertyList" @cancel="cancelNewLine"
                        @submitForm='createNewLine'></AddLineModal>
        </el-dialog>

        <el-row v-show="isEditMode">
          <el-button icon="el-icon-plus" plain type="primary" @click="addNewNode">添加节点</el-button>
          <el-button icon="el-icon-plus" plain type="primary" @click="addNewLine">添加关系</el-button>

          <el-button icon="el-icon-edit" plain type="warning" @click="editExistedNode">修改节点</el-button>
          <el-button icon="el-icon-edit" plain type="warning" @click="editExistedRelation">修改关系</el-button>

          <el-button icon="el-icon-minus" plain type="danger" @click="deleteNode">删除节点</el-button>
          <el-button icon="el-icon-minus" plain type="danger" @click="deleteLine">删除关系</el-button>

          <el-button v-if="isEditMode==true" icon="el-icon-check" round style="right: 0px; position: absolute;"
                     type="success" @click="endEdit">上传变更
          </el-button>
        </el-row>

        <SeeksRelationGraph
            ref="seeksRelationGraph"
            :on-line-click="onLineClick"
            :on-node-click="onNodeClick"
            :options="graphOptions"
            style="margin-top: 100px; height: 70%; width: 100%; float: right;">
        </SeeksRelationGraph>
      </div>
    </div>
    <div v-if="isShowNodeTipsPanel == true"
         :style="{left: nodeMenuPanelPosition.x + 'px', top: nodeMenuPanelPosition.y + 'px' }"
         style="z-index: 999;padding:10px;background-color: #ffffff;border:#eeeeee solid 1px;box-shadow: 0px 0px 8px #cccccc;position: absolute;">
      <div v-if="isEditMode == false">
        <el-button icon="el-icon-close" mini round style="top:0px; right:0px; position: absolute; border:none;"
                   @click="hideNodeTips"></el-button>
        <div style="line-height: 25px;padding-left: 10px;color: #888888;font-size: 12px;">节点：{{ currentNode.text }}
        </div>
        <div class="c-node-menu-item">编号:{{ currentNode.id }}</div>
        <div v-if="currentNode.data.name != ''" class="c-node-menu-item">全名:{{ currentNode.data.name }}</div>
        <div class="c-node-menu-item">title:{{ currentNode.data.title }}</div>
      </div>
      <div v-if="isEditMode == true">
        <div v-if="isDeleteNode" style="margin-left: 0px">
          <div style="line-height: 25px;padding-left: 10px;color: #888888;font-size: 12px;">节点：{{ currentNode.text }}
          </div>
          <div class="c-node-menu-item">id:{{ currentNode.id }}</div>
          <div class="c-node-menu-item">content:{{ currentNode.data.name }}</div>
          <el-button type="primary" @click="commitDeleteNode(currentNode)">删除</el-button>
          <el-button @click="hideNodeTips">取消</el-button>
        </div>
        <div v-else>
          <el-form :model="currentNode">
            <el-form-item label="缩写" style="width:422px;height:51px;">
              <el-input v-model="currentNode.text" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="id" style="width:422px;height:51px;">
              <el-input v-model="currentNode.id" autocomplete="off" disabled></el-input>
            </el-form-item>
            <el-form-item label="具体内容" style="width:422px;height:51px;">
              <el-input v-model="currentNode.data.name" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="title" style="width:422px;height:51px;">
              <el-input v-model="currentNode.data.title" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="comment" style="width:422px;height:51px;">
              <el-input v-model="currentNode.data.comment" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item style="margin-top: 80px">
              <el-button type="primary" @click="commitEditExistedNode">更改</el-button>
              <el-button @click="exitEditExistedNode">取消</el-button>
            </el-form-item>
          </el-form>
        </div>

      </div>

    </div>
    <div v-if="isShowLineTipsPanel"
         :style="{left: lineMenuPanelPosition.x + 'px', top: lineMenuPanelPosition.y + 'px' }"
         style="z-index: 999;padding:10px;background-color: #ffffff;border:#eeeeee solid 1px;box-shadow: 0px 0px 8px #cccccc; position: absolute;">
      <div v-if="isEditMode == false">
        <el-button icon="el-icon-close" mini round style="top:0px; right:0px; position: absolute; border:none;"
                   @click="hideLineTips"></el-button>
        <div style="line-height: 25px;padding-left: 10px;color: #888888;font-size: 12px;">
          关系名称：{{ currentLine.relations[0].text }}
        </div>
        <div class="c-node-menu-item">content:{{ currentLine.relations[0].data.name }}</div>
        <div class="c-node-menu-item">from:{{ currentLine.fromNode.id }}</div>
        <div class="c-node-menu-item">to:{{ currentLine.toNode.id }}</div>
      </div>
      <div v-else>
        <div v-if="isDeleteLine">
          <div style="line-height: 25px;padding-left: 10px;color: #888888;font-size: 12px;">
            关系名称：{{ currentLine.relations[0].text }}
          </div>
          <div class="c-node-menu-item">content:{{ currentLine.relations[0].data.name }}</div>
          <div class="c-node-menu-item">from:{{ currentLine.fromNode.id }}</div>
          <div class="c-node-menu-item">to:{{ currentLine.toNode.id }}</div>
          <el-button type="primary" @click="commitDeleteLine(currentLine)">删除</el-button>
          <el-button @click="hideLineTips">取消</el-button>
        </div>
        <div v-else>
          <el-form :model="currentLine">
            <el-form-item label="关系简称" style="width:422px;height:51px;">
              <el-input v-model="currentLine.relations[0].text" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="具体内容" style="width:422px;height:51px;">
              <el-input v-model="currentLine.relations[0].data.name" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="from" style="width:422px;height:51px;">
              <el-input v-model="currentLine.fromNode.id" autocomplete="off" disabled></el-input>
            </el-form-item>
            <el-form-item label="to" style="width:422px;height:51px;">
              <el-input v-model="currentLine.toNode.id" autocomplete="off" disabled></el-input>
            </el-form-item>
            <el-form-item style="margin-top: 80px">
              <el-button type="primary" @click="commitEditExistedLine">更改</el-button>
              <el-button @click="exitEditExistedLine">取消</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>


    </div>

  </div>

</template>

<script>
import SeeksRelationGraph from "relation-graph";
import AddNodeModal from "./AddNodeModal";
import AddLineModal from "./AddLineModal";
import {$ajax} from "../plugins/request";

export default {
  name: 'Demo',
  components: {
    SeeksRelationGraph,
    AddNodeModal,
    AddLineModal,
  },
  data() {
    return {
      isShowCodePanel: false,
      isShowNodeTipsPanel: false,
      nodeMenuPanelPosition: {x: 0, y: 0},
      currentNode: {},
      currentNodeOrigin: {},

      isShowLineTipsPanel: false,
      lineMenuPanelPosition: {x: 0, y: 0},
      currentLine: {},
      currentLineOrigin: {},

      isEditMode: false,
      currentEditMode: 'null',

      addNode: false,
      newNode: '',

      addLine: false,
      newLine: '',

      isEditExistedNode: false,
      isEditExistedLine: false,

      isDeleteNode: false,
      isDeleteLine: false,

      routeParamId: '',
      root: '',
      displayData: [],
      displayLine: [],
      graphOptions: {
        allowSwitchLineShape: true,
        allowSwitchJunctionPoint: true,
        defaultJunctionPoint: 'border',
        // disableZoom: true,
        // 这里可以参考"Graph 图谱"中的参数进行设置
      },

      tableId: this.$cookies.get("table_id"),
      currentCreateId: 1,
      user: this.$state.user,
      propertyList: [],

      commitOperationList: [],
      isolatedNodeList: [],
    }
  },
  mounted() {

  },

  methods: {
    showSeeksGraph(query) {
      var __graph_json_data = {
        rootId: this.root,
        nodes: this.displayData,
        links: this.displayLine,
      }
      // 以上数据中的node和link可以参考"Node节点"和"Link关系"中的参数进行配置
      this.$refs.seeksRelationGraph.setJsonData(__graph_json_data, (seeksRGGraph) => {
        // Called when the relation-graph is completed
      })
    },
    onNodeClick(nodeObject, $event) {
      console.log('onNodeClick:', nodeObject)
      this.hideLineTips()
      this.showNodeTips(nodeObject, $event)
    },
    onLineClick(lineObject, $event) {
      console.log('onLineClick:', lineObject)
      this.hideNodeTips()
      this.showLineTips(lineObject, $event)
    },
    startEdit() {
      console.log("start edit")
      this.isEditMode = true
      this.hideLineTips()
      this.hideNodeTips()
    },
    async endEdit() {
      console.log("end edit")
      this.isEditMode = false
      this.isDeleteLine = false
      this.isDeleteNode = false

      let taskList = []
      for (let i = 0; i < this.commitOperationList.length; i++) {
        let commitTask = () => {
          console.log("commit" + i)
          return $ajax("KG/commitChange", 'POST', JSON.stringify(this.commitOperationList[i]))
        }
        taskList.push(commitTask)
      }
      let confirmTask = () => {
        console.log("confirm")
        return $ajax("KG/confirmChange", "GET", {userName: this.user})
      }
      taskList.push(confirmTask)

      for (let i = 0; i < taskList.length; i++) {
        let res = await taskList[i]()
        console.log(res)
      }

    },
    showNodeTips(nodeObject, $event) {
      this.currentNode = nodeObject
      this.currentNodeOrigin.data = JSON.parse(JSON.stringify(nodeObject.data))
      this.currentNodeOrigin.text = this.currentNode.text

      var _base_position = this.$refs.myPage.getBoundingClientRect()
      console.log('showNodeMenus:', $event, _base_position)
      this.isShowNodeTipsPanel = true
      this.nodeMenuPanelPosition.x = $event.clientX - _base_position.x + 10
      this.nodeMenuPanelPosition.y = $event.clientY - _base_position.y + 10
    },
    hideNodeTips(nodeObject, $event) {
      this.isShowNodeTipsPanel = false
      this.isDeleteNode = false
    },
    showLineTips(lineObject, $event) {
      this.currentLine = lineObject
      this.currentLineOrigin.text = this.currentLine.relations[0].text
      this.currentLineOrigin.data = JSON.parse(JSON.stringify(this.currentLine.relations[0].data))
      var _base_position = this.$refs.myPage.getBoundingClientRect()
      console.log('showNodeMenus:', $event, _base_position)
      this.isShowLineTipsPanel = true
      this.lineMenuPanelPosition.x = $event.clientX - _base_position.x + 10
      this.lineMenuPanelPosition.y = $event.clientY - _base_position.y + 10
    },
    hideLineTips(lineObject, $event) {
      this.isShowLineTipsPanel = false
      this.isDeleteLine = false
    },

    addNewNode() {
      this.addNode = true
      this.newNode = {
        id: '',
        text: '',
        data:
            {
              name: '',
              comment: '',
              division: '',
              tableId: this.tableId,
              title: '',
            }
      }
    },
    createNewNode(form) {
      this.addNode = false
      this.newNode.text = form.text
      this.newNode.data.name = form.name

      this.newNode.id = this.currentCreateId.toString()
      this.currentCreateId += 1

      //console.log(this.newNode)

      this.displayData.push(this.newNode)

      var __graph_json_data = {
        rootId: this.rootId,
        nodes: [
          this.newNode
        ],
        links: [],
      }
      // 以上数据中的node和link可以参考"Node节点"和"Link关系"中的参数进行配置
      this.$refs.seeksRelationGraph.appendJsonData(__graph_json_data, (seeksRGGraph) => {
        // Called when the relation-graph is completed
      })

      this.isolatedNodeList.push(this.newNode)

      let commitForm = {
        "comment": "",
        "division": "Class",
        "headId": "",
        "id": this.newNode.id,
        "name": this.newNode.text,
        "op": 'createItem',
        "relationId": "",
        "tableId": this.tableId,
        "tailId": "",
        "title": "",
        "user": this.user
      }
      this.commitOperationList.push(commitForm)

    },
    cancelNewNode() {
      this.addNode = false
    },

    addNewLine() {
      this.addLine = true
      this.newLine = {
        from: '',
        to: '',
        text: '',
      }
    },

    isIsolatedNode(id) {
      for (var i = 0; i < this.isolatedNodeList.length; i++) {
        if (id == this.isolatedNodeList[i].id) {
          return true
        }
      }
    },

    createNewLine(form) {
      this.addLine = false
      this.newLine.from = form.from
      this.newLine.to = form.to
      this.newLine.text = form.text

      this.displayLine.push(this.newLine)

      var __graph_json_data = {
        rootId: this.rootId,
        nodes: [],
        links: [
          this.newLine
        ],
      }
      // 以上数据中的node和link可以参考"Node节点"和"Link关系"中的参数进行配置
      this.$refs.seeksRelationGraph.appendJsonData(__graph_json_data, (seeksRGGraph) => {
        // Called when the relation-graph is completed
      })

      //fromNode或者toNode中是否包含新建节点, 如果包含就createItem
      if (this.isIsolatedNode(this.newLine.from) || this.isIsolatedNode(this.newLine.to)) {

      }

      if (form.isNew == false) {
        let commitForm = {
          "comment": "",
          "division": "",
          "headId": this.newLine.from,
          "id": "",
          "name": "",
          "op": 'createLink',
          "relationId": form.id,
          "tableId": this.tableId,
          "tailId": form.to,
          "title": "",
          "user": this.user
        }
        this.commitOperationList.push(commitForm)
      } else {
        this.newLine.id = this.currentCreateId.toString()
        this.currentCreateId += 1

        let commitForm = {
          "comment": form.comment,
          "division": 'Property',
          "headId": this.newLine.from,
          "id": this.newLine.id,
          "name": form.name,
          "op": 'createItem',
          "relationId": this.newLine.id,
          "tableId": this.tableId,
          "tailId": form.to,
          "title": form.title,
          "user": this.user
        }
        this.commitOperationList.push(commitForm)
      }


    },
    cancelNewLine() {
      this.addLine = false
    },

    editExistedNode() {
      this.$message({
        message: '请点击图中节点进行修改',
        type: 'warning'
      });
      this.isEditExistedNode = true

    },
    commitEditExistedNode() {
      let commitForm = {
        "comment": this.currentNode.comment,
        "division": this.currentNode.division,
        "headId": "",
        "id": this.currentNode.id,
        "name": this.currentNode.text,
        "op": 'updateItem',
        "relationId": "",
        "tableId": this.tableId,
        "tailId": "",
        "title": this.currentNode.title,
        "user": this.user
      }
      this.commitOperationList.push(commitForm)

      this.isShowNodeTipsPanel = false
      console.log(this.isShowNodeTipsPanel)
    },
    exitEditExistedNode() {
      this.currentNode.text = this.currentNodeOrigin.text
      this.currentNode.data = JSON.parse(JSON.stringify(this.currentNodeOrigin.data))
      this.currentNodeOrigin = {}
      this.hideNodeTips()
    },

    editExistedRelation() {
      this.$message({
        message: '请点击图中关系进行修改',
        type: 'warning'
      });
    },
    commitEditExistedLine() {
      let commitForm = {
        "comment": this.currentLine.relations[0].data.comment,
        "division": this.currentLine.relations[0].data.division,
        "headId": "",
        "id": this.currentLine.relations[0].data.id,
        "name": this.currentLine.relations[0].data.name,
        "op": 'updateItem',
        "relationId": "",
        "tableId": this.tableId,
        "tailId": "",
        "title": this.currentLine.relations[0].data.title,
        "user": this.user
      }
      this.commitOperationList.push(commitForm)

      this.hideLineTips()
    },
    exitEditExistedLine() {
      this.currentLine.relations[0].text = this.currentLineOrigin.text
      this.currentLine.relations[0].data = JSON.parse(JSON.stringify(this.currentLineOrigin.data))
      this.currentLineOrigin = {}
      this.hideLineTips()
    },

    deleteNode() {
      this.$message({
        message: '请点击图中节点进行删除',
        type: 'warning'
      });


      this.isDeleteNode = true
    },

    commitDeleteNode(nodeObject) {
      this.$confirm('此操作将永久删除该节点, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'success',
          message: '删除成功!'
        });

        //在前端进行删除
        this.$refs.seeksRelationGraph.removeNodeById(nodeObject.id)

        let commitForm = {
          "comment": "",
          "division": "",
          "headId": "",
          "id": this.currentNode.id,
          "name": "",
          "op": 'deleteItem',
          "relationId": "",
          "tableId": this.tableId,
          "tailId": "",
          "title": "",
          "user": this.user
        }
        this.commitOperationList.push(commitForm)


      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });

      this.hideNodeTips(nodeObject)
    },

    deleteLine() {
      this.$message({
        message: '请点击图中关系进行删除',
        type: 'warning'
      });
      this.isDeleteLine = true
    },
    commitDeleteLine(lineObject) {
      this.$confirm('此操作将永久删除该此关系, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'success',
          message: '删除成功!'
        });


        let commitForm = {
          "comment": "",
          "division": "",
          "headId": this.currentLine.fromNode.id,
          "id": "",
          "name": "",
          "op": 'deleteLink',
          "relationId": this.currentLine.relations[0].data.id,
          "tableId": this.tableId,
          "tailId": this.currentLine.toNode.id,
          "title": "",
          "user": this.user
        }

        this.commitOperationList.push(commitForm)
        //console.log('确认删除')

        lineObject.isHide = true

      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
        //console.log('取消删除')
      });
      this.isDeleteLine = false
      this.hideLineTips(lineObject)
    },

    showTree() {
      this.$router.push(`/entity/tree/${this.routeParamId}`);
    }

  },

  async created() {
    console.log(document.cookie)
    this.routeParamId = this.$route.params.id
    $ajax('KG/getGraphData', "GET", {id: this.routeParamId, ver: "0"}).then(
        (response) => {
          console.log(response)
          this.displayData = JSON.parse(response.data).itemData

          let colorList = ['#ff0000', '#0000ff', '#007f00']

          for (var i = 0; i < this.displayData.length; i++) {
            this.displayData[i].nodeShape = 0
            this.displayData[i].color = colorList[parseInt(this.displayData[i].nodeshape) - 1]
          }

          this.displayLine = JSON.parse(response.data).link
          this.root = this.displayData[0].id

          console.log(this.displayData)
          console.log(this.displayLine)
          console.log(this.root)

          this.showSeeksGraph()

          this.propertyList.push(this.displayLine[0])
          for (var i = 0; i < this.displayLine.length; i++) {
            let flag = true
            let property = this.displayLine[i]
            for (var j = 0; j < this.propertyList.length; j++) {
              let existed = this.propertyList[j]
              if (property.data.id == existed.data.id) {
                flag = false
                break;
              }
            }
            if (flag == true) {
              this.propertyList.push(property)
            }
          }
          console.log(this.user)
        }
    )

  }

}
</script>

<style>
.c-node-menu-item {
  line-height: 30px;
  padding-left: 10px;
  cursor: pointer;
  color: #444444;
  font-size: 14px;
  border-top: #efefef solid 1px;
}

.c-node-menu-item:hover {
  background-color: rgba(66, 187, 66, 0.2);
}

#main-area {
  position: fixed;
  height: 90%;
  width: 100%;
  background-color: rgba(18, 182, 214, 0.05);
}
</style>
