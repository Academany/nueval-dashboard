<template>
  <div>
    <CheckLogin>
      <!--<template scope="scope">-->
        <el-row >

        <el-col :lg="{ span: 18, offset: 3}"
               >
            <h3 v-if="userProfile.username" style="margin-left: 24px">Hi {{userProfile.username}}!</h3>
            <div v-if="isLoading">Loading apps...</div>
        </el-col>
        </el-row>
        <AppsGrid :apps="apps" v-if="apps && apps.length > 0"/>
      <!--</template>-->
    </CheckLogin>
  </div>
</template>

<script>
import availableApps from '../apps/index'
import AppsGrid from '../components/AppsGrid.vue'
import CheckLogin from '../auth/CheckLogin.vue'
import {
  mapGetters,
  mapActions
} from 'vuex'
export default {
  components: {
    AppsGrid,
    CheckLogin
  },
  // watch: {
  //   installedApps: function(installed){
  //       console.log(installed)
  //   }
  // },
  computed: {
    ...mapGetters({
      'isLoggedIn': 'isLoggedIn',
      'installedApps': 'apps/installedApps',
      'isLoading': 'apps/isLoading',
      'userProfile': 'userProfile'
    }),
    apps() {
      if (!this.isLoggedIn || this.isLoading) return [];
      console.log('reading apps')
      var ids = this.installedApps;
      let filtered = availableApps.filter((a) => {
        return (ids.indexOf(a.id) != -1);
      });
      console.log("returning");
      console.log(filtered);
      return filtered;
    },
  },
  watch: {
    isLoggedIn: (val) => {
      process.nextTick(() => {
        if (this.isLoggedIn && !this.isLoading)
          this.loadInstalledApps()
      })
    }
  },
  methods: {
    ...mapActions({
      'loadInstalledApps': 'apps/loadInstalledApps'
    }),
    startHacking() {
      if (!this.isLoggedIn) return;
      let localStore = window.localStorage;
      if (localStore.getItem('nag1')) {
        console.log('skipping nag this time');
      } else {
        this.$notify.success({
          title: 'This is your dashboard',
          message: 'Select one of the apps to start',
          duration: 6000,
          offset: 72
        })
        localStore.setItem('nag1', 'ok')
      }
    },
    loadIfLoggedIn() {
      if (this.isLoggedIn && !this.isLoading) {
        this.loadInstalledApps();
      } else {
        setTimeout(
          this.loadIfLoggedIn,
          1000
        )
      }
    },
    mounted() {
      this.loadIfLoggedIn()
    }
  }
}
</script>
