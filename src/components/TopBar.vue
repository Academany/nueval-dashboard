<template>
<el-menu theme="dark" default-active="activeIndex" class="el-menu-demo" mode="horizontal" router>
<el-menu-item index="/"><router-link to="/" class="logo">{{title}}</router-link></el-menu-item>
<LoginMenu></LoginMenu>
<UserMenu v-if="isLoggedIn"/>
<el-menu-item v-if="isLoggedIn" class="right clearfix" index="notifications">
  <el-badge class="item" :value="12" >
    <fa-icon class="icon" name="comment"></fa-icon>
  </el-badge>
</el-menu-item>
<el-menu-item v-if="isLoggedIn" class="right clearfix" index="feedback">
    <el-badge class="item" :value="12" >
      <fa-icon class="icon" name="bell"></fa-icon>
    </el-badge>
    </el-menu-item>
</el-menu>

</template>
<script>
import LoginMenu from './LoginMenu.vue';
import UserMenu from './UserMenu.vue';
// or import all icons if you don't care about bundle size
import 'vue-awesome/icons'
import {mapGetters} from 'vuex'

export default {
  data(){
    return {
      "title" : "Academany portal",
      activeIndex: '1',
      activeIndex2: '1'
    }
  },
  components: {
    LoginMenu,
    UserMenu
  },
  computed: mapGetters(['isLoggedIn']),
  methods: {
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      }
  }
}
</script>
<style scoped>
.el-menu-demo {
  position:fixed; top: 0px; width: 100%;
  z-index: 99;
}
.right {
  float: right
}
.logo {
  text-decoration: none;
  font-weight: bold;
}

.item {
  /*margin-right: 40px;*/
  margin-top: 20px;
  display: inline;
}
.icon {
  margin-bottom: -5px;
}
</style>
