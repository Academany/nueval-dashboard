<template>

      <el-row :gutter="24">
        <el-col :span="8">
          <el-card>

            <div slot="header">
                <h4 style="margin:0">Select a session</h4>
            </div>
            <SessionList :sessions="sessions" @selectedSession="handleSelect"></SessionList>
          </el-card>
      </el-col>
      <el-col :span="8">

        <SessionInfo v-if="currentSession" :session="currentSession"></SessionInfo>
        <StudentForm v-if="currentSession" @refresh="handleRefresh" :session="currentSession"
        :labs="labs" :filteredStudents="students"
        :sessions="sessions"></StudentForm>

      </el-col>
      <el-col :span="8">
        <el-card>
          <div slot="header" class="clearfix">
              <h4 style="margin: 0px">Booked students</h4>
          </div>
              <BookedList :students="students" :session="currentSession"></BookedList>
          </el-card>
      </el-col>
    </el-row>

</template>
<script>
import SessionList from './SessionList.vue';
import BookedList from './BookedList.vue';
import SessionInfo from './SessionInfo.vue';

export default {
  components: [
    SessionList,
    BookedList,
    SessionInfo
  ],
  computed: mapGetters['labs','students','sessions']
  data: {
    greeting: 'Welcome to the booking app!',
    currentSession: null
  },
  methods: {
    handleRefresh: function(){
      // var oldSession = this.currentSession;
      // var key = this.currentSession['.key'];
      // var path = '/sessions/' + key;
      // var vm = this;
      // db.ref(path).once('value',function(val){
      //     console.log(val);
      //     vm.currentSession = val.val();
      // });

    },
    handleSelect: function(newVal){
      this.currentSession = newVal
    },
    humanizeURL: function (url) {
      return url
        .replace(/^https?:\/\//, '')
        .replace(/\/$/, '')
    }
  }
}

</script>
