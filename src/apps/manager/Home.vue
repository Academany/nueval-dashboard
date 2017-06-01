<template>
  <div class="sheet">
    <h1>{{currentCourse.name}}</h1>
    <table>
      <tr><td><strong>Students:</strong></td><td><span>{{students.length}}</span></td></tr>
      <tr><td><strong>Labs:</strong></td><td><span>{{ labs.length}}</span></td></tr>
    </table>

  </div>
</template>
<script>
import {mapGetters,mapActions} from 'vuex'
export default {
  computed: mapGetters(['currentCourse','students','labs']),
  methods:mapActions(['loadStudents','loadLabs']),
  mounted(){
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
