<template>
    <main class="create">
        <h1>Create a new knowledge graph</h1>
        <el-upload
            class="upload-demo"
            action="https://jsonplaceholder.typicode.com/posts/"
            drag
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :before-remove="beforeRemove"
            :limit="1"
            :on-exceed="handleExceed"
            :on-success="onSuccess"
            :file-list="fileList">
            <i class="el-icon-upload"/>
            <div class="el-upload__text">将文件拖到此处</div>
            <div class="el-upload__tip" slot="tip">只能上传json文件，且不超过5MB</div>
        </el-upload>
        <el-button type="primary" @click="save">确定</el-button>
    </main>
</template>

<script>
    export default {
        data() {
            return {
                fileList: [],
                uploadData: []
            };
        },
        methods: {
            handleRemove(file, fileList) {
                console.log(file, fileList);
            },
            handlePreview(file) {
                console.log(file);
            },
            handleExceed(files, fileList) {
                this.$message.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
            },
            beforeRemove(file, fileList) {
                this.fileList = [];
            },
            onSuccess(res, file, fileList) {
                let reader = new FileReader()
                reader.readAsText(file.raw)
                reader.onload = ((e) => {
                    this.uploadData = []
                    this.uploadData = JSON.parse(e.target.result)
                    console.log(this.uploadData);
                })
            },
            save() {
                //this.$emit('uploadParent', this.uploadData)
            }
        }
    }
</script>