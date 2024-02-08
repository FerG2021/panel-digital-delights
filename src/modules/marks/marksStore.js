export default {
	namespaced: true,

	state: {
		marks: null,
	},

	mutations: {
		setMarks(state, marks) {
			console.log('marks');
			console.log(marks);
			state.marks = marks;
		},
		clearStore(state) {
			state.marks = null;
		}
	},

	getters: {
		marks(state) {
			return state.marks;
		},
	},

	actions: { },
};