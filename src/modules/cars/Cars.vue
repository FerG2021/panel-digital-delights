<script>
import moment from 'moment';
import { FilterMatchMode } from 'primevue/api';
import { mapGetters } from 'vuex';

import ABMCreate from '../../components/ABM/ABMCreate.vue';
import ABMDetail from '../../components/ABM/ABMDetail.vue';
import ABMUpdate from '../../components/ABM/ABMUpdate.vue';
import MainCard from '../../components/common/MainCard.vue';
import DynamicTable from '../../components/datatable/DynamicTable.vue';
import Store from '../../managers/store/store';
import { setConfigurationFileByAccount, setFormConfiguration } from '../../utils/utils';

import SellCar from './modals/SellCar.vue';
import SelledDetails from './modals/SelledDetails.vue';

export default {
	name: 'CarsComponent',
	components: {
		DynamicTable,
		ABMCreate,
		ABMUpdate,
		ABMDetail,
		MainCard,
		SellCar,
		SelledDetails
	},
	data() {
		return {
			loading: false,
			currentCar: null,
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
		...mapGetters('CarsStore', [
			'cars',
			'fuelOptions',
			'conditionsOptions',
			'fuels',
			'conditions'
		]),
		...mapGetters('CategoriesStore', ['categories']),
		...mapGetters('MarksStore', ['marks']),
		...mapGetters('ClientsStore', ['clients'])
	},

	mounted() {
		this.setCongigurationFile();
		this.getHeightWindow();
	},

	methods: {
		async setCongigurationFile() {
			this.Configuration = await setConfigurationFileByAccount(
				'cars',
				this.account
			);
			this.setSelectOptions();
		},

		setSelectOptions() {
			this.loading = true;
			this.setCategoriesOptions();
			this.setMarksOptions();
			this.setClients();

			this.loading = false;
		},

		setCategoriesOptions() {
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
		},

		setFuelOptions() {
			for (const configuration of this.Configuration.create.formConfiguration) {
				if (configuration.modelName === 'fuel') {
					configuration.defaultValue = this.fuels;
				}
			}

			for (const configuration of this.Configuration.update.formConfiguration) {
				if (configuration.modelName === 'fuel') {
					configuration.options = this.fuels;
				}
			}
		},

		setMarksOptions() {
			for (const configuration of this.Configuration.create.formConfiguration) {
				if (configuration.modelName === 'mark') {
					configuration.defaultValue = this.marks;
				}
			}

			for (const configuration of this.Configuration.update.formConfiguration) {
				if (configuration.modelName === 'mark') {
					configuration.options = this.marks;
				}
			}
		},

		setConditionOptions() {
			for (const configuration of this.Configuration.create.formConfiguration) {
				if (configuration.modelName === 'condition') {
					configuration.defaultValue = this.conditions;
				}
			}

			for (const configuration of this.Configuration.update.formConfiguration) {
				if (configuration.modelName === 'condition') {
					configuration.options = this.conditions;
				}
			}
		},

		add() {
			this.Configuration.create.modalVisible = true;
		},

		async formDataCreate(value) {
			value.category_id = value.category.id;
			value.condition_id = value.condition.id;
			value.fuel_id = value.fuel.id;
			value.mark_id = value.mark.id;
			value.description = value.description ? value.description : null;

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
					this.getAllCars();
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
			this.Configuration = setFormConfiguration(this.Configuration, data);
		},

		formDataUpdate(value) {
			value.category_id = value.category.id;
			value.mark_id = value.mark.id;
			value.condition_id = value.condition.id;
			value.fuel_id = value.fuel.id;

			let formData = new FormData();

			for (let key in value) {
				if (value[key] !== null) {
					formData.append(key, value[key]);
				}
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
					this.getAllCars();
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

		detail(data) {
			this.Configuration.detail.id = data.id;

			for (const configuration of this.Configuration.detail.formConfiguration) {
				configuration.defaultValue = data[configuration.modelName];
			}

			this.Configuration.detail.modalVisible = true;
		},

		async deleteCar(element) {
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
					this.getAllCars();
				})
				.catch((error) => {
					console.log(error);
					Store.commit('UsersStore/setLoadingServerRequest', false);
				});
		},

		async getAllCars() {
			await this.Configuration.endpoints.getAllCars(this.user.account_id);
		},

		sell(data) {
			if (data.buyer !== null) {
				this.Configuration.sell.selled = true;
			}

			for (const configuration of this.Configuration.sell.formConfiguration) {
				configuration.defaultValue = data[configuration.modelName];
			}

			if (data.buyer === null) {
				this.setClients();
			}

			this.setCars(data);
			this.Configuration.sell.id = data.id;
			this.Configuration.sell.modalVisible = true;
		},

		setClients() {
			for (const configuration of this.Configuration.sell.formConfiguration) {
				if (configuration.modelName === 'buyer') {
					configuration.defaultValue = this.clients;
				}
			}
		},

		setCars(data) {
			this.currentCar = data;

			for (const configuration of this.Configuration.sell.formConfiguration) {
				if (configuration.modelName === 'car_id') {
					configuration.defaultValue = data.name;
				}
			}
		},

		formDataSellCar(value) {
			value.car_id = this.currentCar.id;
			value.buyer_id = value.buyer.id;
			value.buy_date = moment(value.buy_date).format('YYYY-MM-DD HH:mm:ss');

			let formData = new FormData();

			for (let key in value) {
				if (value[key] !== null) {
					formData.append(key, value[key]);
				}
			}

			this.Configuration.endpoints.sellCar(this.user.account_id, formData)
				.then((response) => {
					this.loading = false;
					this.$toast.add({
						severity: 'success',
						summary: this.$t('toast.success'),
						detail: response.data.message,
						life: 3000
					});
					Store.commit('UsersStore/setLoadingServerRequest', false);
					this.Configuration.sell.modalVisible = false;
					this.getAllCars();
				})
				.catch((error) => {
					console.log(error);
					this.$toast.add({
						severity: 'error',
						summary: this.$t('toast.error'),
						detail: error.response.data.message,
						life: 3000
					});
					Store.commit('UsersStore/setLoadingServerRequest', false);
				});
		},

		sellDetail(data) {
			this.currentCar = data;
			this.Configuration.selleddetails.modalVisible = true;
			this.Configuration.selleddetails.data = data;
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
				<h1>
					{{ Configuration.labels.sectionTitle }}
				</h1>
			</template>

			<template #content>
				<div>
					<DynamicTable
						:elements="cars"
						:columns="Configuration.tableColumns"
						:labels="Configuration.labels"
						:loading="loading"
						@add="add"
						@edit="edit"
						@detail="detail"
						@delete="deleteCar"
						@sell="sell"
						@sell-detail="sellDetail"
					/>
				</div>
			</template>
		</MainCard>

		<ConfirmDialog></ConfirmDialog>

		<ABMCreate
			:data="Configuration.create"
			@formDataCreate="formDataCreate"
		/>
		<ABMUpdate
			:data="Configuration.update"
			@formDataUpdate="formDataUpdate"
		/>
		<ABMDetail
			:data="Configuration.detail"
			@formDataUpdate="formDataUpdate"
		/>
		<SellCar
			:data="Configuration.sell"
			@formDataSellCar="formDataSellCar"
		/>
		<SelledDetails
			:data="Configuration.selleddetails"
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
    /* border: 1px solid red !important; */
}

.p-column-title {
    /* border: 1px solid green !important; */
    text-align: center !important;
    align-content: center !important;
}
</style>
