<script>
import { mapGetters } from 'vuex';

import Store from '../../managers/store/store';

export default {
	name: 'LogOut',
	computed: { ...mapGetters('UsersStore', ['modules']) },
	methods: {
		async logout() {
			this.clearStores();
			await this.$store.dispatch('UsersStore/logout');

			return this.$router.replace('/login');
		},

		clearStores() {
			for (const module of this.modules) {
				if (module.store) {
					Store.commit(`${module.componentName}Store/clearStore`);
				}
			}
		}
	}
};
</script>

<template>
	<div class="button logout" v-if="is_expanded" @click="logout()">
		<span @click="logout()">
			<i class="pi pi-sign-out material-icons"></i>
		</span>
		<span class="text">{{ $t("logout") }}</span>
	</div>

	<el-tooltip
		class="box-item"
		effect="dark"
		content="Salir"
		placement="right-start"
		v-if="!is_expanded"
	>
		<div class="button logout" @click="logout()">
			<span>
				<i class="pi pi-sign-out material-icons"></i>
			</span>
			<span class="text">{{ $t("logout") }}</span>
		</div>
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