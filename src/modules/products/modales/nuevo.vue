<template>
  <div>
    <Toast />

    <Dialog
      v-model:visible="display"
      icon="pi pi-refresh"
      class="flex justify-content-center dialog"
      :draggable="false"
    >
      <!-- :style="{ width: '35%' }" -->
      <template #header>
        <TitleModal :header="header"></TitleModal>
      </template>

      <div class="form-container">
        <form
          @submit.prevent="handleSubmit(!v$.$invalid)"
          class="p-fluid form"
        >
          <!-- Nombre -->
          <div class="field">
            <div class="p-float-label">
              <InputText
                id="nombre"
                inputId="integeronly"
                v-model="v$.nombre.$model"
                :class="{ 'p-invalid': v$.nombre.$invalid && submitted }"
                class="input-text"
              />
              <label
                for="nombre"
                class="input-label"
                :class="{ 'p-error': v$.nombre.$invalid && submitted }"
              >
                {{ $t("productsSection.headerTable.name") }} 
                <span class="input-required">*</span>
              </label
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

          <!-- Descripicion -->
          <div class="field">
            <div class="p-float-label">
              <InputText
                id="descripcion"
                v-model="descripcion"
                toggleMask
                :class="{ 'p-invalid': v$.descripcion.$invalid && submitted }"
                class="input-text"
              />
              <label
                for="descripcion"
                class="input-label"
                :class="{ 'p-error': v$.descripcion.$invalid && submitted }"
              >
                {{ $t("productsSection.headerTable.description") }} 
                <span class="input-required">*</span>
              </label>
            </div>
            <small
              v-if="
                (v$.descripcion.$invalid && submitted) ||
                v$.descripcion.$pending.$response
              "
              class="p-error"
            >
              {{
                v$.descripcion.required.$message.replace("Value", "Descripcion")
              }}
            </small>
          </div>

          <!-- Precio -->
          <div class="field">
            <div class="p-float-label">
              <InputNumber
                id="precio"
                v-model="v$.precio.$model"
                class="input-text"
                mode="currency"
                currency="ARS"
                locale="es-AR"
                :class="{ 'p-invalid': v$.precio.$invalid && submitted }"
              />
              <label
                for="precio"
                class="input-label"
                :class="{ 'p-error': v$.precio.$invalid && submitted }"
              >
                {{ $t("productsSection.headerTable.price") }} 
                <span class="input-required">*</span>
              </label>
            </div>
            <small
              v-if="
                (v$.precio.$invalid && submitted) ||
                v$.precio.$pending.$response
              "
              class="p-error"
              >{{
                v$.precio.required.$message.replace("Value", "Precio")
              }}</small
            >
          </div>

          <!-- Stock -->
          <div class="field">
            <p for="stock">{{ $t("productsSection.headerTable.available") }}</p>
            <InputSwitch id="stock" v-model="stock" />
          </div>

          <!-- Subcategoria -->
          <div class="field">
            <div class="p-float-label">
              <CascadeSelect
                v-model="v$.categoria.$model"
                :options="categoriasAPI"
                optionLabel="name"
                optionGroupLabel="name"
                :optionGroupChildren="['subcategorias']"
                :class="{ 'p-invalid': v$.categoria.$invalid && submitted }"
                class="cascade-select"
              />
              <label
                for="precio"
                :class="{ 'p-error': v$.categoria.$invalid && submitted }"
              >
                {{ $t("productsSection.headerTable.category") }} 
                <span style="color: red">*</span>
              </label>
            </div>
          </div>

          <!-- Imagen -->
          <div class="field">
            <div class="p-float-label">
              <FileUpload
                name="form.demo"
                url="./upload.php"
                @upload="onUpload"
                @select="imagenSeleccionada"
                :multiple="false"
                accept="image/*"
                :maxFileSize="1000000"
                invalidFileSizeMessage="{0}: Tamaño de archivo inválido, debe ser menor a {1}."
              >
                <template #empty>
                  <p>{{ $t("productsSection.uploadImage") }}</p>
                </template>
              </FileUpload>
            </div>
          </div>

          <Button
            :label="$t('save')"
            type="submit"
            class="mt-2"
            :loading="loadingBtnSave"
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
import TitleModal from '../../../components/common/TitleModal.vue'

