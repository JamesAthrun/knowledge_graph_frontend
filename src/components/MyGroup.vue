<template>
    <main>
        <el-row>
            <el-col  class="vermenu">
                <VerticalNav/>
            </el-col>
            <el-col class="groupTag">
                <dt class="search-title">我加入的用户组</dt>
                <el-tag
                        v-for="group in groupList"
                        :key="group.groupId"
                        type="success"
                        style="margin-right:100px; margin-bottom:50px;"
                        @click="viewDetail(group.groupId)"
                >{{group.name}}</el-tag>
            </el-col>
            <el-col class="createGroup">
                <el-button type="text" @click="clickToCreate=true">新建用户组</el-button>
            </el-col>
        </el-row>
        <el-dialog
                title="提示"
                :visible.sync="clickToCreate"
                width="30%"
                :before-close="handleClose">
            <el-form
                    ref="formInfo"
                    :model="formInfo"
                    class="demo-form-inline"
                    label-width="80px"
            >
                <el-form-item label="组名：" prop="name" required>
                    <el-input v-model="formInfo.name"></el-input>
                </el-form-item>
                <el-form-item label="描述：" prop="description" required>
                    <el-input v-model="formInfo.description"></el-input>
                </el-form-item>
                <el-form-item style="text-align: right;">
                    <el-button @click="clickToCreate = false">取 消</el-button>
                    <el-button type="primary" @click="submit">确 定</el-button>
                </el-form-item>
            </el-form>
<!--            <span slot="footer" class="dialog-footer">-->
<!--                <el-button @click="dialogVisible = false">取 消</el-button>-->
<!--                <el-button type="primary" @click="dialogVisible = false">确 定</el-button>-->
<!--            </span>-->
        </el-dialog>
    </main>

</template>

<script>
    import VerticalNav from "./VerticalNav";
    import {$ajax} from "../plugins/request";

    export default {
        name: "MyGroup",
        data(){
            return{
                isAuthorized: true,
                groupList: null,
                clickToCreate: false,
                formInfo:{name:'', description:''}
            }
        },
        components:{
            VerticalNav
        },
        methods:{
            viewDetail(groupId){

            },
            handleClose(done) {
                this.$confirm('确认关闭？')
                    .then(_ => {
                        done();
                    })
                    .catch(_ => {});
            },
            submit(){
                $ajax('/addGroup','POST', JSON.stringify(this.formInfo)).then(res=>{
                    if(res.code!=1){
                        this.$alert('创建失败')
                        console.log(res)
                    }
                    else{
                        this.formInfo={name:'', description:''}
                        this.clickToCreate = false
                        console.log('ok')
                        console.log(res)
                    }
                })
            }
        },
        async created(){
            $ajax("getGroupList","GET", {userId:this.$cookies.get("user_id")}
            ).then(res=>{
                if(res.code!=1){
                    this.isAuthorized = false
                }
                else{
                    this.groupList=JSON.parse(res.data)
                    console.log(this.group)
                }
            })
            if(!this.isAuthorized){
                this.$router.go(-1)
                this.$message({
                    type: 'error',
                    message: '您没有权限访问用户组！'
                });
            }
        }
    }
</script>

<style scoped>
    .vermenu{
        width: 15%;
    }
    .groupTag{
        width: 60%;
        padding:30px;
    }
    .search-title {
        color: #232323;
        font-size: 15px;
        margin-bottom: 20px;
    }
    .createGroup{
        width: 25%;
        display: flex;
        justify-content: center;
        align-items: center;
    }
</style>