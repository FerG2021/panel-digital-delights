<template>
	<div>
		<Dialog
			v-model:visible="data.modalVisible"
			icon="pi pi-refresh"
			class="flex justify-content-center dialog"
			:draggable="false"
			style="width: 30vw "
			@hide="handleModalClose()"
		>
			<template #header>
				<TitleModal :header="data.header" />
			</template>

			<div class="form-container">
				<form
					@submit.prevent="handleSubmit(!v$.$invalid)"
					class="p-fluid form"
				>
					<div 
						v-for="field in data.formConfiguration" 
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
									:options="field.defaultValue" 
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
									@upload="onUpload"
									@select="selectedImage"
									:multiple="false"
									accept="image/*"
									:maxFileSize="1000000"
									invalidFileSizeMessage="{0}: Tamaño de archivo inválido, debe ser menor a {1}."
								>
									<template #empty>
										<p>
											{{ $t("productsSection.uploadImage") }}
										</p>
									</template>
								</FileUpload>
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
						@click="save()"
					/>
				</form>
			</div>
		</Dialog>

		<Toast />
	</div>
</template>

<script>
import TitleModal from '../common/TitleModal.vue';

export default {
	components: { TitleModal },
	props: {
		data: {
			type: Array,
			required: true,
		},
	},
	data() {
		return {
			formData: {},
			errors: null,
			loadingBtnSave: false
		};
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
			this.loadingBtnSave = true;
			this.errors = this.validateForm();
			let formData = new FormData();

			for (let key in this.formData) {
				formData.append(key, this.formData[key]);
			}

			if (this.errors === null) {
				this.$emit('formDataCreate', this.formData);
			}

			this.loadingBtnSave = false;

		},
		validateForm() {
			for (const item of this.data.formConfiguration) {
				if (item.required && !this.formData[item.modelName
				]) {
					return `El campo ${item.label} es requerido`;
				}
			}

			return null;
		},
		onUpload() {
			this.$toast.add({
				severity: 'info',
				summary: 'Success',
				detail: 'File Uploaded',
				life: 3000,
			});
		},
		selectedImage(event) {
			for (const configuration of this.data.formConfiguration) {
				if (configuration.type === 'image') {
					this.formData[configuration.modelName] = event.files[0];
				}
			}
		},
	}	
};
</script>

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