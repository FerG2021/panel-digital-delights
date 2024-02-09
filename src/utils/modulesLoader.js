import * as carsAgencyApi from '../managers/api/carsAgencyApi';
import * as digitalDelightsApi from '../managers/api/digitalDelightsApi';
import Store from '../managers/store/store';

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
				showInHome: false
			},
			{
				name: 'products',
				componentName: 'Products',
				title: 'Productos',
				path: '/products',
				icon: 'inventory_2',
				store: true,
				showInHome: true,
				loadedMethod: digitalDelightsApi.getAllProducts
			},
			{
				name: 'categories',
				componentName: 'Categories',
				title: 'Categorías',
				path: '/categories',
				icon: 'category',
				store: true,
				showInHome: true,
				loadedMethod: digitalDelightsApi.getAllCategories
			},
			{
				name: 'promotions',
				componentName: 'Promotions',
				title: 'Promociones',
				path: '/promotions',
				icon: 'campaign',
				store: true,
				showInHome: true,
				loadedMethod: digitalDelightsApi.getAllPromotions
			},
			{
				name: 'myaccount',
				componentName: 'MyAccount',
				title: 'Mi cuenta',
				path: '/my-account',
				icon: 'manage_accounts',
				store: false,
				showInHome: true
			}

		],
		lalo: [
			{
				name: 'home',
				componentName: 'Home',
				title: 'Home',
				path: '/',
				icon: 'home',
				store: false,
				showInHome: false
			},
			{
				name: 'cars',
				componentName: 'Cars',
				title: 'Vehículos',
				path: '/cars',
				icon: 'directions_car',
				store: true,
				showInHome: true,
				loadedMethod: carsAgencyApi.getAllCars
			},
			{
				name: 'marks',
				componentName: 'Marks',
				title: 'Marcas',
				path: '/marks',
				icon: 'stars',
				store: true,
				showInHome: true,
				loadedMethod: carsAgencyApi.getAllMarks
			},
			{
				name: 'categories',
				componentName: 'Categories',
				title: 'Categorías',
				path: '/categories',
				icon: 'category',
				store: true,
				showInHome: true,
				loadedMethod: carsAgencyApi.getAllCategories
			},
			{
				name: 'clients',
				componentName: 'Clients',
				title: 'Clientes',
				path: '/clients',
				icon: 'group',
				store: true,
				showInHome: true,
				loadedMethod: carsAgencyApi.getAllClients
			},
			{
				name: 'myaccount',
				componentName: 'MyAccount',
				title: 'Mi cuenta',
				path: '/my-account',
				icon: 'manage_accounts',
				store: false,
				showInHome: true
			}

		]
	};

	const processModules = accountsModules[account] || [];

	processModules.forEach(module => {
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