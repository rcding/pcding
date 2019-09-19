import Vue from 'vue'
import App from './App.vue'
import store from '../src/store';
import router from '../src/router';

// import '@/utils/networking';

import { Button, Select, Table, TableColumn, Form, FormItem } from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.component(Button.name, Button);
Vue.component(Select.name, Select);
Vue.component(Table.name, Table);
Vue.component(TableColumn.name, TableColumn);
Vue.component(Form.name, Form);
Vue.component(FormItem.name, FormItem);

Vue.config.productionTip = false;

new Vue({
    store,
    router,
    render: h => h(App),
}).$mount('#app');
