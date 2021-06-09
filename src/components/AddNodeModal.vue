<template>
    <div class="newDocuments">
        <div class="center_center">
            <el-form :model="form" :rules="rules" ref="form" label-width="120px" class="demo-ruleForm">
                <el-form-item label="标题" style="width:422px;height:51px;">
                    <el-input v-model="form.text" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="具体内容" style="width:422px;height:51px;">
                    <el-input v-model="form.name" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="title" style="width:422px;height:51px;">
                    <el-input v-model="form.title" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="comment" style="width:422px;height:51px;">
                    <el-input v-model="form.comment" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="division" style="width:422px;height:51px;">
                    <el-select v-model="form.division" value-key="division">
                        <el-option v-for="item in divisionList" :key="item.text" :label="item.text" :value="item.text">
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
        props:["newNode"],
        components:{

        },
        data() {
            return {
                divisionList: [{
                    text: "Class"
                },{
                    text: "String"
                },{
                    text: "Resource"
                }],
                form: {
                    text: '',
                    name: '',
                    title: '',
                    comment: '',
                    division: '',
                },
                rules: {
                }
            };
        },
        watch: {
            modify: function(){
                this.form = this.newNode;
            }
        },
        methods: {
            submitForm(formName) {
                this.$emit("submitForm", this.form)
                console.log(this.form)

            },
            cancel() {
                this.$emit("cancel")
            }
        }
    }
</script>
<style scoped>

</style>

