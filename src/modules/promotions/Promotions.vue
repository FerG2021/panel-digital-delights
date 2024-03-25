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
	name: 'PromontionsComponent',
	components: {
		DynamicTable,
		ABMCreate,
		ABMUpdate,
		ABMDetail,
		MainCard
	},
	data() {
		return {
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
		...mapGetters('PromotionsStore', ['promotions']),
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
		this.setCongigurationFile();
	},
	methods: {
		async setCongigurationFile() {
			this.Configuration = await setConfigurationFileByAccount('promotions', this.account);
		},
		openABMCreate() {
			this.Configuration = setFormConfiguration(this.Configuration);
			this.Configuration.actions.openCreateModal = true;
		},
		openABMUpdate(data) {
			this.Configuration = setFormConfiguration(this.Configuration, data);
			this.Configuration.actions.openUpdateModal = true;
		},
		formatItem(item) {
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
						:elements="promotions"
						:columns="tableColumns"
						:labels="labels"
						:loading="loading"
						:endpoints="endpoints"
						@add='openABMCreate'
						@edit='openABMUpdate'
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