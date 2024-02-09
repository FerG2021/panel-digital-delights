<script>
export default {
	name: 'TitleComponent',
	props: {
		title: {
			type: String,
			required: true
		}
	}
};
</script>

<template>
	<h1>
		{{ title }}
	</h1>
</template>

<style scoped>
    h1 {
        margin-top: 20px;
        margin-left: 20px;
    }
</style>