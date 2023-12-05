<template>
	<div 
		class="container"
		:style="`height: ${getHeightWindow()}`"
	>
		<div class="header">
			<slot name="header"/>
		</div>
		<div class="content">
			<slot name="content"/>
		</div>
	</div>
</template>

<script>
export default {
	methods: {
		getHeightWindow() {
			var heightTab = window.innerHeight - 80;
			return heightTab + 'px';
		},
	},
};
</script>

<style lang="scss" scoped>
.container {
	background: var(--white);
	.header {
		height: 80px;
		display: flex;
		align-content: center;
		align-items: center;
		padding-left: 15px;
	}
	.content {
		padding: 10px;
		padding-top: 0px;
		height: calc(100% - 80px);
	}
}

</style>