import Store from '../managers/store/store';
import * as api from '../managers/api/api';

export default function loadModulesByAccount(store, router, account) {
	const accountsModules = {
		// Agrega otros tipos de account y los módulos correspondientes aquí
		bunker: [
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
				loadedMethod: api.getAllProducts
			},
			{
				name: 'categories',
				componentName: 'Categories',
				title: 'Categorías',
				path: '/categories',
				icon: 'category',
				store: true,
				showInHome: true,
				loadedMethod: api.getAllCategories
			},
			{
				name: 'promotions',
				componentName: 'Promotions',
				title: 'Promociones',
				path: '/promotions',
				icon: 'campaign',
				store: true,
				showInHome: true,
				loadedMethod: api.getAllPromotions
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
			
		],
		lalo: [
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
				icon: 'inventory_2',
				store: true,
				showInHome: true,
			},
			{
				name: 'categories',
				componentName: 'Categories',
				title: 'Categorías',
				path: '/categories',
				icon: 'category',
				store: true,
				showInHome: true,
			},
			{
				name: 'promotions',
				componentName: 'Promotions',
				title: 'Promociones',
				path: '/promotions',
				icon: 'campaign',
				store: true,
				showInHome: true,
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
			
		]
	};

	const processModules = accountsModules[account] || [];

	processModules.forEach(module => {
		console.log('module');
		console.log(module);
		// if (module.store === true) {
		// 	import(`../modules/${module.name}/${module.name}Store.js`).then(moduleStore => {
		// 		console.log(moduleStore);
		// 		store.registerModule(`${module.componentName}Store`, moduleStore.default);
		// 	}).catch(error => {
		// 		console.error(`Error al cargar el módulo: ${error}`);
		// 	});
		// }

		router.addRoute({
			path: `${module.path}`,
			component: () => import(`../modules/${module.name}/${module.componentName}.vue`)
		});

		if (module.loadedMethod) {
			module.loadedMethod(Store.getters['UsersStore/user'].account_id);
		}

		Store.commit('UsersStore/setModules', processModules);
		Store.commit('UsersStore/loaded');
		router.push('/');
	});
}