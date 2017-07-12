<template>
  <div class="sheet" v-loading="students.length == 0">
    <h1>{{currentCourse.name}}</h1>
  
    <table v-if="students.length > 0">
      <tr>
        <td>
          <strong>Labs:</strong>
        </td>
        <td>
          <span>{{ labs.length}}</span>
        </td>
      </tr>
      <tr>
        <td>
          <strong>Students:</strong>
        </td>
        <td>
          <span>{{students.length}}</span>
        </td>
      </tr>
    </table>
    <br>
    <table v-if="students.length > 0">
      <tr>
        <td>
          <strong>Local Evaluation:</strong>
        </td>
      </tr>
      <tr>
        <td>
          <strong>Pending:</strong>
        </td>
        <td>
          <span>{{pending_local}}</span>
  
        </td>
        <td style="width: 200px">
          <el-progress :text-inside="true" :stroke-width="18" :percentage="Math.round(pending_local / students.length * 100)"></el-progress>
        </td>
      </tr>
      <tr>
        <td>
          <strong>Accepted:</strong>
        </td>
        <td>
          <span>{{completed_local}}</span>
        </td>
        <td style="width: 200px">
          <el-progress status="success" :text-inside="true" :stroke-width="18" :percentage="Math.round(completed_local / students.length * 100)"></el-progress>
        </td>
      </tr>
      <tr>
        <td>
          <strong>Dropped:</strong>
        </td>
        <td>
          <span>{{dropped}}</span>
        </td>
        <td style="width: 200px">
          <el-progress status="exception" :text-inside="true" :stroke-width="18" :percentage="Math.round(dropped / students.length * 100)"></el-progress>
        </td>
      </tr>
      <tr>
        <td>
          <strong>Next Cycle:</strong>
        </td>
        <td>
          <span>{{next_cycle_local}}</span>
        </td>
        <td style="width: 200px">
          <el-progress :text-inside="true" :stroke-width="18" :percentage="Math.round(next_cycle_local / students.length * 100)"></el-progress>
        </td>
      </tr>
    </table>
    <br>
  
    <table v-if="students.length > 0">
      <tr>
        <td>
          <strong>Global Evaluation:</strong>
        </td>
      </tr>
      <tr>
        <td>
          <strong>Pending:</strong>
        </td>
        <td>
          <span>{{pending_global}}</span>
        </td>
        <td style="width: 200px">
          <el-progress :text-inside="true" :stroke-width="18" :percentage="Math.round(pending_global / under_global * 100)"></el-progress>
        </td>
      </tr>
  
      <tr>
        <td>
          <strong>Assigned but not started:</strong>
        </td>
        <td>
          <span>{{assigned}}</span>
        </td>
        <td style="width: 200px">
          <el-progress :text-inside="true" :stroke-width="18" :percentage="Math.round(assigned / under_global * 100)"></el-progress>
        </td>
      </tr>
      <tr>
        <td>
          <strong>Waiting feedback:</strong>
        </td>
        <td>
          <span>{{waiting}}</span>
        </td>
        <td style="width: 200px">
          <el-progress :text-inside="true" :stroke-width="18" :percentage="Math.round(waiting / under_global * 100)"></el-progress>
        </td>
      </tr>
  
      <tr>
        <td>
          <strong>Next Cycle:</strong>
        </td>
        <td>
          <span>{{next_cycle_global}}</span>
        </td>
        <td style="width: 200px">
          <el-progress status="exception" :text-inside="true" :stroke-width="18" :percentage="Math.round(next_cycle_global / under_global * 100)"></el-progress>
        </td>
      </tr>
      <tr>
        <td>
          <strong>Graduated:</strong>
        </td>
        <td>
          <span>{{graduated }}</span>
        </td>
        <td style="width: 200px">
          <el-progress status="success" :text-inside="true" :stroke-width="18" :percentage="Math.round(graduated / under_global * 100)"></el-progress>
        </td>
      </tr>
    </table>
  
  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  computed: {
    ...mapGetters({
      currentCourse: 'currentCourse',
      labs: 'labs',
      students: 'admin/students/students'
    }),
    pending_local() {
      const vm = this
      const allStudents = this.students || []
      const hasLocal = allStudents.filter((s) => vm.hasLocalEval(s)).length
      const hasGlobal = allStudents.filter((s) => vm.hasGlobalEval(s)).length
      return allStudents.length - this.dropped - this.next_cycle_local - this.completed_local
    },
    completed_local() {
      const vm = this
      const allStudents = this.students || []
      const hasGlobal = allStudents.filter((s) => vm.hasGlobalEval(s)).length
      return hasGlobal
    },
    pending_global() {
      const vm = this
      const allStudents = this.students || []
      const hasGlobal = allStudents.filter((s) => vm.hasGlobalEval(s)).length
      return hasGlobal - this.completed_global - this.waiting
    },
    next_cycle_local() {
      const vm = this
      const allStudents = this.students || []
      // !hasGlobal && next_cycle
      return allStudents.filter((s) => {
        const has_g = vm.hasGlobalEval(s)
        const next_cycle = s.next_cycle || false
        return !has_g && next_cycle
      }).length
    },
    under_global() {
      const allStudents = this.students || []
      const nextCycle = allStudents.filter((s) => this.hasGlobalEval(s))
      return nextCycle.length
    },
    assigned() {
      const allStudents = this.students || []
      const nextCycle = allStudents.filter((s) => this.hasGlobalEval(s) && this.hasEmptyEval(s))
      return nextCycle.length
    },
    completed_global() {
      const allStudents = this.students || []
      const nextCycle = allStudents.filter((s) => this.hasGlobalEval(s) && (s.next_cycle === true || s.graduated === true))
      return nextCycle.length
    },
    next_cycle_global() {
      const allStudents = this.students || []
      const vm = this
      const nextCycle = allStudents.filter((s) => vm.hasGlobalEval(s) && s.next_cycle === true)
      return nextCycle.length
    },
    dropped() {
      const allStudents = this.students || []
      const dropped = allStudents.filter((s) => s.dropped === true)
      return dropped.length
    },
    graduated() {
      const allStudents = this.students || []
      const graduated = allStudents.filter((s) => s.graduated === true)
      return graduated.length
    },
    waiting() {
      const allStudents = this.students || []
      const waiting = allStudents.filter((s) => s.waiting_feedback === true)
      return waiting.length
    }
  },
  methods: {
    hasLocalEval(student) {
      const sheets = student.sheets || []
      return sheets.length > 0
    },
    hasGlobalEval(student) {
      const sheets = student.sheets || []
      const res = sheets.filter((e) => e.evaluation.kind === 'global').length > 0
      // if (res) console.log('has global eval')
      return res
    },
    hasEmptyEval(student) {
      const sheets = student.sheets || []
      const res = sheets.filter((e) => e.evaluation.kind === 'global')
      if (res.length > 0) {
        const ev = res[0]
        const empty_records = ev.records.length === 0
        return empty_records
      }
      return false
    },
    ...mapActions({
      loadStudents: 'admin/students/loadStudents'
    }),
    ...mapActions(['loadLabs']),
  },
  watch: {
    currentCourse(val) {
      this.loadStudents(this.currentCourse.id);
      this.loadLabs(this.currentCourse.id);
    }
  },
  mounted() {
    this.loadStudents(this.currentCourse.id);
    this.loadLabs(this.currentCourse.id);
  }
}
</script>
<style scoped>
.sheet {
  padding: 24px;
}

.sheet {
  margin-left: 24px;
}
</style>
