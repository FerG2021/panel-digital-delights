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

<script>
import { FilterMatchMode } from 'primevue/api';
import { mapGetters } from 'vuex';
import { getAllPromotions, newPromotion, updatePromotion, deletePromotion } from '../../managers/api/api';
import { setConfigurationFileByAccount } from '../../utils/utils';


import DynamicTable from '../../components/datatable/DynamicTable.vue';
import ABMCreate from '../../components/ABM/ABMCreate.vue';
import ABMUpdate from '../../components/ABM/ABMUpdate.vue';
import MainCard from '../../components/common/MainCard.vue';
import Store from '../../managers/store/store';

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
				global: { value: null, matchMode: FilterMatchMode.CONTAINS },
			},
		};
	},

	computed: {
		...mapGetters('UsersStore', ['user', 'auth', 'modules']),
		...mapGetters('CategoriesStore', ['categories']),
		...mapGetters('ProductsStore', ['products']),
		...mapGetters('PromotionsStore', ['promotions']),
	},

	mounted() {
		this.setCongigurationFile();
		this.getHeightWindow();
	},

	methods: {
		async setCongigurationFile() {
			const account = this.user.email.split('.')[1];
			this.Configuration = await setConfigurationFileByAccount('promotions', account);
			console.log(this.Configuration.account);
		},
		
		getHeightWindow() {
			var heightWindow = window.innerHeight - 285;
			return heightWindow + 'px';
		},

		async loadPromotions() {
			await getAllPromotions(this.user.account_id);
		},

		add() {
			this.Configuration.create.modalVisible = true;
		},

		async formDataCreate(value) {
			let formData = new FormData();

			for (let key in value) {
				formData.append(key, value[key]);
			}

			newPromotion(this.user.account_id, formData)
				.then((response) => {
					this.Configuration.create.modalVisible = false;
					this.loading = false;
					this.$toast.add({
						severity: 'success',
						summary: this.$t('toast.success'),
						detail: response.data.message,
						life: 3000,
					});
					this.loadPromotions();
					Store.commit('UsersStore/setLoadingServerRequest', false);
				})
				.catch((error) => {
					console.log(error);
					this.$toast.add({
						severity: 'error',
						summary: this.$t('toast.error'),
						detail: error.response.data.message,
						life: 3000,
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

			updatePromotion(this.user.account_id, formData)
				.then((response) => {
					this.Configuration.update.modalVisible = false;
					this.loadPromotions();
					this.loading = false;
					this.$toast.add({
						severity: 'success',
						summary: this.$t('toast.success'),
						detail: response.data.message,
						life: 3000,
					});
					Store.commit('UsersStore/setLoadingServerRequest', false);
				})
				.catch((error) => {
					this.$toast.add({
						severity: 'error',
						summary: this.$t('toast.error'),
						detail: error.response.data.message,
						life: 3000,
					});
					Store.commit('UsersStore/setLoadingServerRequest', false);
				});
		},

		async deletePromotion(element) {
			deletePromotion(this.user.account_id, element)
				.then((response) => {
					this.loading = false;
					this.$toast.add({
						severity: 'success',
						summary: this.$t('toast.success'),
						detail: response.data.message,
						life: 3000,
					});
					this.loadPromotions();
					Store.commit('UsersStore/setLoadingServerRequest', false);
				})
				.catch((error) => {
					console.log(error);
					Store.commit('UsersStore/setLoadingServerRequest', false);
				});
		},
	}
};
</script>

<style>

</style>