<template>
    <div class="fullwidth graybg padded fixed tableHead">
        <el-tag>{{student && student.student_id}}</el-tag>
        {{ student && student.first_name}} {{ student && student.last_name}}
        <el-tag type="primary">
            <span v-if="isInGlobal">Under Global evaluation</span>
    
        </el-tag>
        <el-button-group class="fixed-right">
            <el-button type="success" size="small" class="toolbar-btn" @click="handleRequestGraduation">
                <fa-icon name="graduation-cap" class="fa-fix"></fa-icon> Graduate</el-button>
            <el-button type="warning" size="small" class="toolbar-btn" @click="handleNextCycle">
                <fa-icon name="recycle" class="fa-fix"></fa-icon> Next cycle</el-button>
            <el-button type="info" size="small" class="toolbar-btn" @click="handleRequestFeedback">
                <fa-icon name="question" class="fa-fix"></fa-icon> Request feedback</el-button>
        </el-button-group>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
    props: ['student'],

    computed: {
        ...mapGetters({
            canGoGlobal: 'instructor_app/evaluations/canGoGlobal',
            isInGlobal: 'instructor_app/evaluations/isInGlobal',
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
