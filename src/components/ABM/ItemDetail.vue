<script>
import { formatNumberToDecimal } from '../../utils/utils';

export default {
	props: {
		item: {
			type: Object,
			required: true
		}
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
	.label {
		width: 50%;
		font-weight: 600;
	}
	.value {
		width: 50%;
	}
}
</style>