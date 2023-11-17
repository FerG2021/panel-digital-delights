import { createStore } from 'vuex';

import usersStore from '../../modules/users/usersStore';

export default createStore({
	modules: {
		UsersStore: usersStore,
	}
});