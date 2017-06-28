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
    
        <el-tag type="primary" size="mini">
            <span v-if="dropped">Dropped out</span>
            <span v-else-if="isGraduated">Graduated!</span>
            <span v-else-if="nextCycle">Next Cycle</span>
            <span v-else-if="isInGlobal">Under Global evaluation</span>
            <span v-else-if="canGoGlobal && !isInGlobal">Ready for local evaluation</span>
            <span v-else="!canGoGlobal && !isInGlobal">Under local evaluation</span>
        </el-tag>
    
        <el-button-group class="fixed-right">
    
            <el-button type="success" size="small" :disabled="!canGoGlobal || dropped || nextCycle || isInGlobal" @click="handleRequestEval">
                <fa-icon name="send" class="fa-fix"></fa-icon> Request Global Evaluation</el-button>
            <el-button type="danger" size="small" :disabled="nextCycle || dropped || isInGlobal" @click="handleCancelStudent">
                <fa-icon name="sign-out" class="fa-fix"></fa-icon> Dropped out</el-button>
            <el-button type="warning" size="small" :disabled="nextCycle || dropped || isInGlobal" @click="handleNextCycle">
                <fa-icon name="recycle" class="fa-fix"></fa-icon> Next cycle</el-button>
    
        </el-button-group>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
    props: ['student'],

    computed: {
        ...mapGetters({
            dropped: 'instructor_app/evaluations/isDropped',
            nextCycle: 'instructor_app/evaluations/isRecycled',
            canGoGlobal: 'instructor_app/evaluations/canGoGlobal',
            isInGlobal: 'instructor_app/evaluations/isInGlobal',
            isGraduated: 'instructor_app/evaluations/isGraduated',
        })
    },
    methods: {
        handleRequestEval() {
            this.$emit('action', 'requestEval')
        },
        handleCancelStudent() {
            this.$emit('action', 'cancelStudent')
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

.fixed-right {
    position: fixed;
    right: 12px;
    top: 134px;
    width: auto;
}

.fa-fix {
    margin-bottom: -4px;
}

.lab-name {
    float: right;
}
</style>
