<script>
import { mapGetters } from 'vuex';

import LogOut from '../common/LogOut.vue';

import NotificationButton from './NotificationButton.vue';
import SidebarBtnExpand from './SidebarBtnExpand.vue';
import SidebarItem from './SidebarItem.vue';
import SidebarLogo from './SidebarLogo.vue';

export default {
	name: 'SideBar',

	components: {
		NotificationButton,
		SidebarBtnExpand,
		SidebarItem,
		LogOut,
		SidebarLogo
	},

	data() {
		return { is_expanded: false };
	},

	computed: {
		...mapGetters('UsersStore', [
			'user',
			'auth',
			'modules'
		]),
		items() {
			let items = [];

			for (const module of this.modules) {
				if (module.menuItem) {
					items.push({
						route: module.path,
						icon: module.icon,
						name: module.title,
						id: module.name
					});
				}
			}

			return items;
		},
		account() {
			let account = {};

			for (const module of this.modules) {
				if (module.name === 'myaccount') {
					account = {
						route: module.path,
						icon: module.icon,
						name: module.title,
						id: module.name
					};
				}
			}

			return account;
		},
		notifications() {
			let notification = {};

			for (const module of this.modules) {
				if (module.name === 'notifications') {
					notification = {
						route: module.path,
						icon: module.icon,
						name: module.title,
						id: module.name
					};
				}
			}

			return notification;
		},
		showNotifications() {
			return this.modules.some(route => route.name === "notifications");
		}
	},

	methods: {
		expandSidebar(data) {
			this.is_expanded = data;
			this.account.name = `${this.user.name}`;
		},
		loadedModule(item) {
			let modulesName = [];

			for (const module of this.modules) {
				modulesName.push(module.name);
			}

			return modulesName.includes(item.id);
		}
	}
};
</script>

<template>
	<aside :class="`${is_expanded && 'is-expanded'}`">
		<SidebarLogo/>

		<SidebarBtnExpand @expandSidebar="expandSidebar"/>

		<div class="menu">
			<NotificationButton
				v-if="showNotifications"
				:item="notifications"
				:is_expanded="is_expanded"
			/>
		</div>

		<h3> {{ $t('sidebar.title') }} </h3>
		<div class="menu">
			<div
				v-for="item in items"
				:key="item"
			>
				<SidebarItem
					v-if="loadedModule(item)"
					:item="item"
					:is_expanded="is_expanded"
				/>
			</div>
		</div>

		<div class="flex"></div>

		<div class="menu">
			<SidebarItem
				:item="account"
				:is_expanded="is_expanded"
			/>
			<LogOut
				:is_expanded="is_expanded"
			/>
		</div>
	</aside>
</template>

<style lang="scss" scoped>
aside {
	display: flex;
	top: 0;
	flex-direction: column;
	width: calc(2rem + 32px);
	min-height: 100vh;
	overflow: hidden;
	padding: 1rem;
	background-color: var(--dark);
	color: var(--light);
	transition: 0.2s ease-out;

	.flex {
		flex: 1 1 0;
	}

	h3,
	.button .text {
		opacity: 0;
		transition: 0.3s ease-out;
	}

	.menu {
		margin: 0 -1rem;
	}

	&.is-expanded {
		width: var(--sidebar-width);
		.menu-toggle-wrap {
			top: -3rem;
			.menu-toggle {
			transform: rotate(-180deg);
			}
		}
		h3,
			.button .text {
				opacity: 1;
		}
		h3 {
			color: var(--grey);
			font-size: 0.875rem;
			margin-bottom: 0.5rem;
			text-transform: uppercase;
		}
		.button {
			.material-icons {
				margin-right: 1rem;
			}
		}
	}

	@media (max-width: 768px) {
		position: fixed;
		z-index: 99;
	}

	.logOut {
		cursor: pointer;
	}
}
</style>
