export default {
	namespaced: true,

	state: {
		promotions: [],
	},

	getters: {
		promotions(state) {
			return state.promotions;
		},
	},

	mutations: {
		setPromotions(state, promotions) {
			state.promotions = promotions;
		}
	},

	actions: { },
};