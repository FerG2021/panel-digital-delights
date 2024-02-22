export default {
	namespaced: true,

	state: { notifications: null },

	getters: {
		notifications(state) {
			return state.notifications;
		}
	},

	mutations: {
		setNotifications(state, notifications) {
			state.notifications = notifications;
		}
	},

	actions: { }
};