<template>
    <div class="tab">
        <h3>Evaluators stats</h3>
          <div v-if="sessions && sessions.length > 0">
            Select session 
            <el-select v-model="selectedSession" placeholder="Select session" @change="handleChange">
                <el-option v-for="session in sessions" v-if="session.kind === 'global'" :key="session.id" :label="session.name" :value="session.id">
                </el-option>
            </el-select>

    </div>
      <div v-else>

      Loading sessions...
    </div>



    <div v-if="sessionObject">

        <h2> {{sessionObject.name}} </h2>
        <el-table
        :data="tableData"
        stripe
        style="margin-right: 12px;">
        <el-table-column
          prop="fullname"
          label="Evaluator"
          width="180">
        </el-table-column>
         <el-table-column
          prop="assigned"
          label="Assigned"
          width="120">
        </el-table-column>
                 <el-table-column
          prop="started"
          label="Started"
          width="120">
        </el-table-column>
                 <el-table-column
          prop="pending"
          label="Pending"
          width="120">
        </el-table-column>
        
        <el-table-column prop="completed" label="Completed" width="120">
        </el-table-column>
        <el-table-column prop="graduated" label="Graduated" width="120">
        </el-table-column>
                <el-table-column prop="conditional" label="Conditional" width="120">
        </el-table-column>
                <el-table-column prop="next_cycle" label="Next Cycle" width="120">
        </el-table-column>       
         </el-table>
    </div>

    </div>
</template>

<script>
import {mapActions,mapGetters} from 'vuex'

export default {
    data(){
        return {
            selectedSession: ''
        }
    },
    methods:{
        ...mapActions(['loadEvaluations']),
        handleChange(){
            console.log('combo changed')
        },
        assignedStudents(evaluatorId){
           if (!this.sessionObject)return 0
           return this.sessionObject.pairings.filter((p)=>{
              return p.instructorId === evaluatorId
           }).length
        },
        startedStudents(evaluatorId){
            if (!this.sessionObject)return 0
            const selectedId = this.selectedSession
           return this.sessionObject.pairings.filter((p)=>{
              if (p.instructorId === evaluatorId){
                  const sheets = p.student.sheets || []
                  const res = sheets.filter((e) => {
                      if (e.evaluation.id === selectedId
                      && e.records && e.records.length > 0) {
                          return true
                      }
                      return false
                  }).length > 0
                  return res
              }
              return false
           }).length
        },
        completedStudents(evaluatorId){
             if (!this.sessionObject)return 0
            const selectedId = this.selectedSession
           return this.sessionObject.pairings.filter((p)=>{
              if (p.instructorId === evaluatorId){
                  return (p.student.graduated || p.student.next_cycle)
              
              } return false
           }).length
        },
        graduatedStudents(evaluatorId){
             if (!this.sessionObject)return 0
            const selectedId = this.selectedSession
           return this.sessionObject.pairings.filter((p)=>{
              if (p.instructorId === evaluatorId){
                  return (p.student.graduated && !p.student.conditional)
              
              } return false
           }).length
        },
        conditionalStudents(evaluatorId){
             if (!this.sessionObject)return 0
            const selectedId = this.selectedSession
           return this.sessionObject.pairings.filter((p)=>{
              if (p.instructorId === evaluatorId){
                  return (p.student.graduated && p.student.conditional)
              
              } return false
           }).length
        },
        nextCycleStudents(evaluatorId){
             if (!this.sessionObject)return 0
            const selectedId = this.selectedSession
           return this.sessionObject.pairings.filter((p)=>{
              if (p.instructorId === evaluatorId){
                  return (p.student.next_cycle)
              
              } return false
           }).length
        }
    },
    mounted(){
        console.log('mounted')
        this.loadEvaluations(this.currentCourse.id)
    },
    watch:{
        currentCourse(newVal){
            console.log('course changed')
            this.loadEvaluations(this.currentCourse.id)
        },
        selectedSession(newVal){
            console.log('session selected')
           
        }
    },
    computed: {
        tableData(){
            if (!this.sessionObject)return []
            return this.sessionObject.evaluators.map((evaluator)=>{
                const assigned = this.assignedStudents(evaluator.id)
                const started = this.startedStudents(evaluator.id)
                const completed = this.completedStudents(evaluator.id)
                const graduated = this.graduatedStudents(evaluator.id)
                const conditional = this.conditionalStudents(evaluator.id)
                const next_cycle = this.nextCycleStudents(evaluator.id)
                return {
                    'first_name': evaluator.first_name,
                    'last_name': evaluator.last_name,
                'fullname': evaluator.first_name + ' ' + evaluator.last_name,
                assigned,
                started,
                'pending': assigned - started,
                completed,
                graduated,
                conditional,
                next_cycle
                }
            }).sort((a,b)=>a.last_name.localeCompare(b.last_name))
        },
        sessionObject(){
            const selectedId = this.selectedSession
            return this.evaluations.find((obj)=>obj.id===selectedId) || null
        },
        sessions(){
            console.log(this.evaluations)
            return this.evaluations || []
        },
        ...mapGetters(['currentCourse', 'evaluations', 'evaluationStudents'])
     },
}
</script>

<style>

</style>
