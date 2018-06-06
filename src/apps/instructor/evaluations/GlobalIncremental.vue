<template>
    <div class="sheet">
        <el-row class="fullheight">
            <el-col :span="4" class="topPad leftPad rightPad tealbg fullheight selector">
                <!--<SelectStudent :labs="labs" :lab="lab" :students="tableData" @select="handleSelectStudent" />-->
                <EvaluationQueue :students="[]" @select="handleSelectStudent" />
            </el-col>
            <el-col :span="20" ref="scrollable" class="fullheight vscroll detail" v-loading="loading">
                <TableHeadGlobal v-if="currentStudent" :student="currentStudent" @action="handleAction" />
                <el-tabs v-if="currentStudent" v-model="activeName" class="tabs" @tabClick="handleClick">
                    <el-tab-pane label=" Overall progress " name="general">
                        <TabGeneral :evaluations="overallProgress " @showDetails="handleDetails" />
                    </el-tab-pane>
                    <el-tab-pane label=" Student Records " name="finalproject">
                        <TabFinalProject :student="currentStudent">
                        </TabFinalProject>
                    </el-tab-pane>
                    <el-tab-pane v-for="session in overallProgress " :key="session.id " :name="session.id"
                    :label="`${session.evaluation.name} ${session.evaluation.date} ${session.completed ? '- ok' : ''}` ">
                        <TabGlobalEvaluation v-if="isGlobal(session)" :session="session" @prepareStudent="handleSetup" :modules="sortedModules" @updateModule="handleUpdateModule" />
                        <TabEvaluation v-if="!isGlobal(session)" :session="session" :modules="currentCourse.modules" @updateModule="handleUpdateModule" />
                    </el-tab-pane>
                </el-tabs>
            </el-col>
        </el-row>
        <!--<SelectSessionDialog :visible="dialogVisible" :sessions="evaluations" @cancel="dialogVisible=false" @confirm="handleSelectSession" />-->
    </div>
</template>
<script>
//   <el-tabs v-model="activeName" @tab-click="handleClick" class="tabs">
//         <el-tab-pane label="Overall progress" name="general">
//             <TabGeneral/>
//         </el-tab-pane>
//         <el-tab-pane label="Local Evaluation" name="local">
//             <TabEvaluation :modules="modulesData" />
//         </el-tab-pane>
//         <el-tab-pane label="Global Evaluation #1" name="global1">
//             <TabEvaluation :modules="modulesData" />
//         </el-tab-pane>
//     </el-tabs>

import { mapGetters, mapActions } from 'vuex'
// import TableHead from './fragments/TableHead.vue'
import TableHeadGlobal from './fragments/TableHeadGlobal.vue'
import TabEvaluation from './tabs/TabEvaluation.vue'
import TabGlobalEvaluation from './tabs/TabGlobalEvaluation.vue'
import TabGeneral from './tabs/TabGeneral.vue'
// import SelectSessionDialog from './fragments/SelectSessionDialog.vue'
import EvaluationQueue from './forms/EvaluationQueue.vue'
import TabFinalProject from './tabs/TabFinalProject.vue'

