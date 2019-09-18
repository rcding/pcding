<template>
    <div class="wrap">
        <el-form v-model="form" label-width="100px" :inline="true">
            <el-form-item label="会议主题：">
                <el-select class="width-150" size="mini" v-model="form.meetingTheme">
                    <el-option v-for="item in meetingThemeList" :key="item.code" :label="item.name" :value="item.code"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="主持人：">
                <el-select class="width-150" size="mini" v-model="form.compere">
                    <el-option v-for="item in compereList" :key="item.code" :label="item.name" :value="item.code"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="时长：">
                <el-select class="width-150" size="mini" v-model="form.timeSpan">
                    <el-option v-for="item in timeSpanList" :key="item.code" :label="item.name" :value="item.code"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" size="mini" @click="search">搜索</el-button>
            </el-form-item>
        </el-form>
        <el-table
            border
            stripe
            size="mini"
            v-loading="loading"
            :data="dataList">
            <el-table-column prop="ddd" label="会议主题" align="center"></el-table-column>
            <el-table-column prop="ddd" label="主持人" align="center"></el-table-column>
            <el-table-column prop="ddd" label="会议时长" align="center"></el-table-column>
        </el-table>
        <div class="footer">
            <el-button type="text" class="black-button" @click="getMore">点击加载更多</el-button>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            form: {
                meetingTheme: '',
                compere: '',
                timeSpan: '',
            },
            meetingThemeList: [],
            compereList: [],
            timeSpanList: [],
            dataList: [],
            loading: false,
        };
    },
    methods: {
        search() {},
        getMore() {},
    },
}
</script>

<style scoped>
    .wrap{
        text-align: center;
    }
    .width-150{
        width: 150px;
    }
    .width-table{
        width: 60%;
    }
    .footer{
        text-align: center;
    }
    .black-button{
        color: black;
    }
</style>