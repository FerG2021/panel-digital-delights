<script>
import { mapGetters } from 'vuex';

import MainCard from '../../components/common/MainCard.vue';
import DynamicTable from '../../components/datatable/DynamicTable.vue';
import { setConfigurationFileByAccount } from '../../utils/utils';

export default {
	name: 'NotificationsComponent',
	components: {
		MainCard,
		DynamicTable
	},
	computed: {
		...mapGetters('NotificationsStore', ['notifications']),
		...mapGetters('UsersStore', ['account'])
	},
	data() {
		return { Configuration: null };
	},
	mounted() {
		this.setCongigurationFile();
		this.getHeightWindow();
	},
	methods: {
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
				<div>
					<DynamicTable
						:elements="cars"
						:columns="Configuration.tableColumns"
						:labels="Configuration.labels"
					/>
				</div>
			</template>
		</MainCard>
	</main>
</template>

<style>

</style>