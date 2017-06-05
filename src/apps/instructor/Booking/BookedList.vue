<template>
  <div>
    <div  v-if="session">
      <div v-for="s in getSessionStudents(session)">
        {{ '[' + s.student_id + '] ' + s.first + ' ' + s.last }}
      </div>
      <div v-if="Object.keys(session.students || {}).length == 0">
        No students booked
      </div>
    </div>
    <div v-else>
      Select a session
    </div>
  </div>
</template>
<script>
export default {
  template: '#booked-list',
  props: [
    'session',
    'students'
  ],
  computed: {
    sessionObj:function() {
      if (this.session){
        console.log(s);
        return s;
      }
      return {}
    }
  },
  methods: {
    getSessionStudents(session){
      if (!session) return [];
      var vm = this;
      if (Object.keys(session.students || {}).length){
        var students = Object.values(session.students).map(function(el){
          return vm.getStudent(el);
        });
        return students;
      }
    },
    getStudent(student_id){
      var res = this.students.filter(function(el){
        if (el.student_id)
          return el.student_id === student_id;
        return false;
      });
      if (res && res.length > 0){
        return res[0];
      }
      return {};
    }
  }
}
</script>
