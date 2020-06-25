import { emailService } from '../services/email-service.js';
// Consider decluttering email-folders duplicates using passage of folderType property

export default {
    name: 'email-app',
    template:
        `<main>
            <header>Insert header component here</header>
            <section>
                <router-link to="/email/inbox">Inbox</router-link>  
                <router-link to="/email/starred">Starred</router-link> 
                <router-link to="/email/sent">Sent</router-link> 
                <router-link to="/email/drafts">Drafts</router-link> 
                <router-link to="/email/deleted">Deleted</router-link> 
                <router-link to="/email/all">All Mail</router-link> 
            </section>
            <router-view />
        </main>`,
    data() {
        return {
            emails: null
        }
    },
    created() {
        emailService.query()
            .then(emails => this.emails = emails);
    },
}