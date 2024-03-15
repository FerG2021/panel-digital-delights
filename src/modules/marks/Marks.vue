<script>
import { FilterMatchMode } from 'primevue/api';
import { mapGetters } from 'vuex';

import ABMCreate from '../../components/ABM/ABMCreate.vue';
import ABMUpdate from '../../components/ABM/ABMUpdate.vue';
import MainCard from '../../components/common/MainCard.vue';
import DynamicTable from '../../components/datatable/DynamicTable.vue';
import { setConfigurationFileByAccount, setFormConfiguration } from '../../utils/utils';

export default {
	name: 'MarksComponent',
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
		...mapGetters('MarksStore', ['marks']),
		title() {
			return this.Configuration.labels.sectionTitle;
		}
	},
	mounted() {
		this.setCongigurationFile();
		this.getHeightWindow();
	},
	methods: {
		async setCongigurationFile() {
			this.Configuration = await setConfigurationFileByAccount(
				'marks',
				this.account
			);
		},
		openABMCreate() {
			this.Configuration.actions.openCreateModal = true;
		},
		formatItem(item) {
			return item;
		},
		openABMUpdate(data) {
			this.Configuration = setFormConfiguration(this.Configuration, data);
			this.Configuration.actions.openUpdateModal = true;
		},
		getHeightWindow() {
			var alturaPestana = window.innerHeight - 285;

			return alturaPestana + 'px';
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
						:elements="marks"
						:columns="Configuration.tableColumns"
						:labels="Configuration.labels"
						:loading="loading"
						@add="openABMCreate"
						@edit="openABMUpdate"
						@delete="deleteCategory"
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
			@formDataUpdate="formDataUpdate"
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
