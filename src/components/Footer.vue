<script>
export default {
	name: 'FooterComponent',
	props: {
		screen: {
			type: String,
			required: true
		}
	}
};
</script>

<template>
	<div class="container">
		<a
			href="http://fssolutions.com.ar"
			target="_blank"
			:class="screen"
		>
			<span>{{ $t('footer.message') }}</span>
		</a>
	</div>
</template>

<style scoped lang="scss">
@import url('../assets/colors.css');

.container {
    text-align: center;
    .login {
        color: var(--background-card);
        text-decoration: none;
    }
    .login:hover {
        color: var(--primary-alt);
    }
    .main {
        text-align: center;
        color: var(--dark);
        text-decoration: none;
    }
    .main:hover {
        color: var(--primary-alt);
    }
}
</style>