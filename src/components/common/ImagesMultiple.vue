<script>
export default {
	props: {
		images: {
			type: Array,
			required: true
		}
	},
	data() {
		return {
			openGalleria: false,
			imagesGalleria: null,
			responsiveOptions: [
				{
					breakpoint: '1500px',
					numVisible: 5
				},
				{
					breakpoint: '1024px',
					numVisible: 3
				},
				{
					breakpoint: '768px',
					numVisible: 2
				},
				{
					breakpoint: '560px',
					numVisible: 1
				}
			]
		};
	},
	computed: {
		firstImage() {
			return this.images[0];
		}
	},
	methods: {
		clickOpenImages() {
			this.openGalleria = true;
		}
	}
};
</script>

<template>
	<div>
		<Image
			:src="firstImage"
			alt="Image"
			class="image"
			width="50"
			imageStyle="border-radius: 8px; box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);padding: 3px; width: 50%"
			@click="clickOpenImages(item)"
		/>
		<Galleria
			v-model:visible="openGalleria"
			:value="images"
			:responsiveOptions="responsiveOptions"
			:numVisible="9"
			containerStyle="max-width: 50%"
			:circular="true"
			:fullScreen="true"
			:showItemNavigators="true"
		>
			<template #item="slotProps">
				<img
					:src="slotProps.item"
					:alt="slotProps.item"
					style="width: 100%; max-height: 95vh; display: block"
				/>
			</template>
			<template #thumbnail="slotProps">
				<img
					:src="slotProps.item"
					:alt="slotProps.item"
					style="display: block; height: 5vh"
				/>
			</template>
		</Galleria>
	</div>
</template>

<style lang="scss" scoped>
.image {
	&:hover {
		cursor: pointer;
	}
}
</style>