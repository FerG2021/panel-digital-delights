<script>
import { mapGetters } from 'vuex';

import Store from '../../managers/store/store';
import ImagesMultiple from '../common/ImagesMultiple.vue';
import TitleModal from '../common/TitleModal.vue';

export default {
	components: {
		TitleModal,
		ImagesMultiple
	},
	props: {
		configuration: {
			type: Array,
			required: true,
			loadingBtnSave: false
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
			openGalleria: false,
			imagesGalleria: null,
			responsiveOptions: [
				{
					breakpoint: '1500px',
					numVisible: 5
				},
				{
					breakpoint: '1024px',
					numVisible: 3
				},
				{
					breakpoint: '768px',
					numVisible: 2
				},
				{
					breakpoint: '560px',
					numVisible: 1
				}
			]
		};
	},
	computed: {
		...mapGetters('UsersStore', ['user', 'loadingServerRequest']),
		title() {
			return this.configuration.header.update;
		},
		arrayImages() {
			let image;

			for (const itemConfig of this.configuration.formConfiguration) {
				if (itemConfig.type === 'image-multiple') {
					image = itemConfig.default[0];
				}
			}

			return image;
		}
	},
	methods: {
		handleDialogShow() {
			for (const field of this.configuration.formConfiguration) {
				if (field.default !== undefined) {
					this.formData[field.modelName] = field.default;
				} else {
					this.formData[field.modelName] = '';
				}
			}
		},
		handleModalClose() {
			this.errors = null;
			this.formData = {};
		},
		handleInputChange(value, moduleName) {
			this.formData[moduleName] = value;
		},
		selectedImage(event) {
			for (const configuration of this.configuration.formConfiguration) {
				if (configuration.type === 'image') {
					this.formData[configuration.modelName] = event.files[0];
				}

				if (configuration.type === 'image-multiple') {
					this.formData[configuration.modelName] = event.files;
				}
			}
		},
		isObject(attribute) {
			if (typeof this.formData[attribute] !== 'object') {
				return true;
			} else {
				return false;
			}
		},
		save() {
			this.formData.id = this.configuration.id;
			this.errors = this.validateForm();
			let formData = new FormData();

			for (let key in this.formData) {
				formData.append(key, this.formData[key]);
			}

			if (this.errors === null) {
				this.sendUpdate();
			}
		},
		sendUpdate() {
			Store.commit('UsersStore/setLoadingServerRequest', true);

			this.formData = this.formatItem(this.formData);

			let formData = new FormData();

			for (let key in this.formData) {
				if (this.formData[key] !== null) {
					formData.append(key, this.formData[key]);
				}
			}

			this.endpoints.update(this.user.account_id, formData)
				.then((response) => {
					this.configuration.openUpdateModal = false;
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
				if (item.required && (this.formData[item.modelName] === null || this.formData[item.modelName] === '')) {
					Store.commit('UsersStore/setLoadingServerRequest', false);

					return `El campo ${item.label} es requerido`;
				}
			}

			return null;
		},
		clickOpenImages(item) {
			this.openGalleria = true;
			this.imagesGalleria = item;
		}
	}
};
</script>

<template>
	<div>
		<Dialog
			v-model:visible="configuration.openUpdateModal"
			icon="pi pi-refresh"
			class="flex justify-content-center dialog"
			:draggable="false"
			style="width: 30vw"
			@hide="handleModalClose()"
			@show="handleDialogShow()"
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
								<Image
									:src="formData[field.modelName]"
									alt="Image"
									width="150"
									v-if="isObject(field.modelName)"
								/>
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
								<ImagesMultiple
									v-if="formData[field.modelName]"
									:images="formData[field.modelName]"
								/>
								<p
									class="update-images-legend">
									{{ $t('PRODUCTS_SECTION.UPDATE_IMAGES') }}
								</p>
								<FileUpload
									name="form.demo"
									url="./upload.php"
									@select="selectedImage"
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
					.update-images-legend {
						font-size: 13px;
					}
				}
				.open-image-multiple {
					cursor: pointer;
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