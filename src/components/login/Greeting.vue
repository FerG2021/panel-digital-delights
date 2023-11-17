<template>
	<div class="greeting-container">
		<div class="contenedor-img-login">
			<img src="../../assets/gorrochef.png" class="img-login" />
		</div>
		<h1 class="saludo-login">
			{{ $t("welcome") }}
		</h1>
	</div>
</template>

<script>
export default {
	name: 'LoginGreeting',

};
</script>

<style lang="scss" scoped>
.greeting-container {
	.contenedor-img-login {
		display: flex;
		.img-login {
			margin: auto;
			height: 20vh;
		}
	}
	.saludo-login {
		text-align: center;
		font-size: calc(1em + 1vw);
	}
}

</style>