<template>
	<main v-if="Configuration !== null">
		<div class="main-container" :style="getHeightWindow()">
			<div class="title-container">
				<h1 class="title">{{ $t('myaccount.title') }}</h1>
			</div>

			<div class="body-container">
				<div class="alert-cotainer">
					<InlineMessage
						severity="warn"
						class="alert"
					>
						{{ $t('myaccount.alert') }}
					</InlineMessage>
				</div>
				<form
					@submit.prevent="handleSubmit(!v$.$invalid)"
					class="p-fluid form"
				>
					<div
						v-for="field in Configuration.formConfiguration"
						:key="field.name"
						class="form-item"
					>
						<div class="field" v-if="field.type === 'text'">
							<div class="p-float-label">
								<p>
									{{ field.label }}
									<span
										v-if="field.required"
										class="required"
									>
										*
									</span>
								</p>
								<InputText
									:id="field.name"
									v-model="formData[field.modelName]"
									@update:modelValue="(value) => handleInputChange(value, field.modelName)"
								/>
							</div>
						</div>

						<div class="field" v-if="field.type === 'password'">
							<div class="p-float-label">
								<p>
									{{ field.label }}
									<span
										v-if="field.required"
										class="required"
									>
										*
									</span>
								</p>
								<Password
									:id="field.name"
									v-model="formData[field.modelName]"
									@update:modelValue="(value) => handleInputChange(value, field.modelName)"
									toggleMask
									:feedback="false"
								/>
							</div>
						</div>
					</div>

					<div v-if="errors" class="show-errors">
						{{ errors }}
					</div>

					<Button
						label="Guardar"
						class="mt-2"
						:loading="loadingBtnSave"
						@click="clickOnSaveButton()"
					/>
				</form>
			</div>
		</div>
	</main>
</template>

<script>
import { mapGetters } from 'vuex';

import { updateUser } from '../../managers/api/digitalDelightsApi';
import Store from '../../managers/store/store';
import { setConfigurationFileByAccount } from '../../utils/utils';

export default {
	data() {
		return {
			id: null,
			Configuration: null,
			formData: {},
			errors: null
		};
	},

	computed: {
		...mapGetters('UsersStore', [
			'user',
			'auth',
			'modules'
		])
	},

	mounted() {
		this.setCongigurationFile();
	},

	methods: {
		async setCongigurationFile() {
			const account = this.user.email.split('.')[1];
			this.Configuration = await setConfigurationFileByAccount(
				'myaccount',
				account
			);
			this.setUserData();
		},
		handleInputChange(value, moduleName) {
			this.formData[moduleName] = value;
		},
		clickOnSaveButton() {
			this.formData.id = this.user.id;

			this.errors = this.validateForm();
			let formData = new FormData();

			for (let key in this.formData) {
				formData.append(key, this.formData[key]);
			}

			if (this.errors === null) {
				this.updateUser();
			}
		},
		validateForm() {
			for (const item of this.Configuration.formConfiguration) {
				if (item.required && !this.formData[item.modelName
				]) {
					return `El campo ${item.label} es requerido`;
				}
			}

			if (this.formData['password'] !== this.formData['cpassword']) {
				return 'Las contraseñas no coinciden';
			}

			return null;
		},
		async updateUser() {
			updateUser(this.user.account_id, this.formData)
				.then((response) => {
					this.loading = false;
					this.$toast.add({
						severity: 'success',
						summary: this.$t('toast.success'),
						detail: response.data.message,
						life: 3000
					});
					this.logout();
				})
				.catch((error) => {
					this.$toast.add({
						severity: 'error',
						summary: this.$t('toast.error'),
						detail: error.response.data.message,
						life: 3000
					});
				});
		},
		async logout() {
			this.clearStores();
			await this.$store.dispatch('UsersStore/logout');

			return this.$router.replace('/login');
		},
		clearStores() {
			for (const module of this.modules) {
				if (module.store) {
					Store.commit(`${module.componentName}Store/clearStore`);
				}
			}
		},
		setUserData() {
			for (const itemConfiguration of this.Configuration.formConfiguration) {
				if (itemConfiguration.setDefaultValue) {
					this.formData[itemConfiguration.modelName] = this.user[itemConfiguration.modelName];
				}
			}
		},
		getHeightWindow() {
			var heightWindow = window.innerHeight - 60;

			return `height: ${heightWindow}px`;
		}
	}
};
</script>

<style lang="scss" scoped>
.main-container {
	background-color: #fff;
	display: flex;
	flex-direction: column;
	.title-container {
		display: flex;
		align-items: center;
		padding-left: 10px;
		height: 8vh;
	}
	.body-container {
		margin: auto;
		height: calc(100% - 8vh);
		width: 70%;
		.alert-cotainer {
			display: flex;
			flex-direction: column;
			align-items: center;
			align-content: center;
			.alert {
				padding: 10px;
			}
		}
		.form {
			height: calc(100% - 9vh);
			display: flex;
			flex-direction: column;
			margin-top: 20px;
			.form-item {
				margin-top: 4vh;
				padding: 5px 0px 0px 0px;
				.field {
					.p-float-label {
						p {
							.required {
								color: var(--error-color);
							}
						}
					}
				}
			}
			.show-errors {
				border: 1px solid var(--error-background);
				padding: 10px;
				text-align: center;
				background-color: var(--error-background);
				color: var(--error-color);
			}
		}
	}
}
</style>
