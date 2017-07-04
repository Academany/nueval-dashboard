<template>
    <div class="fullwidth graybg padded fixed tableHead">
        <el-button v-if="student && student.lab" type="primary" size="mini">
    
            <span>
                <fa-icon name="flask" class="fa-fix"></fa-icon>
                <small>
                    {{student.lab.name}}
                </small>
            </span>
    
        </el-button>
        <el-tag>{{student && student.student_id}}</el-tag>
        {{ student && student.first_name}} {{ student && student.last_name}}
        <el-tag type="primary">
            <span v-if="isDropped">Dropped out</span>
            <span v-if="isGraduated">Graduated!</span>
            <span v-else-if="isRecycled">Next Cycle</span>
            <span v-else-if="isInGlobal">Under Global evaluation</span>
            <span v-else-if="canGoGlobal && !isInGlobal">Ready for local evaluation</span>
            <span v-else="!canGoGlobal && !isInGlobal">Under local evaluation</span>
        </el-tag>
        <el-tag type="danger" v-if="waitingFeedback">
            <span>Waiting for feedback</span>
        </el-tag>
        <el-button-group class="fixed-right">
            <el-button type="primary" size="small" :disabled="isGraduated || isRecycled || waitingFeedback" class="toolbar-btn" @click="handleRequestFeedback">
                <fa-icon name="exclamation-triangle" class="fa-fix"></fa-icon> Waiting for feedback</el-button>
            <el-button type="success" size="small" :disabled="!canGraduate || isGraduated" class="toolbar-btn" @click="handleRequestGraduation">
                <fa-icon name="graduation-cap" class="fa-fix"></fa-icon> Graduate</el-button>
            <el-button type="warning" size="small" :disabled="isGraduated || isRecycled" class="toolbar-btn" @click="handleNextCycle">
                <fa-icon name="recycle" class="fa-fix"></fa-icon> Next cycle</el-button>
        </el-button-group>
    </div>
</template>

<script>
/**
   <!--<el-button type="info" size="small" class="toolbar-btn" @click="handleRequestFeedback">
                <fa-icon name="question" class="fa-fix"></fa-icon> Request feedback</el-button>-->

**/
import { mapGetters } from 'vuex'
export default {
    props: ['student'],

    computed: {
        ...mapGetters({
            isDropped: 'instructor_app/evaluations/isDropped',
            isRecycled: 'instructor_app/evaluations/isRecycled',
            isGraduated: 'instructor_app/evaluations/isGraduated',
            canGraduate: 'instructor_app/evaluations/canGraduate',
            canGoGlobal: 'instructor_app/evaluations/canGoGlobal',
            isInGlobal: 'instructor_app/evaluations/isInGlobal',
            waitingFeedback: 'instructor_app/evaluations/waitingFeedback'
        })
    },
    methods: {
        handleRequestGraduation() {
            this.$emit('action', 'requestGraduation')
        },
        handleRequestFeedback() {
            this.$emit('action', 'requestFeedback')
        },
        handleNextCycle() {
            this.$emit('action', 'nextCycle')
        }
    }
}
</script>

<style scoped>
.tableHead {
    /*border: 1px solid #dedede;*/
}

.toolbar-btn {
    min-height: 32px;
}

.fixed-right {
    position: fixed;
    right: 12px;
    top: 132px;
    width: auto;
}

.fa-fix {
    margin-bottom: -4px;
}
</style>
