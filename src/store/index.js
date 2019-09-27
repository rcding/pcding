import Vue from 'vue';
import Vuex from 'vuex';
import actions from './action';
import mutations from './mutation';

Vue.use(Vuex);
const store = new Vuex.Store({
    state: {
        userInfo: {
            userId:'',
            userName: '',
            meetingId:null,
            meetingBegainTime:null
        }
    },
    actions,
    mutations,
});

export default store;