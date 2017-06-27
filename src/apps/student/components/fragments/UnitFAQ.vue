<template>
    <div class="faq" v-if="module">
        <vue-markdown :source="body"></vue-markdown>
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
            // console.log('updating ' + module.name)
            if (module && module.rules) {
                // console.log("module.rules " + module.rules.faq)
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
