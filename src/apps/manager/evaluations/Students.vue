<template>
  <div class="form clearfix">
    <h3>Students</h3>
    <p v-if="item.kind === 'local'">The following students were marked complete by their instructor</p>
    <p v-else>Assign students to this evaluation round</p>

    <el-form ref="myForm" :rules="rules" :model="form" v-if="item.kind === 'global'" label-position="left" label-width="150px">
      <el-autocomplete class="inline-input" v-model="student_option" :fetch-suggestions="querySearch" placeholder="Please Input" :trigger-on-focus="false" @select="handleSelect"></el-autocomplete>
      <el-button type="primary" @click="submitForm('myForm')">Add Student</el-button>
    </el-form>

    <div style="float: right; margin-top: -48px;padding-bottom: 24px; text-align: right">
      Total count: {{students ? students.length : 0}}
      <br>
      <small> G: graduated, F: featured, N: next_cycle,
        <br>D: dropped, W: waiting_feedback</small>
    </div>

    <el-table :data="students" border style="width: 100%">
      <el-table-column prop="student_id" sortable label="ID" :width="80">
      </el-table-column>
      <el-table-column prop="username" sortable label="Username" :width="180">
      </el-table-column>
      <el-table-column label="" :width="70" sortable>
        <template slot-scope="scope">
          <span v-if="scope.row.graduated">
            G
          </span>
          <span v-else-if="scope.row.featured">
            F
          </span>
          <span v-else-if="scope.row.next_cycle">
            N
          </span>
          <span v-else-if="scope.row.dropped">D</span>
          <span v-else-if="scope.row.waiting_feedback">W</span>
          <span v-else>*</span>
        </template>
      </el-table-column>
      <el-table-column prop="email" sortable label="Email" :width="230">

      </el-table-column>
      <el-table-column sortable label="Lab" :width="200">
        <template slot-scope="scope">
          {{ scope.row.lab ? scope.row.lab.name : '' | truncate(25) }}
        </template>
      </el-table-column>
      <el-table-column label="Instructor" sortable :width="130" v-if="item.kind === 'local'">
        <template slot-scope="scope">
          <span v-if="scope.row.evaluator">
            {{scope.row.evaluator.username}}
          </span>
        </template>
      </el-table-column>
      <el-table-column prop="evaluator.username" v-if="item.kind === 'global'" sortable label="Evaluator" :width="130">
        <template slot-scope="scope">
          <span v-if="scope.row.evaluator">
            {{scope.row.evaluator.username}}
          </span>
          <span v-else>
            <EvaluatorSelect :userObject="scope.row" :keys="evaluators" @keySelected="updateEvaluatorOption" />
          </span>
          <!--<span v-if="scope.row.evaluator">{{scope.row.evaluator.username}}</span>-->
          <!--<span v-else>-->

          <!--</span>-->
        </template>
      </el-table-column>
      <el-table-column label="" fit v-if="item.kind === 'global'">
        <template slot-scope="scope">
          <el-button v-if="!scope.row.evaluator && evaluator_option[scope.row.id]" @click="handleAssignEvaluator(scope.row)" type="primary" size="mini">
            Assign
          </el-button>
          <el-button v-if="scope.row.evaluator" @click="handleRemoveEvaluator(scope.row)" type="danger" size="mini">
            Reset
          </el-button>
        </template>
      </el-table-column>
    </el-table>

  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import Vue from 'vue'
import EvaluatorSelect from '../../../components/EvaluatorSelect.vue'
export default {
  props: [
    'item'
  ],
  components: {
    EvaluatorSelect
  },
  data() {
    return {
      form: {
        input: '',
        candidate: null
      },
      student_option: null,
      evaluator_option: {},
      rules: {
      }

    }
  },
  computed: {
    evaluators() {
      const ev = this.item && this.item.evaluators || [];
      return ev.map((e) => { return e.username })
      // return ev.map((e) => {
      //   return {
      //     value: e.username,
      //     link: e
      //   }
      // })
    },
    students() {
      if (!this.item) return []
      let list = []
      // if (this.item.kind && this.item.kind === 'global') {
      list = this.evaluationStudents(this.item) || []
      // }
      // if (this.item.kind && this.item.kind === 'local') {
      //   students = this.allStudents || []
      // }
      // console.log('unknown session kind')
      return list
    },

    ...mapGetters({
      evaluationStudents: 'evaluationStudents',
      localInstructor: 'evaluationLocalInstructor',
      allStudents: 'admin/students/students'
    })
  },
  methods: {
    updateEvaluatorOption({ userObject, key }) {
      Vue.set(this.evaluator_option, userObject.id, key)
    },
    ...mapActions({
      loadStudents: 'admin/students/loadStudents'
    }),
    findEvaluator(student) {
      const pairs = this.item.pairings || []
      const idx = pairs.findIndex((e) => e.studentId === student.id)
      if (idx == -1) return null;
      const evalId = this.item.pairings[idx]
      const candidates = this.item.evaluators.filter((s) => s.id === evalId)
      return candidates.length > 0 ? candidates[0] : null
    },
    querySearch(queryString, cb) {
      let links = this.allStudents.map((s) => {
        return {
          value: s.username,
          student: s
        }
      })
      let results = queryString ? links.filter(this.createFilter(queryString)) : links
      // console.log(results)
      // call callback function to return suggestions
      cb(results)
    },
    findInstructor(option) {
      // debugger
      const evaluators = this.item.evaluators || []
      const idx = Array.findIndex(evaluators, (el) => {
        return el.username === option
      })
      if (idx != -1) return evaluators[idx]
      return null
    },
    createFilter(queryString) {
      return (link) => {
        return (link.student.username.toLowerCase().indexOf(queryString.toLowerCase()) != -1) ||
          (link.student.email.indexOf(queryString.toLowerCase()) != -1)
          ;
      };
    },
    submitForm(formName) {
      const vm = this
      const form = this.$refs[formName]
      form.validate((valid) => {
        if (valid) {
          if (vm.student_option) {
            const res = vm.allStudents.filter((e) => (e.username === vm.student_option))
            vm.$emit('submit', res[0])
          }
        }
      })
    },

    handleAssignEvaluator(student) {
      // get it from this.evaluator_option
      if (!this.evaluator_option[student.id]) {
        this.$notify({
          title: "Error",
          message: "Please select an evaluator"
        });
        return
      }
      console.log(this.evaluator_option[student.id])
      const instr = this.findInstructor(this.evaluator_option[student.id])
      const params = {
        student: student,
        evaluator: instr,
        session: this.item
      }
      this.$emit("assign", params)
    },
    handleRemoveEvaluator(student) {
      // remove current evaluator from student

      const params = {
        student: student,
        evaluator: null,
        session: this.item
      }
      this.$emit("remove", params)
    },
    handleSelect(item) {
      console.log(item);
    }
  }
}
</script>
<style scoped>
.fa-fix {
  margin-bottom: -4px;
  margin-left: -4px;
}
</style>
