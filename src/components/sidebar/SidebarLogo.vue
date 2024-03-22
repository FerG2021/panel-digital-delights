<script>
import { mapGetters } from 'vuex';

import lalo from '../../assets/lalo.png';
import logo from '../../assets/logo.png';

export default {
	name: 'SidebarLogo',
	data() {
		return {
			logo: logo,
			lalo: lalo
		};
	},
	computed: {
		...mapGetters('UsersStore', ['account']),
		imgLink() {
			return this[this.account] ? this[this.account] : this.logo;
		}
	}
};
</script>

<template>
	<div class="logo">
		<img :src="imgLink" alt="Vue" />
	</div>
</template>

<style lang="scss" scoped>
.logo {
	margin-bottom: 1rem;
	img {
		width: 2.5rem;
		height: 2.5rem;
	}
}
</style>