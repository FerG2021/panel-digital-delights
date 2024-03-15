<script>
export default {
	methods: {
		getHeightWindow() {
			var heightTab = window.innerHeight - 80;

			return heightTab + 'px';
		}
	}
};
</script>

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

<style lang="scss" scoped>
.container {
	background: var(--white);
	-webkit-box-shadow: 0px 0px 74px 2px rgba(158,156,158,1);
	-moz-box-shadow: 0px 0px 74px 2px rgba(158,156,158,1);
	box-shadow: 0px 0px 74px 2px rgba(158,156,158,1);
	.header {
		height: 80px;
		display: flex;
		align-content: center;
		align-items: center;
		padding-left: 15px;
		font-size: 40px;
		font-weight: 600;
	}
	.content {
		padding: 10px;
		padding-top: 0px;
		height: calc(100% - 80px);
	}
}

</style>