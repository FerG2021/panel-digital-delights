<script>
import { formatNumberToDecimal } from '../../utils/utils';
import ImagesMultiple from '../common/ImagesMultiple.vue';

export default {
	components: { ImagesMultiple },
	props: {
		item: {
			type: Object,
			required: true
		}
	},
	data() {
		return {
			openGalleria: false,
			imagesGalleria: null,
			responsiveOptions: [
				{
					breakpoint: '1500px',
					numVisible: 5
				},
				{
					breakpoint: '1024px',
					numVisible: 3
				},
				{
					breakpoint: '768px',
					numVisible: 2
				},
				{
					breakpoint: '560px',
					numVisible: 1
				}
			]
		};
	},
	computed: {
		itemValue() {
			let value;

			if (this.item.type === 'number') {
				if (this.item.variant === 'year') {
					value = formatNumberToDecimal(this.item.value, 0, 0);
				} else {
					value = this.item.value !== null ? formatNumberToDecimal(this.item.value) : 's/d';
				}
			} else {
				value = this.item.value !== null ? this.item.value : 's/d';
			}

			return value;
		}

	},
	methods: {
		clickOpenImages(item) {
			this.openGalleria = true;
			this.imagesGalleria = item.value;
		}
	}
};
</script>

<template>
	<div class="container">
		<div class="label">
			{{ item.label }}
		</div>
		<div class="value">

			<Image
				v-if="item.type === 'image'"
				preview
				:src="item.value"
				alt="Image"
				class="image"
				imageStyle="border-radius: 8px; box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);padding: 3px; width: 100%"
			/>

			<div v-if="item.type === 'image-multiple'">
				<ImagesMultiple
					v-if="item.value"
					:images="item.value"
				/>
			</div>

			<span v-else>
				{{ itemValue }}
			</span>
		</div>
	</div>
</template>

<style lang="scss" scoped>
.container {
	display: flex;
	border: 1px solid #ccc;
	padding: 5px;
	margin-top: 10px;
	border-radius: 5px;
	.image {
		&:hover {
			cursor: pointer;
		}
	}
	.label {
		width: 50%;
		font-weight: 600;
	}
	.value {
		width: 50%;
	}
}
</style>