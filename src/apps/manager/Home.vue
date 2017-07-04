<template>
  <div class="sheet">
    <h1>{{currentCourse.name}}</h1>
    <table>
      <tr>
        <td>
          <strong>Students:</strong>
        </td>
        <td>
          <span>{{students.length}}</span>
        </td>
      </tr>
      <tr>
        <td>
          <strong>Dropped:</strong>
        </td>
        <td>
          <span>{{dropped}}</span>
        </td>
      </tr>
      <tr>
        <td>
          <strong>Next Cycle:</strong>
        </td>
        <td>
          <span>{{nextCycle}}</span>
        </td>
      </tr>
      <tr>
        <td>
          <strong>Graduated:</strong>
        </td>
        <td>
          <span>{{graduated }}</span>
        </td>
      </tr>
      <tr>
        <td>
          <strong>Labs:</strong>
        </td>
        <td>
          <span>{{ labs.length}}</span>
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
    nextCycle() {
      const allStudents = this.students || []
      const nextCycle = this.students.filter((s) => s.next_cycle === true)
      return nextCycle.length
    },
    dropped() {
      const allStudents = this.students || []
      const dropped = this.students.filter((s) => s.dropped === true)
      return dropped.length
    },
    graduated() {
      const allStudents = this.students || []
      const graduated = this.students.filter((s) => s.graduated === true)
      return graduated.length
    }
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
