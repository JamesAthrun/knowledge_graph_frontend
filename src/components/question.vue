<template>
    <div id="login">


<!--        <NoticeBoard ref="NB" v-show="NBVisi" @chHandler="chNBVisi"></NoticeBoard>-->

        <div id="bg">
        </div>

        <el-container id="top">

            <el-container>
                <el-aside id="aside-zone">
<!--                    <el-menu class="menu">-->
<!--                        <el-menu-item-group v-for="group of NBData" class="menu-group" :title="group.title">-->
<!--                            <el-menu-item v-for="item of group.items" v-on:click="noticeBoardReact(item)" class="menu-item">-->
<!--                                {{ item.name }}-->
<!--                            </el-menu-item>-->
<!--                        </el-menu-item-group>-->
<!--                    </el-menu>-->

                </el-aside>

                <el-main id="main-zone">
                    <div id="msg-box">
                        <div v-for="item of this.chatMsgList" class="msg-item">
                            <div v-if="item.position==='left'" class="msg-item-left">
                                <el-avatar icon="el-icon-user-solid" class="user-avatar"></el-avatar>
                                <label class="user-name">{{ item.name }}：</label>
                                <div class="msg-item-text">{{ item.content }}</div>
                            </div>
                            <div v-else-if="item.position==='right'" class="msg-item-right">
                                <el-avatar icon="el-icon-user-solid" class="user-avatar"></el-avatar>
                                <label class="user-name">{{ item.name }}：</label>
                                <div class="msg-item-text">{{ item.content }}</div>
                            </div>
                        </div>
                    </div>
                    <div id="text-box">
                        <el-input
                                type="textarea"
                                v-model="textToSend"
                                placeholder="请输入问题">
                        </el-input>
                        <el-button round class="round-button" v-on:click="send"
                                   style="margin: 15px 20px 15px 80%;align-self: flex-end">发送
                        </el-button>
                    </div>

                </el-main>


            </el-container>

        </el-container>

    </div>
</template>

<script>
    import {$ajax} from "../plugins/request";

    export default {
        name: "login",
        data() {
            return {
                textToSend: "",
                chatMsgList: [],
                // NBData: [
                //     {
                //         title: "UEC简介",
                //         items: [
                //             {
                //                 name: "UEC是什么？",
                //                 headLine: "关于UEC",
                //                 context: "UEC是Untrusted Environment Based Communication Tool的缩写，旨在打造一个对用户单向透明的交流工具。UEC使用RSA+DES的加密方式，由用户自行分发密钥，从而实现了用户间的安全交流。服务器虽然参与了用户间的报文转发，但无法解读用户所发报文的具体内容，对服务器而言，用户间的交流就像是谜语，这也是UEC的中文名——谜语人计划的由来。"
                //             },
                //             {
                //                 name: "我该如何使用UEC？",
                //                 headLine: "使用方法",
                //                 context: "在线下约定一个房间名，随便想一个用户名，填入左上角，点击连接进入房间。注意，房间名和用户名都是全局唯一的，请稍微想得复杂一点（这一部分以后会改进）。点击上锁后，你就不再对进入房间的人广播密钥，当一个房间的所有人都上锁时，这个房间也就成为了黑盒，外人无法进入，交流内容对外人均不可见。点击离开退出房间，当房间内所有人均离开时，房间自动解散。"
                //             },
                //             {
                //                 name: "服务器不知道我在说什么吗？",
                //                 headLine: "谜语人的原理",
                //                 context: "世界上不存在绝对的安全，任何的安全都要建立在一定的条件之上。对现阶段的UEC而言，能保证的是房间以外的人（以及服务器）听不懂用户间的谜语。但是，要如何保证里面没有内鬼，就要靠用户自己了。尤其要注意的是，用户名和房间名是不会加密的，这就意味着通过窃听用户的网络请求，第三者可以尾随用户进入房间。UEC会忠实地广播每一条进入信息，请自行判断是否有尾行者闯入房间。"
                //             },
                //         ]
                //     },
                //     {
                //         title: "更新预告",
                //         items: [
                //             {
                //                 name: "看！",
                //                 headLine: "这里是标题",
                //                 context: "这里是正文"
                //             },
                //             {
                //                 name: "是鸽子",
                //                 headLine: "这里是标题",
                //                 context: "这里是正文"
                //             },
                //             {
                //                 name: "咕咕咕...",
                //                 headLine: "这里是标题",
                //                 context: "这里是正文"
                //             },
                //         ]
                //     },
                //     {
                //         title: "UEC简介",
                //         items: [
                //             {
                //                 name: "QQ",
                //                 headLine: "非诚勿扰",
                //                 context: "1720224284"
                //             },
                //             {
                //                 name: "邮箱",
                //                 headLine: "一般不看",
                //                 context: "1720224284@qq.com"
                //             },
                //             {
                //                 name: "GitHub",
                //                 headLine: "欢迎留言",
                //                 context: "https://github.com/LordSl/uec-frontend"
                //             },
                //         ]
                //     }
                // ],
            }
        },
        methods: {
            send() {
                this.chatMsgList.push({position: "right", name: this.$cookies.get("user_name"), content: this.textToSend})
                $ajax("KG/ask","POST",this.textToSend).then((response)=>{
                    if(response.code!=1){
                        this.chatMsgList.push({position: "left", name: "知识图谱", content:"抱歉，我不知道您在说什么"})
                    }
                    else{
                        this.chatMsgList.push({position: "left", name: "知识图谱", content:response.data})
                    }
                    this.textToSend=""
                })
            },
        },
    }

