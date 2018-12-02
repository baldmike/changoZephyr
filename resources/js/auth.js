import axios from 'axios'
import store from './store'
// import Echo from "laravel-echo"

export default class Auth {
    constructor() {
        if (store.state.token) {
            axios.defaults.headers.common['Authorization'] = 'Bearer ' + store.state.token;
        }
    }

    setAuthToken(token) {
        let tokenIsSet = axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
        console.log("[auth.js]-setAuthToken: " + tokenIsSet)
    }

    // completes the login
    login(token, user) {

        console.debug('[auth.js] - login - token:' + token);
        console.log('[auth.js] - login - token:' + token + "*****************************");

        let userData = JSON.stringify(user)
        // window.localStorage.setItem('token', token)
        // window.localStorage.setItem('user', userData)

        store.dispatch('setLoginCred', {
            token: token,
            user: user
        });
    }

    // checks for login status
    check() {
        return !!store.state.token;
    }

    // log out the user
    logout(router) {
        let myUser = JSON.parse(window.localStorage.getItem('user'));
        if(myUser) { console.log(myUser.id); } else { console.log('user not in local storage'); }

        api.call("post", "/api/logout").then((userData) => {

            window.localStorage.removeItem('token');
            window.localStorage.removeItem('user');
            // EventBus.$emit('logout', {});
            this.$store.commit('logout');

            router.push({ name: 'login' });

        })
    }
}