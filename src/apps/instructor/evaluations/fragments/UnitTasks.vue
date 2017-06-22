<template>
    <div class="tasks">
        <div v-for="(task,idx) in tasks()" :key="idx">
            <h4>
                Task: {{task.name}} </h4>
            <vue-markdown>{{task.description}}</vue-markdown>
        </div>
    </div>
</template>

<script>
import VueMarkdown from 'vue-markdown'

export default {
    components: {
        VueMarkdown
    },
    methods: {
        tasks() {
            return this.module && this.module.rules && this.module.rules.tasks || []
        }
    },
    props: [
        'module'
    ]
}
</script>

<style scoped>
.tasks {}
</style>
