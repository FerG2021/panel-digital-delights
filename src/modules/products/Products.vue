<template>
  <main class="about-page">
    <Card class="card">
      <template #header>
        <Title :title="sectionTitle"></Title>
      </template>
      <template #content>
        <div class="data-table-container">
          <DataTable
            :value="categories"
            responsiveLayout="scroll"
            :loading="loading"
            :globalFilterFields="['name']"
            v-model:filters="filters"
            filterDisplay="menu"
            headerStyle="text-align: center"
            :scrollHeight="getHeightWindow()"
            class="data-table"
          >
            <template #header>
              <div class="display-flex">
                <div class="margin-left">
                  <span class="p-input-icon-left">
                    <i class="pi pi-search" />
                    <InputText
                      v-model="filters['global'].value"
                      :placeholder="$t('productsSection.placeholderSearch')"
                    />
                  </span>
                </div>

                <div class="margin-left-auto">
                  <Button
                    :label="$t('productsSection.newProduct')"
                    @click="$refs.modalNuevo.abrir()"
                  />
                </div>
              </div>
            </template>

            <Column
              field="name"
              :header="$t('productsSection.headerTable.image')"
              class="column"
            >
              <template #body="slotProps">
                <Image
                  v-if="slotProps.data.imageID != 'null'"
                  preview
                  :src="slotProps.data.image"
                  alt="Image"
                  width="40"
                  imageStyle="border-radius: 8px; box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);padding: 3px; height: 6vh; width: 6vh"
                />
                <img
                  v-else
                  src="../../assets/producto-sin-imagen.png"
                  alt="Vue"
                  class="without-image-product"
                />
              </template>
            </Column>

            <Column
              field="name"
              :header="$t('productsSection.headerTable.name')"
            >
              <template #body="slotProps">
                <span>
                  {{ slotProps.data.name }}
                </span>
              </template>
            </Column>

            <Column
              field="categoría"
              :header="$t('productsSection.headerTable.category')"
            >
              <template #body="slotProps">
                <span>
                  {{ slotProps.data.category.name }}
                </span>
              </template>
            </Column>

            <Column
              field="subcategory"
              :header="$t('productsSection.headerTable.subcategory')"
            >
              <template #body="slotProps">
                <span>
                  {{ slotProps.data.subcategory.name }}
                </span>
              </template>
            </Column>

            <Column
              field="modificar"
              :header="$t('productsSection.headerTable.modify')"
              style="width: 20px"
            >
              <template #body="slotProps">
                <div class="display-flex">
                  <div class="margin-auto">
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

            <Column
              field="eliminar"
              :header="$t('productsSection.headerTable.delete')"
              style="width: 20px"
            >
              <template #body="slotProps">
                <div class="display-flex">
                  <div class="margin-auto">
                    <Button
                      icon="pi pi-trash"
                      class="p-button-rounded p-button-danger"
                      @click="deleteRow(slotProps)"
                    />
                  </div>
                </div>
              </template>
            </Column>
          </DataTable>
        </div>
      </template>
    </Card>
  </main>

  <modal-nuevo ref="modalNuevo" @actualizar-tabla="getAll"></modal-nuevo>

  <modal-agregar-subcategoria
    ref="modalAgregarSubcategoria"
    @actualizar-tabla="getAll"
  ></modal-agregar-subcategoria>

  <modal-modificar
    ref="modalModificar"
    @actualizar-tabla="getAll"
  ></modal-modificar>

  <ConfirmDialog></ConfirmDialog>
</template>

<script>
import { FilterMatchMode } from 'primevue/api';

import ModalNuevo from './modales/nuevo.vue';
import ModalModificar from './modales/modificar.vue';
import Title from '../../components/common/Title.vue';

export default {
	components: {
		ModalNuevo,
		ModalModificar,
		Title,
	},

	data() {
		return {
			sectionTitle: this.$t('products'),
			categories: [],
			loading: false,
			filters: {
				global: { value: null, matchMode: FilterMatchMode.CONTAINS },
			},
		};
	},

	mounted() {
		this.getAll();
		this.getHeightWindow();
	},

	methods: {
		getHeightWindow() {
			var heightWindow = window.innerHeight - 285;
			return heightWindow + 'px';
		},

		async getAll() {
			this.categories = [];
			this.loading = true;
			await this.axios.get('/api/producto').then((response) => {
				if (response.data.code == 200) {
					this.categories = response.data.data;
				}
			});
			this.loading = false;
		},

		async deleteRow(row) {
			this.$confirm.require({
				header: this.$t('productsSection.headerAnswerDeleteConfirmation'),
				message: this.$t('productsSection.answerDeleteConfirmation'),
				icon: 'pi pi-info-circle',
				acceptClass: 'p-button-danger',
				acceptIcon: 'pi pi-check',
				rejectIcon: 'pi pi-times',
				accept: () => {
					this.deleteProduct(row);
				},
				reject: () => {
					// this.$toast.add({severity:'error', summary:'Rejected', detail:'You have rejected', life: 3000});
				},
				onHide: () => {
					// this.$toast.add({severity:'error', summary:'Hide', detail:'You have hidden', life: 3000});
				},
			});
		},

		async deleteProduct(row) {
			await this.axios
				.delete('/api/producto/' + row.data.id)
				.then((response) => {
					if (response.data.code == 200) {
						this.$toast.add({
							severity: 'success',
							summary: this.$t('productsSection.headerDeleteConfirmation'),
							detail: this.$t('productsSection.deleteConfirmation'),
							life: 3000,
						});
						this.getAll();
					}
				});
		},

		moneda(x) {
			return x.toLocaleString('es-AR');
		},
	},
};
</script>

<style scoped lang="scss">
.about-page {
  .card {
    height: 100%;
    .data-table-container {
      margin-top: 10px;
      .data-table {
        text-align: center;
        .display-flex {
          display: flex;
        }
        .margin-left-auto {
          margin-left: auto;
        }
        .column {
          width: 20px;
        }
      }
    }
  }
}

.margin-auto {
  margin: auto;
}

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

.without-image-product {
  height: 6vh;
  width: 6vh;
  border-radius: 8px;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  padding: 3px;
}
</style>