export default {
    data() {
        return {
            lab: null,
            currentRow: null,
            activeName: 'general',
            dialogVisible: false
        }
    },
    components: {
        EvaluationQueue,
        TableHeadGlobal,
        TabEvaluation,
        TabGeneral,
        TabGlobalEvaluation,
        TabFinalProject
        // SelectSessionDialog
    },
    methods: {
        isGlobal(session) {
            if (session && session.evaluation && session.evaluation.kind === 'global')
                return true
            return false
        },
        handleAction(actionName) {
            if (actionName === 'requestGraduation') {
                const vm = this
                this.$confirm('Do you really want to graduate this student?', 'Confirm', {
                    confirmButtonText: 'OK',
                    cancelButtonText: 'Cancel',
                    type: 'danger'
                }).then(() => {

                    vm.$confirm('Did she/he ever use glue? Does she/he know how to mute? Do you really really want to graduate this student?', 'Confirm', {
                        confirmButtonText: 'Long life to the new guru!',
                        cancelButtonText: 'Let me think about it',
                        type: 'danger'
                    }).then(() => {
                        this.requestGraduation()
                    })
                })
            } else if (actionName === 'requestConditionalGraduation') {
                const vm = this
                vm.$confirm('Do you want to graduate this student under condition?', 'Confirm', {
                confirmButtonText: 'Long life to the new guru!',
                cancelButtonText: 'No, not yet',
                type: 'danger'
              }).then(()=> {
                this.requestConditionalGraduation()
              })
            } else if (actionName === 'requestFeedback') {
                const vm = this
                vm.$confirm('Do you want to flag that you are waiting for feedback by the student?', 'Confirm', {
                    confirmButtonText: 'OK',
                    cancelButtonText: 'Cancel',
                    type: 'danger'
                }).then(() => {
                    this.requestFeedback().then((success) => {
                        this.$notify({ title: "Success", message: "Waiting for Feedback flag set" })
                    })
                })
            } else if (actionName === 'nextCycle') {
                const vm = this
                vm.$confirm('Do you want to finish evaluation and send this student to next cycle?', 'Confirm', {
                    confirmButtonText: 'OK',
                    cancelButtonText: 'Cancel',
                    type: 'danger'
                }).then(() => {
                    this.nextCycle().then((success) => {
                        this.$notify({ title: "Success", message: "Operation completed" })
                    })
                })
            }
        },
        requestGraduation() {
            this.graduateStudent().then((success) => {
                this.$notify({ title: "Congratulations!", message: "The student successfully graduated" })
            }).catch((error) => {
               // console.log(error)
                this.$notify({ title: "Error", message: "Something wrong happened, please reload and try again" })
            })

        },
        requestConditionalGraduation(){
          this.graduateStudentConditional().then((success)=>{
            this.$notify({ title: "Congratulations!", message: "The student successfully graduated" })
          }).catch((error) => {
          //  console.log(error)
            this.$notify({ title: "Error", message: "Something wrong happened, please reload and try again" })
          })
        },
        handleDetails(session) {
            // alert('Details!')
            this.activeName = session.id
        },
        setCurrent(row) {
            this.$refs.studentsTable.setCurrentRow(row);
        },
        handleSelectStudent(student) {
            // alert('select student ' + student.student_id)
            this.selectStudent(student)
            this.activeName = 'general'
        },
        handleCurrentChange(val) {
            this.currentRow = val
        },
        handleClick(tab, event) {
            //console.log(tab, event)
        },
        handleModuleChange(val) {

        },
        handleSelectSession(val) {
            // this.dialogVisible = false;
            // this.bookStudent(
            //     {
            //         session: val.session,
            //         student: this.currentStudent
            //     })
            //     .then((success) => {
            //         this.$notify({
            //             title: "Success",
            //             message: "Student booked successfully"
            //         })

            //     })
            //     .catch((error) => {
            //         this.$notify({
            //             title: "Error",
            //             message: "Unable to book student:\n " + JSON.stringify(error)
            //         })
            //     })
        },
        handleUpdateModule({ module, record }) {
            // debugger
            this.syncProgress({ module, record })
        },
        handleSetup(session) {
            if (!session) return
            this.prepareGlobalEvaluation(session).then((success) => {
                this.selectStudent(this.currentStudent)
            }).catch((error) => {
                this.$notify({
                    title: "Error",
                    message: "Unable to setup student:\n " + JSON.stringify(error)
                })
            })
            //     sessionId: this.e
            //     student_id: this.currentStudent.id,
            //     instructor_id: this.instructor.id
            // }).then((succes) => {
            //     this.selectStudent(this.currentStudent)
            // }).catch((error) => {
            //     this.$notify({
            //         title: "Error",
            //         message: "Unable to setup student:\n " + JSON.stringify(error)
            //     })
        },
        ...mapActions({
            'requestFeedback': 'instructor_app/evaluations/requestFeedback',
            'graduateStudent': 'instructor_app/evaluations/graduateStudent',
            'graduateStudentConditional': 'instructor_app/evaluations/graduateStudentConditional',
            'nextCycle': 'instructor_app/evaluations/nextCycle',
            'bookStudent': 'instructor_app/evaluations/bookStudent',
            'selectStudent': 'instructor_app/evaluations/selectStudent',
            'loadEvaluations': 'instructor_app/evaluations/loadEvaluations',
            'prepareGlobalEvaluation': 'instructor_app/evaluations/prepareGlobalEvaluation',
            // 'prepareLocalEvaluation': 'instructor_app/evaluations/prepareLocalEvaluation',
            'syncProgress': 'instructor_app/evaluations/syncProgress'
        })
    },
    mounted() {
        if (this.currentCourse) {
            this.loadEvaluations(this.currentCourse.id)
            this.selectStudent(null)
        }

    },
    computed: {
      sortedModules(){

        const mods = this.currentCourse.modules
        return mods.sort((a,b)=>{
          a = new Date(a.date)
          b = new Date(b.date)
          return a>b ? 1 : a<b ? -1 : 0;
        })
      },
        tableData() {
            const stud = this.labStudents(this.lab) || []
            // debugger
            return stud.map((s) => {
                return { desc: s.student_id + '. ' + s.first_name + ' ' + s.last_name }
            })
        },
        modulesData() {
            if (!this.currentCourse) return []
            // debugger
            const mods = this.currentCourse.modules || []
            return mods.map((m, idx) => {
                return { idx: idx + 1, name: m.name, id: m.id }
            })
        },
        ...mapGetters({
            'loading': 'instructor_app/evaluations/loading',
            'instructor': 'instructor_app/instructor',
            'labs': 'instructor_app/labs',
            'evaluations': 'instructor_app/evaluations/evaluations',
            'needsSetup': 'instructor_app/evaluations/needsSetup',
            'labStudents': 'instructor_app/labStudents',
            'currentCourse': 'instructor_app/currentCourse',
            'currentStudent': 'instructor_app/evaluations/currentStudent',
            'overallProgress': 'instructor_app/evaluations/overallProgress'
        })
    }
}
</script>
<style scoped>
.sheet {
    /*margin-left: 24px;*/
    /*margin-top: 24px;*/
}

.topPad {
    padding-top: 12px;
    /*margin-left: 5px;*/
    padding-left: 12px;
}

.leftPad {
    padding-left: 12px;
}

.bottomMargin {
    margin-bottom: 12px;
}

.rightPad {
    padding-right: 12px;
}

.fullheight {
    height: calc(100vh - 120px);
}

.graybg {
    background: #eef1f6;
}

.fullwidth {
    width: 100%;
}

.fixed {
    position: fixed;
    z-index: 99;
}

.static {
    position: static;
    z-index: 99;
}

.padded {
    padding: 12px;
}

.tableHead {
    height: 31px;
    margin-top: 1px;
}

.tabs {
    margin-top: 56px;
    padding: 12px;
}

.vscroll {
    overflow-x: hidden;
    overflow-y: scroll;
}

.selector::-webkit-scrollbar,
.detail::-webkit-scrollbar {
    width: 5px;
}

.selector::-webkit-scrollbar-track,
.detail::-webkit-scrollbar-track {
    background: #ddd;
}

.selector::-webkit-scrollbar-thumb,
.detail::-webkit-scrollbar-thumb {
    background: #ff4949;
}

.whitebg {
    background: white;
}

.tealbg {
    background-color: #ddd;
}
</style>
