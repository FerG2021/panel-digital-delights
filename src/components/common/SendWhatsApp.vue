<script>
import TitleModal from './TitleModal.vue';

export default {
	components: { TitleModal },
	props: {
		configuration: {
			type: Array,
			required: true
		},
		clientRecords: {
			type: Object,
			required: true
		}
	},
	data() {
		return {
			formData: {},
			errors: null
		};
	},
	computed: {
		setMessageBody() {
			let messageBody = null;

			if (this.clientRecords.notification) {
				if (this.clientRecords.notification.name === 'sell') {
					messageBody = this.$t('notificationsSection.sell').replace('CAR_MODEL', this.clientRecords.car?.name);
				} else {
					messageBody = this.$t('notificationsSection.birthday');
				}
			} else {
				messageBody = this.$t('monthlyFeesSection.expired_date');
			}

			return messageBody;
		}
	},
	methods: {
		handleModalClose() {
			this.errors = null;
			this.formData = {};
		},
		showModal() {
			this.setDefaultMessage();
		},
		setDefaultMessage() {
			for (const configurationItem of this.configuration.formConfiguration) {
				this.formData[configurationItem.modelName] = `${configurationItem.defaultValue.replace('<CLIENT_NAME>', this.clientRecords.client.name)}. \n ${this.setMessageBody}`;
			}
		},
		sendMessage() {
			// 5493843401553

			this.errors = this.validateForm();
			let formData = new FormData();

			for (let key in this.formData) {
				formData.append(key, this.formData[key]);
			}

			if (this.errors === null) {
				// this.$emit('formDataCreate', this.formData);
				const url = encodeURI(
					'https://wa.me/' + parseInt(this.clientRecords.client.phone_number) + '?text=' + this.formData.message
				);

				window.open(url, '_blank');
			}

			// const url = encodeURI(
			// 	'https://wa.me/' + parseInt(this.clientRecords.client.phone_number) + '?text=' + this.formData.message
			// );

			// window.open(url, '_blank');
		},
		handleInputChange(value, moduleName) {
			this.formData[moduleName] = value;
		},
		validateForm() {
			for (const item of this.configuration.formConfiguration) {
				if (item.required && !this.formData[item.modelName] && this.formData[item.modelName] === '') {
					return `El campo ${item.label} es requerido`;
				}
			}

			return null;
		}
	}
};
</script>

<template>
	<Dialog
		v-model:visible="configuration.modalVisible"
		icon="pi pi-refresh"
		class="flex justify-content-center dialog"
		:draggable="false"
		style="width: 30vw"
		@hide="handleModalClose()"
		@show="showModal()"
	>
		<template #header>
			<TitleModal :header="configuration.header" />
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
					<div class="field" v-if="field.type === 'text-area'">
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
							<Textarea
								:id="field.name"
								autoResize
								rows="5"
								cols="30"
								v-model="formData[field.modelName]"
								@update:modelValue="(value) => handleInputChange(value, field.modelName)"
							/>
						</div>
					</div>
				</div>

				<div v-if="errors" class="show-errors">
					{{ errors }}
				</div>

				<Button
					label="Enviar mensaje"
					icon="pi pi-whatsapp"
					class="mt-2"
					:loading="loadingServerRequest"
					@click="sendMessage()"
				/>
			</form>
		</div>
	</Dialog>
</template>

<style lang="scss" scoped>
.dialog {
	.form-container {
		.form {
			.form-item {
				.field {
					.p-float-label {
						p {
							.required {
								color: red;
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