<template>
  <main class="about-page">
    <Card>
      <template #header>
        <h1 style="margin-top: 15px; margin-left: 15px">Reseñas</h1>
      </template>

      <template #content>
        <div style="margin-top: 10px">
          <DataTable
            :value="resenias"
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
                <!-- <h5 class="m-0">Customers</h5> -->
                <div class="margin-left: auto">
                  <span class="p-input-icon-left">
                    <i class="pi pi-search" />
                    <InputText
                      v-model="filters['global'].value"
                      placeholder="Escriba para buscar"
                    />
                  </span>
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
                <span>
                  {{ slotProps.data.description }}
                </span>
              </template>
            </Column>

            <Column field="rating" header="Valoración">
              <template #body="slotProps">
                <!-- {{ slotProps.data.rating }} -->
                <Rating
                  :modelValue="slotProps.data.rating"
                  :readonly="true"
                  :cancel="false"
                />
              </template>
            </Column>

            <!-- Detalles -->
            <Column field="detalles" header="Detalles" style="width: 20px">
              <template #body="slotProps">
                <div style="display: flex">
                  <div style="margin: auto">
                    <Button
                      icon="pi pi-eye"
                      class="p-button-rounded p-button-primary mr-2"
                      @click="$refs.modalDetalles.abrir(slotProps.data.id)"
                      style="margin-right: 5px"
                    />
                  </div>
                </div>
              </template>
            </Column>

            <!-- Eliminar -->
            <!-- <Column field="eliminar" header="Eliminar" style="width: 20px">
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
            </Column> -->
          </DataTable>
        </div>
      </template>
    </Card>
  </main>

  <modal-detalles ref="modalDetalles"></modal-detalles>

  <ConfirmDialog></ConfirmDialog>
</template>

<script>

import ModalDetalles from './modales/detalles.vue';

export default {
	components: {
		ModalDetalles,
	},

	data() {
		return {
			resenias: [],
			loadingBtnQR: false,
			loading: false,
			filters: {
				global: { value: null, matchMode: FilterMatchMode.CONTAINS },
			},
		};
	},

	mounted() {
		this.obtenerTodos();
	},

	methods: {
		async obtenerTodos() {
			this.resenias = [];
			this.loading = true;
			await this.axios.get('/api/resenia').then((response) => {
				if (response.data.code == 200) {
					this.resenias = response.data.data;
				}
			});

			this.loading = false;
		},

		async eliminar(row) {
			this.$confirm.require({
				header: 'Confirmación',
				message: '¿Está seguro que desea eliminar la mesa ?',
				icon: 'pi pi-info-circle',
				acceptClass: 'p-button-danger',
				acceptIcon: 'pi pi-check',
				rejectIcon: 'pi pi-times',
				accept: () => {
					this.eliminarCategoria(row);
				},
				reject: () => {
					// this.$toast.add({severity:'error', summary:'Rejected', detail:'You have rejected', life: 3000});
				},
				onHide: () => {
					// this.$toast.add({severity:'error', summary:'Hide', detail:'You have hidden', life: 3000});
				},
			});
		},

		async eliminarCategoria(row) {
			await this.axios.delete('/api/mesa/' + row.data.id).then((response) => {
				if (response.data.code == 200) {
					this.$toast.add({
						severity: 'success',
						summary: 'Mensaje de confirmación',
						detail: 'Mesa eliminada con éxito',
						life: 3000,
					});
					this.obtenerTodos();
				}
			});
		},

		moneda(x) {
			return x.toLocaleString('es-AR');
		},
	},
};
</script>

<style>
.product-image {
  width: 70px;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  border-radius: 8px;
  padding: 3px;
}

.headerClass {
  text-align: center !important;
}

.p-column-header-content {
  text-align: center !important;
  align-content: center !important;
  /* border: 1px solid red !important; */
}

.p-column-title {
  /* border: 1px solid green !important; */
  text-align: center !important;
  align-content: center !important;
}
</style>