export default {
  components: { TitleModal },
  setup: () => ({ v$: useVuelidate() }),

  data() {
    return {
      // header
      header: {
        class: 'material-icons',
        icon: 'restaurant',
        headerName: this.$t('productsSection.newProduct'),
      },
      display: false,
      submitted: false,
      isFormValid: false,
      loadingBtnSave: false,
      // form
      nombre: "",
      descripcion: "",
      precio: null,
      stock: true,
      imagen: null,
      categoriasAPI: [],
      categoria: null,

      form: {
        idCategoria: null,
        nombre: "",
        descripcion: "",
        precio: null,
        stock: null,
        imagen: null,
      },
    };
  },

  validations() {
    return {
      nombre: {
        required: helpers.withMessage(this.$t("productsSection.validations.name"), required),
      },

      descripcion: {
        required: helpers.withMessage(this.$t("productsSection.validations.description"), required),
      },

      precio: {
        required: helpers.withMessage(this.$t("productsSection.validations.price"), required),
      },

      categoria: {
        required: helpers.withMessage(this.$t("productsSection.validations.category"), required),
      },
    };
  },

  methods: {
    abrir() {
      this.submitted = false;
      this.display = true;
      // this.isFormValid = false;
      this.resetForm();
      this.getCategorias();
    },

    cerrar() {
      this.$toast.add({
        severity: "error",
        summary: "Ventana cerrada con éxito",
        detail: "Message Content",
        life: 3000,
      });
      this.display = false;
    },

    async getCategorias() {
      await this.axios.get("/api/categoria-listar-todas").then((response) => {
        if (response.data.code == 200) {
          response.data.data.forEach((elemento) => {
            let fila = {
              name: elemento.categoria.name,
              code: elemento.categoria.id,
              subcategorias: elemento.subcategorias,
            };

            this.categoriasAPI.push(fila);
          });
        }
      });
    },

    onUpload() {
      this.$toast.add({
        severity: "info",
        summary: "Success",
        detail: "File Uploaded",
        life: 3000,
      });
    },

    imagenSeleccionada(event) {
      this.imagen = event.files[0];
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
      this.guardar();
    },

    resetForm() {
      this.nombre = null;
      this.descripcion = null;
      this.precio = null;
      this.stock = true;
      this.categoria = null;
      this.imagen = null;
      this.categoriasAPI = [];
      this.loadingBtnSave = false;
      this.submitted = false;
    },

    async guardar() {
      this.loadingBtnSave = true;

      // genero el formulario
      this.form.idCategoria = this.categoria.id;
      this.form.nombre = this.nombre;
      this.form.descripcion = this.descripcion;
      this.form.precio = this.precio;
      this.form.imagen = this.imagen;

      if (this.stock === true) {
        this.form.stock = 1;
      } else {
        this.form.stock = 0;
      }

      let formData = new FormData();

      for (let key in this.form) {
        formData.append(key, this.form[key]);
      }

      await this.axios.post("/api/producto", formData).then((response) => {
        if (response.data.code == 200) {
          this.$toast.add({
            severity: "success",
            summary: "Mensaje de confirmación",
            detail: "Producto creado con éxito",
            life: 3000,
          });

          this.display = false;
          this.$emit("actualizarTabla");
        } else {
          this.$toast.add({
            severity: "error",
            summary: "Se ha producido un error",
            detail: response.data.data,
            life: 5000,
          });
        }
      });

      this.loadingBtnSave = false;
    },
  },
};
</script>

<style scoped lang="scss">
.dialog {
  .form-container {
    margin-top: 5px; 
    width: 100%;
    .form {
      margin-top: 30px;
      .field {
        margin-bottom: 1.5rem;
        .p-float-label {
          .input-text {
            width: 100%;
          }
          .input-label {
            .input-required {
              color: red;
            }
          }
          .cascade-select {
            min-width: 14rem
          }
        }
      }
    }
  }
}
</style>
