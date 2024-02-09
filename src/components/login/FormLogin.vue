<script>
import { useVuelidate } from '@vuelidate/core';
import { helpers, required } from '@vuelidate/validators';
import { mapGetters } from 'vuex';

import Store from '../../managers/store/store';

export default {
	name: 'FormLogin',
	data() {
		return {
			loading: false,
			submitted: false,
			isFormValid: false,
			email: '',
			password: ''
		};
	},
	computed: { ...mapGetters('UsersStore', ['loading']) },

	methods: {
		async login() {
			this.loading = true;
			await this.axios.get('/sanctum/csrf-cookie');
			await this.axios
				.post('/login', {
					email: this.email,
					password: this.password
				})
				.then(() => {
					Store.commit('UsersStore/loading');
					this.$store.dispatch('UsersStore/getUser');
				})
				.catch((error) => {
					if (error.response) {
						this.$toast.add({
							severity: 'error',
							summary: this.$t('login.errorOcurred'),
							detail: error.response.data.message,
							life: 3000
						});
					} else if (error.request) {
						// La petición fue hecha pero no se recibió respuesta
						// `error.request` es una instancia de XMLHttpRequest en el navegador y una instancia de
						// http.ClientRequest en node.js
					} else {
						// Algo paso al preparar la petición que lanzo un Error
					}
				});

			this.loading = false;

			return this.$router.replace('/');
		},
		handleSubmit(isFormValid) {
			this.isFormValid = isFormValid;
			this.submitted = true;

			if (!isFormValid) {
				return;
			}

			this.toggleDialog();
		},
		toggleDialog() {
			this.showMessage = !this.showMessage;
			this.login();
		},
		resetForm() {
			this.loading = false;
			this.email = null;
			this.password = null;
			this.submitted = false;
		}
	},

	setup: () => ({ v$: useVuelidate() }),

	validations() {
		return {
			email: {
				required: helpers.withMessage(
					this.$t('login.formLogin.requiredEmail'),
					required
				)
			},
			password: {
				required: helpers.withMessage(
					this.$t('login.formLogin.requiredPassword'),
					required
				)
			}
		};
	}
};
</script>

<template>
	<form
		@submit.prevent="handleSubmit(!v$.$invalid)"
		class="p-fluid mt-30"
	>
		<div class="field">
			<div class="p-float-label">
				<InputText
					id="email"
					inputId="integeronly"
					v-model="v$.email.$model"
					:class="{ 'p-invalid': v$.email.$invalid && submitted }"
				/>
				<label
					for="email"
					:class="{ 'p-error': v$.email.$invalid && submitted }"
				>
					{{ $t('login.formLogin.email') }}
					<span style="color: red">*</span>
				</label>
			</div>
			<small
				v-if="
					(v$.email.$invalid && submitted) ||
						v$.email.$pending.$response
				"
				class="p-error"
			>
				{{ v$.email.required.$message.replace("Value", "Email") }}
			</small>
		</div>

		<div class="field password">
			<div class="p-float-label">
				<Password
					id="password"
					inputId="integeronly"
					v-model="v$.password.$model"
					:feedback="false"
					toggleMask
					:class="{ 'p-invalid': v$.password.$invalid && submitted }"
				/>
				<label
					for="password"
					:class="{ 'p-error': v$.password.$invalid && submitted }"
				>
					{{ $t("login.formLogin.password") }}
					<span style="color: red">*</span>
				</label>
			</div>
			<small
				v-if="
					(v$.password.$invalid && submitted) ||
						v$.password.$pending.$response
				"
				class="p-error"
			>
				{{ v$.password.required.$message.replace("Value", "Contraseña")	}}
			</small>
		</div>

		<Button
			:label="$t('login.login')"
			type="submit"
			class="mt-2"
			:loading="loading"
		/>
	</form>
</template>

<style lang="scss" scoped>
.password {
	margin-top: 4vh;
}
</style>