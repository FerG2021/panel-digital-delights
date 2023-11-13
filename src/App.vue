<template>
    <div v-if="!$store.state.auth">
        <div class="login">
            <Login />
        </div>
        <div class="footer">
            <Footer screen="login"></Footer>
        </div>
    </div>
    <div v-else>
        <div class="app">
            <Sidebar />   
            <router-view></router-view>
        </div>
        <div class="footer">
            <Footer screen="main"></Footer>
        </div>
    </div>
</template>

<script>
import Sidebar from './components/Sidebar.vue';
import Login from './views/login/index.vue';
import Footer from './components/Footer.vue';

export default {
	components:{
		Sidebar,
		Login,
		Footer
	} ,
	data() {
		return {
		};
	},

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
