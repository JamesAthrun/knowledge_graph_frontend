<template>
    <div class="newDocuments">
        <div class="center_center">
            <el-form ref="form" :model="form" class="demo-ruleForm" :rules="rules" label-width="120px">
                <div v-for="(item, index) in form.keyWords" :key="index">
                    <el-form-item
                            label="关键词"
                            :prop="'keyWords.' + index + '.keyword'"
                            style="width: 50%"
                            required
                    >
                        <el-input v-model="item.keyword"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button v-if="index+1 == form.keyWords.length" @click="addItem" type="primary" icon="el-icon-plus" round></el-button>
                        <el-button v-if="index !== 0" @click="deleteItem(item, index)" type="danger" icon="el-icon-minus" round></el-button>
                    </el-form-item>
                </div>
                <el-form-item label="提示">
                    <el-input v-model="form.help" style="width: 80%"></el-input>
                </el-form-item>
                <el-form-item label="回答" required>
                    <el-select v-model="form.answer" multiple placeholder="请选择" value-key="id" style="width: 90%">
                        <el-option
                                v-for="item in displayData"
                                :key="item.id"
                                :label="item.data.title"
                                :value="item.id"
                        >
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <span>基于版本：{{this.$cookies.get("table_currentVer")}}</span>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm">添加</el-button>
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
                    ver: this.$cookies.get("table_currentVer"),
                    help: '',
                    keyWords: [
                        {
                            keyword: ""
                        }
                    ],
                    answer:[],
                    relatedIds: []
                },
                rules: {}
            };
        },
        methods: {
            addItem() {
                this.form.keyWords.push({
                    keyword: "",
                });
            },
            deleteItem(item, index) {
                this.form.keyWords.splice(index, 1);
                console.log(this.form.keyWords, "删除");
            },
            submitForm() {
                for(let i=0,len=this.form.keyWords.length; i<len; i++){
                    this.form.keyWords[i][i]=this.form.keyWords[i]["keyword"]
                    delete this.form.keyWords[i]["keyword"]
                }
                for(let j=0,len=this.form.answer.length; j<len; j++){
                    this.form.relatedIds.push({[j]:this.form.answer[j]})
                }
                delete this.form.answer
                console.log(this.form)
                this.$emit("submitForm", this.form)
            },
            cancel() {
                this.$emit("cancel")
            }
        },
    }
</script>

<style scoped>

</style>