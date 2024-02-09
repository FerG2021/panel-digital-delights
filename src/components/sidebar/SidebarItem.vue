<script>
export default {
	props: {
		item: {
			type: Object,
			required: true
		},
		is_expanded: {
			type: Boolean,
			required: true
		}
	}
};
</script>

<template>
	<div>
		<router-link
			class="button"
			:to="item.route"
			v-if="is_expanded"
		>
			<span class="material-icons">{{ item.icon }}</span>
			<span class="text">{{ item.name }}</span>
		</router-link>

		<el-tooltip
			class="box-item"
			effect="dark"
			:content="item.name"
			placement="right-start"
			v-if="!is_expanded"
		>
			<router-link
				class="button"
				:to="item.route"
				v-if="!is_expanded || is_expanded"
			>
				<span class="material-icons">{{ item.icon }}</span>
				<span class="text">{{ item.name }}</span>
			</router-link>
		</el-tooltip>
	</div>
</template>

<style lang="scss" scoped>
aside {
	h3,
	.button .text {
		opacity: 0;
		transition: 0.3s ease-out;
	}

	.menu {
		margin: 0 -1rem;

		.button {
			display: flex;
			align-items: center;
			text-decoration: none;

			padding: 0.5rem 1rem;
			transition: 0.2s ease-out;

			.material-icons {
				font-size: 1.8rem;
				color: var(--light);
				transition: 0.2s ease-out;
			}

			.text {
				color: var(--light);
				transition: 0.2s ease-out;
			}

			&:hover,
			&.router-link-exact-active {
				background-color: var(--dark-alt);

				.material-icons,
				.text {
					color: var(--primary);
				}
			}

			&.router-link-exact-active {
				border-right: 5px solid var(--primary);
			}
		}
	}

	&.is-expanded {
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

	@media (max-width: 768px) {
		position: fixed;
		z-index: 99;
	}

	.logout {
		cursor: pointer;
	}
}
</style>