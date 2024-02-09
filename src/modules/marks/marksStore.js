export default {
	namespaced: true,

	state: { marks: null },

	mutations: {
		setMarks(state, marks) {
			state.marks = marks;
		},
		clearStore(state) {
			state.marks = null;
		}
	},

	getters: {
		marks(state) {
			return state.marks;
		}
	},

	actions: { }
};