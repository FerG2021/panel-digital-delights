<script>
import moment from 'moment';
import { FilterMatchMode } from 'primevue/api';
import { mapGetters } from 'vuex';

import ABMCreate from '../../components/ABM/ABMCreate.vue';
import ABMUpdate from '../../components/ABM/ABMUpdate.vue';
import MainCard from '../../components/common/MainCard.vue';
import DynamicTable from '../../components/datatable/DynamicTable.vue';
import Store from '../../managers/store/store';
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
		...mapGetters('CarsStore', ['cars'])
	},

	mounted() {
		this.setCongigurationFile();
		this.getHeightWindow();
		this.setClients();
	},

	methods: {
		setClients() {
			if (this.clients) {
				let index = 0;

				for (const client of this.clients) {
					client.recordsCars = [];

					if (this.clients[index].cars !== null) {
						for (const carID of JSON.parse(this.clients[index].cars)) {
							const recordCar = this.cars.find(car => car.id === carID);
							client.recordsCars.push(recordCar.patent);
						}
					}

					index++;
				}

				this.recordsClients = this.clients;
			}
		},

		async setCongigurationFile() {
			this.Configuration = await setConfigurationFileByAccount(
				'clients',
				this.account
			);
		},

		add() {
			this.Configuration.create.modalVisible = true;
		},

		async formDataCreate(value) {
			this.formatDate(value, 'birthday');

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
					this.getAllClients();
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

		formatDate(value, valueName) {
			value[valueName] = moment(value[valueName]).format('YYYY-MM-DD HH:mm:ss');

			return value;
		},

		edit(data) {
			this.Configuration = setFormConfiguration(this.Configuration, data);
		},

		formDataUpdate(value) {
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
					this.getAllClients();
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

		async deleteCategory(element) {
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
					this.getAllClients();
				})
				.catch((error) => {
					console.log(error);
					Store.commit('UsersStore/setLoadingServerRequest', false);
				});
		},

		async getAllClients() {
			await this.Configuration.endpoints.getAllClients(this.user.account_id);
			this.setClients();
		},

		getHeightWindow() {
			var tabHeight = window.innerHeight - 285;

			return tabHeight + 'px';
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
						:elements="recordsClients"
						:columns="Configuration.tableColumns"
						:labels="Configuration.labels"
						:loading="loading"
						:filtersColumn="Configuration.filters"
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
