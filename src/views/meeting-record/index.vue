<template>
    <div class="wrap">
        <el-form v-model="form" label-width="100px" :inline="true">
            <el-form-item label="会议主题：">
                <el-select class="width-150" size="mini" v-model="form.meetingName">
                    <el-option v-for="item in meetingThemeList" :key="item.code" :label="item.name" :value="item.code"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="主持人：">
                <el-select class="width-150" size="mini" v-model="form.dingUserId">
                    <el-option v-for="item in userInfoList" :key="item.dingUserId" :label="item.dingUserName" :value="item.dingUserId"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="时长：">
                <el-select class="width-150" size="mini" v-model="form.timeSpan">
                    <el-option v-for="item in timeSpanList" :key="item.code" :label="item.name" :value="item.code"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
<!--                <el-button type="info" size="mini" @click="reset">重置</el-button>-->
                <el-button type="primary" size="mini" :loading="loading" @click="search">搜索</el-button>
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
            <el-table-column prop="startTime" label="开始时间" align="center"></el-table-column>
            <el-table-column prop="overTime" label="结束时间" align="center"></el-table-column>
            <el-table-column label="会议时长" align="center">
                <template slot-scope="scope">
                    {{scope.row.beginTime || ''}}
                </template>
            </el-table-column>
        </el-table>
        <div class="footer" v-if="showMore">
            <el-button type="text" class="moreData-button" @click="getMore">点击加载更多</el-button>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import * as API from '@/utils/constants/api';
import { Loading } from 'element-ui';

export default {
    data() {
        return {
            form: {
                meetingName: '部门晨会',
                dingUserId:null,
                currentPage: 1,
                pageSize: 10,
                timeSpan:'',
            },
            meetingThemeList: [{code:'部门晨会',name:'部门晨会'}],
            compereList: [],
            timeSpanList: [
                {code:'',name:'全部'},
                {code:'0-30',name:'30分总以内'},
                {code:'30-60',name:'30~60分钟'},
                {code:'0-60',name:'1小时以内'},
                {code:'60-90',name:'60~90分钟'},
                {code:'90-120',name:'90~120分钟'},
                {code:'90-120',name:'两小时以内'}],
            dataList: [],
            userInfoList:[],
            loading: false,
            loadingService: null,
            showMore:false,
        };
    },
    created() {
        this.userInfoList = [{'userId':0,'dingUserId':null,'dingUserName':'全部','workNumber':'0'}];

        this.loadUserInfo();
        this.search();
       /*setTimeout(() => {
            this.loadingService.close();
        }, 3000);*/

    },
    methods: {
        search() {
            this.form.currentPage = 1;
            this.getDataList();
        },
        getMore() {
            this.form.currentPage = this.form.currentPage + 1;
            this.getDataList();
        },
        getDataList(){
            this.loadingService = Loading.service({ fullscreen: true, text: '正在加载，请稍后', background: 'rgba(0, 0, 0, 0.6)' });
            const params = {};
            Object.keys(this.form) .forEach((key) => {
                if (this.form[key]) {
                    params[key] = this.form[key];
                }
            });
            this.loading = true;
            axios.get(API.meetingPage, { params })
                .then((res) => {

                    if (res.data.result.dataList.length === 0){
                        this.showMore = false;
                        this.form.currentPage = this.form.currentPage - 1;
                        if (this.form.currentPage === 0 ){
                            this.form.currentPage = 1;
                            this.dataList = [];
                        }
                    }else if (res.data.result.dataList.length < this.form.pageSize){
                        this.showMore = false;
                        this.dataList = this.dataList.concat(res.data.result.dataList);
                    }else{
                        this.showMore = true;
                        if (this.form.currentPage === 1 ){
                            this.dataList = res.data.result.dataList;
                        }else {
                            this.dataList = this.dataList.concat(res.data.result.dataList);
                        }
                    }

                })
                .finally(() => {
                    this.loading = false;
                    this.loadingService.close();
                });
        },
        reset(){

        },
        back() {
            this.$router.push({ name: 'home' });
        },
        loadUserInfo(){
            this.loadingService = Loading.service({ fullscreen: true, text: '正在加载，请稍后', background: 'rgba(0, 0, 0, 0.6)' });
            axios.get(API.userInfoList)
                .then((res) => {
                    this.userInfoList = this.userInfoList.concat(res.data.result);
                    this.form.dingUserId = this.$store.state.userInfo.userId;
                }).finally(()=>{
                this.loadingService.close();
            });
        },
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
    .moreData-button{
        color: gainsboro;
    }
</style>