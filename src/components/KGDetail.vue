<template>
  <main class="KGDetail">
    <el-row>
      <el-col class="left">
        <el-row class="description">
          <h1>{{ this.tableName }}</h1>
          <span>{{ this.graphInfo.description }}</span>
        </el-row>
        <el-row class="functionArea">
          <div class="buttonStyle">
            <button style="background: white;border: none;" v-on:click="goToSearch">
              <i class="el-icon-search" style="color: deepskyblue;height: 50px;width: 50px"/>
            </button>
          </div>
          <div class="buttonStyle">
            <button style="background: white;border: none;" v-on:click="goToQuestion">
              <i class="el-icon-question" style="color: deepskyblue; height: 50px; width: 50px"/>
            </button>
          </div>
        </el-row>
      </el-col>
      <el-col class="right">
        <div class="history">
          <el-table
              ref="table"
              :data="graphHistory"
              :show-header="false"
              @row-dblclick="rowback"
              fit
          >
            <el-table-column label="版本号" prop="ver"></el-table-column>
            <el-table-column label="详情" prop="detail" width="300" :show-overflow-tooltip='true'></el-table-column>
            <el-table-column label="提交时间" prop="time" sortable></el-table-column>
            <el-table-column
                :filter-method="filterHandler"
                :filters="[{ text: '', value: '' }, {text: '已失效', value: '已失效'}]"
                label="有效性"
                prop="drop"
            ></el-table-column>
          </el-table>
        </div>
      </el-col>
    </el-row>


  </main>
</template>

<script>
import {$ajax} from "../plugins/request";

export default {
  data() {
    return {
      isAuthorized: true,
      tableId: null,
      tableName: "",
      graphInfo: {},
      graphHistory: null
    }
  },

  methods: {
    goToSearch() {
      this.$router.push({path: '/search'})
    },
    goToQuestion() {
      this.$router.push({path: '/question'})
    },
    rowback(row) {
      if (row.drop == "") {
        this.$confirm('确认要进行回滚操作吗？')
            .then(_ => {
              this.$confirm('该操作不可逆，是否确认继续进行？')
                  .then(_ => {
                    $ajax("KG/rollBackChange", "GET", {ver: row.ver}
                    ).then(res => {
                      if (res.code == 1) {
                        this.$cookies.set("table_latestVer", row.ver)
                        this.$message({
                          type: 'success',
                          message: '回滚成功，请刷新页面'
                        })
                      } else {
                        this.$message({
                          type: 'error',
                          message: '回滚失败'
                        })
                      }
                    })
                  })
                  .catch(_ => {
                  });
            })
            .catch(_ => {
            });
      }
    },
    filterHandler(value, row, column) {
      const property = column['property'];
      return row[property] === value;
    }
  },

  async created() {
    this.tableId = this.$cookies.get("table_id")
    $ajax("KG/getGraphInfo", "GET", {tableId: this.tableId}
    ).then(res => {
      if (res.code != 1) {
        this.$cookies.remove("table_id")
        this.$cookies.remove("table_latestVer")
        this.$router.go(-1)
        this.$message({
          type: 'error',
          message: '您没有权限访问该知识图谱！'
        });
      } else {
        this.graphInfo = JSON.parse(res.data)
        this.tableName = this.graphInfo.name
      }
    })
    $ajax("KG/getGraphHistory", "GET"
    ).then(res => {
      if (res.code != 1) {
      } else {
        this.graphHistory = JSON.parse(res.data)
        // this.graphHistory.detail
        for (let i = 0, len = this.graphHistory.length; i < len; i++) {
          if (this.graphHistory[i].drop == "0") {
            this.graphHistory[i].drop = ""
          } else {
            this.graphHistory[i].drop = "已失效"
          }
          if((this.graphHistory[i].detail instanceof Array)){
            let tmpDetail = ''
            for(let j=0,len=this.graphHistory[i].detail.length;j<len;j++){
              tmpDetail = tmpDetail+this.graphHistory[i].detail[j].detail+'\n'
            }
            this.graphHistory[i].detail=tmpDetail
          }
        }
        console.log(this.graphHistory)
      }
    })

  },
}
</script>

<style scoped>
.KGDetail {
  width: 90%;
  padding: 2px;
}

.left {
  padding: 10px;
  width: 60%;
}

.right {
  padding: 10px;
  width: 40%;
}

.functionArea {
  display: flex;
  justify-content: center;
  align-items: center;
}

.buttonStyle {
  width: 50px;
  height: 50px;
}

.description {
  margin-top: 100px;
  position: relative;
  padding: 10px;
}

.history {
  position: relative;
  margin-left: 5%;
  margin-top: 10%;
  max-height: 800px;
  overflow-y: auto; /* 当内容过多时y轴出现滚动条 */
  background-color: #ffffff;
}
  .el-table .cell{
    white-space: pre-wrap;
  }
</style>