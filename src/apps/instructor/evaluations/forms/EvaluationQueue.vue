<template>
    <el-form labelPosition="top" class="static">
    
        <el-form-item label="Session" prop="session">
    
            <el-select v-model="session" placeholder="Session" style="width:100%" @change="handleSessionChange">
                <el-option v-for="item in evaluations" v-if="item.kind === 'global'" :key="item.name" :label="item.name + ' ' + item.date" :value="item">
                </el-option>
            </el-select>
    
        </el-form-item>
        <el-form-item label="Filter" prop="filter">
    
            <el-select v-model="filter" placeholder="Filter by" style="width:100%" @change="handleFilterChange">
                <el-option v-for="item in filters" :key="item.name" :label="item.name" :value="item.value">
                </el-option>
            </el-select>
    
        </el-form-item>
        <el-form-item label="Students">
            <el-table border :show-header="false" highlight-current-row ref="studentsTable" @current-change="handleStudentChange" :data="students" style="width: 100%">
                <el-table-column>
                    <template scope="scope">
                        {{scope.row.student_id }} - {{scope.row.first_name}} {{scope.row.last_name}}
                        <fa-icon class="fa-fix" name="star" v-if="scope.row.graduated" />
                    </template>
                </el-table-column>
            </el-table>
        </el-form-item>
    </el-form>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
    methods: {
        handleFilterChange(val) {
            this.filter = val
        },
        handleStudentChange(val) {
            this.student = val
            this.$emit('select', val)
        },
        handleSessionChange(val) {
            this.selectEvaluation(val)
            this.student = null
            this.filter = 'assigned'
            this.session = val
        },
        selectFirst(val) {
            if (val && val.length > 0) {
                const globals = val.filter((e) => e.kind === 'global')
                if (globals && globals.length > 0) {
                    this.selectEvaluation(globals[0])
                    this.session = globals[0]
                    this.student = null
                    this.filter = 'assigned'
                }
            }
        },
        ...mapActions({
            'selectEvaluation': 'instructor_app/evaluations/selectEvaluation'
        })
    },
    watch: {
        evaluations: function (val) {
            this.$nextTick(() => {
                this.selectFirst(val)
            })
        }
    },
    mounted() {
        this.$nextTick(() => {
            if (this.evaluations) {
                this.selectFirst(this.evaluations)
            }
        })
    },
    data() {
        return {
            session: null,
            // students: [{ first_name: "fiore", last_name: "basile", student_id: '666' }],
            student: null,
            filter: 'assigned',
            filters: [
                { 'name': 'Assigned', 'value': 'assigned' },
                { 'name': 'In Progress', 'value': 'progress' },
                { 'name': 'Next cycle', 'value': 'nextCycle' },
                { 'name': 'Completed', 'value': 'completed' }
            ]
        }
    },

    computed: {
        students: function () {
            if (this.instructor && this.currentEvaluation) {
                const queue = this.studentsQueue(this.instructor) || {}
                // console.log(queue)
                const filter = this.filter
                let results = queue[this.currentEvaluation.name] || []
                if (filter === 'assigned') {
                }
                if (filter === 'nextCycle') {
                    results = results.filter((s) => { return s.continuing === true })
                }
                if (filter === 'progress') {
                    results = results.filter((s) => { return !(!!s.graduated && !!s.continuing) })
                }
                if (filter === 'completed') {
                    results = results.filter((s) => { return s.graduated === true })
                }
                return results
            }
            return []
        },
        ...mapGetters({
            instructor: 'instructor_app/instructor',
            currentEvaluation: 'instructor_app/evaluations/currentEvaluation',
            evaluations: 'instructor_app/evaluations/evaluations',
            studentsQueue: 'instructor_app/evaluations/studentsQueue'
        })
    }
}
</script>

<style scoped>
.fa-fix {
    margin-bottom: -4px;
    color: #ffcc00;
}
</style>
