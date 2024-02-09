export default {
	namespaced: true,

	state: { categories: null },

	mutations: {
		setCategories(state, categories) {
			state.categories = categories;
		},
		clearStore(state) {
			state.categories = null;
		}
	},

	getters: {
		categories(state) {
			return state.categories;
		}
	},

	actions: { }
};