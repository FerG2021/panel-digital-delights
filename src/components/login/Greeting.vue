<script>
export default { name: 'LoginGreeting' };
</script>

<template>
	<div class="greeting-container">
		<div class="contenedor-img-login">
			<img src="../../assets/logo.png" class="img-login"/>
		</div>
		<h1 class="saludo-login">
			{{ $t("welcome") }}
		</h1>
	</div>
</template>

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