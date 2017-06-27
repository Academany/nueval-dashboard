<template>
    <div class="sheet">
        <div class="header" v-if="student">
            <h3>Feedback</h3>
    
            <div v-if="!progress">
                <p>Your instructor didn't start evaluating your work, check back soon for more progress</p>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
    computed: {
        ...mapGetters({
            student: 'student_app/student',
            progress: 'student_app/progress',
        })
    }
}
</script>

<style>
.sheet {
    padding: 24px;
}
</style>
