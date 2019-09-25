<template>
    <div>
        <div class="wrap">
            <!--<el-button class="back" type="info" size="mini" @click="back">返回</el-button>-->
            <canvas class="cycle" ref="canvas" width="160" height="160" @click="run"></canvas>
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
            time: '00:00',
            canvas: null,
            ctx: null,
            timer: null,
            startTime: 0,
            endTime: 0,
            params:{
                dingUserId:0,
                meetingName:'部门晨会',
                meetingId:0,
            },
            userInfo:{},
        };
    },

    methods: {
        draw() {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            this.ctx.beginPath();
            this.ctx.arc(80, 80, 80, 0, 2*Math.PI);
            this.ctx.stroke();
            this.ctx.font = '30px STSong ';
            this.ctx.fillText(this.time, 42.5, 85);
        },
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

                    this.userInfo.meetingId = null;
                    this.userInfo.meetingBegainTime = null;
                    this.$store.dispatch('SetUserInfo', this.userInfo);
                });
        },
        run() {
            if (this.timer !== null) {
                clearInterval(this.timer);
                this.timer = null;
                this.endMeeting();

            } else {
                this.time = '00:00';
                if (this.userInfo.meetingBegainTime){

                    this.startTime = this.userInfo.meetingBegainTime;
                }else {
                    this.startTime = new Date().getTime();
                    this.begainMeeting();
                }

                this.draw();
                this.timer = setInterval(() => {
                    this.endTime = new Date().getTime();
                    const seconds = parseInt((this.endTime - this.startTime) / 1000);
                    if (seconds < 3600) {
                        const minutes = parseInt(seconds / 60);
                        const restSeconds = seconds - (minutes * 60);
                        this.time = `${minutes < 10 ? `0${minutes}`: minutes}:${restSeconds < 10 ? `0${restSeconds}`: restSeconds}`;
                    }
                    this.draw();
                }, 1000);
            }
        },
        back() {
            this.$router.push({ name: 'home' });
        },
    },
    created: function () {
        this.userInfo = this.$store.state.userInfo;
        this.userInfo.userId = 'manager4081';
        this.params.dingUserId = this.userInfo.userId;
        this.params.meetingId = this.userInfo.meetingId
        this.startTime = this.userInfo.meetingBegainTime;


    },
    mounted() {
        this.canvas = this.$refs.canvas;
        this.ctx = this.canvas.getContext('2d');
        this.draw();
        if (this.userInfo.meetingId){
            this.run();
        }
    },
}
</script>

<style scoped>
    .wrap{
        width: 1000px;
        height: 600px;
        display: flex;
        justify-content: center;
        position: relative;
    }
    .back{
        position: absolute;
        top: 10px;
        left: 10px;
    }
    .cycle{
        width: 160px;
        height: 160px;
        margin-top: 200px;
        cursor: pointer;
    }
</style>