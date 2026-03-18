import 'core-js/stable'
import 'regenerator-runtime/runtime'
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import commonService from './service/commonService';
import $ from 'jquery'

import watermark from '@/utils/watermark.js'
Vue.prototype.$watermark = watermark

Vue.use(ElementUI)
Vue.prototype.$AllService = commonService;

// 修改 el-dialog 默认点击遮照为不关闭
ElementUI.Dialog.props.closeOnClickModal.default = false;

Vue.config.productionTip = false
Vue.prototype.$ = $;
// router.beforeEach((to, from, next) => {
  // if (to.path === '/login') {
  // next();
  //   return;
  // }
  // const token = sessionStorage.getItem('token');
  // if (token === null) {
  //   sessionStorage.clear();
  //   next({ path: '/login', query: { redirect: to.path } });
  // } else {
  //   next();
  // }
// });


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app")