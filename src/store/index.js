import { createStore } from 'vuex';
// axios
import axios from 'axios';

// usado para login
axios.defaults.withCredentials = true;

export default createStore({
	state: {
		user: null,
	},

	mutations: {
		SET_USER(state, user) {
			state.user = user;
		}
	},

	actions: {
		async login({ dispatch }, credentials) {
			await axios.get('/sanctum/csrf-cookie');
			await axios.post('/login', credentials)
				.then(res => {
					console.log('res');
					console.log(res);
				})
				.catch(function (error) {
					if (error.response) {
						console.log(error.response.data);
						console.log(error.response.status);
						console.log(error.response.headers);
					} else if (error.request) {
						console.log(error.request);
					} else {
						console.log('Error', error.message);
					}
					console.log(error.config);
				});
			return dispatch('getUser');
		},

		getUser({ commit }) {
			console.log('getUser');
			axios.get('/user')
				.then(res => {
					commit('SET_USER', res.data);
				})
				.catch(function (error) {
					if (error.response) {
						console.log(error.response.data);
						console.log(error.response.status);
						console.log(error.response.headers);
					} else if (error.request) {
						console.log(error.request);
					} else {
						console.log('Error', error.message);
					}
					console.log(error.config);
				});
		},
	},
});

