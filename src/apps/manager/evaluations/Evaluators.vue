<template>
  <div class="form clearfix">
    <h3>Evaluators</h3>
    <p v-if="item.kind === 'local'">Local evaluation is done by local instructors in the course</p>
    <p v-else>Define evaluators for this evaluation round</p>

    <div v-if="item.kind === 'global'">
      <el-form ref="myForm" :rules="rules" :model="form" label-position="left" label-width="150px">
        <el-autocomplete class="inline-input" v-model="form.instructor" :fetch-suggestions="querySearch" placeholder="Username or email" :trigger-on-focus="false" @select="handleSelect"></el-autocomplete>
        <el-button type="primary" @click="submitForm('myForm')">Add Evaluator</el-button>
      </el-form>
    </div>

    <div>
      <br/>
    </div>

    <el-table :data="evaluators(this.item)" border stripe v-if="item.kind === 'global'" style="width: 100%">
      <el-table-column prop="username" sortable label="Username" :width="180">
      </el-table-column>

      <el-table-column prop="email" label="Email" :width="230">
      </el-table-column>
      <el-table-column>
        <template slot-scope="scope">
          <small>{{ scope.row.labs && scope.row.labs.length }} labs
            <br>
            <div v-if="scope.row.labs" v-for="c in scope.row.labs" :key="c.id">
              - {{ c.name }}
            </div>
          </small>
        </template>
      </el-table-column>
      <el-table-column prop="candidates" label="Assigned">
        <template slot-scope="scope">
          <small>{{ scope.row.candidates && scope.row.candidates.length }} candidates
            <br>
            <div v-if="scope.row.candidates" v-for="c in scope.row.candidates" :key="c.id">
              - {{ `[${c.student_id}] ${c.first_name} ${c.last_name}` }}
            </div>
          </small>
        </template>
      </el-table-column>
      <el-table-column label="" fit>
        <template slot-scope="scope">
          <el-button @click="handleRemove(scope.row)" size="mini" type="danger">
            <fa-icon name="trash"></fa-icon>
          </el-button>
        </template>
      </el-table-column>
    </el-table>

  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  props: [
    'item'
  ],
  data() {
    return {
      form: {
        input: '',
        instructor: null
      },
      rules: {
        instructor: [
          { required: true, message: 'Select an instructor', trigger: 'blur' }
        ],
      }
    }
  },
  computed: {
    // evaluators() { return this.item.evaluators && this.item.evaluators || [] },
    instructors() {
      const instructors = this.allInstructors || []
      var links = instructors.map(e => {
        return {
          link: e, value: e.username
        }
      })
      return links
    },
    ...mapGetters({
      'allInstructors': 'admin/instructors/instructors',
      'evaluators': 'evaluators',
      'currentCourse': 'currentCourse'
    })
  },
  mounted() {
    this.loadInstructors(this.currentCourse.id)
  },
  methods: {
    ...mapActions({
      'loadInstructors': 'admin/instructors/loadInstructors'
    }),
    loadCandidate(c) {
      // console.log(c)
      return c
    },
    submitForm(formName) {
      const vm = this
      const form = this.$refs[formName]
      form.validate((valid) => {
        if (valid) {
          if (vm.form.instructor) {
            const res = vm.instructors.filter((e) => (e.link.username === vm.form.instructor))
            vm.$emit('submit', res[0].link)
          }
        }
      })
    },
    querySearch(queryString, cb) {
      const links = this.instructors
      let results = queryString ? links.filter(this.createFilter(queryString)) : links
      // call callback function to return suggestions
      cb(results)
    },
    createFilter(queryString) {
      return (instructor) => {
        return (instructor.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0)
          || (instructor.link.email.indexOf(queryString.toLowerCase()) === 0)

      }
    },
    handleSelect(item) {
      console.log(item);
    },
    handleRemove(item) {
      console.log("Remove");
      console.log(item)
    }
  }
}
</script>
<style scoped>

</style>
