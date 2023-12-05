<template>
    <main class="about-page" v-if="Configuration">
        <MainCard>
            <template #header>
                <h1>Categorías</h1>
            </template>

            <template #content>
                <div>
                    <DynamicTable
                        :elements="categories"
                        :columns="Configuration.tableColumns"
                        :labels="Configuration.labels"
                        :loading="loading"
                        @add="add"
                        @edit="edit"
                        @delete="deleteCategory"
                    />
                </div>
            </template>
        </MainCard>

        <ConfirmDialog></ConfirmDialog>

        <ABMCreate :data="Configuration.create" @formDataCreate="formDataCreate" />

        <ABMUpdate :data="Configuration.update" @formDataUpdate="formDataUpdate" />
    </main>
</template>

<script>
import { FilterMatchMode } from 'primevue/api';
import {
	getAllCategories,
	newCategory,
	updateCategory,
	deleteCategory,
	getAllProducts
} from '../../managers/api/api';
import { mapGetters } from 'vuex';
import { setConfigurationFileByAccount } from '../../utils/utils';

import DynamicTable from '../../components/datatable/DynamicTable.vue';
import ABMCreate from '../../components/ABM/ABMCreate.vue';
import ABMUpdate from '../../components/ABM/ABMUpdate.vue';
import MainCard from '../../components/common/MainCard.vue';

export default {
	name: 'CategoriesComponent',
	components: {
		DynamicTable,
		ABMCreate,
		ABMUpdate,
		MainCard
	},
	data() {
		return {
			loading: false,
			Configuration: null,
			filters: {
				global: { value: null, matchMode: FilterMatchMode.CONTAINS },
			},
		};
	},

	computed: {
		...mapGetters('UsersStore', ['user', 'auth', 'modules']),
		...mapGetters('CategoriesStore', ['categories']),
	},

	mounted() {
		this.setCongigurationFile();
		this.getHeightWindow();
	},

	methods: {
		async setCongigurationFile() {
			const account = this.user.email.split('.')[1];
			this.Configuration = await setConfigurationFileByAccount(
				'categories',
				account
			);
			console.log(this.Configuration.account);
		},

		getHeightWindow() {
			var alturaPestana = window.innerHeight - 285;
			return alturaPestana + 'px';
		},

		async loadCategories() {
			await getAllCategories(this.user.account_id);
		},

		async loadProducts() {
			await getAllProducts(this.user.account_id);
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
			this.Configuration.create.modalVisible = true;
		},

		async formDataCreate(value) {
			this.formData = value;

			let formData = new FormData();

			for (let key in value) {
				formData.append(key, value[key]);
			}

			newCategory(this.user.account_id, formData)
				.then(() => {
					this.Configuration.create.modalVisible = false;
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
			this.Configuration.update.id = data.id;
			for (const configuration of this.Configuration.update.formConfiguration) {
				configuration.defaultValue = data[configuration.modelName];
			}
			this.Configuration.update.modalVisible = true;
		},

		formDataUpdate(value) {
			let formData = new FormData();

			for (let key in value) {
				formData.append(key, value[key]);
			}

			updateCategory(this.user.account_id, formData)
				.then(() => {
					this.Configuration.update.modalVisible = false;
					this.loadCategories();
					this.loadProducts();
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
