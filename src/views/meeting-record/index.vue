<template>
    <div class="wrap">
        <el-form v-model="form" label-width="100px" :inline="true">
            <el-form-item label="会议主题：">
                <el-select class="width-150" size="mini" v-model="form.meetingName">
                    <el-option v-for="item in meetingThemeList" :key="item.code" :label="item.name" :value="item.code"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="主持人：">
                <el-select class="width-150" size="mini" v-model="form.dingUserName">
                    <el-option v-for="item in compereList" :key="item.code" :label="item.name" :value="item.code"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="时长：">
                <el-select class="width-150" size="mini" v-model="timeSpan">
                    <el-option v-for="item in timeSpanList" :key="item.code" :label="item.name" :value="item.code"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
<!--                <el-button type="info" size="mini" @click="reset">重置</el-button>-->
                <el-button type="primary" size="mini" @click="search">搜索</el-button>
            </el-form-item>
        </el-form>
        <el-table
            border
            stripe
            size="mini"
            v-loading="loading"
            :data="dataList">
            <el-table-column prop="meetingName" label="会议主题" align="center"></el-table-column>
            <el-table-column prop="dingUserName" label="主持人" align="center"></el-table-column>
            <el-table-column prop="costTime" label="会议时长" align="center"></el-table-column>
        </el-table>
        <div class="footer" v-if="form.showMore">
            <el-button type="text" class="black-button" @click="getMore">点击加载更多</el-button>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import * as API from '@/utils/constants/api';

export default {
    data() {
        return {
            form: {
                meetingName: '',
                dingUserName: '',
                currentPage: 1,
                pageSize: 10,
                showMore:true,
            },
            timeSpan: '',
            meetingThemeList: [],
            compereList: [],
            timeSpanList: [],
            dataList: [],
            loading: false,
        };
    },
    methods: {
        search() {
            this.form.currentPage = 1;
            this.dataList = [];
        },
        getMore() {
            this.form.currentPage = this.form.currentPage + 1;
            this.getDataList();
        },
        getDataList(){
            const params = {};
            Object.keys(this.form) .forEach((key) => {
                if (this.form[key]) {
                    params[key] = this.form[key];
                }
            });
            axios.get(API.meetingPage, { params })
                .then((res) => {
                    if (res.data.result.dataList.length === 0){
                        this.form.currentPage = this.form.currentPage - 1;
                        if (this.form.currentPage === 0 ){
                            this.form.currentPage = 1;
                        }
                    }else{
                        this.dataList = this.dataList.concat(res.data.result.dataList);
                        if (res.data.result.dataList.length < this.form.pageSize){
                            this.form.showMore = false;
                        }
                    }

                });
        },
        reset(){

        },
        back() {
            this.$router.push({ name: 'home' });
        },
    },
    created: function () {
        this.search();
    }
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