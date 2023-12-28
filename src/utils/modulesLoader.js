import Store from '../managers/store/store';
import bunker from '../managers/accounts/bunker';
import lalo from '../managers/accounts/lalo';

const accounts = {
	bunker: bunker,
	lalo: lalo
};

let accountConfig = null;



export const loadModulesByAccount = (store, router, account) => {
	// accountConfig = import(`../managers/accounts/${account}.js`);

	accountConfig = accounts[account];

	console.log('accountConfig');
	console.log(accountConfig);

	for (const config of accountConfig) {
		if (config.store === true) {
			import(`../modules/${config.name}/${config.name}Store.js`).then((moduleStore) => {
				store.registerModule(`${config.componentName}Store`, moduleStore.default);
			});
		}

		router.addRoute({
			path: `${config.path}`,
			component: () => import(`../modules/${config.name}/${config.componentName}.vue`),
		});

	}
	Store.commit('UsersStore/setModules', accountConfig);

	// accountConfig.then((config) => {
	// 	const processModules = config.default || [];

	// 	processModules.forEach((module) => {
	// 		if (module.store === true) {
	// 			import(`../modules/${module.name}/${module.name}Store.js`).then((moduleStore) => {
	// 				store.registerModule(`${module.componentName}Store`, moduleStore.default);
	// 			});
	// 		}

	// 		router.addRoute({
	// 			path: `${module.path}`,
	// 			component: () => import(`../modules/${module.name}/${module.componentName}.vue`),
	// 		});

	// 		Store.commit('UsersStore/setModules', processModules);

	// 		// const myGetterValue = store.getters['UsersStore/user'];
	// 		// console.log('myGetterValue');
	// 		// console.log(myGetterValue);

	// 	});
	// });
	Store.commit('UsersStore/loaded');
};

export const loadEndpointsByAccount = async (account_id) => {
	const config = await accountConfig;  
  
	const processModules = config.default || [];
  
	await Promise.all(processModules.map(async (module) => {
		if (module.loaderMethod) {
			try {
				await module.loaderMethod(account_id);
			} catch (error) {
				console.error(`Error al cargar el módulo ${module.name}:`, error);
			}
		}
	}));
};