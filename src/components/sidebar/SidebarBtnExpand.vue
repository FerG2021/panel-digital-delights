<script>
export default {
	data() {
		return { is_expanded: false };
	},

	methods: {
		toggleMenu() {
			this.is_expanded = !this.is_expanded;
			this.$emit('expandSidebar', this.is_expanded);
		}
	}
};
</script>

<template>
	<div
		class="menu-toggle-wrap"
		:class="`${is_expanded && 'is-expanded'}`"
	>
		<button class="menu-toggle">
			<span
				class="material-icons"
				@click="toggleMenu()"
			>
				keyboard_double_arrow_right
			</span>
		</button>
	</div>
</template>

<style lang="scss" scoped>
	.menu-toggle-wrap {
		display: flex;
		justify-content: flex-end;
		margin-bottom: 1rem;

		position: relative;
		top: 0;
		transition: 0.2s ease-out;

		.menu-toggle {
			transition: 0.2s ease-out;

			.material-icons {
				font-size: 2rem;
				color: var(--light);
				transition: 0.2s ease-out;
			}

			&:hover {
				.material-icons {
					color: var(--primary);
					transform: translateX(0.5rem);
				}
			}
		}
	}

	.is-expanded {
		padding-right: 20px;
		width: var(--sidebar-width);

		.menu-toggle-wrap {
			top: -3rem;
			.menu-toggle {
			transform: rotate(-180deg);
			}
		}

		h3,
			.button .text {
				opacity: 1;
			}

		h3 {
			color: var(--grey);
			font-size: 0.875rem;
			margin-bottom: 0.5rem;
			text-transform: uppercase;
		}

		.button {
			.material-icons {
				margin-right: 1rem;
			}
		}
	}
</style>