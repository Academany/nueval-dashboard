<template>
<div>
  <p>Local evaluation</p>
<el-table
  :data="tableData"

  style="width: 90%"
  v-loading="loading"
  :row-class-name="tableRowClassName"
  >
  <el-table-column
    prop="lab"
    label="Name"
    width="180">
  </el-table-column>
  <el-table-column
    prop="studentsCount"
    label="Active">
  </el-table-column>
  <el-table-column
    prop="studentsDropped"
    label="Dropped">
  </el-table-column>
  <el-table-column
    prop="studentsEvalStarted"
    label="Eval. Started">
  </el-table-column>
  <el-table-column
    prop="studentsEvalUnits"
    label="Eval. Units">
  </el-table-column>
  <el-table-column
    prop="studentsProgress"
    label="Progress">
  </el-table-column>
  <el-table-column
    prop="studentsCompletedUnits"
    label="Completed">
  </el-table-column>
  <el-table-column
    prop="studentsNextCycle"
    label="Next cycle">
  </el-table-column>

</el-table>
</div>
</template>
<script>
/*
<el-table-column
  prop="studentsSentToGlobal"
  label="Global Eval">
</el-table-column>
<el-table-column
  prop="studentsGraduated"
  label="Grad">
</el-table-column>
<el-table-column
  prop="studentsRejectedFromGlobal"
  label="Reject">
</el-table-column>
*/
import { mapActions, mapGetters } from 'vuex'
export default {
  mounted() {
    this.loading = true
    this.loadLocalStats(this.currentCourse.id).then(function(stats){
      console.log('stats loaded')
      this.loading = false
    }).catch((error)=>{
      this.loading = false
    })
  },
  methods: {
    tableRowClassName(row) {
        var lab = row
        if (lab){
          if (lab.studentsEvalUnits === 0 || !lab.studentsEvalStarted) {
            return 'warning-row';
          } else if (lab.studentsProgress > 90) {
            return 'success-row';
          }
        }
        return '';
    },
    getSummaries(param) {
      const { columns, data } = param;
      const ret = []
      columns.forEach((column, index) => {
        if (index === 0){
          ret[index] = 'Total';
          return
        }
        if (index === 1) {
          let total = 0;
           this.labs.map((lab)=>{
             total += lab.students.length
           })
          ret[index] = total
          return
        }
        if (index === 2) {

        }
        if (index === 4) {
          let total = 0;
           this.labs.map((lab)=>{
             total += lab.students.filter((s)=>{return s.dropped}).length
           })
          ret[index] = total
          return
        }
        if (index === 5) {
          let total = 0;
           this.labs.map((lab)=>{
             total += lab.students.filter((s)=>{return s.next_cycle}).length
           })
          ret[index] = total
          return
        }
        if (index === 7) {
          let total = 0;
           this.labs.map((lab)=>{
             total += lab.students.filter((s)=>{return s.graduated}).length
           })
          ret[index] = total
          return
        }
      })
      return ret
    },
    labStudents(lab){
      return lab.active || 0
    },
    studentsEvalStarted(lab) {
      return lab.eval_started ? 'Yes' : 'No'
    },
    studentsProgress(lab){
      return lab.avg_progress + ' %'
    },
    studentsGraduated(lab){
      return 0
    },
    studentsEvalUnits(lab){
      return lab.eval_units
    },
    studentsCompletedUnits(lab){
      return lab.completed_units + ' %'
    },
    studentsDropped(lab){
      return lab.dropped
    },
    studentsNextCycle(lab){
      return lab.next_cycle
    },
    studentsSentToGlobal(lab){
      return 0
    },
    studentsRejectedFromGlobal(lab){
      return 0
    },
    ...mapActions(['loadLabs','loadLocalStats'])
  },
  computed: {
    tableData(){
      const vm = this
      return this.localStats.map((lab)=>{
        lab = {
          ...lab,
          studentsCount: vm.labStudents(lab),
          studentsEvalStarted: vm.studentsEvalStarted(lab),
          studentsProgress: vm.studentsProgress(lab),
          studentsDropped: vm.studentsDropped(lab),
          studentsNextCycle: vm.studentsNextCycle(lab),
          studentsGraduated: vm.studentsGraduated(lab),
          studentsSentToGlobal: vm.studentsSentToGlobal(lab),
          studentsRejectedFromGlobal: vm.studentsRejectedFromGlobal(lab),
          studentsCompletedUnits: vm.studentsCompletedUnits(lab),
          studentsEvalUnits: vm.studentsEvalUnits(lab)
        }
        lab.studentsCount = vm.labStudents(lab)
        lab.studentsProgress = vm.studentsProgress(lab)
        return lab
      }).filter((lab)=>{
        return lab.active > 0
      })

    },
    ...mapGetters([ 'currentCourse', 'localStats']),
  },
  data(){
    return {
      loading: false,
    }
  }
}
</script>
<style>
  .el-table .warning-row {
    background: #ffdddd;
  }

  .el-table .success-row {
    background: #f0f9eb;
  }
</style>
