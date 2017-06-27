<template>
    <div class="sheet">
        <div class="header" v-if="student">
            <h3> Weekly progress </h3>
            <p>{{currentCourse && currentCourse.name}}</p>
    
            <div v-if="!localEval">
                <p>Your instructor didn't setup your evaluation sheet, check back soon for recording progress</p>
            </div>
            <div v-else>
                <div v-if="localEval.evaluation">
                    <h3>{{localEval.evaluation.name}} {{ localEval.evaluation.date || moment }} </h3>
                </div>
                <p v-if="localEval.instructor">Instructor {{ localEval.instructor.username}}</p>
            </div>
    
        </div>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
    computed: {
        ...mapGetters({
            currentCourse: 'currentCourse',
            localEval: 'student_app/localEval',
            student: 'student_app/student'
        })
    }
}
</script>

<style>
.sheet {
    padding: 24px;
}
</style>