</script>

<style>
    #login {
        width: 100%;
        height: 100%;
        position: fixed;
    }
    #bg {
        width: 100%;
        height: 100%;
        position: fixed;
        background-position: top;
        background-attachment: fixed;
        background-size: cover;
    }
    #top {
        position: fixed;
        width: 100%;
        height: 100%;
    }
    #head-zone {
        background-color: rgba(233, 233, 233, 0.5);
        margin: 10px 15px 0 10px;
        border-radius: 10px;
        display: flex;
        flex-direction: column;
    }
    #aside-zone {
        background-color: rgba(233, 233, 233, 0.5);
        margin: 10px 0 20px 10px;
        border-radius: 10px;
    }
    #main-zone {
        background-color: rgba(233, 233, 233, 0.5);
        margin: 10px 15px 20px 10px;
        border-radius: 10px;
    }
    .round-button {
        font-family: 阿里汉仪智能黑体, serif;
        font-size: 30px;
        height: 60px;
        width: 120px;
    }
    #msg-box {
        display: flex;
        flex-direction: column;
        background-color: rgba(233, 233, 233, 0.4);
        border-radius: 10px;
        height: 70%;
        max-height: 600px;
        overflow-y: scroll;
    }
    #text-box {
        margin-top: 20px;
        margin-bottom: 20px;
        display: flex;
        flex-direction: column;
    }
    .msg-item {
        display: flex;
        flex-direction: column;
    }
    .user-avatar {
        background-color: rgba(233, 233, 233, 0.8);
        margin: 5px;
    }
    .user-name {
        color: rgba(120, 180, 210, 0.8);
        position: relative;
        padding: 5px 0 5px 5px;
    }
    .msg-item-text {
        padding: 5px 0 5px 5px;
        max-width: 800px;
        word-wrap: break-word;
        word-break: break-all;
    }
    .msg-item-left {
        border-radius: 5px;
        background-color: rgba(50, 50, 130, 0.75);
        margin: 10px 10px 10px 10px;
        padding: 5px 5px 5px 5px;
        width: max-content;
        font-family: 阿里汉仪智能黑体, serif;
        font-size: 30px;
        color: aliceblue;;
        align-self: flex-start;
        display: flex;
        flex-direction: row;
    }
    .msg-item-right {
        border-radius: 5px;
        background-color: rgba(50, 50, 130, 0.75);
        margin: 10px 10px 10px 10px;
        padding: 5px 5px 5px 5px;
        width: max-content;
        font-family: 阿里汉仪智能黑体, serif;
        font-size: 30px;
        color: aliceblue;
        align-self: flex-end;
        /*flex-end是靠右,flex-start靠左*/
        display: flex;
        flex-direction: row;
    }
    .name-label {
        font-family: 阿里汉仪智能黑体, serif;
        font-size: 25px;
    }
    .base-input {
        width: 12%;
    }
    .menu {
        background-color: rgba(233, 233, 233, 0);
        border: 1px;
    }
    .menu-group {
        margin: 10px;
        background-color: rgba(233, 233, 233, 0);
        border-radius: 5px;
        font-family: 阿里汉仪智能黑体, serif;
    }
    .menu-item {
        margin: 0 10px 10px 10px;
        background-color: rgba(233, 233, 233, 0.4);
        border-radius: 5px;
        font-size: 17px;
    }
    .menu-item:last-of-type {
        padding-bottom: 10px;
    }
</style>