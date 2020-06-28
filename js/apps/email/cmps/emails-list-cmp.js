import { emailService } from '../services/email-service.js';
import emailPreview from './email-preview-cmp.js';
import emailDetails from './email-details-cmp.js';
import emailCompose from './email-compose-cmp.js';
import { eventBus } from '../../../services/event-bus-service.js';


// <email-compose v-else-if="$route.name === 'drafts'" :emailId="emailId"></email-compose>
export default {
    name: 'emails-list',
    template:
        `<main class="emails-list flex column">
            <section class="filter-container flex mb5">
            <select @change="filterEmails" :ref="'filterEmails'">
            <option value="all">All</option>
            <option value="unread">Unread</option>
            <option value="read">Read</option>
            </select>
            <input class="email-search" @input="onSearch()" :ref="'search'" type="text" placeholder="Search mail"/>
            </section>
            <ul v-if="!emailId || $route.name === 'drafts'">
                <router-link v-for="(email, idx) in emails" :key="idx" :to="$route.name + '/' + email.emailId">
                    <email-preview :email="email"></email-preview>
                </router-link>
            </ul>
            <email-details v-else-if="emailId" :emailId="emailId"></email-details>
            <email-compose v-if="emailId && $route.name === 'drafts'" :emailId="emailId"></email-compose>
            </main>`,
    data() {
        return {
            emails: [],
            emailId: '',

        }
    },
    created() {
        eventBus.$on('updateEmails', () => {
            this.updateEmails()
        })
        this.emailId = this.$route.params.emailId;
        this.updateEmails()
    },
    watch: {
        '$route'(to, from) {
            this.emailId = this.$route.params.emailId;
            this.updateEmails()
        }
    },
    methods: {
        updateEmails() {
            return this.emails = emailService.query(this.$route.name)
            .then(emails => this.emails = emails);
        },
        filterEmails() {
            this.updateEmails()
            .then(emails => {
                this.emails = emails
                if (this.$refs['filterEmails'].value === 'all') return
                const byStatus = this.$refs['filterEmails'].value
                emailService.getEmailsbyReadingStatus(byStatus, this.emails)
                    .then(emails => this.emails = emails)
            })
        },
        onSearch() {
            this.updateEmails()
            .then(emails => emailService.getEmails(this.$refs.search.value, emails)
            .then(emails => this.emails = emails));
        }
    },
    components: {
        emailPreview,
        emailDetails,
        emailCompose
    }
}