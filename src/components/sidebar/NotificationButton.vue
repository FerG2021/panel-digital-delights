<script>
import { mapGetters } from 'vuex';

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
	},
	computed: {
		...mapGetters('NotificationsStore', ['notifications']),
		notificationsTitle() {
			return this.$t('notifications');
		},
		notificationsLength() {
			return this.notifications ? this.notifications.filter(notification => notification.read === 0).length : null;
		}
	},
	methods: {
		clickNotificationButton() {
			return this.$router.replace(this.item.route);
		}
	}
};
</script>

<template>
	<router-link
		class="button"
		:to="item.route"
		v-if="is_expanded"
	>
		<i
			v-badge="notificationsLength"
			class="pi pi-bell material-icons"
			style="font-size: 1.5rem"
			severity="success"
		/>
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
			<i
				v-badge="notificationsLength"
				class="pi pi-bell material-icons"
				style="font-size: 1.5rem"
			/>
		</router-link>
	</el-tooltip>
</template>

<style lang="scss" scoped>
aside {
  display: flex;
  top: 0;
  flex-direction: column;
  width: calc(2rem + 32px);
  min-height: 100vh;
  overflow: hidden;
  padding: 1rem;

  background-color: var(--dark);
  color: var(--light);

  transition: 0.2s ease-out;

  .button {
	height: 5.5vh;
  }

  .button {
	&:hover {
		color: var(--primary);
	}
  }

  .flex {
    flex: 1 1 0;
  }

  .logo {
    margin-bottom: 1rem;
    img {
      width: 2rem;
      height: 2rem;
    }
  }

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
        font-size: 1.5rem;
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
		align-items: center;
        font-size: 1.5rem;
        color: var(--light);
        transition: 0.2s ease-out;
      }

      .text {
        color: var(--light);
        transition: 0.2s ease-out;
		margin-left: 20px;
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