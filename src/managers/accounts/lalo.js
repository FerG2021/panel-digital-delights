import * as api from '../api/carAgencyApi';

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
		title: 'Vehículos',
		path: '/products',
		icon: 'directions_car',
		store: true,
		showInHome: true,
		loaderMethod: api.getAllProducts
	},
	{
		name: 'categories',
		componentName: 'Categories',
		title: 'Marcas',
		path: '/categories',
		icon: 'star_rate',
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