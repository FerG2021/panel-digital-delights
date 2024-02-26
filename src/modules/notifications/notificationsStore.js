export default {
	namespaced: true,

	state: { notifications: [] },

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