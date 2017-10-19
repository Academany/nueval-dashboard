<template>
  <div class="form clearfix">
    <h3>Students</h3>
    <p>The following {{students ? students.length : 0}} students have graduated</p>
  
    <div>
      <br/>
    </div>
  
    <el-table :data="students" border style="width: 100%">
      <el-table-column prop="student_id" sortable label="ID" :width="80">
      </el-table-column>
      <el-table-column prop="username" sortable label="Username" :width="180">
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
  
        </template>
      </el-table-column>
  
    </el-table>
  
  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import Vue from 'vue'
export default {
  props: [
    'item'
  ],

  data() {
    return {


    }
  },
  computed: {

    students() {
      if (!this.item) return []
      let list = []
      if (this.item.kind && this.item.kind === 'global') {
        list = this.evaluationStudents(this.item) || []
      }
      list = list.filter((s) => s.graduated === true)
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
    ...mapActions({
      loadStudents: 'admin/students/loadStudents'
    }),
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
