<template>
<el-submenu class="right clearfix" index="profile">
<template slot="title" v-if="!userProfile">{{title}}</template>
<template slot="title" v-if="userProfile && userProfile.username">
  <img :src="userProfile.avatar" class="avatar">
  <span class="username">{{userProfile.username}}</span>
</template>
<el-menu-item index="/profile/account">Account</el-menu-item>
</el-submenu>
</template>
<script>
import endpoint from '../api/endpoint'
import {mapGetters,mapActions} from 'vuex'
export default {
  data(){
    return {
      title: 'User Profile'
    }
  },
  computed: mapGetters(['userProfile']),
  mounted(){
    // setInterval(()=>{
       this.refreshData()
    // }, 1000);
  },
  methods: {
    refreshData(){
      endpoint.get(this,'/me/profile', (err,response) => {
       if (err) {
         console.log(err)
         // this.$router.push('/login')
        //  setInterval(()=>{this.refreshData()}, 1000);
          this.logout();
         return;
       }
       // console.log(response)
       let userProfile = response.body.user.identities[0].profile;
       this.$store.dispatch("setUserProfile",userProfile);
     });
   },
    ...mapActions(['logout'])
  }
}
</script>
<style scoped>
.avatar{
  float: left;
  margin-right: 12px;
  width: 32px;
  margin-top: 12px;
  border-radius: 12px;
}
</style>
