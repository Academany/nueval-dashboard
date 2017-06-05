<template>
  <div class="app" >
      <div class="title">
        <AppBar></AppBar>
      </div>
      <div class="sidebar">
        <SidebarMenu :apps="apps" @menuSelect="handleMenuSelect"></SidebarMenu>
      </div>
      <div class="childview">
        <router-view ></router-view>
      </div>
  </div>
</template>

<script>
import SidebarMenu from '../../components/SidebarMenu.vue'
import AppBar from '../../components/AppBar.vue'
import {mapGetters,mapActions} from 'vuex'
// or import all icons if you don't care about bundle size
import 'vue-awesome/icons'

export default {
  components:{
    SidebarMenu,
    AppBar,
  },
  methods: {
    handleMenuSelect(item){
      this.$router.push(item)
      this.changeApp(item);
    },
    ...mapActions(['changeApp'])
  },
  data (){
    return {
      selectedIndex:0,
      apps:[
        {
          'label': 'Users',
          'description': 'Create and edit Users',
          'target' : '/apps/admin/',
          'icon' : 'users'
          // 'component' : Programs
        }
      ]
    }
  }
}
</script>
<style scoped>

.apps {
  padding: 24px;
}
.header {

}
.sidebar {
  /*overflow-y: hidden;*/
  max-height: 900px;
  /* light theme
    background-color: #eef1f6; */
  /* dark theme */
  background-color: #324157;
  position: fixed;
  width: 150px;
  top: 120px;
  left: 0px;
  bottom: 0px;
}

.childview {
  position: absolute;
  left: 150px;
  right: 0px;
  top: 120px;
  bottom: 0px;

}

.inverted {
  background-color: #dedede;
}
.spacer {
  min-height: 1000px;
}
.el-row {
   margin-bottom: 20px;
   &:last-child {
     margin-bottom: 0;
   }
 }
 .title {
   text-align:left;
   position:fixed; top: 60px; width: 100%;z-index:99
 }
 .action {
   float: right;
   font-size: 14px;
   padding-top: 12px;
   padding-right: 24px;
 }
 .right {
   float: right;
 }
 .fa-vc{    margin-bottom: -2px;}
.larger {
  font-size: 120%;
}
.wrap {
  padding: 24px;
}

 </style>
 <style scoped>

 .apps {
   padding: 24px;
 }
 .header {

 }
 .sidebar {
   /*overflow-y: hidden;*/
   max-height: 900px;
   /* light theme
     background-color: #eef1f6; */
   /* dark theme */
   background-color: #324157;
   position: fixed;
   width: 150px;
   top: 120px;
   left: 0px;
   bottom: 0px;
 }

 .childview {
   position: absolute;
   left: 150px;
   right: 0px;
   top: 120px;
   bottom: 0px;

 }

 .inverted {
   background-color: #dedede;
 }
 .spacer {
   min-height: 1000px;
 }
 .el-row {
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
    }
  }
  .title {
    text-align:left;
    position:fixed; top: 60px; width: 100%;z-index:99
  }
  .action {
    float: right;
    font-size: 14px;
    padding-top: 12px;
    padding-right: 24px;
  }
  .right {
    float: right;
  }
  .fa-vc{    margin-bottom: -2px;}
 .larger {
   font-size: 120%;
 }
 .wrap {
   padding: 24px;
 }

  </style>
