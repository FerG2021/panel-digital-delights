<script>
import { mapGetters } from 'vuex';

import MainCard from '../../components/common/MainCard.vue';
import SendWhatsApp from '../../components/common/SendWhatsApp.vue';
import DynamicTable from '../../components/datatable/DynamicTable.vue';
import Store from '../../managers/store/store';
import { setConfigurationFileByAccount } from '../../utils/utils';

export default {
	components: {
		MainCard,
		DynamicTable,
		SendWhatsApp
	},
	data() {
		return {
			Configuration: null,
			clientRecords: null
		};
	},
	computed: {
		...mapGetters('UsersStore', ['account', 'user']),
		...mapGetters('MonthlyFeesStore', ['monthlyFees']),
		getMonthlyFees() {
			for (const monthlyFee of this.monthlyFees) {
				monthlyFee.client.fullname = null;
				monthlyFee.client.fullname = `${monthlyFee.client.lastname} ${monthlyFee.client.name}`;
			}

			return this.monthlyFees;
		}
	},
	mounted() {
		this.setCongigurationFile();
	},
	methods: {
		async setCongigurationFile() {
			this.Configuration = await setConfigurationFileByAccount(
				'monthlyfees',
				this.account
			);
		},
		sendWhatsapp(data) {
			this.clientRecords = data;
			this.Configuration.sendWhatsApp.modalVisible = true;
		},
		collectFee(data) {
			let formData = new FormData();

			for (let key in data) {
				formData.append(key, data[key]);
			}

			this.Configuration.endpoints.collectFee(this.user.account_id, formData)
				.then((response) => {
					this.loading = false;
					this.$toast.add({
						severity: 'success',
						summary: this.$t('toast.success'),
						detail: response.data.message,
						life: 3000
					});
					Store.commit('UsersStore/setLoadingServerRequest', false);
					this.getAllMonthlyFees();
				})
				.catch((error) => {
					console.log(error);
					Store.commit('UsersStore/setLoadingServerRequest', false);
				});
		},
		async getAllMonthlyFees() {
			await this.Configuration.endpoints.getAll(this.user.account_id);
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
						:elements="getMonthlyFees"
						:columns="Configuration.tableColumns"
						:labels="Configuration.labels"
						:loading="loading"
						:filtersColumn="Configuration.filters"
						@send-whatsapp="sendWhatsapp"
						@collect-fee="collectFee"
					/>
				</div>
			</template>
		</MainCard>

		<Toast />

		<ConfirmDialog></ConfirmDialog>

		<SendWhatsApp
			:configuration="Configuration.sendWhatsApp"
			:client-records="clientRecords"
		/>
	</main>
</template>

<style>

</style>