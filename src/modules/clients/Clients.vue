<script>
import { FilterMatchMode } from 'primevue/api';
import { mapGetters } from 'vuex';

import ABMCreate from '../../components/ABM/ABMCreate.vue';
import ABMUpdate from '../../components/ABM/ABMUpdate.vue';
import MainCard from '../../components/common/MainCard.vue';
import DynamicTable from '../../components/datatable/DynamicTable.vue';
import { setConfigurationFileByAccount, setFormConfiguration } from '../../utils/utils';

export default {
	name: 'ClientsComponent',
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
			recordsClients: [],
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
		...mapGetters('ClientsStore', ['clients']),
		...mapGetters('CarsStore', ['cars']),
		title() {
			return this.Configuration.labels.sectionTitle;
		},
		endpoints() {
			return this.Configuration.endpoints;
		}
	},

	mounted() {
		this.setCongigurationFile();
	},

	methods: {
		async setCongigurationFile() {
			this.Configuration = await setConfigurationFileByAccount(
				'clients',
				this.account
			);
		},
		openABMCreate() {
			this.Configuration = setFormConfiguration(this.Configuration);
			this.Configuration.actions.openCreateModal = true;
		},
		formatItem(item) {
			return item;
		},
		openABMUpdate(data) {
			this.Configuration = setFormConfiguration(this.Configuration, data);
			this.Configuration.actions.openUpdateModal = true;
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
						:elements="clients"
						:columns="Configuration.tableColumns"
						:labels="Configuration.labels"
						:endpoints="endpoints"
						:loading="loading"
						:filtersColumn="Configuration.filters"
						@add="openABMCreate"
						@edit="openABMUpdate"
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
	</main>
</template>

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
}

.p-column-title {
    text-align: center !important;
    align-content: center !important;
}
</style>
