<script>
import { mapGetters } from 'vuex';

import ABMCreate from '../../components/ABM/ABMCreate.vue';
import ABMDetail from '../../components/ABM/ABMDetail.vue';
import ABMUpdate from '../../components/ABM/ABMUpdate.vue';
import MainCard from '../../components/common/MainCard.vue';
import DynamicTable from '../../components/datatable/DynamicTable.vue';
import { formatDate, getArrayDetailData, setConfigurationFileByAccount, setFormConfiguration } from '../../utils/utils';

import SellCar from './modals/SellCar.vue';

export default {
	name: 'CarsComponent',
	components: {
		MainCard,
		DynamicTable,
		ABMCreate,
		ABMUpdate,
		ABMDetail,
		SellCar
	},
	data() {
		return {
			Configuration: null,
			currentCar: null
		};
	},
	mounted() {
		this.setConfigurationFile();
	},
	computed: {
		...mapGetters('UsersStore', ['account', 'user']),
		...mapGetters('CarsStore', ['cars']),
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
		},
		sellConfiguration() {
			console.log(this.Configuration.sell);

			for (const itemFormConf of this.Configuration.sell.formConfiguration) {
				if (itemFormConf.type === 'select') {
					itemFormConf.options = itemFormConf.options();
				}
			}

			return this.Configuration.sell;
		}
	},
	methods: {
		async setConfigurationFile() {
			this.Configuration = await setConfigurationFileByAccount(
				'cars',
				this.account
			);
		},
		openABMCreate() {
			this.Configuration = setFormConfiguration(this.Configuration);
			this.Configuration.actions.openCreateModal = true;
		},
		formatItem(item) {
			item.category_id = item.category.id;
			item.condition_id = item.condition.id;
			item.fuel_id = item.fuel.id;
			item.mark_id = item.mark.id;
			item.description = item.description ? item.description : null;

			return item;
		},
		openABMUpdate(data) {
			this.Configuration = setFormConfiguration(this.Configuration, data);
			this.Configuration.actions.openUpdateModal = true;
		},
		openABMDetail(data) {
			this.Configuration = setFormConfiguration(this.Configuration, data);
			this.Configuration.actions.openDetailModal = true;
		},
		openSellModal(data) {
			this.Configuration = setFormConfiguration(this.Configuration);
			this.currentCar = data;
			this.Configuration.sell.openSellModal = true;
		},
		openSellDetail(data) {
			this.Configuration.selleddetails.openDetailModal = true;
			const arrayData = [];

			arrayData.push({
				label: 'Comprador',
				value: `${data.buyer.lastname}, ${data.buyer.name}`
			});
			arrayData.push({
				label: 'Fecha de compra',
				value: `${formatDate(data.buy_date, 'DD/MM/YYYY')}`
			});
			arrayData.push({
				label: 'Venc. de cuota',
				value: `${data.expiration_day}`
			});

			this.Configuration.selleddetails.data = arrayData;
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
				<DynamicTable
					:elements="cars"
					:columns="tableColumns"
					:labels="labels"
					:loading="loading"
					:endpoints="endpoints"
					@add="openABMCreate"
					@edit="openABMUpdate"
					@detail="openABMDetail"
					@sell="openSellModal"
					@sell-detail="openSellDetail"
				/>
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

		<SellCar
			:configuration="Configuration.sell"
			:endpoints="Configuration.endpoints"
			:data="currentCar"
			@formDataSellCar="formDataSellCar"
		/>

		<ABMDetail
			:configuration="Configuration.selleddetails"
			:data="Configuration.selleddetails.data"
			@formDataUpdate="formDataUpdate"
		/>
	</main>
</template>

<style>
</style>