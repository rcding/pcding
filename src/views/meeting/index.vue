<template>
    <div>
        <div class="wrap">
            <el-button class="back" type="info" size="mini" @click="back">返回</el-button>
            <canvas class="cycle" ref="canvas" width="140" height="140" @click="run"></canvas>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            time: '00:00',
            canvas: null,
            ctx: null,
            timer: null,
            startTime: 0,
            endTime: 0,
        };
    },
    mounted() {
        this.canvas = this.$refs.canvas;
        this.ctx = this.canvas.getContext('2d');
        this.draw();
    },
    methods: {
        draw() {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            this.ctx.beginPath();
            this.ctx.arc(70, 70, 65, 0, 2*Math.PI);
            this.ctx.stroke();
            this.ctx.font = '25px Georgia';
            this.ctx.fillText(this.time, 35, 75);
        },
        run() {
            if (this.timer) {
                clearInterval(this.timer);
                this.timer = null;
            } else {
                this.time = '00:00';
                this.draw();
                this.startTime = new Date().getTime();
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
}
</script>

<style scoped>
    .wrap{
        width: 1000px;
        height: 600px;
        display: flex;
        justify-content: center;
        border: 1px solid grey;
        position: relative;
    }
    .back{
        position: absolute;
        top: 10px;
        left: 10px;
    }
    .cycle{
        width: 140px;
        height: 140px;
        margin-top: 200px;
        cursor: pointer;
    }
</style>