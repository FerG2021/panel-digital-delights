<template>
    <h3 class="title-modal">
        <span 
			:class="header.class"
		>
			{{ header.icon }}
		</span> 
        {{ header.headerName }}
    </h3>
</template>

<script>
export default {
	props: {
		header: {
			type: Object,
			required: true,
		},
	},
};
</script>

<style>
.title-modal {
    margin: 0px;
}
</style>