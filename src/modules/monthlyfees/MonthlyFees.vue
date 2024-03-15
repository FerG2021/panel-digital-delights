<script>
import { mapGetters } from 'vuex';

import MainCard from '../../components/common/MainCard.vue';
import SendWhatsApp from '../../components/common/SendWhatsApp.vue';
import DynamicTable from '../../components/datatable/DynamicTable.vue';
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
		},
		message() {
			return this.clientRecords ? this.setMessageType : null;
		},
		setMessageType() {
			return `${this.Configuration.sendWhatsApp.formConfiguration[0].defaultValue.replace('<CLIENT_NAME>', this.clientRecords.client.name)} \n ${this.$t('MONTHLY_FEES_SECTION.EXPIRED_DATE_MESSAGE')}`;
		},
		phoneNumber() {
			return this.clientRecords ? this.clientRecords.client.phone_number : null;
		},
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
				'monthlyfees',
				this.account
			);
		},
		openSendWhatsAppModal(data) {
			this.clientRecords = data;
			this.Configuration.sendWhatsApp.openSendWhatsAppModal = true;
		},
		collectFee(data) {
			let formData = new FormData();

			for (let key in data) {
				formData.append(key, data[key]);
			}
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
				{{ title }}
			</template>

			<template #content>
				<DynamicTable
					:elements="getMonthlyFees"
					:columns="Configuration.tableColumns"
					:labels="Configuration.labels"
					:endpoints="endpoints"
					:loading="loading"
					:filtersColumn="Configuration.filters"
					@send-whatsapp="openSendWhatsAppModal"
					@collect-fee="collectFee"
				/>
			</template>
		</MainCard>

		<Toast />

		<SendWhatsApp
			:configuration="Configuration.sendWhatsApp"
			:message="message"
			:phone-number="phoneNumber"
		/>
	</main>
</template>

<style>

</style>