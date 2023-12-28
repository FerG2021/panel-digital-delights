import * as api from '../api/digitalDelightsApi';

export default [
	{
		name: 'home',
		componentName: 'Home',
		title: 'Home',
		path: '/',
		icon: 'home',
		store: false,
		showInHome: false,
	},
	{
		name: 'products',
		componentName: 'Products',
		title: 'Productos',
		path: '/products',
		icon: 'inventory_2',
		store: true,
		showInHome: true,
		loaderMethod: api.getAllProducts
	},
	{
		name: 'categories',
		componentName: 'Categories',
		title: 'Categorías',
		path: '/categories',
		icon: 'category',
		store: true,
		showInHome: true,
		loaderMethod: api.getAllCategories
	},
	{
		name: 'promotions',
		componentName: 'Promotions',
		title: 'Promociones',
		path: '/promotions',
		icon: 'campaign',
		store: true,
		showInHome: true,
		loaderMethod: api.getAllPromotions
	},
	{
		name: 'myaccount',
		componentName: 'MyAccount',
		title: 'Mi cuenta',
		path: '/my-account',
		icon: 'manage_accounts',
		store: false,
		showInHome: true,
	},
	
];