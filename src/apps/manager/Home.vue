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
    })
  },
  methods: {

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
