<script>
import { mapGetters } from 'vuex';

import MainCard from '../../components/common/MainCard.vue';
import SendWhatsApp from '../../components/common/SendWhatsApp.vue';
import DynamicTable from '../../components/datatable/DynamicTable.vue';
import { setConfigurationFileByAccount } from '../../utils/utils';

export default {
	name: 'NotificationsComponent',
	components: {
		MainCard,
		DynamicTable,
		SendWhatsApp
	},
	computed: {
		...mapGetters('NotificationsStore', ['notifications']),
		...mapGetters('UsersStore', ['user', 'account'])
	},
	data() {
		return {
			Configuration: null,
			clientRecords: null,
			loading: false
		};
	},
	mounted() {
		this.setCongigurationFile();
		this.getHeightWindow();
	},
	methods: {
		setNotifications() {
			if (this.notifications.length > 0) {
				for (const notification of this.notifications) {
					if (notification.notification.name === 'birthday') {
						notification.notification.label = 'Cumpleaños';
						notification.notification.type = 'info';
						notification.notification.icon = 'pi pi-calendar-plus';
					} else {
						notification.notification.label = 'Venta';
						notification.notification.type = 'success';
						notification.notification.icon = 'pi pi-money-bill';
					}

					notification.statusRead = {
						label: notification.read === 0 ? 'No leída' : 'Leída',
						type: notification.read === 0 ? 'danger' : 'sucess',
						icon: notification.read === 0 ? 'pi pi-circle-fill' : 'pi pi-check'
					};

					notification.name = `${notification.client.name} ${notification.client.lastname}`;
				}
			}

			return this.notifications;
		},
		sendWhatsapp(data) {
			this.clientRecords = data;
			this.Configuration.sendWhatsApp.modalVisible = true;
			this.readNotification(data);
		},
		readNotification(data) {
			this.loading = true;
			let formData = new FormData();
			const arrayNotifications = [];
			arrayNotifications.push(data.id);

			formData.append('arrayNotifications', JSON.stringify(arrayNotifications));

			this.Configuration.endpoints.read(this.user.account_id, formData)
				.then((response) => {
					this.loading = false;
					this.$toast.add({
						severity: 'success',
						summary: this.$t('toast.success'),
						detail: response.data.message,
						life: 3000
					});
					this.Configuration.endpoints.getAll(this.user.account_id);
				})
				.catch((error) => {
					console.error(error);
				});
		},
		async setCongigurationFile() {
			this.Configuration = await setConfigurationFileByAccount(
				'notifications',
				this.account
			);
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
				<DynamicTable
					:elements="setNotifications()"
					:columns="Configuration.tableColumns"
					:labels="Configuration.labels"
					:loading="loading"
					@send-whatsapp="sendWhatsapp"
					@read-notification="readNotification"
				/>
			</template>
		</MainCard>

		<Toast />

		<SendWhatsApp
			:configuration="Configuration.sendWhatsApp"
			:client-records="clientRecords"
		/>
	</main>
</template>

<style>

</style>