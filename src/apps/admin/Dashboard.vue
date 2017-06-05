<template>
  <div class="app" >
  <div class="title" >
  <el-menu router mode="horizontal" theme="light" class="nofrills">
    <el-menu-item index="">
        <router-link to="/"><fa-icon name="arrow-left"></fa-icon></router-link>
    </el-menu-item>

    <slot name="header-menu">
           <el-menu-item v-if="activeTab" :index="activeTab.target" :disabled="true">
            <fa-icon style="margin-bottom: -3px" :name="activeTab.icon"></fa-icon>  {{activeTab.label}}
          </el-menu-item>
    </slot>
  </el-menu>
  </div>

  <div class="sidebar">
      <SidebarMenu :apps="apps" :label="true" :collapse="false" @menuSelect="handleMenuSelect" @toggleMenu="handleToggleMenu" />
  </div>
  <div class="childview">
    <router-view ></router-view>
  </div>
</div>
</div>
</template>

<script>
import SidebarMenu from '../../components/SidebarMenu.vue'
import {mapGetters,mapActions} from 'vuex'
// or import all icons if you don't care about bundle size
import 'vue-awesome/icons'

export default {
  components:{
    SidebarMenu
  },
  methods: {
    handleToggleMenu(){

    },
    handleMenuSelect(item){
      this.$router.push(item)
      this.$store.dispatch("changeApp",item)
    }
  },
  computed: {
      activeTab() {
          var path =  this.$route.path;
          var filtered = this.apps.filter((el) => el.target.startsWith(path))
          var tab =  filtered.length > 0 ? filtered[0] : null
          return tab;
      }
  },
  mounted(){

  },
  data (){
    return {
      selectedIndex:0,
      apps:[
        {
          'label': 'Users',
          'description': 'Create and edit Users',
          'target' : '/apps/admin/users',
          'icon' : 'users'
          // 'component' : Programs
        },
        {
          'label': 'Roles',
          'description': 'Create and edit Roles',
          'target' : '/apps/admin/roles',
          'icon' : 'key'
          // 'component' : Programs
        },
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
