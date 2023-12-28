<template>
    <div v-if="!auth">
        <div class="login">
            <Login />
        </div>
        <div class="footer">
            <FooterComponent screen="login"></FooterComponent>
        </div>
    </div>
    <div v-else>
        <div v-if="loaded">
             <div class="app">
                <Sidebar />   
                <router-view></router-view>
            </div>
            <div class="footer">
                <FooterComponent screen="main"></FooterComponent>
            </div>
        </div>
    </div>
</template>

<script>
import Sidebar from './components/sidebar/Sidebar.vue';
import Login from './components/login/Login.vue';
import FooterComponent from './components/Footer.vue';
import { mapGetters, mapActions } from 'vuex';

export default {
	components:{
		Sidebar,
		Login,
		FooterComponent
	},
	computed: {
		...mapGetters('UsersStore', ['user', 'auth', 'loaded']),
		...mapActions('UsersStore', ['getUser']),
	}
};
</script>

<style lang="scss">
    @import url('./assets/colors.css');

    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        font-family: 'Poppins', sans-serif;

    }

    body {
        background: var(--light);
    }

    button {
        cursor: pointer;
        appearance: none;
        border: none;
        outline: none;
        background: none;
    }

    .login {
        height: 97vh !important;
    }

    .app {
        display: flex;
        height: 97vh !important;
        main{
            flex: 1 1 0;
            padding: 2rem;

            @media (max-width: 768px){
                padding-left: 6rem;
            }
        }
    }
</style>
