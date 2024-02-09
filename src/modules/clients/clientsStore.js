export default {
	namespaced: true,

	state: { clients: null },

	getters: {
		clients(state) {
			return state.clients;
		}
	},

	mutations: {
		setClients(state, clients) {
			state.clients = clients;
		},
		clearStore(state) {
			state.clients = null;
		}
	},

	actions: { }
};