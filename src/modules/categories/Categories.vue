<template>
  <main class="about-page">
    <Card>
      <template #header>
        <h1 style="margin-top: 15px; margin-left: 15px">
			Categorías
		</h1>
      </template>

      <template #content>
		<div>
			<DynamicTable 
				:elements="categories"
				:columns="tableColumns"
				:labels="labels"
				:loading="loading"
				@add='add'
				@edit='edit'
				@delete='deleteCategory'
			/>
		</div>
      </template>
    </Card>
  </main>

	<ConfirmDialog></ConfirmDialog>

	<ABMCreate 
		:data="create" 
		@formDataCreate='formDataCreate'
	/>

	<ABMUpdate
		:data="update" 
		@formDataUpdate='formDataUpdate'
	/>
</template>

<script>
import { FilterMatchMode } from 'primevue/api';
import { getAllCategories, newCategory, updateCategory, deleteCategory } from '../../managers/api/api';
import { mapGetters } from 'vuex';

import DynamicTable from '../../components/datatable/DynamicTable.vue';
import ABMCreate from '../../components/ABM/ABMCreate.vue';
import ABMUpdate from '../../components/ABM/ABMUpdate.vue';

export default {
	name: 'CategoriesComponent',
	components: {
		DynamicTable,
		ABMCreate,
		ABMUpdate,
	},
	data() {
		return {
			loading: false,
			filters: {
				global: { value: null, matchMode: FilterMatchMode.CONTAINS },
			},
			labels: {
				new: 'Nueva categoría',
				delete: {
					header: 'Confirmación',
					message: '¿Está seguro que desea eliminar la categoría?'
				}
			},
			tableColumns: [
				{ 
					field: 'image', 
					header: 'Imagen', 
					type: 'image', 
					variation: '' 
				},
				{ 
					field: 'name', 
					header: 'Nombre', 
					type: 'normal', 
					variation: '' 
				},
				{ 
					field: 'name', 
					header: 'Editar', 
					type: 'button', 
					variation: 'update' 
				},
				{ 
					field: 'name', 
					header: 'Eliminar', 
					type: 'button', 
					variation: 'delete' 
				},
			],
			create: {
				modalVisible: false,
				header: {
					class: 'material-icons',
					icon: 'edit',
					headerName: 'Nueva categoría',
				},
				formConfiguration: [
					{
						modelName: 'name',
						label: 'Nombre',
						type: 'text', 
						required: true,
						defaultValue: null,
					},
					{
						modelName: 'image',
						label: 'Imagen',
						type: 'image', 
						required: true,
						defaultValue: null,
					},
				]
			},
			update: {
				modalVisible: false,
				header: {
					class: 'material-icons',
					icon: 'edit',
					headerName: 'Modificar categoría',
				},
				id: null,
				formConfiguration: [
					{
						modelName: 'name',
						label: 'Nombre',
						type: 'text', 
						required: true,
						defaultValue: null,
					},
					{
						modelName: 'image',
						label: 'Imagen',
						type: 'image', 
						required: true,
						defaultValue: null,
					}
				]
			}
		};
	},

	computed: {
		...mapGetters('UsersStore', ['user', 'auth', 'modules']),
		...mapGetters('CategoriesStore', ['categories']),
	},

	mounted() {
		this.getHeightWindow();
	},

	methods: {
		getHeightWindow() {
			var alturaPestana = window.innerHeight - 285;
			return alturaPestana + 'px';
		},

		async loadCategories() {
			await getAllCategories(this.user.account_id);
		},

		async deleteCategory(element) {
			deleteCategory(this.user.account_id, element)
				.then((response) => {
					this.loadCategories();
					this.loading = false;
					this.$toast.add({
						severity: 'success',
						summary: this.$t('toast.success'),
						detail: response.data.message,
						life: 3000,
					});
				})
				.catch((error) => {
					console.log(error);
				});
		},

		add() {
			this.create.modalVisible = true;
		},

		async formDataCreate(value) {
			this.formData = value;

			let formData = new FormData();

			for (let key in value) {
				formData.append(key, value[key]);
			}

			newCategory(this.user.account_id, formData)
				.then(() => {
					this.create.modalVisible = false;
					this.loadCategories();
					this.loading = false;
					this.$toast.add({
						severity: 'success',
						summary: this.$t('toast.success'),
						detail: this.$t('categoriesSection.createConfirmation'),
						life: 3000,
					});
				})
				.catch((error) => {
					console.log(error);
					this.$toast.add({
						severity: 'error',
						summary: this.$t('toast.error'),
						detail: error.response.data.message,
						life: 3000,
					});
				});
		},

		edit(data) {
			this.update.id = data.id;
			for (const configuration of this.update.formConfiguration) {
				configuration.defaultValue = data[configuration.modelName];
			}
			this.update.modalVisible = true;
		},

		formDataUpdate(value) {
			let formData = new FormData();

			for (let key in value) {
				formData.append(key, value[key]);
			}

			updateCategory(this.user.account_id, formData)
				.then(() => {
					this.update.modalVisible = false;
					this.loadCategories();
					this.loading = false;
					this.$toast.add({
						severity: 'success',
						summary: this.$t('toast.success'),
						detail: this.$t('categoriesSection.updateConfirmation'),
						life: 3000,
					});
				})
				.catch((error) => {
					this.$toast.add({
						severity: 'error',
						summary: this.$t('toast.error'),
						detail: error.response.data.message,
						life: 3000,
					});
				});
		}
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
