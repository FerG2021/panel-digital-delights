<script>
import { mapGetters } from 'vuex';

export default {
	computed: { ...mapGetters('MonthlyFeesStore', ['monthlyFees']) },
	methods: {
		clickDetailsButton() {
			this.$router.push('/monthly-fees');
		}
	}
};
</script>

<template>
	<div class="container" v-if="monthlyFees">
		<div class="title">
			{{ $t('MONTHLY_FEES_SECTION.MONTHLY_FEE_HOME_TITLE') }}
		</div>
		<div class="content">
			<div
				v-if="monthlyFees.length > 0"
				class="monthly-fess-expired"
			>
				{{ $t('MONTHLY_FEES_SECTION.MONTHLY_FEES_EXPIRED_LEGEND') }}

				<Button
					label="Ver detalles"
					class="details-button p-button-danger"
					severity="danger"
					:loading="loadingServerRequest"
					@click="clickDetailsButton()"
				/>
			</div>
			<div
				v-else
				class="not-monthly-fees-expired"
			>
				{{ $t('MONTHLY_FEES_SECTION.NOT_MONTHLY_FEES_EXPIRED_LEGEND') }}
			</div>
		</div>

	</div>
</template>

<style lang="scss" scoped>
.container {
	padding: 20px;
	font-size: 18px ;
	.title {
		font-weight: 600;
	}
	.content {
		.monthly-fess-expired {
			color: var(--error);
			display: flex;
			align-items: center;
			.details-button {
				margin-left: 10px;
			}
		}
		.not-monthly-fees-expired {
			color: var(--success);
		}
	}
}
</style>