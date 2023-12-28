import axios from 'axios';
import { loadModulesByAccount } from '../../utils/modulesLoader';
import store from '../../managers/store/store';
import router from '../../managers/router/Router';

export default {
	namespaced: true,

	state: {
		user: null,
		auth: false,
		account: null,
		modules: null,
		loadingServerRequest: false,
		loaded: false,
	},

	getters: {
		user(state) {
			return state.user;
		},
		auth(state) {
			return state.auth;
		},
		account(state) {
			return state.account;
		},
		modules(state) {
			return state.modules;
		},
		loadingServerRequest(state) {
			return state.loadingServerRequest;
		},
		loaded(state) {
			return state.loaded;
		},
	},

	mutations: {
		SET_USER(state, user) {
			console.log('user');
			console.log(user);
			state.user = user;
			state.auth = Boolean(user);
			state.account = user?.email.split('.')[1];
			
		},
		setModules(state, modules) {
			state.modules = modules;
		},
		setLoadingServerRequest(state, status) {
			state.loadingServerRequest = status;
		},
		loaded(state) {
			state.loaded = true;
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
					loadModulesByAccount(store, router, res.data.email.split('.')[1]);
				})
				.catch(() => {
					commit('SET_USER_NULL', null);
				});
		},
	},
};