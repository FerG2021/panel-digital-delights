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

<style lang="scss" scoped>
.container {
	border-radius: 4px;
	display: flex;
	background-color: #e5e5e5;
	.info-container {
		font-weight: 600;
		width: 50%;
	}
	.detail-container {
		width: 50%;
		text-align: center;
	}
}
</style>