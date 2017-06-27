<template>
    <div class="feedbackList">
        <FeedbackItem v-for="(item,idx) in messages" :message="item" :key="idx" />
    </div>
</template>

<script>
import FeedbackItem from '../fragments/FeedbackItem.vue'

export default {
    props: [
        'messages'
    ],
    components: {
        FeedbackItem
    }
}
</script>

<style>

</style>
