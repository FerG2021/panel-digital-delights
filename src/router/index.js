import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
	history: createWebHistory(),
	routes: [
		{
			path: '/login',
			component: () => import('../views/login/index.vue'),
		},
		{
			path: '/',
			component: () => import('../modules/home/Home.vue'),
		},
		{
			path: '/products',
			component: () => import('../modules/products/Products.vue'),
		},
		{
			path: '/categories',
			component: () => import('../modules/categories/Categories.vue'),
		},
		{
			path: '/reviews',
			component: () => import('../modules/reviews/Reviews.vue'),
		},
		// {
		//   path: "/mesas",
		//   component: () => import("../views/tables/index.vue"),
		// },
		{
			path: '/mi-cuenta',
			component: () => import('../views/miCuenta/index.vue'),
		},
	],
});

export default router;
