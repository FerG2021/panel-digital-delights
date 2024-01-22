<template>
	<div class="container">
		<div class="info-container">
			{{ title }}
		</div>
		<div class="detail-container">
			{{ detail }}
		</div>
	</div>
</template>

<script>
export default {
	props: {
		title: {
			type: String,
			required: true
		},
		detail: {
			type: String,
			required: true
		}
	}
};
</script>

<style lang="scss" scoped>
.container {
	border-radius: 4px;
	display: flex;
	justify-content: space-around;
	background-color: #e5e5e5;
	.info-container {
		font-weight: 600;
	}
}
</style>