<template>
  <div>
    <Toast />

    <Dialog
      v-model:visible="display"
      icon="pi pi-refresh"
      :style="{ width: '45%' }"
      class="flex justify-content-center"
      :draggable="false"
    >
      <template #header>
        <h3 style="margin: 0px">
          <i class="pi pi-stop" style="font-size: 20px" /> 
          {{ categoryName }}
        </h3>
      </template>

      <div style="margin-top: 5px; width: 100%">
        <div style="margin-top: 10px">
          <DataTable
            :value="subcategorias"
            responsiveLayout="scroll"
            :loading="loading"
            :globalFilterFields="['name']"
            v-model:filters="filters"
            filterDisplay="menu"
            style="text-align: center"
            headerStyle="text-align: center"
          >
            <template #header>
              <div class="display: flex">
                <div class="margin-left: auto">
                  <span class="p-input-icon-left">
                    <i class="pi pi-search" />
                    <InputText
                      v-model="filters['global'].value"
                      placeholder="Escriba para buscar"
                    />
                  </span>
                </div>

                <div style="margin-left: auto">
                  <Button
                    label="Nueva subcategoría"
                    @click="$refs.modalAgregarSubcategoria.abrir(id)"
                  />
                </div>
              </div>
            </template>

            <Column field="name" header="Nombre">
              <template #body="slotProps">
                <span>
                  {{ slotProps.data.name }}
                </span>
              </template>
            </Column>

            <Column field="description" header="Descripción">
              <template #body="slotProps">
                <span v-if="slotProps.data.description">
                  {{ slotProps.data.description }}
                </span>
                <span v-else>-</span>
              </template>
            </Column>

            <Column field="modificar" header="Modificar" style="width: 20px">
              <template #body="slotProps">
                <div style="display: flex">
                  <div style="margin: auto">
                    <Button
                      icon="pi pi-pencil"
                      class="p-button-rounded p-button-warning mr-2"
                      @click="$refs.modalModificar.abrir(slotProps.data.id)"
                      style="margin-right: 5px"
                    />
                  </div>
                </div>
              </template>
            </Column>

            <Column field="eliminar" header="Eliminar" style="width: 20px">
              <template #body="slotProps">
                <div style="display: flex">
                  <div style="margin: auto">
                    <Button
                      icon="pi pi-trash"
                      class="p-button-rounded p-button-danger"
                      @click="eliminar(slotProps)"
                    />
                  </div>
                </div>
              </template>
            </Column>
          </DataTable>
        </div>
      </div>
    </Dialog>
  </div>

  <modal-agregar-subcategoria
    ref="modalAgregarSubcategoria"
    @actualizar-tabla="getDatos"
  ></modal-agregar-subcategoria>

  <modal-modificar
    ref="modalModificar"
    @actualizar-tabla="getDatos"
  ></modal-modificar>
</template>

<script>
import { email, required } from "@vuelidate/validators";
import { useVuelidate } from "@vuelidate/core";
import { helpers } from "@vuelidate/validators";
import { FilterMatchMode, FilterOperator } from "primevue/api";

import ModalAgregarSubcategoria from "./agregarSubcategoria.vue";
import ModalModificar from "./modificarSubcategoria.vue";

export default {
  components: {
    ModalAgregarSubcategoria,
    ModalModificar,
  },
  setup: () => ({ v$: useVuelidate() }),

  data() {
    return {
      display: false,
      submitted: false,
      isFormValid: false,
      loadingBtnGuardar: false,
      loading: false,
      filters: {
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
      },
      // form
      id: null,
      categoryName: null,
      subcategorias: [],
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
    abrir(id, data) {
      this.id = id;
      this.categoryName = data.name
      this.submitted = false;
      this.display = true;
      this.loading = true;
      // this.isFormValid = false;
      this.getDatos();
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

    async getDatos() {
      this.loading = true;

      await this.axios
        .get("/api/subcategoria-listar/" + this.id)
        .then((response) => {
          if (response.data.code == 200) {
            this.subcategorias = response.data.data;
          } else {
            for (const property in response.data.data) {
              this.$toast.add({
                severity: "error",
                summary: "Se ha producido un error",
                detail: `${response.data.data[property]}`,
                life: 5000,
              });
            }
          }

          this.loading = false;
        });

      this.loadingBtnGuardar = false;
    },

    async eliminar(row) {
      this.$confirm.require({
        header: "Confirmación",
        message: "¿Está seguro que desea eliminar la subcategoría?",
        icon: "pi pi-info-circle",
        acceptClass: "p-button-danger",
        acceptIcon: "pi pi-check",
        rejectIcon: "pi pi-times",
        accept: () => {
          this.eliminarSubcategoria(row);
        },
        reject: () => {
          // this.$toast.add({severity:'error', summary:'Rejected', detail:'You have rejected', life: 3000});
        },
        onHide: () => {
          // this.$toast.add({severity:'error', summary:'Hide', detail:'You have hidden', life: 3000});
        },
      });
    },

    async eliminarSubcategoria(row) {
      await this.axios
        .delete("/api/subcategoria/" + row.data.id)
        .then((response) => {
          if (response.data.code == 200) {
            this.$toast.add({
              severity: "success",
              summary: "Mensaje de confirmación",
              detail: "Subcategoría eliminada con éxito",
              life: 3000,
            });
            this.getDatos();
          }
        });
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
