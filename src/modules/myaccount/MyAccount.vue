<template>
    <main v-if="Configuration !== null">
        <div class="main-container" :style="getHeightWindow()">
			<div class="title-container">
                <h1 class="title">Mi cuenta</h1>
			</div>

            <div class="body-container">
				<InlineMessage 
					severity="warn"
					class="alert"
				>
					Al modificar algunos de los datos de su cuenta la sesión se cerrará y deberá voler a ingresar
				</InlineMessage>
                <form
                    @submit.prevent="handleSubmit(!v$.$invalid)"
                    class="p-fluid form"
                >
					<div 
						v-for="field in Configuration.formConfiguration" 
						:key="field.name"
						class="form-item"
					>
						<!-- {{ field }} -->
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
<!-- 
                    <div class="field form-item">
                        <div class="p-float-label">
                            <InputText
                                id="name"
                                inputId="integeronly"
                                v-model="v$.name.$model"
                                style="width: 100%"
                                :class="{
                                    'p-invalid': v$.name.$invalid && submitted,
                                }"
                            />
                            <label
                                for="name"
                                :class="{
                                    'p-error': v$.name.$invalid && submitted,
                                }"
                                >Nombre<span style="color: red">*</span></label
                            >
                        </div>
                        <small
                            v-if="
                                (v$.name.$invalid && submitted) ||
                                v$.name.$pending.$response
                            "
                            class="p-error"
                        >
                            {{
                                v$.name.required.$message.replace(
                                    "Value",
                                    "Nombre"
                                )
                            }}
                        </small>
                    </div> -->

                    <!-- <div class="field form-item"> -->
                        <!-- <div class="p-float-label">
                            <InputText
                                id="email"
                                inputId="integeronly"
                                v-model="v$.email.$model"
                                style="width: 100%"
                                :class="{
                                    'p-invalid': v$.email.$invalid && submitted,
                                }"
                            />
                            <label
                                for="email"
                                :class="{
                                    'p-error': v$.email.$invalid && submitted,
                                }"
                                >Email<span style="color: red">*</span></label
                            >
                        </div>
                        <small
                            v-if="
                                (v$.email.$invalid && submitted) ||
                                v$.email.$pending.$response
                            "
                            class="p-error"
                        >
                            {{
                                v$.email.required.$message.replace(
                                    "Value",
                                    "Email"
                                )
                            }}
                        </small>
                    </div>

                    <div class="field password form-item">
                        <div class="p-float-label">
                            <Password
                                id="password"
                                inputId="integeronly"
                                v-model="password"
                                style="width: 100%"
                                :feedback="false"
                                toggleMask
                            />
                            <label for="password">Contraseña</label>
                        </div>
                    </div>

                    <div class="field password form-item">
                        <div class="p-float-label">
                            <Password
                                id="cPassword"
                                inputId="integeronly"
                                v-model="cPassword"
                                style="width: 100%"
                                :feedback="false"
                                toggleMask
                            />
                            <label for="cPassword">Repetir contraseña</label>
                        </div>
                    </div> -->

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
import { ElMessage } from 'element-plus';
import { required } from '@vuelidate/validators';
import { useVuelidate } from '@vuelidate/core';
import { helpers } from '@vuelidate/validators';
import { mapGetters } from 'vuex';
import { setConfigurationFileByAccount } from '../../utils/utils';


