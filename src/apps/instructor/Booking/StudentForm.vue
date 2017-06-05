<template>
  <el-card style="margin-top: 24px">
    <div slot="header">
      <h4 style="margin:0">Add a student</h4>
    </div>
    <el-form v-model="form" label-position="top">
      <el-form-item label="Select your Lab" prop="labId">
        <el-select v-model="form.labId" placeholder="Select Lab">
        <el-option
          v-for="item in labs"
          :key="item.id"
          :label="item.name"
          :value="item.id">
        </el-option>
        </el-select>
      </el-form-item>
      <el-form-item v-if="form.labId" label="Students" prop="selected_students">
        <el-select v-model="form.studentIds" multiple placeholder="Select">
          <el-option
            v-for="student in filterStudents()"
            :key="student.student_id"
            :label="'['+student.student_id+'] '+student.first + ' ' + student.last"
            @visible-change="handleVisibleChange"
            :value="student"
            :disabled="student.booked">
          </el-option>
        </el-select>
      </el-form-item>
      <el-button v-if="form.labId" @click="handleBookStudents" :disabled="form.studentIds.length==0
      ||selectVisible">Book selected students</el-button>
    </el-form>
  </el-card>
</template>
<script>
// var db = firebaseApp.database();
export default{
  props: [
    'session',
    'labs',
    'filteredStudents',
    'sessions'
  ],
  template: '#student-form',

  watch: {
    'form.labId': function(val){
      this.filter = {
        lab_id: val
      }
    }
  },
  methods: {
    getDBRef: function(student){
      return db.ref('/students/' + student['.key']);
    },
    checkCount: function(session,students, cb){
      // check session count
      var sa = students || [];
      var studentIds = sa.map(function(el){return el.student_id}) || [];
      if (studentIds.length > 0){
        if ((session.max_students - Object.keys(session.students||{}).length) >= studentIds.length) {
          console.log('check count ok');
          return cb(null,true);
        }
      }
      console.log('check count fail');
      cb("Maximum count reached");
    },
    checkDupes: function(students, sessions, cb){
      var sa = students || [];
      var studentIds = sa.map(function(el){return el.student_id}) || [];

      // check studentIds are not present in another session
      sessions.some(function(s){
        var session_students = s.students || {};
        for (var i=0; i<Object.values(session_students).length;i++){
          var id = Object.values(session_students)[i];
          if (studentIds.indexOf(id) != -1) {
               console.log('check dupes failed');
               cb("Student " + id + "is already booked in another session");
               return true;
          }
        };
      });
      // ok no dupes found
      console.log('check dupes ok');
      cb(null);
    },
    bookStudents: function(sessions, session, students, callback){
      var vm = this;

      this.checkCount(session,students, function(err,ok){
        if (err) {
          return callback(err);
        }
        vm.checkDupes(students, sessions, function(err,ok){
          if (err){
            return callback(err);
          }
          students.forEach(function(student){
            var dbRef = vm.getDBRef(student);
            if (!dbRef){
              return cb("Internal Error");
            }
            dbRef.update({
              booked: true,
              presented: false,
              session: '/sessions/' + session['.key']
            })
          });
          var fb = vm.$firebaseRefs.sessions.child(session['.key'])

          var cRef = fb.child('students_count');
          var added = students.length;
          cRef.transaction(function(count) {
              if (count) {
                  count = count + added;
                  console.log('updating count to' + count);
                  return count;
              }
              console.log('updating count to' + added);

              return added;
          });

          if (fb.child('students')){
            students.forEach(function(student){
              fb.child('students').push(
                 student.student_id
              );
            })
          } else {

            fb.set({
              students: students.map(function(student){
                return student.student_id;
              })
            })
          }
          callback(null);
        });
      });
    },
    handleBookStudents: function(){
      var vm=this;
      if (this.form.studentIds.length == 0){
        return alert('You need to select students first');
      }
      var students = this.form.studentIds;
      this.bookStudents(this.sessions, this.session, students, function(err,res){
        if (err){
          return alert('An error occurred:\n\n' + err);
        }

        vm.filter= {};
        vm.form = {
          studentIds: [],
          labId: null,
        };
        vm.$emit("refresh");

        // return alert('All fine');
      });

    },
    filterStudents: function(){
      var f = this.filter && this.filter.lab_id || null;
      if (!f) return this.filteredStudents;
      console.log(this.filteredStudents);
      var ret = this.filteredStudents.filter(function(el){
        return (el.lab_id === f);
      });
      console.log(ret);
      return ret;
    },
    handleVisibleChange:function(visible){
      this.selectVisible = visible;
    }
  },
  data: function() {
    return {
      filter: {},
      selectVisible: false,
      form: {
        studentIds: [],
        labId: null,
      }
    }
  }
}
</script>
