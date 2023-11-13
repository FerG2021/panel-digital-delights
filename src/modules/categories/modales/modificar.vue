<template>
  <div>
    <Toast />

    <Dialog
      v-model:visible="display"
      icon="pi pi-refresh"
      :style="{ width: '35%' }"
      class="flex justify-content-center"
      :draggable="false"
    >
      <template #header>
        <h3 style="margin: 0px">
          <i class="pi pi-stop" style="font-size: 20px" /> Modificar categoría
        </h3>
      </template>

      <div style="margin-top: 5px; width: 100%">
        <!-- <h5 style="margin: 0px">DNI</h5> -->
        <div style="display: flex" v-if="loading == true">
          <ProgressSpinner
            aria-label="Basic ProgressSpinner"
            style="margin: auto"
          />
        </div>
        <form
          @submit.prevent="handleSubmit(!v$.$invalid)"
          class="p-fluid"
          style="margin-top: 30px"
          :loading="loading"
          v-else
        >
          <div class="field">
            <div class="p-float-label">
              <InputText
                id="nombre"
                inputId="integeronly"
                v-model="v$.nombre.$model"
                style="width: 100%"
                :class="{ 'p-invalid': v$.nombre.$invalid && submitted }"
              />
              <label
                for="nombre"
                :class="{ 'p-error': v$.nombre.$invalid && submitted }"
                >Nombre <span style="color: red">*</span></label
              >
            </div>
            <small
              v-if="
                (v$.nombre.$invalid && submitted) ||
                v$.nombre.$pending.$response
              "
              class="p-error"
              >{{
                v$.nombre.required.$message.replace("Value", "Nombre")
              }}</small
            >
          </div>

          <div class="field">
            <div class="p-float-label">
              <InputText
                id="descripcion"
                v-model="descripcion"
                toggleMask
                style="width: 100%"
              />
              <label for="descripcion">Descripción</label>
            </div>
          </div>

          <Button
            label="Guardar"
            type="submit"
            class="mt-2"
            :loading="loadingBtnGuardar"
          />
        </form>
      </div>
    </Dialog>
  </div>
</template>

<script>
import { email, required } from "@vuelidate/validators";
import { useVuelidate } from "@vuelidate/core";
import { helpers } from "@vuelidate/validators";

export default {
  setup: () => ({ v$: useVuelidate() }),

  data() {
    return {
      display: false,
      submitted: false,
      isFormValid: false,
      loadingBtnGuardar: false,
      loading: true,
      // form
      id: null,
      nombre: "",
      descripcion: "",
    };
  },

  validations() {
    return {
      nombre: {
        required: helpers.withMessage("El nombre es requerido", required),
        // email,
      },
    };
  },

  methods: {
    abrir(id) {
      this.id = id;
      this.submitted = false;
      this.display = true;
      // this.isFormValid = false;
      this.resetForm();
      this.getDatos();
    },

    cerrar() {
      this.display = false;
    },

    async getDatos() {
      this.loading = true;
      await this.axios.get("/api/categoria/" + this.id).then((response) => {
        if (response.data.code == 200) {
          console.log("response.data");
          console.log(response.data);

          this.nombre = response.data.data.name;
          this.descripcion = response.data.data.description;

          this.loading = false;
        }
      });
    },

    handleSubmit(isFormValid) {
      console.log("isFormValid");
      console.log(isFormValid);

      this.isFormValid = isFormValid;
      console.log("entro");

      this.submitted = true;

      if (!isFormValid) {
        return;
      }

      this.toggleDialog();
    },

    toggleDialog() {
      this.showMessage = !this.showMessage;
      this.guardar();

      // if (!this.showMessage) {
      //   this.resetForm();
      // } else {
      //   this.guardar();
      // }
    },

    resetForm() {
      this.nombre = null;
      this.descripcion = null;
      this.loadingBtnGuardar = false;
      this.submitted = false;
    },

    async guardar() {
      this.loadingBtnGuardar = true;

      let params = {
        nombre: this.nombre,
        descripcion: this.descripcion,
      };

      // if (this.descripcion != "") {
      //   params.descripcion = this.descripcion;
      // }

      await this.axios
        .put("/api/categoria/" + this.id, params)
        .then((response) => {
          console.log(response.data);
          if (response.data.code == 200) {
            this.$toast.add({
              severity: "success",
              summary: "Mensaje de confirmación",
              detail: "Categoría creada con éxito",
              life: 3000,
            });

            this.display = false;
            this.$emit("actualizarTabla");
          } else {
            console.log("response.data.data");
            console.log(response.data.data);

            for (const property in response.data.data) {
              // console.log(`${property}: ${response.data.data[property]}`);
              this.$toast.add({
                severity: "error",
                summary: "Se ha producido un error",
                detail: `${response.data.data[property]}`,
                life: 5000,
              });
            }
            // this.$toast.add({
            //   severity: "success",
            //   summary: "Se ha producido un error",
            //   detail: response.data.data,
            //   life: 5000,
            // });
          }
        });

      this.loadingBtnGuardar = false;
    },
  },
};
</script>

<style scoped>
.field {
  margin-bottom: 1.5rem;
}

.header {
  margin: 0px !important;
}

.p-dialog {
  border-radius: 30% !important;
}
</style>
