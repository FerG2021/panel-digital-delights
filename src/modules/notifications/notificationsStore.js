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
			console.log('notifications');
			console.log(notifications);
			state.notifications = notifications;
		}
	},

	actions: { }
};