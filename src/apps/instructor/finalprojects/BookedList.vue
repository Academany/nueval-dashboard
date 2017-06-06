<template>
  <div class="nopadding">
    <div  v-if="sessionStudents && sessionStudents.length > 0 ">
            <el-table
        :data="sessionStudents"
        style="width: 100%"
        fit>
        <el-table-column
          prop="student_id"
          label="ID"
         >
        </el-table-column>
        <el-table-column
          prop="first_name"
          label=""
          >
        </el-table-column>
        <el-table-column
          prop="last_name"
          label=""
         >
        </el-table-column>
      </el-table>
    </div>
      <div v-else>
        <br>
        No students booked yet in this session
      </div>
  </div>
</template>
<script>
import {mapGetters} from 'vuex'
export default {
  computed: {
    ...mapGetters({
      sessionStudents: 'instructor_app/sessions/booked'
    })
  },
  methods: {
  }
}
</script>

