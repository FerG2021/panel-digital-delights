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
        <TitleModal :header="header"></TitleModal>
      </template>

      <div style="margin-top: 5px; width: 100%">
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
          <!-- Nombre -->
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

          <!-- Descripicion -->
          <div class="field">
            <div class="p-float-label">
              <InputText
                id="descripcion"
                v-model="descripcion"
                toggleMask
                style="width: 100%"
                :class="{ 'p-invalid': v$.descripcion.$invalid && submitted }"
              />
              <label
                for="descripcion"
                :class="{ 'p-error': v$.descripcion.$invalid && submitted }"
                >Descripción <span style="color: red">*</span></label
              >
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
                style="width: 100%"
                mode="currency"
                currency="ARS"
                locale="es-AR"
                :class="{ 'p-invalid': v$.precio.$invalid && submitted }"
              />
              <label
                for="precio"
                :class="{ 'p-error': v$.precio.$invalid && submitted }"
                >Precio <span style="color: red">*</span></label
              >
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
            <p for="stock">Disponible</p>
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
                style="minwidth: 14rem"
                :class="{ 'p-invalid': v$.categoria.$invalid && submitted }"
              />
              <label
                for="precio"
                :class="{ 'p-error': v$.categoria.$invalid && submitted }"
                >Categoría <span style="color: red">*</span></label
              >
            </div>
          </div>

          <div class="field" v-if="imagenAPI != null">
            <h5>Imagen</h5>
            <Image
              v-if="imageID !== 'null'"
              preview
              :src="imagenAPI"
              alt="Image"
              width="130"
              class="ver-imagen"
              imageStyle="border-radius: 8px; box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);padding: 3px;"
            />
            <img v-else src="../../../assets/producto-sin-imagen.png" alt="Vue" class="without-image-product"/>
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
                  <p>Arrastre las imágenes para subirlas</p>
                  <p>
                    <b
                      >Sólo subir si desea modificar la imagen cargada
                      previamente</b
                    >
                  </p>
                </template>
              </FileUpload>
              <!-- <label for="stockMinimo" :class="{'p-error':v$.stockMinimo.$invalid && submitted}">Stock mínimo</label> -->
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
        headerName: 'Modificar producto',
      },

      display: false,
      submitted: false,
      isFormValid: false,
      loadingBtnGuardar: false,
      loading: true,
      // form
      id: null,
      nombre: "",
      descripcion: "",
      precio: null,
      stock: false,
      imagenAPI: null,
      imagen: null,
      imageID: null,
      categoriasAPI: [],
      categoria: null,

      form: {
        idCategoria: null,
        nombre: null,
        descripcion: null,
        precio: null,
        stock: null,
        imagen: null,
      },
    };
  },

  validations() {
    return {
      nombre: {
        required: helpers.withMessage("El nombre es requerido", required),
        // email,
      },

      descripcion: {
        required: helpers.withMessage("La descripición es requerida", required),
        // email,
      },

      precio: {
        required: helpers.withMessage("El precio es requerido", required),
        // email,
      },

      categoria: {
        required: helpers.withMessage("La categoria es requerida", required),
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
      this.getCategorias();
    },

    cerrar() {
      this.display = false;
    },

    async getCategorias() {
      this.loading = true;

      await this.axios.get("/api/categoria-listar-todas").then((response) => {
        if (response.data.code == 200) {
          console.log("response.data.data");
          console.log(response.data.data);

          response.data.data.forEach((elemento) => {
            let fila = {
              name: elemento.categoria.name,
              code: elemento.categoria.id,
              subcategorias: elemento.subcategorias,
            };

            this.categoriasAPI.push(fila);
          });

          console.log("this.categoriasAPI");
          console.log(this.categoriasAPI);
        }

        this.getDatos();
      });
    },

    async getDatos() {
      await this.axios.get("/api/producto/" + this.id).then((response) => {
        if (response.data.code == 200) {
          console.log("response.data");
          console.log(response.data);

          this.nombre = response.data.data.name;
          this.descripcion = response.data.data.description;
          this.precio = response.data.data.price;
          this.imagenAPI = response.data.data.image;
          this.imageID = response.data.data.imageID;

          if (
            response.data.data.stock == true ||
            response.data.data.stock == 1
          ) {
            this.stock = true;
          } else {
            this.stock = false;
          }

          console.log("this.stock");
          console.log(this.stock);

          // console.log("this.categoriasAPI");
          // console.log(this.categoriasAPI);

          this.categoriasAPI.forEach((elemento) => {
            elemento.subcategorias.forEach((ele) => {
              console.log("ele");
              console.log(ele);

              if (ele.id == response.data.data.id_category) {
                this.categoria = ele;
                console.log("this.categoria");
                console.log(this.categoria);
              }
            });
          });

          this.loading = false;
        }
      });
    },

    imagenSeleccionada(event) {
      console.log("imagen");
      console.log(event.files[0]);
      this.imagen = event.files[0];
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
      this.loadingBtnGuardar = false;
      this.submitted = false;

      this.nombre = "";
      this.descripcion = "";
      this.precio = null;
      this.stock = false;
      this.imagen = null;
      this.categoriasAPI = [];
      this.categoria = null;
    },

    async guardar() {
      this.loadingBtnGuardar = true;

      // let params = {
      //   nombre: this.nombre,
      //   descripcion: this.descripcion,
      //   idCategoria: this.categoria.id,
      //   precio: this.precio,
      // };

      // console.log("this.stock ANTES DE MANDAR");
      // console.log(this.stock);

      // if (this.stock == true || this.stock == 1) {
      //   params.stock = true;
      // } else {
      //   params.stock = false;
      // }

      // genero el formulario

      console.log("this.categoria.id");
      console.log(this.categoria.id);

      this.form.idCategoria = this.categoria.id;
      this.form.nombre = this.nombre;
      this.form.descripcion = this.descripcion;
      this.form.precio = this.precio;
      this.form.imagen = this.imagen;

      if (this.stock == true) {
        this.form.stock = 1;
      } else {
        this.form.stock = 0;
      }

      let formData = new FormData();

      for (let key in this.form) {
        formData.append(key, this.form[key]);
      }

      console.log("formData");
      console.log(formData);

      console.log("this.form");
      console.log(this.form);

      // if (this.descripcion != "") {
      //   params.descripcion = this.descripcion;
      // }

      await this.axios
        .post("/api/producto/" + this.id, formData)
        .then((response) => {
          console.log(response.data);
          if (response.data.code == 200) {
            this.$toast.add({
              severity: "success",
              summary: "Mensaje de confirmación",
              detail: "Producto modificado con éxito",
              life: 3000,
            });

            this.display = false;
            this.$emit("actualizarTabla");
          } else {
            console.log("response.data.data");
            console.log(response.data.data);

            this.$toast.add({
              severity: "error",
              summary: "Se ha producido un error",
              detail: response.data.data,
              life: 5000,
            });

            // for (const property in response.data.data) {
            //   // console.log(`${property}: ${response.data.data[property]}`);
            //   this.$toast.add({
            //     severity: "error",
            //     summary: "Se ha producido un error",
            //     detail: `${response.data.data[property]}`,
            //     life: 5000,
            //   });
            // }
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
