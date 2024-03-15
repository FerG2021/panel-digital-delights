<script>
export default {
	props: {
		title: {
			type: Object,
			required: true
		}
	},
	computed: {
		iconClass() {
			return this.title.class;
		},
		icon() {
			return this.title.icon;
		},
		label() {
			return this.title.label;
		}
	}
};
</script>

<template>
	<h3 class="title-modal">
		<span
			:class="iconClass"
			class="icon"
		>
			{{ icon }}
		</span>
		<span class="title">
			{{ label }}
		</span>
	</h3>
</template>

<style lang="scss" scoped>
.title-modal {
    margin: 0px;
	display: flex;
	.title {
		margin-left: 10px;
	}
}
</style>