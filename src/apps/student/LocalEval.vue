<template>
    <div class="sheet">
        <div class="header" v-if="student">
            <h3> Local Assessment & Evaluation </h3>
            <p>{{currentCourse && currentCourse.name}}</p>
    
            <div v-if="!localEval">
                <p>Your instructor didn't setup your evaluation sheet, check back soon for recording progress</p>
            </div>
            <div v-else>
                <table style="width: 400px; border: 1px solid #dedede">
                    <tr>
                        <div v-if="localEval.evaluation">
                            <td>
                                <h3>{{localEval.evaluation.name}} </h3>
                            </td>
                            <td>{{ localEval.evaluation.date || moment }} </td>
                        </div>
                        <td v-if="localEval.instructor">Instructor {{ localEval.instructor.username}}</td>
                    </tr>
                </table>
    
                <el-row>
                    <el-col :span="8">
                        <SelectModule :data="modules" :records="records" @select-module="handleSelectModule" />
                    </el-col>
                </el-row>
    
            </div>
    
        </div>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import SelectModule from './components/SelectModule.vue'
export default {
    components: {
        SelectModule
    },
    methods: {
        handleSelectModule(module) {

        }
    },
    computed: {
        records: () => { return this.localEval && this.localEval.records || [] },
        modules: () => { return this.student && this.student.course && this.student.course.modules || [] },
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
