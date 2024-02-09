<template>
	<main class="about-page" v-if="Configuration">
		<MainCard>
			<template #header>
				<h1>
					{{ Configuration.labels.sectionTile }}
				</h1>
			</template>
			<template #content>
				<div>
					<DynamicTable
						:elements="products"
						:columns="Configuration.tableColumns"
						:labels="Configuration.labels"
						:loading="loading"
						@add='add'
						@edit='edit'
						@delete='deleteProduct'
					/>
				</div>
			</template>
		</MainCard>

		<ABMCreate
			:data="Configuration.create"
			@formDataCreate='formDataCreate'
		/>

		<ABMUpdate
			:data="Configuration.update"
			@formDataUpdate='formDataUpdate'
		/>

		<ConfirmDialog></ConfirmDialog>
	</main>
</template>

<script>
import { FilterMatchMode } from 'primevue/api';
import { mapGetters } from 'vuex';

import ABMCreate from '../../components/ABM/ABMCreate.vue';
import ABMUpdate from '../../components/ABM/ABMUpdate.vue';
import MainCard from '../../components/common/MainCard.vue';
import DynamicTable from '../../components/datatable/DynamicTable.vue';
import Store from '../../managers/store/store';
import { setConfigurationFileByAccount } from '../../utils/utils';

export default {
	name: 'ProductsComponent',

	components: {
		DynamicTable,
		ABMCreate,
		ABMUpdate,
		MainCard
	},

	data() {
		return {
			sectionTitle: this.$t('products'),
			loading: false,
			Configuration: null,
			filters: {
				global: {
					value: null,
					matchMode: FilterMatchMode.CONTAINS
				}
			}
		};
	},

	computed: {
		...mapGetters('UsersStore', [
			'user',
			'auth',
			'modules',
			'account'
		]),
		...mapGetters('CategoriesStore', ['categories']),
		...mapGetters('ProductsStore', ['products'])
	},

	mounted() {
		this.setConfigurationFile();
		this.getHeightWindow();
	},

	methods: {
		async setConfigurationFile() {
			this.Configuration = await setConfigurationFileByAccount('products', this.account);

			this.getAllProducts();
			this.setCategories();
		},

		getHeightWindow() {
			var heightWindow = window.innerHeight - 285;

			return heightWindow + 'px';
		},

		add() {
			this.Configuration.create.modalVisible = true;
		},

		async formDataCreate(value) {
			value.category_id = value.category.id;

			let formData = new FormData();

			for (let key in value) {
				formData.append(key, value[key]);
			}

			this.Configuration.endpoints.new(this.user.account_id, formData)
				.then((response) => {
					this.Configuration.create.modalVisible = false;
					this.loading = false;
					this.$toast.add({
						severity: 'success',
						summary: this.$t('toast.success'),
						detail: response.data.message,
						life: 3000
					});
					Store.commit('UsersStore/setLoadingServerRequest', false);
					this.getAllProducts();
				})
				.catch((error) => {
					this.$toast.add({
						severity: 'error',
						summary: this.$t('toast.error'),
						detail: error.response.data.message,
						life: 3000
					});
					Store.commit('UsersStore/setLoadingServerRequest', false);
				});
		},

		edit(data) {
			this.Configuration.update.id = data.id;

			for (const configuration of this.Configuration.update.formConfiguration) {
				if (configuration.type === 'price') {
					configuration.defaultValue = parseFloat(data[configuration.modelName]);
				} else {
					configuration.defaultValue = data[configuration.modelName];
				}
			}

			this.Configuration.update.modalVisible = true;
		},

		formDataUpdate(value) {
			value.category_id = value.category.id;
			let formData = new FormData();

			for (let key in value) {
				formData.append(key, value[key]);
			}

			this.Configuration.endpoints.update(this.user.account_id, formData)
				.then((response) => {
					this.Configuration.update.modalVisible = false;
					this.loading = false;
					this.$toast.add({
						severity: 'success',
						summary: this.$t('toast.success'),
						detail: response.data.message,
						life: 3000
					});
					Store.commit('UsersStore/setLoadingServerRequest', false);
					this.getAllProducts();
				})
				.catch((error) => {
					this.$toast.add({
						severity: 'error',
						summary: this.$t('toast.error'),
						detail: error.response.data.message,
						life: 3000
					});
					Store.commit('UsersStore/setLoadingServerRequest', false);
				});
		},

		async deleteProduct(element) {
			this.Configuration.endpoints.delete(this.user.account_id, element)
				.then((response) => {
					this.loading = false;
					this.$toast.add({
						severity: 'success',
						summary: this.$t('toast.success'),
						detail: response.data.message,
						life: 3000
					});
					Store.commit('UsersStore/setLoadingServerRequest', false);
					this.getAllProducts();
				})
				.catch((error) => {
					console.log(error);
					Store.commit('UsersStore/setLoadingServerRequest', false);
				});
		},

		setCategories() {
			this.loading = true;

			for (const configuration of this.Configuration.create.formConfiguration) {
				if (configuration.modelName === 'category') {
					configuration.defaultValue = this.categories;
				}
			}

			for (const configuration of this.Configuration.update.formConfiguration) {
				if (configuration.modelName === 'category') {
					configuration.options = this.categories;
				}
			}

			this.loading = false;
		},

		getAllCategories() {
			this.Configuration.endpoints.getAllCategories(this.user.account_id);
		},

		async getAllProducts() {
			await this.Configuration.endpoints.getAllProducts(this.user.account_id);
		}
	}
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
}

.p-column-title {
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
