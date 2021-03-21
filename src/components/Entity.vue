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
                            v-model="newLinkId"
                            placeholder="LinkId" />
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

            <div v-if="mode === 'changeLink'">
                <SmartForm
                        class="form"
                        title="Please enter the elements">
                    <FormInput
                            name="test"
                            v-model="currentLinkName"/>
                    <FormInput
                            name="test"
                            v-model="currentLinkSource"/>
                    <FormInput
                            name="test"
                            v-model="currentLinkTarget"/>
                    <template slot="actions">
                        <button
                                type="button"
                                class="secondary"
                                @click="changeLink">
                            Change
                        </button>
                        <button
                                type="button"
                                class="secondary"
                                @click="deleteLink">
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
                propertyData: [],
                entityLinks:[],

                displayData: [],
                displayLink: [],

                newEntityName: '',
                newEntityId: '',

                newLinkId:'',
                newLinkName: '',
                newLinkSource: '',
                newLinkTarget:'',

                currentEntityName: '',
                currentEntityId: '',

                currentLinkId:'',
                currentLinkName: '',
                //currentLinkSource: '',
                //currentLinkTarget:'',
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
                            data: this.displayData,
                            links: this.displayLink

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
                        console.log(params)
                        that.currentLinkId = params.data.id
                        that.currentLinkName = params.data.des
                        that.currentLinkSource = params.data.source
                        that.currentLinkTarget = params.data.target
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
            },
            changeLink() {
                let index = (this.entityLinks || []).findIndex((item) => item.id === this.currentLinkName)
                console.log()
                console.log(this.entityLinks[index])
                this.entityLinks[index].des = this.currentLinkName
                this.entityLinks[index].source = this.currentLinkSource
                this.entityLinks[index].target = this.currentLinkTarget
                this.myEcharts()
                this.goBack()
            },
            deleteLink() {
                let index = (this.entityLinks || []).findIndex((item) => item.id === this.currentLinkName)
                this.entityLinks.splice(index, 1)
                this.myEcharts()
                this.goBack()
            }
        },

        async created() {
            this.mode = 'empty'
            var url = '/KG/getGraphData?id=' + this.$route.params.id
            var response = await this.$fetch(url)
            //console.log(response)
            var tmpEntityData = JSON.parse(response.data).entityData
            var tmpLinks = JSON.parse(response.data).link
            var tmpPropertyData = JSON.parse(response.data).propertyData
            console.log(tmpEntityData)
            console.log(tmpLinks)
            console.log(tmpPropertyData)

            this.entityData = tmpEntityData
            this.entityLinks = tmpLinks
            this.propertyData = tmpPropertyData
            /*console.log(response)
            for (var key in tmpData) {
                var newItem = {
                    name: tmpData[key].name,
                    id: tmpData[key].id,
                    des: tmpData[key].des
                }
                if (newItem.des == '') {
                    this.relationData.push(newItem)
                }
                else {
                    this.entityData.push(newItem)
                }

            }
            for (var key in tmpLinks) {
                var newItem = {
                    id: tmpLinks[key].name,
                    source: tmpLinks[key].source,
                    target: tmpLinks[key].target
                }
                this.entityLinks.push(newItem)
            }

            console.log(this.entityData)
            console.log(this.entityLinks)
            console.log(this.relationData)*/

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
    }
</script>

<style>

</style>
