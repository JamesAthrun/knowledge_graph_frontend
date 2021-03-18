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

            <div v-if="mode === 'changeData'">
                <SmartForm
                        class="form"
                        title="Please enter the elements">
                    <FormInput
                            name="test"
                            v-model="currentEntityName"/>
                    <FormInput
                            name="test"
                            v-model="currentEntityId"/>
                    <template slot="actions">
                        <button
                                type="button"
                                class="secondary"
                                @click="changeData">
                            Change
                        </button>
                        <button
                                type="button"
                                class="secondary"
                                @click="deleteData">
                            Delete
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
    import axios from "axios"
    import VueAxios from "vue-axios"

    export default {
        name: 'Echarts',
        data() {
            return {
                mode: 0,
                entityTitle:'knowledge graph',
                entityData:[],
                entityLinks:[],

                newEntityName: '',
                newEntityId: '',

                newLinkName: '',
                newLinkSource: '',
                newLinkTarget:'',

                currentEntityName: '',
                currentEntityId: '',


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

                var that = this
                myChart.on('click', function(params) {
                    if (params.dataType == 'node') {
                        that.mode = 'changeData'
                        that.currentEntityName = params.data.name
                        that.currentEntityId = params.data.id
                    }
                    else if (params.dataType == 'edge') {
                        that.mode = 'changeLink'
                    }
                })
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
            changeData() {
                let index = (this.entityData || []).findIndex((item) => item.id === this.currentEntityId)
                console.log(this.entityData[index].name)
                this.entityData[index].name = this.currentEntityName
                this.entityData[index].id = this.currentEntityId
                this.myEcharts()
                this.goBack()
            },
            deleteData() {
                let index = (this.entityData || []).findIndex((item) => item.id === this.currentEntityId)
                this.entityData.splice(index, 1)
                this.myEcharts()
                this.goBack()
            }
        },

        async created() {
            this.mode = 'empty'
            var url = '/KG/getGraphData?id=' + this.$route.params.id
            var response = await this.$fetch(url)
            var tmpData = JSON.parse(response.data).data

            var tmpLinks = JSON.parse(response.data).link
            for (var key in tmpData) {
                this.entityData.push(tmpData[key])
            }
            for (var key in tmpLinks) {
                this.entityLinks.push(key)
            }
            console.log(this.entityData)
        },
        mounted() {
            console.log(this.$route.params.id)

            this.myEcharts();
        }
    }
</script>

<style>

</style>
