<template>
  <div class="app" >
  <div class="title" >
  <AppBar>
    <div slot="header-menu">
        <el-menu-item index="">
            <router-link to="/"><fa-icon name="arrow-left"></fa-icon></router-link>
        </el-menu-item>

        <el-menu-item v-if="currentCourse" index="" :disabled="true">
            {{ currentCourse.name }}
        </el-menu-item>

          <el-menu-item v-if="activeTab && currentCourse.id" :index="activeTab.target" :disabled="true">
            <fa-icon class="fa-fix" :name="activeTab.icon"></fa-icon>  {{activeTab.label}}
          </el-menu-item>

        <slot name="header-menu"></slot>
        <CourseMenu v-if="currentCourse" class="right clearfix" />
      </div>
  </AppBar>
  </div>
  <div class="body" v-if="show == 'select'">
    <div class="wrap">
      <CourseSelect @courseChange="handleCourseChange" @newCourse="handleNewCourse" :courses="courses"/>
    </div>
  </div>
  <div class="body" v-if="show == 'dashboard'">
  <div :class="{sidebar: true, full: fullSidebar }">
        <SidebarMenu :label="fullSidebar"  :apps="apps" @menuSelect="handleMenuSelect" @toggleMenu="handleToggleMenu"></SidebarMenu>
  </div>
  <div :class="{childview: true, slim: fullSidebar}">
      <router-view ></router-view>
  </div>
</div>
</div>
</template>

<script>
import CourseMenu from '../../components/CourseMenu.vue'
import CourseSelect from '../../components/CourseSelect.vue'
import SidebarMenu from '../../components/SidebarMenu.vue'
import AppBar from '../../components/AppBar.vue'

import {mapGetters,mapActions} from 'vuex'
// or import all icons if you don't care about bundle size
import 'vue-awesome/icons'

export default {
  components:{
    CourseMenu,
    SidebarMenu,
    CourseSelect,
    AppBar
  },
  methods: {
    handleToggleMenu(){
      // this.fullSidebar = !this.fullSidebar
    },
    handleCourseChange(newCourse){
      // console.log('New course is ' + newCourse);
      this.changeCourse(newCourse);
    },
    handleMenuSelect(item){
      this.$router.push(item)
      this.changeApp(item)
    },
    handleNewCourse(){
      const item = '/apps/manager/courses'
      this.$router.push(item)
      this.changeApp(item)
    },
    ...mapActions(['changeCourse','changeApp'])
  },

  computed: {
    show() {
      if (!this.currentCourse.id && !this.$route.path.startsWith('/apps/manager/courses')){
        if (this.$route.path != '/apps/manager'){
          this.$router.push('/apps/manager')
        }
        return 'select';
      }
      if (this.currentCourse.id || this.$route.path.startsWith('/apps/manager/courses'))
        return 'dashboard';
      return false;
    },
    activeTab() {
      var path =  this.$route.path;
      var filtered = this.apps.filter((el) => el.target.startsWith(path))
      var tab =  filtered.length > 0 ? filtered[0] : null
      return tab;
    },
    ...mapGetters(['currentCourse','courses'])
  },
  mounted(){
    // this.$store.dispatch("changeCourse",'fabacademy2017')
    this.changeApp('/apps/manager')
  },
  data (){
    return {
      fullSidebar: true,
      selectedIndex:0,
      apps:[
        {
          'label': 'Home',
          'description': 'Create and edit courses',
          'target' : '/apps/manager',
          'icon' : 'home'
          // 'component' : Programs
        },
        {
          'label': 'Labs',
          'description': 'Create and edit labs, assign instructors to labs',
          'target' : '/apps/manager/labs',
          'icon' : 'flask'
          // 'component' : Programs
        },
        {
          'label': 'Supernodes',
          'description': 'Create and edit supernodes, assign labs to supernodes',
          'target' : '/apps/manager/supernodes',
          'icon' : 'user-md'
          // 'component' : Programs
        },
        {
          'label': 'Instructors',
          'description': 'Create and edit instructors',
          'target' : '/apps/manager/instructors',
          'icon' : 'user-secret'
          // 'component' : Programs
        },
        {
          'label': 'Students',
          'description': 'Create and edit students',
          'target' : '/apps/manager/students',
          'icon' : 'users'
          // 'component' : Programs
        },
        {
          'label': 'Final Projects',
          'description': 'Manage Final projects presentations and tracking',
          'target' : '/apps/manager/finalprojects',
          'icon' : 'rocket'
        },
        {
          'label': 'Evaluations',
          'description': 'Manage Evaluation sessions',
          'target' : '/apps/manager/evaluations',
          'icon' : 'graduation-cap'
        },
        {
          'label': 'Settings',
          'description': 'Edit Course Settings',
          'target': '/apps/manager/settings',
          'icon': 'gear'
        },
        {
          'label': 'Other courses',
          'description': 'Create and edit courses',
          'target' : '/apps/manager/courses',
          'icon' : 'home'
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
  width: 36px;
  top: 120px;
  left: 0px;
  bottom: 0px;
}

.sidebar.full {
  width: 150px;
}

.childview {
  position: absolute;
  left: 36px;
  right: 0px;
  top: 120px;
  bottom: 0px;
}
.childview.slim {
  left: 151px;
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
