<template>
    <div class="newDocuments">
        <div class="center_center">
            <el-form ref="form" :model="form" class="demo-ruleForm" :rules="rules" label-width="120px">
                <div v-for="(item, index) in form.dynamicItem" :key="index">
                    <el-form-item
                            label="关键词"
                            :prop="'dynamicItem.' + index + '.name'"
                            style="width: 50%"
                            required
                    >
                        <el-input v-model="item.name"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button v-if="index+1 == form.dynamicItem.length" @click="addItem" type="primary" icon="el-icon-plus" round></el-button>
                        <el-button v-if="index !== 0" @click="deleteItem(item, index)" type="danger" icon="el-icon-minus" round></el-button>
                    </el-form-item>
                </div>
                <el-form-item label="提示">
                    <el-input v-model="form.help" style="width: 80%"></el-input>
                </el-form-item>
                <el-form-item label="回答" required>
                    <el-select v-model="form.answer" multiple placeholder="请选择" value-key="id">
                        <el-option
                                v-for="item in displayData"
                                :key="item.id"
                                :label="item.text"
                                :value="item"
                        >
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <span>基于版本：{{this.$cookies.get("table_latestVer")}}</span>
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
        props: ["isQuestionMode", "displayData"],
        components: {},
        data() {
            return {
                form: {
                    ver: this.$cookies.get("table_latestVer"),
                    help: '',
                    dynamicItem: [
                        {
                            keyword: ""
                        }
                    ],
                    answer:[],
                },
                rules: {}
            };
        },
        methods: {
            addItem() {
                this.form.dynamicItem.push({
                    keyword: "",
                });
            },
            deleteItem(item, index) {
                this.form.dynamicItem.splice(index, 1);
                console.log(this.form.dynamicItem, "删除");
            },
            submitForm(formName) {
                console.log(this.form)

                // console.log(this.currentLine)
                //
                // if (this.isNew == '已有') {
                //     this.form.id = this.currentLine.id
                //     this.form.text = this.currentLine.text
                //     this.form.content = this.currentLine.content
                //     this.form.from = this.currentFromNode.id
                //     this.form.to = this.currentToNode.id
                // } else {
                //     this.form.isNew = true
                //     this.form.from = this.currentFromNode.id
                //     this.form.to = this.currentToNode.id
                //     this.form.text = this.form.name
                // }
                //
                // console.log(this.form)
                //
                // this.$emit("submitForm", this.form)
                // console.log(this.form)

            },
            cancel() {
                this.$emit("cancel")
            }
        },
    }
</script>

<style scoped>

</style>