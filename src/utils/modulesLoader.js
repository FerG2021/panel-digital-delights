import Store from '../managers/store/store';

export default function loadModulesByAccount(store, router, account) {
	const accountsModules = {
		// Agrega otros tipos de account y los módulos correspondientes aquí
		admin: [
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
		if (module.store === true) {
			import(`../modules/${module.name}/${module.name}Store.js`).then(moduleStore => {
				store.registerModule(`${module.componentName}Store`, moduleStore.default);
			});
		}

		router.addRoute({
			path: `${module.path}`,
			component: () => import(`../modules/${module.name}/${module.componentName}.vue`)
		});

		Store.commit('UsersStore/setModules', processModules);
	});
}