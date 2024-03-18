<script>
import { mapGetters } from 'vuex';

import Store from '../../managers/store/store';
import TitleModal from '../common/TitleModal.vue';

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
		formatItem: {
			required: false,
			type: Function,
			default: (item) => item
		}
	},
	data() {
		return {
			formData: {},
			errors: null,
			lifeTimeToast: 3000,
			uploadedFiles: null
		};
	},
	computed: {
		...mapGetters('UsersStore', ['user', 'loadingServerRequest']),
		title() {
			return this.configuration.header.new;
		}
	},
	methods: {
		handleModalClose() {
			this.errors = null;
			this.formData = {};
		},
		handleInputChange(value, moduleName) {
			this.formData[moduleName] = value;
		},
		save() {
			this.errors = this.validateForm();
			let formData = new FormData();

			for (let key in this.formData) {
				formData.append(key, this.formData[key]);
			}

			if (this.errors === null) {
				this.sendCreate();
			}
		},
		sendCreate() {
			this.formData = this.formatItem(this.formData);

			let formData = new FormData();

			for (let key in this.formData) {
				if (this.formData[key] !== null) {
					formData.append(key, this.formData[key]);
				}
			}

			this.endpoints.new(this.user.account_id, formData)
				.then((response) => {
					this.configuration.openCreateModal = false;
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
		},
		validateForm() {
			for (const item of this.configuration.formConfiguration) {
				if (item.required && !this.formData[item.modelName]) {
					return `El campo ${item.label} es requerido`;
				}
			}

			return null;
		},
		selectedImage(event) {
			for (const configuration of this.configuration.formConfiguration) {
				if (configuration.type === 'image') {
					this.formData[configuration.modelName] = event.files[0];
				}

				if (configuration.type === 'image-multiple') {
					this.formData[configuration.modelName] = event.files;
					this.formData[configuration.modelName].reverse();
				}
			}
		}
	}
};
</script>

<template>
	<div>
		<Dialog
			v-model:visible="configuration.openCreateModal"
			icon="pi pi-refresh"
			class="flex justify-content-center dialog"
			:draggable="false"
			@hide="handleModalClose()"
			style="width: 30vw"
		>
			<template #header>
				<TitleModal
					:title="title"
				/>
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
									:placeholder="field.placeholder"
								/>
							</div>
						</div>

						<div class="field" v-if="field.type === 'price'">
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
									currency="USD"
									inputId="locale-german"
									locale="de-DE"
									:minFractionDigits="2"
									@update:modelValue="(value) => handleInputChange(value, field.modelName)"
								/>
							</div>
						</div>

						<div class="field" v-if="field.type === 'number'">
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
									:placeholder="field.placeholder"
								/>
							</div>
						</div>

						<div class="field" v-if="field.type === 'select'">
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
								/>

							</div>
						</div>

						<div class="field" v-if="field.type === 'switch'">
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
								<ToggleButton
									:id="field.name"
									v-model="formData[field.modelName]"
									onLabel="SI"
									offLabel="NO"
									onIcon="pi pi-check"
									offIcon="pi pi-times"
									class="w-9rem"
									@update:modelValue="(value) => handleInputChange(value === true ? 1 : 0, field.modelName)"
								/>
							</div>
						</div>

						<div class="field" v-if="field.type === 'image'">
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
								<FileUpload
									name="form.demo"
									url="./upload.php"
									@select="selectedImage"
									:multiple="false"
									accept="image/*"
									:maxFileSize="1000000"
									invalidFileSizeMessage="{0}: Tamaño de archivo inválido, debe ser menor a {1}."
								>
									<template #empty>
										<p>
											{{ $t("PRODUCTS_SECTION.uploadImage") }}
										</p>
									</template>
								</FileUpload>
							</div>
						</div>

						<div class="field" v-if="field.type === 'image-multiple'">
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
								<FileUpload
									name="form.demo"
									url="./upload.php"
									@select="selectedImage"
									@remove="remove"
									:multiple="true"
									accept="image/*"
									:maxFileSize="1000000"
									invalidFileSizeMessage="{0}: Tamaño de archivo inválido, debe ser menor a {1}."
								>
									<template #empty>
										<p>
											{{ $t("PRODUCTS_SECTION.uploadImage") }}
										</p>
									</template>
								</FileUpload>
							</div>
						</div>

						<div class="field" v-if="field.type === 'date'">
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
						:loading="loadingServerRequest"
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