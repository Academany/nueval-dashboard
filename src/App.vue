<template>
  <div id="app">
    
    <TopBar/>

     <router-view></router-view>
  </div>
</template>

<script>
import TopBar from "./components/TopBar.vue"
import {mapGetters,mapActions} from 'vuex'

export default {
  data () {
    return {
      title: 'Academany Portal'
    }
  },
  components: {
    TopBar
  },
  computed: mapGetters(['isLoggedIn']),
  created(){
    localStorage.removeItem('nag1');
  },
  mounted(){

  }
}
</script>

<style>
h1, h2, h3, h4 {
  font-weight: bold;
  font-family: 'Ubuntu Condensed', sans-serif;
}
body {
  font-family: 'Open Sans', sans-serif;
  padding: 0;
  margin: 0;
  margin-top: 120px;
}
</style>
