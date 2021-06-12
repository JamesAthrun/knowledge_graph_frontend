<template>
  <div>
    <div style="height:50px;padding-top:6px;padding-left: 30px;padding-right:30px;border-bottom: #efefef solid 1px;">
      <el-button :disabled="level2DataIsloaded" type="success" @click="loadNextLevel2Data">加载第2层数据</el-button>
      <el-button :disabled="level3DataIsloaded" type="success" @click="loadNextLevel3Data">加载第3层数据</el-button>
      <el-button class="c-show-code-button" type="success">
        <el-link href="https://github.com/seeksdream/relation-graph/blob/master/doc/demo/Demo4AdvDynamicData.vue"
                 style="color: #ffffff;" target="_blank">查看代码
        </el-link>
      </el-button>
    </div>
    <div style="height:calc(100vh - 50px);">
      <SeeksRelationGraph
          ref="seeksRelationGraph"
          :on-line-click="onLineClick"
          :on-node-click="onNodeClick"
          :options="graphOptions"
      />
    </div>
    <el-drawer
        :modal="false"
        :visible.sync="isShowCodePanel"
        :with-header="false"
        custom-class="c-drawer-window"
        direction="rtl"
        size="50%"
        title="node option:"
    >
      <iframe frameborder="0" height="100%" scrolling="auto" src="/relation-graph-codes/Demo4Logo.html" style=""
              width="100%"/>
    </el-drawer>
  </div>
</template>

<script>
import SeeksRelationGraph from 'relation-graph'

export default {
  name: 'Demo',
  components: {SeeksRelationGraph},
  data() {
    return {
      level2DataIsloaded: false,
      level3DataIsloaded: false,
      isShowCodePanel: false,
      graphOptions: {
        defaultNodeBorderWidth: 0,
        defaultNodeColor: 'rgba(238, 178, 94, 1)',
        allowSwitchLineShape: true,
        allowSwitchJunctionPoint: true,
        defaultLineShape: 1,
        'layouts': [
          {
            'label': '中心',
            'layoutName': 'center',
            'layoutClassName': 'seeks-layout-center'
          }
        ],
        defaultJunctionPoint: 'border'
        // 这里可以参考"Graph 图谱"中的参数进行设置
      }
    }
  },
  mounted() {
    this.showSeeksGraph()
  },
  methods: {
    showSeeksGraph(query) {
      var __graph_json_data = {
        rootId: '2',
        nodes: [
          {id: '1', name: '节点-1', myicon: 'el-icon-star-on'},
          {id: '2', name: '节点-2', myicon: 'el-icon-setting'},
          {id: '4', name: '节点-4', myicon: 'el-icon-star-on'},
          {id: '6', name: '节点-6', myicon: 'el-icon-setting'},
          {id: '7', name: '节点-7', myicon: 'el-icon-setting'},
          {id: '8', name: '节点-8', myicon: 'el-icon-star-on'},
          {id: '9', name: '节点-9', myicon: 'el-icon-headset'}
        ],
        links: [
          {from: '1', to: '2', text: '投资'},
          {from: '4', to: '2', text: '高管'},
          {from: '6', to: '2', text: '高管'},
          {from: '7', to: '2', text: '高管'},
          {from: '8', to: '2', text: '高管'},
          {from: '9', to: '2', text: '高管'}
        ]
      }
      this.$refs.seeksRelationGraph.setJsonData(__graph_json_data, (seeksRGGraph) => {
        // 这些写上当图谱初始化完成后需要执行的代码
      })
    },
    loadNextLevel2Data() {
      this.level2DataIsloaded = true
      var __graph_json_data = {
        rootId: '2',
        nodes: [
          {id: '3', name: '节点-3', myicon: 'el-icon-setting'},
        ],
        links: []
      }
      this.$refs.seeksRelationGraph.appendJsonData(__graph_json_data, (seeksRGGraph) => {
        // 这些写上当图谱初始化完成后需要执行的代码
      })
    },
    loadNextLevel3Data() {
      this.level3DataIsloaded = true
      var __graph_json_data = {
        rootId: '2',
        nodes: [
          {id: '51', name: '节点-51', myicon: 'el-icon-sunny'},
          {id: '52', name: '节点-52', myicon: 'el-icon-sunny'},
          {id: '53', name: '节点-53', myicon: 'el-icon-sunny'},
          {id: '54', name: '节点-54', myicon: 'el-icon-sunny'},
          {id: '55', name: '节点-55', myicon: 'el-icon-sunny'}
        ],
        links: [
          {from: '5', to: '51', text: '投资1'},
          {from: '5', to: '52', text: '投资'},
          {from: '5', to: '53', text: '投资3'},
          {from: '5', to: '54', text: '投资4'},
          {from: '5', to: '55', text: '投资'}
        ]
      }
      this.$refs.seeksRelationGraph.appendJsonData(__graph_json_data, (seeksRGGraph) => {
        // 这些写上当图谱初始化完成后需要执行的代码
      })
    },
    onNodeClick(nodeObject, $event) {
      console.log('onNodeClick:', nodeObject)
    },
    onLineClick(lineObject, $event) {
      console.log('onLineClick:', lineObject)
    }
  }
}
</script>

<style>
</style>
