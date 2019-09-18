import Vue from 'vue';
import Router from 'vue-router';

import Home from '@/views/home/index.vue';
import Meeting from '@/views/meeting/index.vue';
import MeetingRecord from '@/views/meeting-record/index.vue';

Vue.use(Router);

const router = new Router({
    routes: [
        {
            path: 'home',
            meta: { title: '主页' },
            name: 'home',
            component: Home,
        },
        {
            path: 'meeting',
            meta: { title: '我要开会' },
            name: 'meeting',
            component: Meeting,
        },
        {
            path: 'meeting-record',
            meta: { title: '会议记录' },
            name: 'meeting-record',
            component: MeetingRecord,
        }
    ],
});

router.beforeEach((to, from, next) => {
    if (to.meta.title) {
        document.title = to.meta.title;
    }
    if (to.fullPath === '/') {
        next({ name: 'home' });
    }
    next();
});

export default router;