export default {
	setup: () => ({ v$: useVuelidate() }),
	data() {
		return {
			Configuration: null,
			formData: {},
			errors: null,

			id: null,
			form: {
				nombre: null,
				email: null,
				contrasena: null,
				cPassword: null,
			},
			submitted: false,
			isFormValid: false,
			name: '',
			email: '',
			password: '',
			cPassword: '',
			habilitarEdicion: false,

			rules: {
				nombre: [
					{
						required: true,
						message: 'Por favor ingrese su mail.',
						trigger: 'change',
					},
				],
				email: [
					{
						required: true,
						message: 'Por favor ingrese su mail.',
						trigger: 'change',
					},
				],
				contrasena: [
					{
						required: true,
						message: 'Por favor ingrese su contraseña.',
						trigger: 'change',
					},
				],
				repetirContrasena: [
					{
						required: true,
						message: 'Por favor repita la contraseña.',
						trigger: 'change',
					},
				],
			},
		};
	},

	computed: {
		...mapGetters('UsersStore', ['user', 'auth', 'modules']),
	},

	validations() {
		return {
			name: {
				required: helpers.withMessage(
					'El nombre es requerido',
					required
				),
			},
			email: {
				required: helpers.withMessage(
					'El email es requerido',
					required
				),
			},
		};
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
			console.log(this.Configuration.account);
			console.log(this.Configuration);

			this.setUserData();

		},
		handleInputChange(value, moduleName) {
			this.formData[moduleName] = value;
		},
		clickOnSaveButton() {
			this.errors = this.validateForm();
			let formData = new FormData();

			for (let key in this.formData) {
				formData.append(key, this.formData[key]);
			}

			if (this.errors === null) {
				this.$emit('formDataCreate', this.formData);
			}

		},
		validateForm() {
			for (const item of this.Configuration.formConfiguration) {
				if (item.required && !this.formData[item.modelName
				]) {
					return `El campo ${item.label} es requerido`;
				}
			}

			return null;
		},
		setUserData() {
			console.log('this.user');
			console.log(this.user);

			this.id = this.user.id;
			this.name = this.user.name;
			this.email = this.user.email;

			console.log('this.Configuration');
			console.log(this.Configuration);

			for (const itemConfiguration of this.Configuration.formConfiguration) {
				if (itemConfiguration.setDefaultValue) {
					this.formData[itemConfiguration.modelName] = this.user[itemConfiguration.modelName];
				}
			}
		},

		habilitarEdicionNombre() {
			if (this.habilitarEdicion == false) {
				return true;
			} else {
				return false;
			}
		},

		habilitarEdicionEmail() {
			if (this.habilitarEdicion == false) {
				return true;
			} else {
				return false;
			}
		},
		habilitarEdicionContrasena() {
			if (this.habilitarEdicion == false) {
				return true;
			} else {
				return false;
			}
		},
		habilitarEdicionRepetirContrasena() {
			if (this.habilitarEdicion == false) {
				return true;
			} else {
				return false;
			}
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
			this.onSubmit();
		},

		async onSubmit() {
			let params = {
				id: this.id,
				nombre: this.name,
				email: this.email,
			};

			if (this.password != null) {
				params.contrasena = this.password;
			} else {
				params.contrasena = null;
			}

			if (this.cPassword != null) {
				params.repetirContrasena = this.cPassword;
			} else {
				params.repetirContrasena = null;
			}

			const respuestaApi = await this.axios.put(
				'/api/usuario/actualizar/' + this.id,
				params
			);

			if (respuestaApi.data.code == 200) {
				ElMessage({
					type: 'success',
					message: '¡Datos de la cuenta modificados con éxito!',
				});
				this.$emit('actualizarTabla');
				this.logout();
			} else {
				if (respuestaApi.data.code == 400) {
					let erroresMostrar = '// ';
					let erorres = Object.values(respuestaApi.data.data);

					erorres.forEach((elemento) => {
						erroresMostrar =
                            erroresMostrar + ' ' + elemento + ' //';
					});

					ElMessage({
						type: 'error',
						grouping: true,
						message: erroresMostrar,
						duration: 5000,
					});
				}
			}
		},

		deshabilitarBtnGuardarDatos() {
			if (
				this.form.nombre == null ||
                this.form.nombre == '' ||
                this.form.email == null ||
                this.form.email == '' ||
                this.habilitarEdicion == false
			) {
				return true;
			} else {
				return false;
			}
		},

		resetForm() {
			this.loadingBtnLogin = false;
			this.email = null;
			this.password = null;
			this.submitted = false;
		},

		async logout() {
			await this.$store.dispatch('logout');
			// redirect
			return this.$router.replace('/login');
		},

		getHeightWindow() {
			var heightWindow = window.innerHeight - 60;
			return `height: ${heightWindow}px`;
		},
	},
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
		.alert {
			padding: 10px;
		}
		.form {
			height: calc(100% - 9vh);
			display: flex;
			flex-direction: column;
			margin-top: 20px;
			.form-item {
				margin-top: 4vh;
			}
		}
	}
}





.main-container {
	.title-container { .title { } }
	.body-container {
		.alert { }
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
}
</style>
