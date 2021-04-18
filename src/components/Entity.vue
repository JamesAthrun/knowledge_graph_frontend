<template>
    <div>
        <div class="Echarts">
            <div id="main" style="width: 800px;height:800px;"></div>
        </div>
        <div>
            <el-radio v-model="graphColorTheme" label="black" border size="medium">black</el-radio>
            <el-radio v-model="graphColorTheme" label="red" border size="medium">red</el-radio>
            <el-radio v-model="graphColorTheme" label="blue" border size="medium">blue</el-radio>
            <el-button type="primary" @click="myEcharts">refresh</el-button>
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
                    <div>
                        <el-radio v-model="newEntityPos" label="head" border size="medium">Head</el-radio>
                        <el-radio v-model="newEntityPos" label="tail" border size="medium">Tail</el-radio>
                    </div>
                    <FormInput
                            v-if="newEntityPos == 'tail'"
                            v-model="newEntityHeadId"
                            placeholder="entityHeadId" />
                    <FormInput
                            v-if="newEntityPos == 'head'"
                            v-model="newEntityTailId"
                            placeholder="entityTailId" />
                    <div>
                        <el-radio v-model="newEntityProperty" label="new" border size="medium">New</el-radio>
                        <el-radio v-model="newEntityProperty" label="existed" border size="medium">Existed</el-radio>
                    </div>
                    <div v-if="newEntityProperty == 'new'">
                        <FormInput
                                v-model="newPropertyNameCn"
                                placeholder="propertyNameCn" />
                        <FormInput
                                v-model="newPropertyNameEn"
                                placeholder="propertyNameEn" />
                        <FormInput
                                v-model="newPropertyId"
                                placeholder="propertyId" />
                        <FormInput
                                v-model="newPropertyComment"
                                placeholder="propertyComment" />
                        <button
                                type="button"
                                class="secondary"
                                @click="createProperty">
                            createProperty
                        </button>
                    </div>
                    <FormInput
                            v-model="newEntityRelationId"
                            placeholder="entityRelationId" />
                    <FormInput
                            v-model="newEntityNameCn"
                            placeholder="entityNameCn" />
                    <FormInput
                            v-model="newEntityNameEn"
                            placeholder="entityNameEn" />
                    <FormInput
                            v-model="newEntityId"
                            placeholder="entityId" />
                    <FormInput
                            v-model="newEntityComment"
                            placeholder="entityComment" />
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
                    <div>
                        <el-radio v-model="newLinkProperty" label="new" border size="medium">New</el-radio>
                        <el-radio v-model="newLinkProperty" label="existed" border size="medium">Existed</el-radio>
                    </div>
                    <div v-if="newLinkProperty == 'new'">
                        <FormInput
                                v-model="newPropertyNameCn"
                                placeholder="propertyNameCn" />
                        <FormInput
                                v-model="newPropertyNameEn"
                                placeholder="propertyNameEn" />
                        <FormInput
                                v-model="newPropertyId"
                                placeholder="propertyId" />
                        <FormInput
                                v-model="newPropertyComment"
                                placeholder="propertyComment" />
                        <button
                                type="button"
                                class="secondary"
                                @click="createProperty">
                            createProperty
                        </button>
                    </div>
                    <FormInput
                            v-model="newLinkId"
                            placeholder="LinkId" />
                    <FormInput
                            v-model="newLinkSource"
                            placeholder="LinkSource" />
                    <FormInput
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
                            v-model="currentEntityId"
                            placeholder="EntityId"/>
                    <FormInput
                            v-model="currentEntityHeadId"
                            placeholder="currentEntityHeadId"/>
                    <FormInput
                            v-model="currentEntityRelationId"
                            placeholder="currentEntityRelationId"/>
                    <FormInput
                            v-model="currentEntityTailId"
                            placeholder="currentEntityTailId"/>
                    <FormInput
                            v-model="currentEntityName"
                            placeholder="currentEntityName"/>
                    <FormInput
                            v-model="currentEntityComment"
                            placeholder="currentEntityComment"/>

                    <template slot="actions">
                        <button
                                type="button"
                                class="secondary"
                                @click="changeEntity">
                            Change Entity
                        </button>
                        <!--<button
                                type="button"
                                class="secondary"
                                @click="deleteData">
                            Delete
                        </button>-->
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
                            v-model="currentLinkId"
                            placeholder="LinkId" />
                    <FormInput
                            v-model="currentLinkName"
                            placeholder="LinkName" />
                    <FormInput
                            v-model="currentLinkDes"
                            placeholder="LinkDescription" />
                    <FormInput
                            v-model="currentLinkSource"
                            placeholder="LinkSource" />
                    <FormInput
                            v-model="currentLinkTarget"
                            placeholder="LinkTarget" />
                    <template slot="actions">
                        <button
                                type="button"
                                class="secondary"
                                @click="changeLink">
                            Change Link
                        </button>
                        <button
                                type="button"
                                class="secondary"
                                @click="deleteLink">
                            Delete Link
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
                routeParamId: '',
                entityTitle:'knowledge graph',
                entityData:[],
                propertyData: [],
                entityLinks:[],

                graphColorTheme: '',

                displayData: [],
                displayLink: [],

                newEntityPos: '',
                newEntityHeadId: '',
                newEntityTailId: '',
                newEntityProperty: '',
                newEntityRelationId: '',
                newEntityNameCn: '',
                newEntityNameEn: '',
                newEntityId: '',
                newEntityComment: '',

                newPropertyNameCn: '',
                newPropertyNameEn: '',
                newPropertyId: '',
                newPropertyComment: '',

                newLinkProperty: '',
                newLinkId:'',
                newLinkSource: '',
                newLinkTarget:'',

                currentEntityId: '',
                currentEntityHeadId: '',
                currentEntityRelationId: '',
                currentEntityTailId: '',
                currentEntityName: '',
                currentEntityComment: '',

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
                //this.displayData = this.entityData

                this.displayData = []
                for (var key in this.entityData) {
                    if (this.entityData[key].category == 1) {
                        var currentSymbol = 'diamond'
                    }
                    else if (this.entityData[key].category == 2) {
                        var currentSymbol = 'rect'
                    }
                    else if (this.entityData[key].category == 3) {
                        var currentSymbol = 'circle'
                    }
                    var newItem = {
                        des: this.entityData[key].des,
                        id: this.entityData[key].id,
                        name: this.entityData[key].name,
                        symbol: currentSymbol,
                        category: this.entityData[key].category
                    }
                    this.displayData.push(newItem)
                }

                this.displayLink = []
                //console.log(this.displayData)

                for (var key in this.entityLinks) {
                    let index = (this.propertyData || []).findIndex((item) => item.id === this.entityLinks[key].name)
                    var newItem = {
                        id: this.entityLinks[key].id, //每一个link独有的属性id
                        name: this.propertyData[index].name, //这种link所属的property的name(id)
                        des: this.propertyData[index].des,
                        source: this.entityLinks[key].source,
                        target: this.entityLinks[key].target
                    }
                    this.displayLink.push(newItem)
                }
            },
            async refreshData() {
                var url = 'KG/getGraphData?id=' + this.routeParamId
                var response = await this.$fetch(url)
                console.log(response)
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
            },
            myEcharts(){
                // 基于准备好的dom，初始化echarts实例
                var myChart = this.$echarts.init(document.getElementById('main'));
                this.createDisplay()

                //color
                if (this.graphColorTheme == 'black' || this.graphColorTheme == '') {
                    var colorList = ['#4b565b', '#4b565b', '#4b565b', '#4b565b']
                }
                else if (this.graphColorTheme == 'red') {
                    var colorList = ['red', 'orange', '#FFD700', 'pink']
                }
                else if (this.graphColorTheme == 'blue') {
                    var colorList = ['#2C71C1', '#36A2EB', 'purple', '#4BC0C0']
                }

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
                            draggable: true,
                            itemStyle: {
                                normal: {
                                    //color: '#4b565b'
                                    color: function (params) {
                                        return colorList[params.data.category]
                                    }
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
                            links: this.displayLink,
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
                            that.currentEntityComment = params.data.des
                        }
                        else if (params.dataType == 'edge') {
                            that.mode = 'changeLink'
                            that.currentLinkId = params.data.id
                            that.currentLinkName = params.data.name
                            that.currentLinkDes = params.data.des
                            that.currentLinkSource = params.data.source
                            that.currentLinkTarget = params.data.target
                        }
                    }
                    if (that.mode == 'addData') {
                        if(params.dataType == 'node') {
                            if (that.newEntityPos == 'tail') {
                                that.newEntityHeadId = params.data.id
                            }
                            else {
                                that.newEntityTailId = params.data.id
                            }
                        }
                        else {
                            that.newEntityRelationId = params.data.id
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
                        else {
                            that.newLinkId = params.data.id
                        }
                    }
                    if (that.mode == 'changeData') {
                        if (params.dataType == 'edge') {
                            //console.log(params.data)
                            that.currentEntityHeadId = params.data.source
                            that.currentEntityTailId = params.data.target
                            that.currentEntityRelationId = params.data.id
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
                myChart.on('mouseup', function (params) {
                    var option = myChart.getOption();
                    option.series[0].data[params.dataIndex].x = params.event.offsetX;
                    option.series[0].data[params.dataIndex].y = params.event.offsetY;
                    option.series[0].data[params.dataIndex].fixed = true;
                    myChart.setOption(option);
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
            async addData(){
            //现在允许增加的
                /*var newData = {
                    "name": this.newEntityName,
                    "id": this.newEntityId,
                }*/
                //this.entityData.push(newData)
                let res = await this.$fetch('KG/createEntity', {
                    method: 'POST',
                    body: JSON.stringify({
                        headId: this.newEntityHeadId,
                        relationId: this.newEntityRelationId,
                        tailId: this.newEntityTailId,
                        name: this.newEntityId,
                        comment: this.newEntityComment,
                        nameEn: this.newEntityNameEn,
                        nameCn: this.newEntityNameCn,
                        division: '',
                        from: '',
                    }),
                })
                /*$.ajax({
                    url:"http://localhost:8082/KG/createProperty",//url
                    type:"POST",
                    headers:{"Content-Type":"application/json","Access-Control-Allow-Origin":"*"},
                    data:[this.newEntityId,this.newEntityComment,this.newEntityNameEn,this.newEntityNameCn,"","",""],
                }).then((response)=>{
                    console.log(response)
                })
*/
                this.refreshData()
                this.myEcharts()
                this.goBack()
            },
            clearData() {
                console.log(this.newEntityPos)
                this.newEntityName = ''
                this.newEntityId = ''
            },
            goBack() {
                this.mode = 'empty'
                this.clearData()
                this.clearLink()
            },
            async addLink(){
                // 在entityLinks中添加name, id, source, target
                /*var newLink = {
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
                this.propertyData.push(newProperty)*/

                let res = await this.$fetch('KG/createLink', {
                    method: 'POST',
                    body: JSON.stringify({
                        headId: this.newLinkSource,
                        relationId: this.newLinkId,
                        tailId: this.newLinkTarget,
                    }),
                })

                this.refreshData()
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
            async changeEntity() {
                /*let index = (this.entityData || []).findIndex((item) => item.id === this.currentEntityId)
                console.log(this.entityData[index].name)
                this.entityData[index].name = this.currentEntityName
                this.entityData[index].id = this.currentEntityId*/
                let res = await this.$fetch('KG/replaceItem', {
                    method: 'POST',
                    body: JSON.stringify({
                        id: this.currentEntityId,
                        headId: this.currentEntityHeadId,
                        relationId: this.currentEntityRelationId,
                        tailId: this.currentEntityTailId,
                        name: this.currentEntityName,
                        comment: this.currentEntityComment,
                        nameEn: "",
                        nameCn: "",
                        division: "",
                        from: "",
                        domain: "",
                        range: "",
                    }),
                })

                this.refreshData()
                this.myEcharts()
                this.goBack()
            },
            deleteData() {
                let index = (this.entityData || []).findIndex((item) => item.id === this.currentEntityId)
                this.entityData.splice(index, 1)
                this.myEcharts()
                this.goBack()
            },
            async changeLink() {
                //在entityLinks中更改name, id, source, target
                /*let index = (this.entityLinks || []).findIndex((item) => item.id === this.currentLinkId) //利用entityLinks中唯一标识符id来更改
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
                this.propertyData[index].id = this.currentLinkName*/
                let res = await this.$fetch('KG/replaceItem', {
                    method: 'POST',
                    body: JSON.stringify({
                        id: this.currentLinkId,
                        headId: this.currentLinkSource,
                        relationId: this.currentLinkId,
                        tailId: this.currentLinkTarget,
                        name: this.currentLinkName,
                        comment: this.currentLinkDes,
                        nameEn: "",
                        nameCn: "",
                        division: "",
                        from: "",
                        domain: "",
                        range: "",
                    }),
                })

                this.refreshData()
                this.myEcharts()
                //this.goBack()
            },
            async deleteLink() {
                /*let index = (this.entityLinks || []).findIndex((item) => item.id === this.currentLinkId)
                this.entityLinks.splice(index, 1)*/
                let res = await this.$fetch('KG/deleteLink', {
                    method: 'POST',
                    body: JSON.stringify({
                        headId: this.currentLinkSource,
                        relationId: this.currentLinkId,
                        tailId: this.currentLinkTarget,
                    })
                })

                this.refreshData()
                this.myEcharts()
                this.goBack()
            },
            async createProperty() {
                let res = await this.$fetch('KG/createProperty', {
                    method: 'POST',
                    body: JSON.stringify({
                        id: this.newPropertyId,
                        comment: this.newPropertyComment,
                        nameEn: this.newPropertyNameEn,
                        nameCn: this.newPropertyNameCn,
                        from: '',
                        domain: '',
                        range: '',
                    }),
                })
                if (this.mode == 'addData') {
                    this.newEntityRelationId = res.data.slice(1,8)
                }
                else if (this.mode == 'addLink') {
                    this.newLinkId = res.data.slice(1,8)
                }

            }
        },

        async created() {
            this.mode = 'empty'
            this.routeParamId = this.$route.params.id
            var url = 'KG/getGraphData?id=' + this.routeParamId
            var response = await this.$fetch(url)
            console.log(response)
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
