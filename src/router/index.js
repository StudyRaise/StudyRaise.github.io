import Vue from 'vue'
import Router from 'vue-router'
import store from "@/store";

Vue.use(Router)




const router = new Router({
	routes: [
		{
			path: '/',
			name: '后台中心',
			component: resolve => require(['@/views/layout/index'], resolve),
			meta: {
				keepAlive: false,
				requireAuth: true
			},
			redirect: '/login',
			children: [
				{
					path: '/home',
					name: '用户管理',
					component: resolve => require(['@/views/index/index.vue'], resolve),
					meta: {
						keepAlive: false,
						requireAuth: true
					}
				}
			]
		},
		{
			path: '/index',
			redirect: '/',
		},
		{
			path: '/reportview',
			name: '报告查看',
			component: resolve => require(['@/components/ProvisionalReport/index.vue'], resolve),
			meta: {
				keepAlive: false,
				requireAuth: true
			}
		},
		{
			path: '/PDFreportview',
			name: 'pdf查看',
			component: resolve => require(['@/components/pdfReport/pdfReport.vue'], resolve),
			meta: {
				keepAlive: false,
				requireAuth: true
			}
		},
		{
			path: '/photoview',
			name: '图像',
			component: resolve => require(['@/components/ProvisionalReport/imgPag.vue'], resolve),
			meta: {
				keepAlive: false,
				requireAuth: true
			}
		},
		{
			path: '/login',
			name: '登录',
			component: resolve => require(['@/views/login/index'], resolve),
			meta: {
				keepAlive: false,
				requireAuth: true
			}
		},
	]
})

router.beforeEach((to, from, next) => {
	let token = window.sessionStorage.getItem("token");
	if (to.path === '/home' && !token) {
		next('/login');
		return;
	}
	next()
})


export default router