<script>
import { mapGetters } from 'vuex';

import TitleModal from '../../../components/common/TitleModal.vue';
import Store from '../../../managers/store/store';

export default {
	components: { TitleModal },
	props: {
		configuration: {
			type: Array,
			required: true
		},
		endpoints: {
			type: Object,
			required: true
		},
		data: {
			type: Object,
			required: true
		}
	},
	data() {
		return {
			formData: {},
			errors: null,
			loading: false,
			lifeTimeToast: 3000
		};
	},
	computed: { ...mapGetters('UsersStore', ['user', 'loadingServerRequest']) },
	methods: {
		handleModalClose() {
			this.loading = false;
			this.errors = null;
			this.formData = {};
		},
		handleInputChange(value, moduleName) {
			this.formData[moduleName] = value;
		},
		save() {
			Store.commit('UsersStore/setLoadingServerRequest', true);

			this.errors = this.validateForm();
			let formData = new FormData();

			for (let key in this.formData) {
				formData.append(key, this.formData[key]);
			}

			if (this.errors === null) {
				this.sendSell();
			}
		},
		sendSell() {
			this.loading = true;
			this.formData.buyer_id = this.formData.buyer.id;
			this.formData.car_id = this.data.id;

			let formData = new FormData();

			for (let key in this.formData) {
				if (this.formData[key] !== null) {
					formData.append(key, this.formData[key]);
				}
			}

			this.endpoints.sell(this.user.account_id, formData)
				.then((response) => {
					this.configuration.openSellModal = false;
					this.$toast.add({
						severity: 'success',
						summary: this.$t('toast.success'),
						detail: response.data.message,
						life: this.lifeTimeToast
					});
					Store.commit('UsersStore/setLoadingServerRequest', false);
					this.endpoints.getAll(this.user.account_id);
				})
				.catch((error) => {
					this.$toast.add({
						severity: 'error',
						summary: this.$t('toast.error'),
						detail: error.response.data.message,
						life: this.lifeTimeToast
					});
					Store.commit('UsersStore/setLoadingServerRequest', false);
				});

			this.loading = false;
		},
		validateForm() {
			for (const item of this.configuration.formConfiguration) {
				if (item.required && !this.formData[item.modelName
				]) {
					Store.commit('UsersStore/setLoadingServerRequest', false);

					return `El campo ${item.label} es requerido`;
				}
			}

			return null;
		},
		getOptionLabel(option) {
			return `${option.lastname}, ${option.name}`;
		}
	}
};
</script>

<template>
	<div>
		<Dialog
			v-model:visible="configuration.openSellModal"
			icon="pi pi-refresh"
			class="flex justify-content-center dialog"
			:draggable="false"
			style="width: 30vw "
			@hide="handleModalClose()"
		>
			<template #header>
				<TitleModal :title="configuration.header" />
			</template>

			<div class="form-container">
				<form
					@submit.prevent="handleSubmit(!v$.$invalid)"
					class="p-fluid form"
				>
					<div
						v-for="field in configuration.formConfiguration"
						:key="field.name"
						class="form-item"
					>
						<div
							v-if="field.type === 'number'"
							class="field"
						>
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
								<InputNumber
									:id="field.name"
									v-model="formData[field.modelName]"
									:useGrouping="false"
									@update:modelValue="(value) => handleInputChange(value, field.modelName)"
								/>
							</div>
						</div>

						<div
							v-if="field.type === 'select' && !configuration.selled"
							class="field"
						>
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
								<Dropdown
									v-model="formData[field.modelName]"
									:options="field.options"
									optionLabel="name"
									:placeholder="field.placeholder"
								>
									<template #option="slotProps">
										<div class="flex align-items-center">
											<div>{{ getOptionLabel(slotProps.option) }}</div>
										</div>
									</template>

									<template #value="slotProps">
										<div v-if="slotProps.value" class="flex align-items-center">
											<div>{{ getOptionLabel(slotProps.value) }}</div>
										</div>
										<span v-else>
											{{ slotProps.placeholder }}
										</span>
									</template>
								</Dropdown>
							</div>
						</div>

						<div
							v-if="field.type === 'date' && !configuration.selled"
							class="field"
						>
							<div class="p-float-label">
								<p>
									{{ field.label }}
									<span
										v-if="field.required"
										class="required"
									>
										*
									</span>
									<input
										type="date"
										id="fecha"
										v-model="formData[field.modelName]"
										@update:modelValue="(value) => handleInputChange(value, field.modelName)"
										class="input-date"
									/>
								</p>
							</div>
						</div>
					</div>

					<div v-if="errors" class="show-errors">
						{{ errors }}
					</div>

					<Button
						label="Guardar"
						class="mt-2"
						:loading="loading"
						@click="save()"
					/>
				</form>
			</div>
		</Dialog>

		<Toast />
	</div>
</template>

<style lang="scss" scoped>
.form-container {
	.form {
		.form-item {
			padding: 5px 0px 0px 0px;
			.field {
				.p-float-label {
					p {
						.required {
							color: var(--error-color);
						}
					}
					.input-date {
						border: 1px solid #cecdcd;
						width: 100%;
						height: 40px;
						border-radius: 3px;
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

</style>