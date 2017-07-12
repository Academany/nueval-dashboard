<template>
  <el-submenu class="right clearfix" v-if="userProfile && userProfile.username" index="profile">
    <template slot="title" v-if="userProfile && userProfile.username">
      <img v-if="avatar" :src="avatar" class="avatar">
      <span class="username">{{userProfile.username}}</span>
    </template>
    <el-menu-item index="/profile/account">Account</el-menu-item>
  </el-submenu>
</template>
<script>
import endpoint from '../api/endpoint'
import { mapGetters, mapActions } from 'vuex'
export default {
  data() {
    return {
      title: 'User Profile'
    }
  },
  computed: {
    avatar() {
      let ret = null;
      // console.log(this.userProfile)
      if (this.userProfile && this.userProfile.avatar) {
        if (this.userProfile.avatar.indexOf('/') === 0)
          ret = 'https://www.fablabs.io' + this.userProfile.avatar
        else
          ret = this.userProfile.avatar
      }
      // console.log('Avatar ' + ret)
      return ret;
    },

    ...mapGetters(['userProfile', 'isLoggedIn']),
  },
  mounted() {
    // setInterval(()=>{
    //  this.refreshData()
    // }, 1000);
    this.refreshData()
  },
  watch: {
    isLoggedIn: (val) => {
      if (val) {
        this.refreshData()
      }
    }
  },
  methods: {
    refreshData() {
      endpoint.get(this, '/me/profile', (err, response) => {
        if (err) {
          console.log(err)
          // this.$router.push('/login')
          //  setInterval(()=>{this.refreshData()}, 1000);
          this.logout();
          return;
        }
        // console.log(response)
        let userProfile = response.body.user;
        this.$store.dispatch("setUserProfile", userProfile);
      });
    },
    ...mapActions(['logout'])
  }
}
</script>
<style scoped>
.avatar {
  float: left;
  margin-right: 12px;
  width: 32px;
  margin-top: 12px;
  border-radius: 12px;
}
</style>
