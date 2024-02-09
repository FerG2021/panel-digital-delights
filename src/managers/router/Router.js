import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
	history: createWebHistory(),
	routes: [{
		path: '/login',
		component: () => import('../../components/login/Login.vue')
	}
		// {
		// 	path: '/',
		// 	component: () => import('../../modules/home/Home.vue'),
		// },
		// {
		// 	path: '/products',
		// 	component: () => import('../../modules/products/Products.vue'),
		// },
		// {
		// 	path: '/categories',
		// 	component: () => import('../../modules/categories/Categories.vue'),
		// },
		// {
		// 	path: '/reviews',
		// 	component: () => import('../../modules/reviews/Reviews.vue'),
		// },
		// {
		// 	path: '/my-account',
		// 	component: () => import('../../modules/myaccount/MyAccount.vue'),
		// },
	]
});

export default router;
