<script>
import { mapActions, mapGetters } from 'vuex';

import FormLogin from './FormLogin.vue';
import Greeting from './Greeting.vue';

export default {
	name: 'LoginComponent',
	components: {
		Greeting,
		FormLogin
	},
	computed: {
		...mapGetters('UsersStore', ['user', 'auth']),
		...mapActions('UsersStore', ['getUser'])
	}
};
</script>

<template>
	<div class="main-container">
		<div class="login-container">
			<Card class="card-login">
				<template #title>
					<Greeting />
				</template>
				<template #content>
					<FormLogin />
				</template>
			</Card>
		</div>
	</div>
	<Toast />
</template>

<style lang="scss" scoped>
.main-container {
	height: 100vh;
	background: var(--background-gradient);
	display: flex;
	.login-container {
		display: flex;
		width: 100%;
		.card-login {
			margin: auto;
			width: 30vw;
			box-shadow: var(--box-shadow);
		}
	}
}
</style>
