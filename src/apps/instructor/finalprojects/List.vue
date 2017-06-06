<template>
    <div class="padded">
        <el-row :gutter="24">
            <el-col :span="8">
                <el-card>
                    <div slot="header">
                        <h4 style="margin:0">Select a session</h4>
                    </div>
                    <SessionList :sessions="sessions" @selectedSession="handleSelect"></SessionList>
                </el-card>
                <br>
                 <SessionInfo v-if="currentSession" :session="currentSession"></SessionInfo>
            </el-col>
            <el-col :span="8">
               <StudentForm v-if="currentSession" @refresh="handleRefresh" :session="currentSession"
                    :labs="instructorLabs"  @bookStudents="handleBooking" 
                    :sessions="sessions"></StudentForm>
            </el-col>
            <el-col :span="8">
                    <h4 style="margin: 0px">Students in this session</h4>
                    <BookedList :students="sessionStudents" v-if="currentSession" :session="currentSession"></BookedList>
            </el-col>
        </el-row>
        <br>
        <el-button @click="handleTestReload"><fa-icon name="refresh"></fa-icon> Refresh</el-button>
    </div>
</template>
<script>

/**

*/
import StudentForm from './StudentForm.vue'
import SessionList from './SessionList.vue'
import BookedList from './BookedList.vue'
import SessionInfo from './SessionInfo.vue'
import {mapGetters,mapActions} from 'vuex'

export default {
  components: {
    SessionList,
    BookedList,
    StudentForm,
    SessionInfo
  },
  computed: {
      sessionStudents(){return this.session && this.session.students || []},
      ...mapGetters({
        'instructor' : 'instructor_app/instructor',
        'currentSession': 'instructor_app/sessions/session',
        'sessionStudents': 'instructor_app/sessions/booked'
     }),
     instructorLabs(){return this.instructor && this.instructor.labs || []},
     sessions(){return this.instructor && this.instructor.course && this.instructor.course.presentations || []}
  },
  methods: {
      ...mapActions({
         'loadSession': 'instructor_app/sessions/loadSession',
         'bookStudent': 'instructor_app/sessions/bookStudent',
         'reloadInstructor': 'instructor_app/reloadInstructor'
      }),
    handleRefresh(){
      // var oldSession = this.currentSession;
      // var key = this.currentSession['.key'];
      // var path = '/sessions/' + key;
      // var vm = this;
      // db.ref(path).once('value',function(val){
      //     console.log(val);
      //     vm.currentSession = val.val();
      // });

    },
    handleBooking(opts){

        console.log('Booking !!!!')
        console.log(opts.session)
        console.log(opts.students)
        var vm = this
        if (opts && opts.students ){
            Promise.all(
            opts.students.map(function(studentId){
                return vm.bookStudent({'session':opts.session, studentId})
            },this)
            ).then((values)=>{
                vm.notify('Success', 'All fine')
                vm.reloadInstructor()
            }).catch((error)=>{
                vm.notify('Error', 'Some error booking these students:\n'  + error)
                console.log(error);
            })
        }
        

    },
    handleTestReload(){
        this.reloadInstructor()
    },
    handleSelect(newVal){
    //   this.currentSession = newVal
    //   this.loadSession().then((success)=>{

    //   }).catch((error)=>{

    //   })
        this.loadSession(newVal)
    },
          notify(title, msg){
        const h = this.$createElement;

        this.$notify({
          title: title,
          message: h('i', { style: 'color: teal' }, msg)
        });
      },
    humanizeURL: function (url) {
      return url
        .replace(/^https?:\/\//, '')
        .replace(/\/$/, '')
    }
  }
}

</script>
<style scoped>
.padded {
    /*padding-top: 10px;*/
    width: 95%;
    margin-right: auto;
    margin-top: 24px;
    margin-left: 24px;
}
.nopadding > .el-card__body {
  padding: 0px;
}
</style>