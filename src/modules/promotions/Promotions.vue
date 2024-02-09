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
	name: 'PromontionsComponent',
	components: {
		DynamicTable,
		ABMCreate,
		ABMUpdate,
		MainCard
	},
	data() {
		return {
			sectionTitle: this.$t('promotions'),
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
		...mapGetters('PromotionsStore', ['promotions'])
	},
	mounted() {
		this.setCongigurationFile();
		this.getHeightWindow();
	},
	methods: {
		async setCongigurationFile() {
			this.Configuration = await setConfigurationFileByAccount('promotions', this.account);
		},

		add() {
			this.Configuration.create.modalVisible = true;
		},
		async formDataCreate(value) {
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
					this.getAllPromotions();
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
					this.getAllPromotions();
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

		async deletePromotion(element) {
			this.Configuration.endpoints.delete(this.user.account_id, element)
				.then((response) => {
					this.loading = false;
					this.$toast.add({
						severity: 'success',
						summary: this.$t('toast.success'),
						detail: response.data.message,
						life: 3000
					});
					this.getAllPromotions();
					Store.commit('UsersStore/setLoadingServerRequest', false);
				})
				.catch((error) => {
					console.log(error);
					Store.commit('UsersStore/setLoadingServerRequest', false);
				});
		},

		getHeightWindow() {
			var heightWindow = window.innerHeight - 285;

			return heightWindow + 'px';
		},
		async getAllPromotions() {
			await this.Configuration.endpoints.getAllPromotions(this.user.account_id);
		}
	}
};
</script>

<template>
	<main class="about-page" v-if="Configuration">
		<MainCard>
			<template #header>
				<h1> {{ sectionTitle }} </h1>
			</template>
			<template #content>
				<div>
					<DynamicTable
						:elements="promotions"
						:columns="Configuration.tableColumns"
						:labels="Configuration.labels"
						:loading="loading"
						@add='add'
						@edit='edit'
						@delete='deletePromotion'
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