<script>
import DetailsInfo from '../../../components/common/DetailsInfo.vue';
import TitleModal from '../../../components/common/TitleModal.vue';
import { formatDate } from '../../../utils/utils';

export default {
	components: {
		TitleModal,
		DetailsInfo
	},
	props: {
		data: {
			type: Array,
			required: true
		}
	},
	data() {
		return {};
	},
	computed: {
		buyName() {
			return `${this.data.data.buyer.lastname}, ${this.data.data.buyer.name}`;
		},
		buyDate() {
			return formatDate(this.data.data.buy_date, 'DD/MM/YYYY');
		},
		expirationDay() {
			return this.data.data.expiration_day;
		}
	},
	methods: {}
};
</script>

<template>
	<div>
		<Dialog
			v-model:visible="data.modalVisible"
			icon="pi pi-eye"
			class="flex justify-content-center dialog"
			:draggable="false"
			style="width: 30vw "
		>
			<template #header>
				<TitleModal :header="data.header" />
			</template>

			<div class="form-container">
				<DetailsInfo
					:title="'Apellido y nombre'"
					:detail="buyName"
					class="details-info"
				/>

				<DetailsInfo
					:title="'Fecha de la compra'"
					:detail="buyDate"
					class="details-info"
				/>

				<DetailsInfo
					:title="'Día de vencimiento de cuota'"
					:detail="expirationDay"
					class="details-info"
				/>
			</div>
		</Dialog>

		<Toast />
	</div>
</template>

<style lang="scss" scoped>
.form-container {
	.details-info {
		margin-top: 10px;
	}
}

</style>