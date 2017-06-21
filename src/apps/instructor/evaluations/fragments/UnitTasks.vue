<template>
    <div class="tasks">
        <div v-for="(task,idx) in module.rules.tasks" :key="idx">
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
    props: [
        'module'
    ]
}
</script>

<style scoped>
.tasks {}
</style>
