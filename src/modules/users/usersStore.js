import axios from 'axios';

import router from '../../managers/router/Router';
import store from '../../managers/store/store';
import loadModulesByAccount from '../../utils/modulesLoader';

export default {
	namespaced: true,

	state: {
		user: null,
		account: null,
		auth: false,
		modules: null,
		loadingServerRequest: false,
		loading: false,
		loaded: false,
		notificationToast: null,
		applicationNames: {
			lalo: 'Lalo Automotores',
			bunker: 'Bunker'
		}
	},

	getters: {
		user(state) {
			return state.user;
		},
		account(state) {
			return state.account;
		},
		auth(state) {
			return state.auth;
		},
		modules(state) {
			return state.modules;
		},
		loadingServerRequest(state) {
			return state.loadingServerRequest;
		},
		loading(state) {
			return state.loading;
		},
		loaded(state) {
			return state.loaded;
		}
		,
		notificationToast(state) {
			return state.notificationToast;
		},
		applicationNames(state) {
			state.applicationNames;
		}
	},

	mutations: {
		SET_USER(state, user) {
			state.user = user;
			state.auth = Boolean(user);

			if (user) {
				state.account = user.email.split('.')[1];
				loadModulesByAccount(store, router, state.account);
				document.title = state.applicationNames[state.account];
			} else {
				state.account = null;
			}
		},
		setModules(state, modules) {
			state.modules = modules;
		},
		setLoadingServerRequest(state, status) {
			state.loadingServerRequest = status;
		},
		loading(state) {
			state.loading = true;
		},
		loaded(state) {
			state.loaded = true;
			state.loading = false;
		},
		notificationToast(state, notification) {
			state.notificationToast = notification;
		}
	},

	actions: {
		async login({ dispatch }, credentials) {
			await axios.get('/sanctum/csrf-cookie');
			await axios.post('/login', credentials);

			return dispatch('getUser');
		},

		async logout({ dispatch }) {
			await axios.post('/logout');

			return dispatch('getUser');
		},

		getUser({ commit }) {
			axios
				.get('/api/user')
				.then((res) => {
					commit('SET_USER', res.data);
				})
				.catch(() => {
					commit('SET_USER', null);
				});
		}
	}
};