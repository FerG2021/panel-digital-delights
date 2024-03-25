<script>
import { FilterMatchMode } from 'primevue/api';
import { mapGetters } from 'vuex';

import ABMCreate from '../../components/ABM/ABMCreate.vue';
import ABMDetail from '../../components/ABM/ABMDetail.vue';
import ABMUpdate from '../../components/ABM/ABMUpdate.vue';
import MainCard from '../../components/common/MainCard.vue';
import DynamicTable from '../../components/datatable/DynamicTable.vue';
import { getArrayDetailData, setConfigurationFileByAccount, setFormConfiguration } from '../../utils/utils';

export default {
	name: 'ProductsComponent',
	components: {
		DynamicTable,
		ABMCreate,
		ABMUpdate,
		ABMDetail,
		MainCard
	},
	data() {
		return {
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
		...mapGetters('ProductsStore', ['products']),
		tableColumns() {
			return this.Configuration.tableColumns;
		},
		labels() {
			return this.Configuration.labels;
		},
		title() {
			return this.Configuration.labels.sectionTitle;
		},
		endpoints() {
			return this.Configuration.endpoints;
		},
		detailData() {
			return getArrayDetailData(this.Configuration.actions.formConfiguration);
		}
	},
	mounted() {
		this.setConfigurationFile();
	},
	methods: {
		async setConfigurationFile() {
			this.Configuration = await setConfigurationFileByAccount('products', this.account);
		},
		openABMCreate() {
			this.Configuration = setFormConfiguration(this.Configuration);
			this.Configuration.actions.openCreateModal = true;
		},
		openABMUpdate(data) {
			this.Configuration = setFormConfiguration(this.Configuration, data);
			this.Configuration.actions.openUpdateModal = true;
		},
		openABMDetail(data) {
			this.Configuration = setFormConfiguration(this.Configuration, data);
			this.Configuration.actions.openDetailModal = true;
		},
		formatItem(item) {
			item.category_id = item.category.id;

			return item;
		}
	}
};
</script>

<template>
	<main class="about-page" v-if="Configuration">
		<MainCard>
			<template #header>
				{{ title }}
			</template>
			<template #content>
				<div>
					<DynamicTable
						:elements="products"
						:columns="tableColumns"
						:labels="labels"
						:loading="loading"
						:endpoints="endpoints"
						@add="openABMCreate"
						@edit="openABMUpdate"
						@detail="openABMDetail"
					/>
				</div>
			</template>
		</MainCard>

		<ABMCreate
			:configuration="Configuration.actions"
			:endpoints="Configuration.endpoints"
			:format-item="item => formatItem(item)"
		/>

		<ABMUpdate
			:configuration="Configuration.actions"
			:endpoints="Configuration.endpoints"
			:format-item="item => formatItem(item)"
		/>

		<ABMDetail
			:configuration="Configuration.actions"
			:data="detailData"
			@formDataUpdate="formDataUpdate"
		/>
	</main>
</template>

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
