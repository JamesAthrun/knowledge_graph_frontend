<template>
    <div class="newDocuments">
        <div class="center_center">
            <el-form :model="form" :rules="rules" ref="form" label-width="120px" class="demo-ruleForm">
                <el-form-item label="是否新建" style="width:422px;height:51px;">
                    <el-radio-group v-model="isNew">
                        <el-radio-button label="新建"></el-radio-button>
                        <el-radio-button label="已有"></el-radio-button>
                    </el-radio-group>
                </el-form-item>

                <el-form-item label="选择已有关系" style="width:422px;height:51px;" v-if="isNew == '已有'">
                    <el-select v-model="currentLine" value-key="id">
                        <el-option v-for="item in propertyList" :key="item.id" :label="item.text" :value="item">
                        </el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label="name" style="width:422px;height:51px;" v-if="isNew == '新建'">
                    <el-input v-model="form.name" autocomplete="off"></el-input>
                </el-form-item>

                <el-form-item label="comment" style="width:422px;height:51px;" v-if="isNew == '新建'">
                    <el-input v-model="form.comment" autocomplete="off"></el-input>
                </el-form-item>

                <el-form-item label="title" style="width:422px;height:51px;" v-if="isNew == '新建'">
                    <el-input v-model="form.title" autocomplete="off"></el-input>
                </el-form-item>



                <el-form-item label="from" style="width:422px;height:51px;">
                    <el-select v-model="currentFromNode" value-key="id">
                        <el-option v-for="item in displayData" :key="item.id" :label="item.text" :value="item">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="to" style="width:422px;height:51px;">
                    <el-select v-model="currentToNode" value-key="id">
                        <el-option v-for="item in displayData" :key="item.id" :label="item.text" :value="item">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm('form')">添加</el-button>
                    <el-button @click="cancel">取消</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>
<script>

    export default {
        /*props:{
            newLine: {
                type: String,
            },
            displayData: {
                type: Array,

            },
            propertyList: {
                type: Array,
            }
        },*/
        props: ["newLine", "displayData", "propertyList"],
        components:{

        },
        data() {
            return {
                form: {
                    isNew: false,
                    text: '',
                    content: '',
                    id: '',
                    from: '',
                    to: '',
                    name: '',
                    title: '',
                    division: '',
                    comment: '',
                },
                isNew: false,
                currentLine: '',
                currentFromNode: '',
                currentToNode: '',
                rules: {
                }
            };
        },
        watch: {
            modify: function(){
                this.form = this.newLine;
            }
        },
        methods: {
            submitForm(formName) {

                console.log(this.currentLine)

                if (this.isNew == '已有') {
                    this.form.id = this.currentLine.id
                    this.form.text = this.currentLine.text
                    this.form.content = this.currentLine.content
                    this.form.from = this.currentFromNode.id
                    this.form.to = this.currentToNode.id
                }
                else {
                    this.form.isNew = true
                    this.form.from = this.currentFromNode.id
                    this.form.to = this.currentToNode.id
                    this.form.text = this.form.name
                }

                console.log(this.form)

                this.$emit("submitForm", this.form)
                console.log(this.form)

            },
            cancel() {
                this.$emit("cancel")
                console.log(this.propertyList)
            }
        },
        created() {
            console.log(this.propertyList)
        }
    }
</script>
<style scoped>

</style>

