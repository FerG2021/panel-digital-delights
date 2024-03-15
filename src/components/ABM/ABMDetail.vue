<script>
import TitleModal from '../common/TitleModal.vue';

import ItemDetail from './ItemDetail.vue';

export default {
	components: {
		TitleModal,
		ItemDetail
	},
	props: {
		configuration: {
			type: Array,
			required: true,
			loadingBtnSave: false
		},
		data: {
			type: Array,
			required: true
		}
	},
	computed: {
		title() {
			return this.configuration.header.detail;
		}
	}
};
</script>

<template>
	<div>
		<Dialog
			v-model:visible="configuration.openDetailModal"
			icon="pi pi-refresh"
			class="flex justify-content-center dialog"
			:draggable="false"
			style="width: 30vw"
		>
			<template #header>
				<TitleModal
					:title="title"
				/>
			</template>

			<div class="form-container">
				<div
					v-for="item in data"
					:key="item"
				>
					<ItemDetail :item="item" />
				</div>
			</div>
		</Dialog>

		<Toast />
	</div>
</template>