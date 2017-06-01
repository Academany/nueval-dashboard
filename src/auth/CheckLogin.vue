<template>
</template>
<script>
import {mapGetters,mapActions} from 'vuex'


  export default {
    computed: {
      token(){
        return localStorage.getItem('token')
      },
      ...mapGetters(['isLoggedIn']),
    },
    data() {
      return {checked: false}
    },
    mounted(){
      var accessToken = this.$route.query.accessToken || localStorage.getItem('token');
      // debugger
      if (accessToken) {
        this.$http.get('http://localhost:3000/auth/me?access_token=' + accessToken).then( response => {
          // console.log(response);
          if (response.body.error){
            console.log('Error loading auth');
              this.logout();
              return;
          }
          console.log('Access Token ok, loggin in')
          this.doLogin({
            token: accessToken,
            userId: response.body.accessToken.userId
          });

        },response => {
          console.log('Error!')
          console.log(response);
          // this.$router.push('/login');
          this.logout();
        });

      } else {
        if (!this.isLoggedIn) {

          this.$router.push('/login');
        }
      }

    },
    methods: {
       doLogin(params){
          this.$store.dispatch("login", {
            params
          }).then(() => {
            this.$router.push("/")
          });
      },
      ...mapActions(['logout'])
    }
  }
</script>
