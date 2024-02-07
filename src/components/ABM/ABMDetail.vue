<template>
	<div>
		<Dialog
			v-model:visible="data.modalVisible"
			icon="pi pi-refresh"
			class="flex justify-content-center dialog"
			:draggable="false"
			style="width: 30vw"
			@hide="handleModalClose()"
			@show="handleDialogShow()"
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
								</p>
								<InputText
									:id="field.name"
									v-model="formData[field.modelName]"
									@update:modelValue="(value) => handleInputChange(value, field.modelName)"
									disabled
								/>
							</div>
						</div>

						<div class="field" v-if="field.type === 'price'">
							<div class="p-float-label">
								<p>
									{{ field.label }} 
								</p>
								<InputNumber
									:id="field.name"
									v-model="formData[field.modelName]"
									currency="USD"
									inputId="locale-german" 
									locale="de-DE" 
									:minFractionDigits="2"
									@update:modelValue="(value) => handleInputChange(value, field.modelName)"
									disabled
								/>
							</div>
						</div>

						<div class="field" v-if="field.type === 'number'">
							<div class="p-float-label">
								<p>
									{{ field.label }} 
								</p>
								<InputNumber
									:id="field.name"
									v-model="formData[field.modelName]"
									:useGrouping="false"
									@update:modelValue="(value) => handleInputChange(value, field.modelName)"
									disabled
								/>
							</div>
						</div>

						<div class="field" v-if="field.type === 'select'">
							<div class="p-float-label">
								<p>
									{{ field.label }} 
								</p>
								<Dropdown 
									v-model="formData[field.modelName]" 
									:options="field.options" 
									optionLabel="name" 
									:placeholder="field.placeholder" 
									disabled
								/>

							</div>
						</div>

						<div class="field" v-if="field.type === 'switch'">
							<div class="p-float-label">
								<p>
									{{ field.label }} 
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
									disabled
								/>
							</div>
						</div>

						<div class="field" v-if="field.type === 'image'">
							<div class="p-float-label">
								<p>
									{{ field.label }} 
								</p>
								<Image 
									:src="formData[field.modelName]" 
									alt="Image" 
									width="150"
									v-if="isObject(field.modelName)"
									preview
								/>
							</div>
						</div>

						<div class="field" v-if="field.type === 'date'">
							<div class="p-float-label">
								<p>
									{{ field.label }} 
									<input 
										type="date" 
										id="fecha" 
										v-model="formData[field.modelName]"
										@update:modelValue="(value) => handleInputChange(value, field.modelName)"
										class="input-date"
										disabled
									/>
								</p>
							</div>
						</div>
					</div>
				</form>
			</div>
		</Dialog>

		<Toast />
	</div>
</template>

<script>
import { mapGetters } from 'vuex';
import TitleModal from '../common/TitleModal.vue';
import Store from '../../managers/store/store';

export default {
	components: { TitleModal },
	props: {
		data: {
			type: Array,
			required: true,
			loadingBtnSave: false,
		},
	},
	data() {
		return {
			formData: {},
			errors: null,
		};
	},
	computed: {
		...mapGetters('UsersStore', ['loadingServerRequest']),
	},
	methods: {
		handleDialogShow() {
			for (const field of this.data.formConfiguration) {
				if (field.defaultValue !== undefined) {
					this.formData[field.modelName] = field.defaultValue;
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
		isObject(attribute) {
			if (typeof this.formData[attribute] !== 'object') {
				return true;
			} else {
				return false;
			}
		},
		save() {
			Store.commit('UsersStore/setLoadingServerRequest', true);
			this.errors = this.validateForm();

			if (this.errors === null) {
				this.formData.id = this.data.id;
				this.$emit('formDataUpdate', this.formData);
			}

			this.loadingBtnSave = false;
		},
		validateForm() {
			for (const item of this.data.formConfiguration) {
				if (item.required && (this.formData[item.modelName] === null || this.formData[item.modelName] === '')) {
					Store.commit('UsersStore/setLoadingServerRequest', false);
					return `El campo ${item.label} es requerido`;
				}
			}

			return null;
		}
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