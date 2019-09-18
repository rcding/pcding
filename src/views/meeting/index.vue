<template>
    <div class="wrap">
        <canvas ref="canvas" width="140" height="140" @click="run"></canvas>
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
        this.ctx.beginPath();
        this.ctx.arc(66,66,65,0,2*Math.PI);
        this.ctx.stroke();
    },
    computed: {
        date() {
            const d = new Date();
            return d;
        },
    },
    methods: {
        draw() {
            this.ctx.fillText("Hello World!",10,50);
        },
        run() {},
    },
}
</script>

<style scoped>
    .wrap{
        width: 1000px;
        height: 600px;
        display: flex;
        align-items: center;
        justify-content: center;
        border: 1px solid grey;
    }
    .cycle{
        width: 130px;
        height: 130px;
    }
</style>