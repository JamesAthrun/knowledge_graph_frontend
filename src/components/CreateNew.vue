<template>

    <main class="create">
        <h1>Create a new knowledge graph</h1>
        <el-upload
            class="upload-demo"
            action="http://192.168.3.15:8082/KG/uploadFile"
            drag
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :before-remove="beforeRemove"
            :limit="1"
            :on-exceed="handleExceed"
            :on-success="onSuccess"
            :file-list="fileList">
            <i class="el-icon-upload"/>
            <div class="el-upload__text">将文件拖到此处</div>
            <div class="el-upload__tip" slot="tip">只能上传json文件，且不超过5MB</div>
        </el-upload>
        <el-button type="primary" @click="save">确定</el-button>
        <div class="Echarts">
            <div id="main" style="width: 800px;height:800px;"></div>
        </div>
    </main>
</template>

<script>

    import {$ajax} from "../plugins/request";

    export default {
        data() {
            return {
                fileList: [],
                uploadData: [],
                newGraphData: [],
                headers:{'Content-type': 'application/json; charset=UTF-8',}
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
                    this.uploadData = []
                    this.uploadData = JSON.parse(e.target.result)
                    this.newGraphData =
                        {"entity" : this.uploadData.entity,
                        "property": this.uploadData.property,
                        "triple" : this.uploadData.triple}
                    console.log(JSON.stringify(this.newGraphData));
                })
            },
            save() {
              $ajax("KG/createGraphByJsonStr","POST",
                  JSON.stringify({"entity" : this.uploadData.entity, "property": this.uploadData.property, "triple" : this.uploadData.triple})
              ).then(()=>{
                  console.log("ok")
              })
            },
            newGraph() {
                var tmpEntityData = JSON.parse(this.uploadData.data).entityData
                var tmpLinks = JSON.parse(this.uploadData.data).link
                var tmpPropertyData = JSON.parse(this.uploadData.data).propertyData
                console.log(tmpEntityData)
                console.log(tmpLinks)
                console.log(tmpPropertyData)

                this.entityData = tmpEntityData
                this.entityLinks = tmpLinks
                this.propertyData = tmpPropertyData


                this.displayData = this.entityData
                this.displayLink = []

                for (var key in this.entityLinks) {
                    let index = (this.propertyData || []).findIndex((item) => item.id === this.entityLinks[key].name)
                    var newItem = {
                        id: this.entityLinks[key].id, //每一个link独有的属性id
                        name: this.entityLinks[key].name, //这种link所属的property的name(id)
                        des: this.propertyData[index].des,
                        source: this.entityLinks[key].source,
                        target: this.entityLinks[key].target
                    }
                    this.displayLink.push(newItem)
                }

                this.myEcharts();
            },
            myEcharts(){
                // 基于准备好的dom，初始化echarts实例
                var myChart = this.$echarts.init(document.getElementById('main'));

                // 指定图表的配置项和数据
                var option = {
                    title: { text: this.entityTitle },
                    tooltip: {
                        formatter: function (x) {
                            return x.data.des;
                        }
                    },
                    toolbox: {
                        feature :{
                            saveAsImage: {}
                        }
                    },
                    series: [
                        {
                            type: 'graph',
                            layout: 'force',
                            symbolSize: 80,
                            roam: 'scale',
                            edgeSymbol: ['circle', 'arrow'],
                            edgeSymbolSize: [4, 10],
                            edgeLabel: {
                                normal: {
                                    textStyle: {
                                        fontSize: 20
                                    }
                                }
                            },
                            force: {
                                repulsion: 2500,
                                edgeLength: [10, 50],
                                layoutAnimation: false,
                            },
                            itemStyle: {
                                normal: {
                                    color: '#4b565b'
                                }
                            },
                            lineStyle: {
                                normal: {
                                    width: 2,
                                    color: '#4b565b'

                                }
                            },
                            edgeLabel: {
                                normal: {
                                    show: true,
                                    formatter: function (x) {
                                        return x.data.name;
                                    }
                                }
                            },
                            label: {
                                normal: {
                                    show: true,
                                    textStyle: {
                                    }
                                }
                            },
                            data: this.displayData,
                            links: this.displayLink

                        }
                    ]
                };

                // 使用刚指定的配置项和数据显示图表。
                myChart.setOption(option);
            },
        }
    }
</script>