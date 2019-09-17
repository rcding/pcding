import Vue from 'vue';
import Router from 'vue-router';

import Home from '@/views/home/index.vue';

Vue.use(Router);

const router = new Router({
    mode: 'hash',
    routes: [
        {
            path: 'home',
            meta: { title: '主页' },
            name: 'home',
            component: Home,
        }
    ],
});

router.beforeEach((to, from, next) => {
    if (to.meta.title) {
        document.title = to.meta.title;
    }
    if (to.fullPath === '/') {
        next({ name: 'home' });
    } else {
        next();
    }
});

export default router;
