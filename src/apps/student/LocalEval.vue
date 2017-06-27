<template>
    <div class="sheet">
        <div class="header" v-if="student">
            <h3> Local Assessment & Evaluation </h3>
            <p>{{currentCourse && currentCourse.name}}</p>
    
            <div v-if="!localEval">
                <p>Your instructor didn't setup your evaluation sheet, check back soon for recording progress</p>
            </div>
            <div v-else>
    
                <el-row :gutter="24">
                    <el-col :span="6">
                        <table class="module-list-header">
                            <tr>
                                <div v-if="localEval.evaluation">
                                    <td>
                                        <h3>{{localEval.evaluation.name}} </h3>
                                    </td>
                                    <td>{{ localEval.evaluation.date || moment }} </td>
                                </div>
                                <td v-if="localEval.instructor">
                                    <strong>Instructor</strong> {{ localEval.instructor.username}}</td>
                            </tr>
                        </table>
                        <SelectModule :data="modules" :records="records" @select-module="handleSelectModule" />
                    </el-col>
                    <el-col :span="16">
                        <UnitPage v-if="module && record" :module="module" :record="record" :readonly="isReadOnly" :global="false" @refresh="">
                        </UnitPage>
                    </el-col>
                </el-row>
    
            </div>
    
        </div>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import SelectModule from './components/SelectModule.vue'
import UnitPage from './components/UnitPage.vue'
export default {
    components: {
        SelectModule,
        UnitPage
    },
    methods: {
        handleSelectModule({ module, record }) {
            // this.$notify({ title: 'Success', message: module.id })
            this.selectModule({ module, record })
        },
        ...mapActions({
            'selectModule': 'student_app/selectModule'
        }),
    },
    computed: {
        isReadOnly() {
            // debugger
            if (this.student && (this.student.graduated || this.student.nextCycle || this.student.dropped)) return true
            if (this.record && this.record.completed) return true
            return false
        },
        ...mapGetters({
            module: 'student_app/selectedModule',
            record: 'student_app/selectedRecord',
            modules: 'student_app/courseModules',
            currentCourse: 'currentCourse',
            localEval: 'student_app/localEval',
            records: 'student_app/localEvalRecords',
            student: 'student_app/student'
        })
    }
}
</script>

<style>
.sheet {
    padding: 24px;
}

.module-list-header {
    padding: 0;
    margin: 0;
    width: 100%;
    border-top: 1px solid #dedede;
    border-left: 1px solid #dedede;
    border-right: 1px solid #dedede;
    background-color: #feeeee;
}

.module-list-header td {
    padding-left: 12px;
}
</style>
