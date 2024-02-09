export default {
	namespaced: true,

	state: { products: [] },

	mutations: {
		setProducts(state, products) {
			state.products = products;
		}
	},

	getters: {
		products(state) {
			return state.products;
		}
	},

	actions: { }
};