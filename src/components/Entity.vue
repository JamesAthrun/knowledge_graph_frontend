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
                <button
                        type="button"
                        class="secondary"
                        @click="downloadJson">
                    Download
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
                                @click="addData">
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
                            v-model="newLinkDes"
                            placeholder="LinkDescription" />
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
                                @click="addLink">
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
                            v-model="currentLinkId"
                            placeholder="LinkId" />
                    <FormInput
                            name="test"
                            v-model="currentLinkName"
                            placeholder="LinkName" />
                    <FormInput
                            name="test"
                            v-model="currentLinkDes"
                            placeholder="LinkDescription" />
                    <FormInput
                            name="test"
                            v-model="currentLinkSource"
                            placeholder="LinkSource" />
                    <FormInput
                            name="test"
                            v-model="currentLinkTarget"
                            placeholder="LinkTarget" />
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
                newLinkDes:'',
                newLinkSource: '',
                newLinkTarget:'',

                currentEntityName: '',
                currentEntityId: '',

                currentLinkId:'',
                currentLinkName: '',
                currentLinkDes:'',
                currentLinkSource: '',
                currentLinkTarget:'',

                jsonData:'',
            }
        },
        methods:{
        downloadJson() {
                console.log(this.jsonData);
                var blob = new Blob([JSON.stringify(this.jsonData)],{type: 'application/json;charset=utf-8'})
                var downloadElement = document.createElement('a');
                var href = window.URL.createObjectURL(blob);
                downloadElement.href = href;
                downloadElement.download = "data" + ".json";
                document.body.appendChild(downloadElement);
                downloadElement.click(); //点击下载
                document.body.removeChild(downloadElement);
                window.URL.revokeObjectURL(href);


            },
            createDisplay() {
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
            },
            myEcharts(){
                // 基于准备好的dom，初始化echarts实例
                var myChart = this.$echarts.init(document.getElementById('main'));
                this.createDisplay()
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
                    if (that.mode == 'empty') {
                        if (params.dataType == 'node') {
                            that.mode = 'changeData'
                            that.currentEntityName = params.data.name
                            that.currentEntityId = params.data.id
                        }
                        else if (params.dataType == 'edge') {
                            that.mode = 'changeLink'
                            console.log(params)
                            that.currentLinkId = params.data.id
                            that.currentLinkName = params.data.name
                            that.currentLinkDes = params.data.des
                            that.currentLinkSource = params.data.source
                            that.currentLinkTarget = params.data.target
                        }
                    }
                    if (that.mode == 'addLink') {
                        if (params.dataType == 'node') {
                            if (that.newLinkSource == '') {
                                that.newLinkSource = params.data.id
                            }
                            else if (that.newLinkTarget == '') {
                                that.newLinkTarget = params.data.id
                            }
                        }
                    }
                    if (that.mode == 'changeLink') {
                        if (params.dataType == 'node') {
                            if (that.currentLinkSource == '') {
                                that.currentLinkSource = params.data.id
                            }
                            else if (that.newLinkTarget == '') {
                                that.currentLinkTarget = params.data.id
                            }
                        }
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
            addData(){
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
            addLink(){
                // 在entityLinks中添加name, id, source, target
                var newLink = {
                    "name": this.newLinkName,
                    "id": this.newLinkId,
                    "source": this.newLinkSource,
                    "target": this.newLinkTarget,
                }
                this.entityLinks.push(newLink)

                // 在propertyData中添加name, id, des
                var newProperty = {
                    "des": this.newLinkDes,
                    "name": this.newLinkDes,
                    "id": this.newLinkName,
                }
                this.propertyData.push(newProperty)

                this.myEcharts()
                this.goBack()
            },
            clearLink() {
                this.newLinkId = ''
                this.newLinkName = ''
                this.newLinkDes = ''
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
                //在entityLinks中更改name, id, source, target
                let index = (this.entityLinks || []).findIndex((item) => item.id === this.currentLinkId) //利用entityLinks中唯一标识符id来更改
                console.log(this.entityLinks[index])
                this.entityLinks[index].name = this.currentLinkName
                this.entityLinks[index].id = this.currentLinkId
                this.entityLinks[index].source = this.currentLinkSource
                this.entityLinks[index].target = this.currentLinkTarget

                //在propertyData中更改name, id, des
                index = (this.propertyData || []).findIndex((item) => item.id === this.currentLinkName) //利用propertyData中唯一标识符name来更改
                console.log(this.propertyData[index])
                this.propertyData[index].des = this.currentLinkDes
                this.propertyData[index].name = this.currentLinkDes
                this.propertyData[index].id = this.currentLinkName
                this.myEcharts()
                //this.goBack()
            },
            deleteLink() {
                let index = (this.entityLinks || []).findIndex((item) => item.id === this.currentLinkId)
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
            this.jsonData = response.data
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

            this.myEcharts();
        },


    }
</script>

<style>

</style>
