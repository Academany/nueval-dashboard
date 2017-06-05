<template>
<div  v-if="!isLoggedIn">
  <el-col :span="12" :offset="6">
  <el-card>
    <div slot="header">Logging in...</div>
    <p>You will be redirected to your page</p> 
  </el-card>
  </el-row>
  </el-col>
</div>
<div v-else>
  <slot></slot>
</div>
</template>
<script>
import {
  mapGetters,
  mapActions
} from 'vuex'
export default {
  computed: {
    token() {
      return localStorage.getItem('token')
    },
    ...mapGetters(['isLoggedIn']),
  },
  data() {
    return {
      checked: false
    }
  },
  mounted() {
  
    var accessToken = this.$route.query.accessToken || localStorage.getItem('token');
    if (accessToken) {
      console.log('We have access token')
      this.checkAccessToken(accessToken).then((response) => {
        console.log(response);
        if (response.body.error) {
          console.log('Error loading auth');
          this.logout();
          return;
        }
        console.log('Access Token ok, loggin in')
        this.login({
          token: accessToken,
          userId: response.body.accessToken.userId
        }).then((success) => {
          this.$router.push('/')
        }).catch((failure) => {
          this.notify("Error", "Login failed: " +failure)
          this.$router.push('/login');
        })

      }).catch((error)=>{
        this.logout().then(()=>{
          this.$router.push('/login')
        });
      });


    } else {
      if (this.isLoggedIn) {
        return this.logout();
      } else {
        this.$router.push('/login')
      }
    }

  },
  methods: {
    checkAccessToken(token){
      console.log('Checking ' + token)
      return this.$http.get('http://localhost:3000/auth/me?access_token=' + token)
    },
    notify(title, msg) {
      const h = this.$createElement

      this.$notify({
        title: title,
        message: h('i', {
          style: 'color: teal'
        }, msg)
      });
    },
    ...mapActions(['login','logout'])
  }
}
</script>
