<template>
  <div>
    <el-row>
      <el-col :offset="8" :span="8">
    <el-card class="box-card">
      <h2>Please login</h2>

    <div class="btn-container">
    <el-button ref="btn" type="success" size="large" @click="loginWithFablabs">Login with fablabs.io</el-button>
  </div>
  </el-card>
</el-col>
</el-row>

  </div>
</template>
<script>
import {mapGetters} from 'vuex'
import config from '../config'
export default {
  methods:{
    loginWithFablabs(){
        document.location.href=config.api_url + "/auth/fablabs";
    }
  },
  computed: mapGetters(['isLoggedIn']),
}
</script>
<style scoped>
.box-card {
  margin-top: 100px;
}
h2 {
  width: 100%;
  text-align: center;
}
.btn-container {
  width: 100%;

  text-align: center;
}
</style>
