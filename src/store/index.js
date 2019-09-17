import Vue from 'vue';
import Vuex from 'vuex';
import action from './action';
import mutation from './mutation';

Vue.use(Vuex);
const store = new Vuex.Store({
    state: {
        userInfo: {
            userId:'',
            userName: ''
        }
    },
    action,
    mutation,
});

export default store;