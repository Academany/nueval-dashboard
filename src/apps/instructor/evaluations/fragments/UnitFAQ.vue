<template>
    <div class="faq">
        <vue-markdown v-if="body">{{body}}</vue-markdown>
    </div>
</template>

<script>
import VueMarkdown from 'vue-markdown'

export default {
    components: {
        VueMarkdown
    },
    props: [
        'module'
    ],
    computed: {
        body() {
            const module = this.module || {}
            if (module && module.rules && module.rules.faq) {
                return module.rules.faq
            } else {
                return 'Not available yet'
            }
        }
    }
}
</script>

<style scoped>
.faq {
    font-size: 80%;
}
</style>
