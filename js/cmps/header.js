import { eventBus } from '../services/event-bus-service.js';
export default {
    name: 'main-header',
    template:
        `<main class="main-header">
        <div class="flex space-between">
        <div class="flex align-center" v-if="pagePath === 'keep'">
        <img class="keep" src="./img/icons/keep.svg" alt="">
        <h2 class="color-grey fw500">Keep</h2>
        </div>
        <div class="flex align-center" v-if="pagePath === 'email'">
        <i class="hamburger fas fa-bars" @click="openCloseHamburger"></i>
        <img class="email" src="./img/icons/email.svg" alt="">
            <h2 class="color-grey fw500">Email</h2>
            </div>
            <router-link to="/" class="flex align-center"><h4 class="secondary-logo" title="Back to Homepage">Appsus</h4></router-link>
            <router-link to="/keep" class="flex align-center " v-if="pagePath === 'email'" title="Go to Keep">
                <img class="keep keep-display" src="./img/icons/keep.svg" alt="">
            </router-link> 
            <router-link to="/email" class="flex align-center" v-if="pagePath === 'keep'" title="Go to Email">
                <img class="email email-display" src="./img/icons/email.svg" alt="">
            </router-link> 
        </div>
            </main>`,
    data() {
        return {
            pagePath: '',
        }
    },
    methods:{
        openCloseHamburger(){
            this.$emit('changeHamburger')
        }
    },
    created() {
        (this.$route.path.includes('email')) ? this.pagePath = 'email' : this.pagePath = 'keep'
    }
}
