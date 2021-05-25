<template>
    <div class="newDocuments">
        <div class="center_center">
            <el-form :model="form" :rules="rules" ref="form" label-width="120px" class="demo-ruleForm">
                <el-form-item label="from" style="width:422px;height:51px;">
                    <el-input v-model="form.from" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="to" style="width:422px;height:51px;">
                    <el-input v-model="form.to" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="text" style="width:422px;height:51px;">
                    <el-input v-model="form.text" autocomplete="off"></el-input>
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
        props:["newLine"],
        components:{

        },
        data() {
            return {
                form: {
                    text: '',
                    id: '',
                    content: '',
                },
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

