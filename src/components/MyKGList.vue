<template>
  <main class="myKG">
    <el-row>
      <el-col class="vermenu">
        <VerticalNav/>
      </el-col>
      <el-col class="KGlist">
        <div class="listOfGraph">
          <el-table ref="table" :data="graphList" @row-click="getDetail">
            <el-table-column type="expand">
              <template slot-scope="props">
                <el-form class="demo-table-expand" inline label-position="left">
                  <el-form-item label="">
                    <span>{{ props.row.description }}</span>
                  </el-form-item>
                </el-form>
              </template>
            </el-table-column>
            <el-table-column label="编号" prop="tableId"></el-table-column>
            <el-table-column label="名称" prop="name"></el-table-column>
            <el-table-column label="最新版本" prop="ver"></el-table-column>
            <el-table-column
                :filter-method="filterHandler"
                :filters="[{ text: '可写', value: '可写' },{ text: '可读', value: '可读'},{ text: '无权限', value: '无权限'}]"
                label="权限"
                prop="new_authority"
            ></el-table-column>
          </el-table>
        </div>
      </el-col>
    </el-row>
  </main>
</template>

<script>
import {$ajax} from "../plugins/request";
import VerticalNav from "./VerticalNav";

export default {
  data() {
    return {
      graphList: null,
      groupList: null,
    }
  },
  methods: {
    getDetail(row) {
      this.$cookies.set("table_id", row.tableId)
      this.$cookies.set("table_authority", row.new_authority)
      this.$router.push(`/KGDetail/${row.tableId}`)
      console.log(row.tableId)
    },
    filterHandler(value, row, column) {
      const property = column['property'];
      return row[property] === value;
    }
  },
  async created() {
    $ajax("getGroupList", "GET", {userId: this.$cookies.get("user_id")}
    ).then(res => {
      if (res.code == 1) {
        this.groupList = JSON.parse(res.data)
        console.log(this.groupList)
      }
    })
    $ajax("KG/getAllGraphInfo", "GET"
    ).then(res => {
      this.graphList = JSON.parse(res.data)
      console.log(this.graphList)
      for (let j = 0, len = this.graphList.length; j < len; j++) {
        let temp_authority = 0
        let authorityList = ['无权限', '可读', '可写']
        temp_authority = temp_authority > (this.graphList[j].authority % 10) ? temp_authority : this.graphList[j].authority % 10
        if (this.graphList[j].userId == this.$cookies.get("user_id")) {
          temp_authority = temp_authority > (this.graphList[j].authority / 100) ? temp_authority : this.graphList[j].authority / 100
        }
        for (let i = 0, l = this.graphList.length; i < l; i++) {
          if (this.graphList[j].groupId == this.groupList[i].groupId) {
            temp_authority = temp_authority > ((this.graphList[j].authority / 10) % 10) ? temp_authority : (this.graphList[j].authority / 10) % 10
          }
        }
        this.graphList[j].new_authority = authorityList[parseInt(temp_authority)]
      }
    })
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

.KGlist {
  width: 80%;
  padding: 20px;
}
  .listOfGraph{
    width: 90%;
    left: 5%;
  }
</style>