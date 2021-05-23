<template>
    <div style="height:calc(100vh - 100px);">
        <SeeksRelationGraph
                ref="seeksRelationGraph"
                :options="graphOptions"
                :on-node-click="onNodeClick"
                :on-line-click="onLineClick"
        />
    </div>
</template>

<script>
    import SeeksRelationGraph from 'relation-graph'
    export default {
        name: 'Demo',
        components: {SeeksRelationGraph},
        data() {
            return {
                currentCase: '横向树状图谱',
                isShowCodePanel: false,
                graphOptions: {
                    'backgrounImage': 'http://ai-mark.cn/images/ai-mark-desc.png',
                    'backgrounImageNoRepeat': true,
                    'layouts': [
                        {
                            'label': '中心',
                            'layoutName': 'tree',
                            'layoutClassName': 'seeks-layout-center',
                            'defaultJunctionPoint': 'border',
                            'defaultNodeShape': 0,
                            'defaultLineShape': 1,
                            'min_per_width': 100,
                            'max_per_width': 300,
                            'min_per_height': 200
                        }
                    ],
                    'defaultLineMarker': {
                        'markerWidth': 12,
                        'markerHeight': 12,
                        'refX': 6,
                        'refY': 6,
                        'data': 'M2,2 L10,6 L2,10 L6,6 L2,2'
                    },
                    'defaultNodeShape': 1,
                    'defaultNodeWidth': '30',
                    'defaultLineShape': 2,
                    'defaultJunctionPoint': 'tb',
                    'defaultNodeBorderWidth': 0,
                    'defaultLineColor': 'rgba(0, 186, 189, 1)',
                    'defaultNodeColor': 'rgba(0, 206, 209, 1)',
                    'defaultNodeHeight': '100'
                }
            }
        },
        methods:{
            showSeeksGraph(query) {
                var __graph_json_data = {
                    rootId: this.root,
                    nodes: this.displayData,
                    links: this.displayLink,
                }
                // 以上数据中的node和link可以参考"Node节点"和"Link关系"中的参数进行配置
                this.$refs.seeksRelationGraph.setJsonData(__graph_json_data, (seeksRGGraph) => {
                    // Called when the relation-graph is completed
                })
            },
            onNodeClick(nodeObject, $event) {
                console.log('onNodeClick:', nodeObject)
            },
            onLineClick(lineObject, $event) {
                console.log('onLineClick:', lineObject)
            },
        },
        async created() {
            this.routeParamId = this.$route.params.id
            var url = 'KG/getGraphData?id=' + this.routeParamId + '&ver=0'
            var response = await this.$fetch(url)
            console.log(response)
            this.displayData = JSON.parse(response.data).itemData
            this.displayLink = JSON.parse(response.data).link
            this.root = this.displayData[0].id

            console.log(this.displayData)
            console.log(this.displayLink)
            console.log(this.root)

            this.showSeeksGraph()

        }
    }
</script>

<style scoped>

</style>