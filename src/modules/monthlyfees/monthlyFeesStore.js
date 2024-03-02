export default {
	namespaced: true,

	state: { monthlyFees: null },

	getters: {
		monthlyFees(state) {
			return state.monthlyFees;
		}
	},

	mutations: {
		setMonthlyFees(state, monthlyFees) {
			state.monthlyFees = monthlyFees;
		}
	},

	actions: {}
};