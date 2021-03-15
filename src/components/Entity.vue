<template>
    <div>
        <div class="Echarts">
            <div id="main" style="width: 800px;height:800px;"></div>
        </div>
        <div class="actions">
            <div v-if="mode === 'empty'">
                <button
                        type="button"
                        class="secondary"
                        @click="changeModeToData">
                    Add data
                </button>
                <button
                        type="button"
                        class="secondary"
                        @click="changeModeToLink">
                    Add link
                </button>
            </div>

            <div v-if="mode === 'addData'">
                <SmartForm
                        class="form"
                        title="Please enter the elements">
                    <FormInput
                            name="test"
                            v-model="newEntityName"
                            placeholder="entityName" />
                    <FormInput
                            name="test"
                            v-model="newEntityId"
                            placeholder="entityId" />
                    <template slot="actions">
                        <button
                                type="button"
                                class="secondary"
                                @click="enterData">
                            Enter
                        </button>
                        <button
                                type="button"
                                class="secondary"
                                @click="clearData">
                            clear
                        </button>
                        <button
                                type="button"
                                class="secondary"
                                @click="goBack">
                            Back
                        </button>
                    </template>
                </SmartForm>
            </div>

            <div v-if="mode === 'addLink'">
                <SmartForm
                        class="form"
                        title="Please enter the elements">
                    <FormInput
                            name="test"
                            v-model="newLinkName"
                            placeholder="LinkName" />
                    <FormInput
                            name="test"
                            v-model="newLinkSource"
                            placeholder="LinkSource" />
                    <FormInput
                            name="test"
                            v-model="newLinkTarget"
                            placeholder="LinkTarget" />
                    <template slot="actions">
                        <button
                                type="button"
                                class="secondary"
                                @click="enterLink">
                            Enter
                        </button>
                        <button
                                type="button"
                                class="secondary"
                                @click="clearLink">
                            clear
                        </button>
                        <button
                                type="button"
                                class="secondary"
                                @click="goBack">
                            Back
                        </button>
                    </template>
                </SmartForm>
            </div>
        </div>
    </div>


</template>

<script>
    export default {
        name: 'Echarts',
        data() {
            return {
                mode: 0,
                entityTitle:'人民的名义关系图谱',
                entityData:[],
                entityLinks:[],

                newEntityName: '',
                newEntityId: '',

                newLinkName: '',
                newLinkSource: '',
                newLinkTarget:'',

            }
        },
        methods:{
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
                            data: this.entityData,
                            links: this.entityLinks

                        }
                    ]
                };

                // 使用刚指定的配置项和数据显示图表。
                myChart.setOption(option);
            },
            changeModeToData() {
                this.mode = 'addData'
                console.log(this.mode)
            },
            changeModeToLink() {
                this.mode = 'addLink'
                console.log(this.mode)
            },
            enterData(){
                var newData = {
                    "name": this.newEntityName,
                    "id": this.newEntityId,
                }
                this.entityData.push(newData)
                this.myEcharts()
                this.goBack()
            },
            clearData() {
                this.newEntityName = ''
                this.newEntityId = ''
            },
            goBack() {
                this.mode = 'empty'
                this.clearData()
                this.clearLink()
            },
            enterLink(){
                var newLink = {
                    "name": this.newLinkName,
                    "source": this.newLinkSource,
                    "target": this.newLinkTarget,
                }
                this.entityLinks.push(newLink)
                this.myEcharts()
                this.goBack()
            },
            clearLink() {
                this.newLinkName = ''
                this.newLinkSource = ''
                this.newLinkTarget = ''
            },
        },
        created() {
            this.entityData = [{"name":"_:genid1","id":"86604"},{"name":"_type","id":"86502"},{"name":"http://www.w3.org/2002/07/owl#Class","id":"86706"},{"name":"http://www.w3.org/2002/07/owl#oneOf","id":"86808"},{"name":"http://www.openkg.cn/COVID-19/prevention#医护人员","id":"86910"},{"name":"http://www.openkg.cn/COVID-19/prevention#孕产妇","id":"87012"},{"name":"http://www.openkg.cn/COVID-19/prevention#成年人","id":"87114"},{"name":"http://www.openkg.cn/COVID-19/prevention/resource/R10102","id":"87216"},{"name":"http://www.openkg.cn/COVID-19/prevention/resource/R10103","id":"87318"},{"name":"http://www.openkg.cn/COVID-19/prevention/resource/R10105","id":"87420"},{"name":"http://www.openkg.cn/COVID-19/prevention/resource/R10106","id":"87522"},{"name":"http://www.openkg.cn/COVID-19/prevention/resource/R1020201","id":"87624"},{"name":"http://www.openkg.cn/COVID-19/prevention/resource/R102030101","id":"87726"},{"name":"http://www.openkg.cn/COVID-19/prevention/resource/R102030201","id":"87828"},{"name":"http://www.openkg.cn/COVID-19/prevention/resource/R102030301","id":"87930"},{"name":"http://www.openkg.cn/COVID-19/prevention/resource/R102030401","id":"88032"},{"name":"http://www.openkg.cn/COVID-19/prevention/class/C1","id":"91653"},{"name":"http://www.w3.org/2002/07/owl#equivalentClass","id":"95189"}]
            this.entityLinks = [{"name":"86502","source":"86604","target":"86706"},{"name":"86808","source":"86604","target":"86910"},{"name":"86808","source":"86604","target":"87012"},{"name":"86808","source":"86604","target":"87114"},{"name":"86808","source":"86604","target":"87216"},{"name":"86808","source":"86604","target":"87318"},{"name":"86808","source":"86604","target":"87420"},{"name":"86808","source":"86604","target":"87522"},{"name":"86808","source":"86604","target":"87624"},{"name":"86808","source":"86604","target":"87726"},{"name":"86808","source":"86604","target":"87828"},{"name":"86808","source":"86604","target":"87930"},{"name":"86808","source":"86604","target":"88032"},{"name":"95189","source":"91653","target":"86604"}]
            this.mode = 'empty'
        },
        mounted() {
            console.log(this.$route.params.id)
            this.myEcharts();
        }
    }
</script>

<style>

</style>
