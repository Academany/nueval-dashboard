<template>
  <el-card>
    <div slot="header">
      <h4 style="margin:0">Add a student</h4>
    </div>
    <el-form v-model="form" label-position="top">
      <el-form-item label="Select your Lab" prop="labId">
        <el-select v-model="lab_id" @input="selectLab" placeholder="Select Lab">
        <el-option
          v-for="item in labs"
          :key="item.id"
          :label="item.name"
          :value="item.id">
        </el-option>
        </el-select>
      </el-form-item>
      <el-form-item v-if="form.lab" label="Students" prop="selected_students">
        <el-select v-model="form.students" multiple placeholder="Select">
          <el-option
            v-for="student in labStudents"
            :key="student.id"
            :label="'['+student.student_id+'] '+student.first_name + ' ' + student.last_name"
            @visible-change="handleVisibleChange"
            :value="student.id"
            :disabled="student.booked && student.booked.length > 0">
          </el-option>
        </el-select>
        <br>
        <small>Grayed out students are already booked!</small>
      </el-form-item>
      <el-button type="success" v-if="form.lab" @click="handleBookStudents" :disabled="form.students.length==0
      ||selectVisible">Book students!</el-button>
    </el-form>
  </el-card>
</template>
<script>
export default{
  props: [
    'session',
    'labs',
    'sessions'
  ],
  computed:{
    labStudents() {
      return this.form && this.form.lab && this.form.lab.students || [];
    }
  },
  methods: {
    checkCount: function(session,students, cb){

      /**
      // check session count
      var sa = students || [];
      if (studentIds.length > 0){
        if ((session.max_students - Object.keys(session.students||{}).length) >= sa.length) {
          console.log('check count ok');
          return cb(null,true);
        }
      }
      console.log('check count fail');
      cb("Maximum count reached");**/
      cb(null,true)

    },
    checkDupes: function(students, sessions, cb){
      /** var sa = students || [];
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
      **/
      cb(null);

    },
    bookStudents: function(sessions, session, students, callback){
      /**
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
      **/
    },
    handleBookStudents: function(){

      var vm=this;
      if (this.form.students.length == 0){
        return alert('You need to select students first');
      }
        var students = this.form.students;
        this.$emit('bookStudents', {
          session: this.session,
          students
        });
        vm.lab_id = null;        
        vm.filter= {};
        vm.form = {
          students: [],
          lab: null,
        };
        vm.$emit("refresh");

        // return alert('All fine');
      

    },
    handleVisibleChange:function(visible){
      this.selectVisible = visible;
    },
    selectLab(lab_id){
      for (var i=0;i<this.labs.length; i++){
        if (this.labs[i].id == lab_id){
          var _form = this.form
          _form.lab = this.labs[i]
          this.form = _form
        }
      }
    
    }
  },
  data: function() {
    return {
      filter: {},
      selectVisible: false,
      lab_id: null,
      form: {
        students: [],
        lab: null
      }
    }
  }
}
</script>
