<template>
    <div class="tasks task-description">
        <div v-for="(task,idx) in tasks" :key="task.name">
            <h4> Task: {{task.name}} </h4>
            <div>
                <vue-markdown :source="task.description"></vue-markdown>
            </div>
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

.task-description {
    padding-left: 12px;
    padding-top: 3px;
    padding-bottom: 3px;
    margin-left: 20px;
    background-color: #fafaf7;
}
</style>
