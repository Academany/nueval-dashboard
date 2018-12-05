<template>
  <div v-if="loading">
    <el-row>
      <el-col :span="12" :offset="6">
        <el-card>
          <h1>Loading...</h1>
          <p>Please wait, loading your dashboard</p>
          <el-progress :percentage="loaded"></el-progress>
        </el-card>
      </el-col>
    </el-row>
  </div>
  <div v-else>
    <div v-if="booted">
      <router-view></router-view>
    </div>
    <div v-else>
      <el-row v-if="filteredRoles.length > 1">
        <el-col :span="12" :offset="6">
          <el-card>
            <p>Looks like you are a student in more than one course</p>
            <p>Please select a course</p>
            <el-select v-model="selectedRole">
              <el-option
                v-for="role in filteredRoles"
                :label="role.student.course.name"
                :value="role"
                :key="role.role"
              ></el-option>
            </el-select>
            <el-button @click="launchApp">Start</el-button>
          </el-card>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";

export default {
  data() {
    return {
      loading: false,
      loaded: 0,
      selectedRole: null,
      showSelect: false,
      booted: false
    };
  },
  computed: {
    ...mapGetters({
      userRoles: "apps/userRoles"
    }),
    filteredRoles() {
      const roles = this.userRoles || [];

      return roles.filter(el => {
        // console.log(el.student);
        return el.role === "student";
      });
    }
  },
  methods: {
    launchApp: function() {
      //   alert('boot')
      var vm = this;
      this.booted = true;
      this.bootApp(this.selectedRole.student)
        .then(success => {
          vm.loading = false;
          vm.loaded = 100;
          // vm.$nextTick(function(){
          console.log("App boot ok!");
          vm.$router.push("/apps/student/d/home");
          // });
        })
        .catch(error => {
          console.log("App boot fail");
          vm.loading = false;
          vm.loaded = 0;
          // vm.$nextTick(function(){
          // vm.$router.push('/apps/student/error')
          // });
          vm.$nextTick(function() {
            vm.$router.push("/");
          });
        });
    },
    ...mapActions({
      bootApp: "student_app/bootApp",
      loadInstalledApps: "apps/loadInstalledApps"
    })
  },
  mounted() {
    const vm = this;
    this.loadInstalledApps()
      .then(success => {
        if (vm.filteredRoles.length == 1) {
          vm.selectedRole = vm.filteredRoles[0];
          console.log(vm.selectedRole);
          vm.$nextTick(function() {
            vm.launchApp();
          });
        }
      })
      .catch(error => {
        console.log("Something bad happened");
        console.log(error);
        vm.$nextTick(function() {
          vm.$router.push("/");
        });
      });
  }
};
</script>

