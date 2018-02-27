<template>
<el-table
  :data="tableData"
  stripe
  style="width: 90%"
  :summary-method="getSummaries"
   show-summary>
  <el-table-column
    prop="name"
    label="Name"
    width="180">
  </el-table-column>
  <el-table-column
    prop="studentsCount"
    label="Students">
  </el-table-column>
  <el-table-column
    prop="studentsProgress"
    label="Progress">
  </el-table-column>
  <el-table-column
    prop="studentsDropped"
    label="Dropped">
  </el-table-column>
  <el-table-column
    prop="studentsNextCycle"
    label="Nextcycle">
  </el-table-column>
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
</el-table>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  mounted() {
    this.loadLabs(this.currentCourse.id);
  },
  methods: {
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
        if (index === 3) {
          let total = 0;
           this.labs.map((lab)=>{
             total += lab.students.filter((s)=>{return s.dropped}).length
           })
          ret[index] = total
          return
        }
        if (index === 4) {
          let total = 0;
           this.labs.map((lab)=>{
             total += lab.students.filter((s)=>{return s.next_cycle}).length
           })
          ret[index] = total
          return
        }
        if (index === 6) {
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
      return lab.students && lab.students.length || 0
    },
    studentsProgress(lab){
      return 0
    },
    studentsGraduated(lab){
      const graduated = lab.students.filter((student)=>{
        return student.graduated
      }).length
      return graduated
    },
    studentsDropped(lab){
      const dropped = lab.students.filter((student)=>{
        return student.dropped
      }).length
      return dropped
    },
    studentsNextCycle(lab){
      const next_cycle = lab.students.filter((student)=>{
        return student.next_cycle
      }).length
      return next_cycle
    },
    studentsSentToGlobal(lab){
      return 0
    },
    studentsRejectedFromGlobal(lab){
      return 0
    },
    ...mapActions(['loadLabs'])
  },
  computed: {
    tableData(){
      const vm = this
      return this.labs.map((lab)=>{
        lab = {
          ...lab,
          studentsCount: vm.labStudents(lab),
          studentsProgress: vm.studentsProgress(lab),
          studentsDropped: vm.studentsDropped(lab),
          studentsNextCycle: vm.studentsNextCycle(lab),
          studentsGraduated: vm.studentsGraduated(lab),
          studentsSentToGlobal: vm.studentsSentToGlobal(lab),
          studentsRejectedFromGlobal: vm.studentsRejectedFromGlobal(lab),
        }
        lab.studentsCount = vm.labStudents(lab)
        lab.studentsProgress = vm.studentsProgress(lab)
        return lab
      })

    },
    ...mapGetters(['labs', 'currentCourse']),
  }
}
</script>
<style>
</style>
