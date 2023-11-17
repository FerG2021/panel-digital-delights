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
					{{ $t("login.formLogin.email") }}
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

<script>
import { required } from '@vuelidate/validators';
import { useVuelidate } from '@vuelidate/core';
import { helpers } from '@vuelidate/validators';

export default {
	name: 'FormLogin',
	data() {
		return {
			loading: false,
			submitted: false,
			isFormValid: false,
			email: '',
			password: '',
		};
	},

	methods: {
		async login() {
			let error = 0;
			this.loading = true;
			await this.axios.get('/sanctum/csrf-cookie');
			await this.axios
				.post('/login', { email: this.email, password: this.password })
				.then(() => {
					this.$store.dispatch('UsersStore/getUser');
				})
				.catch(function (error) {
					error = 1;
					if (error.response) {
						// La respuesta fue hecha y el servidor respondió con un código de estado
					} else if (error.request) {
						// La petición fue hecha pero no se recibió respuesta
						// `error.request` es una instancia de XMLHttpRequest en el navegador y una instancia de
						// http.ClientRequest en node.js
					} else {
						// Algo paso al preparar la petición que lanzo un Error
					}
				});

			this.loading = false;

			if (error === 1) {
				this.$toast.add({
					severity: 'error',
					summary: this.$t('login.errorOcurred'),
					detail: this.$t('login.loginError'),
					life: 3000,
				});
			}

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
		},
	},

	setup: () => ({ v$: useVuelidate() }),

	validations() {
		return {
			email: {
				required: helpers.withMessage(
					this.$t('login.formLogin.requiredEmail'),
					required
				),
			},
			password: {
				required: helpers.withMessage(
					this.$t('login.formLogin.requiredPassword'),
					required
				),
			},
		};
	},
};
</script>

<style lang="scss" scoped>
.password {
	margin-top: 4vh;
}
</style>