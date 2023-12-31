import axios from 'axios';

export default {
	namespaced: true,

	state: {
		user: null,
		auth: false,
		modules: null,
		loadingServerRequest: false,
	},

	mutations: {
		SET_USER(state, user) {
			state.user = user;
			state.auth = Boolean(user);
		},
		setModules(state, modules) {
			state.modules = modules;
		},
		setLoadingServerRequest(state, status) {
			state.loadingServerRequest = status;
		}
	},

	getters: {
		user(state) {
			return state.user;
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
		},
	},
};