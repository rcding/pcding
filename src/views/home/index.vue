<template>
    <div>
        <el-button class="button" type="primary" @click="goToMeeting">我要开会</el-button>
        <el-button class="button" type="primary" @click="goToMeetingRecord">会议记录</el-button>
    </div>
</template>

<script>
import * as dd from 'dingtalk-jsapi'
import axios from 'axios';

export default {
    name: 'HelloWorld',
    props: {
        msg: String
    },
    data() {
        return {
            message: '22222',
            ggg: [],
            params: {
                curentPage: 1,
            },
            authCode:"",
            userInfo:{userId:0,userName:''},
            result: {},
        };
    },
    created: function () {

        var userId = this.$store.state.userInfo.userId;
        if (userId != "" || userId != undefined) {
            return;
        }

        const that = this;
        that.alterInfo("===  in " + this.$store.state.userInfo.userName );
        dd.runtime.permission.requestAuthCode({
            corpId: "ding251335d31062a7f535c2f4657eb6378f",
            onSuccess: function (result) {
                that.authCode = result.code;
                that.alterInfo("===  " + result.code);
                that.login(that.authCode);
            },
            onFail: function () {
                alert("error");
            }

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
        goToMeeting() {
            this.$router.push({ name: 'meeting' });
        },
        requestAuthCode() {
            this.alterInfo("====in")
            dd.runtime.permission.requestAuthCode({
                corpId: "ding251335d31062a7f535c2f4657eb6378f",
                onSuccess: function(result) {
                    this.authCode = result.code;
                    this.alterInfo(this.authCode);
                    this.login(this.authCode);
                },
                onFail : function(err) {
                    this.alterInfo(err);
                }

            });
        },

        login(authCode){

            axios.post('https://fatdingding.szlcsc.com/login?authCode=' + authCode) .then((res) => {
                this.alterInfo("登陆。。。" + authCode + "===" + res.data.result.dingUserId + " " + res.data.result.dingUserName);
                var userId = res.data.result.dingUserId;
                if (userId == "" || userId == undefined){
                    this.alterInfo("登陆失败");
                }else{
                    this.userInfo.userId = res.data.result.dingUserId;
                    this.userInfo.userName = res.data.result.dingUserName;
                    this.$store.dispatch('SetUserInfo', this.userInfo);

                    this.alterInfo(this.$store.state.userInfo.userId + " == " + this.$store.state.userInfo.userName )
                }

            }, function (err) {
                this.alterInfo(err)
            });
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
