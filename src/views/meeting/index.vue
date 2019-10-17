<template>
    <div>
        <div class="box">
            <ul>
                <li><span id="hour">{{date.hour}}</span><span>时</span></li>
                <li><span id="minute">{{date.minutes}}</span><span>分</span></li>
                <li><span id="second">{{date.seconds}}</span><span>秒</span></li>
            </ul>
        </div>
        <div class="bottom">
            <el-button type="primary" size="large" style="width: 240px;height: 80px;font-size: 38px" @click="run">{{btnText}}</el-button>
        </div>
    </div>
</template>

<script>
    import { stringify } from 'qs';
    import axios from 'axios';
    import * as API from '@/utils/constants/api';

export default {
    data() {
        return {
            timer: null,
            startTime: 0,
            endTime: 0,
            params:{
                dingUserId:0,
                meetingName:'晨会',
                meetingId:0,
            },
            userInfo:{},
            isInit: true,
            date: {
                hour: '00',
                minutes: '00',
                seconds: '00',
            },
        };
    },
    computed: {
        btnText() {
            return this.timer ? '结束晨会' : '开始晨会';
        },
    },
    methods: {
        begainMeeting(){

            axios.post(API.begainMeeting, stringify(this.params))
                .then((res) => {

                    this.params.meetingId = res.data.result.meetingId;
                    this.userInfo.meetingId = res.data.result.meetingId;
                    this.userInfo.meetingBegainTime = this.startTime;
                    this.$store.dispatch('SetUserInfo', this.userInfo);
                });

        },
        endMeeting(){

            axios.post(API.endMeeting, stringify(this.params))
                .then(() => {

                    this.userInfo.meetingId = 0;
                    this.userInfo.meetingBegainTime = null;
                    this.$store.dispatch('SetUserInfo', this.userInfo);
                });
        },
        run() {
            if (this.isInit && this.timer) {
                clearInterval(this.timer);
                this.timer = null;
                this.endMeeting();

            } else {
                this.isInit = true;
                this.dateInit();
                if (this.userInfo.meetingBegainTime){
                    this.startTime = this.userInfo.meetingBegainTime;
                }else {
                    this.startTime = new Date().getTime();
                    this.begainMeeting();
                }
                this.timer = setInterval(() => {
                    this.endTime = new Date().getTime();
                    const seconds = parseInt((this.endTime - this.startTime) / 1000);
                    this.date.hour = parseInt(seconds / 3600) < 10 ? `0${parseInt(seconds / 3600)}` : parseInt(seconds / 3600);
                    this.date.minutes = parseInt(seconds / 60) < 10 ? `0${parseInt(seconds / 60)}` : parseInt(seconds / 60);
                    const restSeconds = seconds - (this.date.minutes * 60);
                    this.date.seconds = restSeconds < 10 ? `0${restSeconds}`: restSeconds;
                }, 1000);
            }
        },
        dateInit() {
            this.date = {
                hour: '00',
                minutes: '00',
                seconds: '00',
            };
        },
        back() {
            this.$router.push({ name: 'home' });
        },
    },
    created: function () {
        this.userInfo = this.$store.state.userInfo;
        //this.userInfo.userId = 'manager4081';
        this.params.dingUserId = this.userInfo.userId;
        this.params.meetingId = this.userInfo.meetingId;
        this.startTime = this.userInfo.meetingBegainTime;

        if (this.params.dingUserId !== null && this.params.dingUserId !== 0 && this.params.meetingId !== 0 && this.params.meetingId !== null) {
            this.isInit = false;
            this.run();
        }

    },
    beforeDestroy() {
        this.timer = null;
    }
}
</script>

<style scoped>
    .box{
        width: 540px;
        height: 200px;
        margin: 50px auto;
    }
    .box ul{
        padding: 0;
        text-align: center;
    }
    .box li{
        position: relative;
        text-align: center;
        list-style-type: none;
        display: inline-block;
        width: 150px;
        height:160px;
        text-shadow:0 2px 1px #f4f4f4;
        border:1px solid #9fa2ad;
        border-radius: 5px;
        margin: 5px;
        background: -webkit-gradient(linear,0 0, 0 100%,
        color-stop(.2,rgba(248,248,248,.3)),
        color-stop(.5,rgba(168,173,190,.5)),
        color-stop(.51,rgba(168,173,190,.3)),
        color-stop(.9,rgba(248,248,248,.2)));
        background: -webkit-linear-gradient(top,rgba(248,248,248,.3) 20%,rgba(168,173,190,.5) 50%,rgba(168,173,190,.3) 51%, rgba(248,248,248,.2) 90%);
        background: -moz-linear-gradient(top, rgba(248,248,248,.3) 20%,rgba(168,173,190,.5) 50%,rgba(168,173,190,.3) 51%, rgba(248,248,248,.2) 90%);
        background: -o-linear-gradient(top, rgba(248,248,248,.3) 20%, rgba(168,173,190,.5) 50%, rgba(168,173,190,.3) 51%, rgba(248,248,248,.2) 90%);
        background: -ms-linear-gradient(top, rgba(248,248,248,.3) 20%, rgba(168,173,190,.5) 50%, rgba(168,173,190,.3) 51%, rgba(248,248,248,.2) 90%);
        background: linear-gradient(top, rgba(248,248,248,.3) 20%, rgba(168,173,190,.5) 50%, rgba(168,173,190,.3) 51%, rgba(248,248,248,.2) 90%);
        box-shadow:inset 0 -2px 0 #f1f1f1,0 1px 0 #f1f1f1,0 2px 0 #9fa2ad,0 3px 0 #f1f1f1,0 4px 0 #9fa2ad;
    }
    .box li:before,
    .box li:after{
        display: block;
        content: "";
        position: absolute;
        width: 150px;
    }
    .box li:before{
        top:50%;
        height: 1px;
        box-shadow: 0 1px 0 #868995,0 2px 1px #fff;
    }
    .box li:after{
        bottom: -65px;
        height: 60px;
        border-radius:0 0 5px 5px;
        background: -webkit-gradient(linear,0 0,0 100%,from(rgba(0,0,0,.1)),to(rgba(0,0,0,0)));
        background: -webkit-linear-gradient(top,rgba(0,0,0,.1),rgba(0,0,0,0));
        background: -moz-linear-gradient(top,rgba(0,0,0,.1),rgba(0,0,0,0));
        background: -o-linear-gradient(top,rgba(0,0,0,.1),rgba(0,0,0,0));
        background: -ms-linear-gradient(top,rgba(0,0,0,.1),rgba(0,0,0,0));
        background: linear-gradient(top,rgba(0,0,0,.1),rgba(0,0,0,0));
        z-index: 1
    }
    .box li span:first-child{
        font:120px 'BitstreamVeraSansMonoBold';
        color: #52555a;
        display: block;
        height: 130px;
        line-height: 150px;
    }
    .bottom {
        width: 540px;
        height: 100px;
        text-align: center;
        margin: 50px auto;
        display: flex;
        align-items: center;
        justify-content: center;
    }
</style>