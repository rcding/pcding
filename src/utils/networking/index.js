/**
 * axios全局配置
 */
import axios from 'axios';
import store from '@/store';

axios.defaults.withCredentials = true;
axios.defaults.headers.post['Content-Tye'] = 'application/x-www-form-urlencoded';

axios.interceptors.request.use((config) => {
    // add token
    if (store.getters.token) {
        config.headers.common.TOKEN = store.getters.token;
    }
    return config;
}, (error) => {
    Promise.reject(error);
});

axios.interceptors.response.use(
    (response) => {
    if (response.data.code === 200) {
        return Promise.resolve(response.data);
    }
    return Promise.reject(response.data.msg);
    }, (error) => {
        return Promise.reject(error.response);
    }
);
