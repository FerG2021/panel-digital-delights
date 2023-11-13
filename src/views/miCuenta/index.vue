<template>
  <main>
    <el-card>
      <template #header>
        <h1>Mi cuenta</h1>          
      </template>

      <div>    
        <div style="margin-bottom: 20px">
          <!-- <span style="margin-right: 10px">Habilitar edición de datos</span>
          <el-switch v-model="habilitarEdicion" /> -->
          <el-alert title="IMPORTANTE" description="Al modificar algunos de los datos de su cuenta la sesión se cerrará y deberá voler a ingresar" type="warning" show-icon/>
          <!-- <div v-if="habilitarEdicion == true">
            <el-alert title="IMPORTANTE" description="Al modificar algunos de los datos de su cuenta la sesión se cerrará y deberá voler a ingresar" type="warning" show-icon/>
          </div> -->
        </div>   
        <!-- <el-form 
          label-width="150px" 
          ref="form"
          :model="form"
          :rules="rules"
          status-icon
        >
          <el-form-item label="Nombre" prop="nombre" label-width="200px">
            <el-input v-model="form.nombre"  :disabled="habilitarEdicionNombre()"/>
          </el-form-item>
          
          <el-form-item label="Email" prop="email" label-width="200px">
            <el-input v-model="form.email"  :disabled="habilitarEdicionEmail()"/>
          </el-form-item>

          <el-form-item label="Contraseña" prop="contrasena" label-width="200px">
            <el-input v-model="form.contrasena" :disabled="habilitarEdicionContrasena()" type="password"/>
          </el-form-item>

          <el-form-item label="Repetir contraseña" prop="repetirContrasena" label-width="200px">
            <el-input v-model="form.repetirContrasena" :disabled="habilitarEdicionRepetirContrasena()" type="password"/>
          </el-form-item>

          <el-form-item label-width="200px">
            <el-button 
              class="btnEnviar" 
              type="primary" 
              @click="onSubmit()"
              :disabled="deshabilitarBtnGuardarDatos()"
            >
              Guardar datos
            </el-button>
          </el-form-item>
        </el-form> -->

        <form
          @submit.prevent="handleSubmit(!v$.$invalid)"
          class="p-fluid mt-3vh form"
        >
          <!-- Nombre -->
          <div class="field mt-3vh">
            <div class="p-float-label">
              <InputText
                id="name"
                inputId="integeronly"
                v-model="v$.name.$model"
                style="width: 100%"
                :class="{ 'p-invalid': v$.name.$invalid && submitted }"
              />
              <label
                for="name"
                :class="{ 'p-error': v$.name.$invalid && submitted }"
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
                v$.name.required.$message.replace("Value", "Nombre")
              }}
            </small
            >
          </div>

          <!-- Email -->
          <div class="field mt-3vh">
            <div class="p-float-label">
              <InputText
                id="email"
                inputId="integeronly"
                v-model="v$.email.$model"
                style="width: 100%"
                :class="{ 'p-invalid': v$.email.$invalid && submitted }"
              />
              <label
                for="email"
                :class="{ 'p-error': v$.email.$invalid && submitted }"
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
                v$.email.required.$message.replace("Value", "Email")
              }}
            </small
            >
          </div>

          <!-- Password -->
          <div class="field password mt-3vh">
            <div class="p-float-label ">
              <Password
                id="password"
                inputId="integeronly"
                v-model="password"
                style="width: 100%"
                :feedback="false"
                toggleMask
              />
              <label
                for="password"
                >Contraseña</label
              >
            </div>
          </div>

          <!-- CPassword -->
          <div class="field password mt-3vh">
            <div class="p-float-label ">
              <Password
                id="cPassword"
                inputId="integeronly"
                v-model="cPassword"
                style="width: 100%"
                :feedback="false"
                toggleMask
              />
              <label
                for="cPassword"
                >Repetir contraseña</label
              >
            </div>
          </div>

          <Button
            label="Ingresar"
            type="submit"
            class="mt-2"
            :loading="loadingBtnLogin"
          />
        </form>



      </div>
    </el-card>
  </main>
</template>

<script>
import { ElMessage, ElMessageBox } from 'element-plus';
import { email, required } from '@vuelidate/validators';
import { useVuelidate } from '@vuelidate/core';
import { helpers } from '@vuelidate/validators';

export default {
	setup: () => ({ v$: useVuelidate() }),
	data() {
		return {
			id: null,
			form:{
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

	validations() {
		return {
			name: {
				required: helpers.withMessage('El nombre es requerido', required),
			},
			email: {
				required: helpers.withMessage('El email es requerido', required),
			} 
		};
	},

	created() {
		this.getDatosMiCuenta();
	},

	methods: {
		getDatosMiCuenta(){
			// console.log(this.store.state.user.name)
			console.log('created');
			console.log(this.$store.state.user);

			this.id = this.$store.state.user.id;
			this.name = this.$store.state.user.name;
			this.email = this.$store.state.user.email;
		},

		habilitarEdicionNombre(){
			if (this.habilitarEdicion == false) {
				return true;
			} else {
				return false;
			}
		},

		habilitarEdicionEmail(){
			if (this.habilitarEdicion == false) {
				return true;
			} else {
				return false;
			}
		},
		habilitarEdicionContrasena(){
			if (this.habilitarEdicion == false) {
				return true;
			} else {
				return false;
			}
		},
		habilitarEdicionRepetirContrasena(){
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
      
		async onSubmit(){
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

			const respuestaApi = await this.axios.put('/api/usuario/actualizar/' + this.id, params);

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
						erroresMostrar = erroresMostrar + ' ' + elemento + ' //';
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

		deshabilitarBtnGuardarDatos(){
			if (this.form.nombre == null ||
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

		async logout(){
			await this.$store.dispatch('logout');
			// redirect
			return this.$router.replace('/login');
		}
	},
};
</script>

<style>
  .form {
    width: 60%;
    display: flex;
    margin: auto;
    flex-direction: column;
  }
  .mt-3vh {
    margin-top: 3vh;
  }
</style>