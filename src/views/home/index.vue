<template>
    <div>
        <el-button class="button" type="primary" @click="goToMeeting">我要开会</el-button>
        <el-button class="button" type="primary" @click="goToMeetingRecord">会议记录</el-button>
    </div>
</template>

<script>
    import { stringify } from 'qs';
    import * as API from '@/utils/constants/api';
import * as dd from 'dingtalk-jsapi';
import axios from 'axios';
import { Loading } from 'element-ui';

export default {
    name: 'HelloWorld',
    props: {
        msg: String
    },
    data() {
        return {
            params:{authCode:""},
            userInfo:{userId:0,userName:''},
            result: {},
            loadingService:null
        };
    },
    created: function () {

        /*this.userInfo.userId = 'manager4081';
        this.userInfo.userName = '李一凡';
        this.$store.dispatch('SetUserInfo', this.userInfo);*/

        var userId = this.$store.state.userInfo.userId;
        if (userId !== "" && userId !==0 ) {
            return;
        }
        this.loadingService = Loading.service({ fullscreen: true, text: '正在登录，请稍后', background: 'rgba(0, 0, 0, 0.6)' });
        const that = this;
        dd.runtime.permission.requestAuthCode({
            corpId: "ding3dd87e45b2064c1c35c2f4657eb6378f",
            onSuccess: function (result) {
                that.params.authCode = result.code;
                that.login();
            },
            onFail: function (err) {
                that.alterInfo('登录失败：' + err);
            }.finally(() => {
            this.loadingService.close();
        }),

        });
    },
    methods: {
        alterInfo(msg){
            dd.device.notification.alert({
                message:msg,
                title: "提示",
                buttonName: "确定",
                onSuccess : function() {},
                onFail : function() {}
            });
        },
        requestAuthCode() {
            dd.runtime.permission.requestAuthCode({
                corpId: "ding251335d31062a7f535c2f4657eb6378f",
                onSuccess: function(result) {
                    this.params.authCode = result.code;
                    this.login();
                },
                onFail : function(err) {
                    this.alterInfo(err);
                }

            });
        },

        login(){

            //this.loadingService = Loading.service({ fullscreen: true, text: '正在登录，请稍后', background: 'rgba(0, 0, 0, 0.6)' });
            axios.post(API.login, stringify(this.params)) .then((res) => {

                var userId = res.data.result.dingUserId;
                if (userId === ""){
                    this.alterInfo("登陆失败");
                }else{
                    this.userInfo.userId = res.data.result.dingUserId;
                    this.userInfo.userName = res.data.result.dingUserName;
                    this.$store.dispatch('SetUserInfo', this.userInfo);
                }

            }, function (err) {
                this.alterInfo('请求登录失败：' + err)
            }).finally(() => {
                //this.loadingService.close();
            });
        },
        goToMeeting() {
            this.$router.push({ name: 'meeting' });
        },

        goToMeetingRecord() {
            this.$router.push({ name: 'meeting-record' });
        },
    },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
    margin: 40px 0 0;
}
ul {
    list-style-type: none;
    padding: 0;
}
li {
    display: inline-block;
    margin: 0 10px;
}
a {
    color: #42b983;
}
.button {
    width: 200px;
    height: 80px;
    font-size: 20px;
    border-radius: 18px;
    margin: 20px;
}
</style>
