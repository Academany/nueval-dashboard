<template>
<el-menu-item v-if="!isLoggedIn" class="right clearfix" index="/login">Login</el-menu-item>
<el-menu-item v-else  class="right clearfix" index='/' @click="logout()">Logout</el-menu-item>
</template>
<script>
import Vuex from 'vuex'
export default {
  data(){
    return {}
  },
  methods: {
    ...Vuex.mapActions(["logout"])
  },
  computed: {
    ...Vuex.mapGetters(["isLoggedIn"])
  }
}
</script>
