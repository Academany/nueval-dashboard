<template>
    <div class="tasks">
        <div v-for="(task,idx) in tasks" :key="task.name">
            <h4> Task: {{task.name}} </h4>
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
    computed: {
        tasks() {
            if (this.module && this.module.rules) {
                return this.module.rules.tasks
            }
            return []
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
