<template>
  <div class="app" >
  <div class="title" >
    <el-menu mode="horizontal" defaultActive="/" theme="light" class="nofrills">
          <el-menu-item index="/">
            <router-link to="/"><fa-icon name="arrow-left"></fa-icon></router-link>
         </el-menu-item>

        <el-menu-item v-if="currentCourse" index="" :disabled="true">
            {{ currentCourse.name }}
        </el-menu-item>

        <CourseMenu v-if="currentCourse"  class="right clearfix" />
    </el-menu>
  </div>
  <div class="body" v-if="show == 'select'">
    <div class="wrap">
      <CourseSelect @courseChange="handleCourseChange" :hideCreate="true" :courses="courses"/>
    </div>
  </div>
  <div class="body" v-if="show == 'dashboard'">
      <div :class="{sidebar: true, full: fullSidebar }">
          <SidebarMenu :apps="apps" :label="true" :collapse="false" @menuSelect="handleMenuSelect" @toggleMenu="handleToggleMenu" />
      </div>
      <div :class="{childview: true, slim: fullSidebar}">
          <router-view ></router-view>
      </div>
  </div>
</div>
</template>

<script>
import CourseMenu from '../../components/UserCourseMenu.vue'
import CourseSelect from '../../components/CourseSelect.vue'
import SidebarMenu from '../../components/SidebarMenu.vue'
import AppBar from '../../components/AppBar.vue'

import {mapGetters,mapActions} from 'vuex'
// or import all icons if you don't care about bundle size
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
    getInstructor(courseId) {
      var roles = this.userRoles
      const instructRoles =  roles.filter((userRole) => {
          return userRole.role === 'instructor'
      });
      const res= instructRoles.filter((userRole) => {
          return (userRole.instructor.courseId === courseId);
      })
      if (res && res.length > 0 ) return res[0];
      return null;
    },
    ...mapActions({
      'loadInstructor' : 'instructor_app/loadInstructor',
      'loadCourses' : 'instructor_app/loadCourses',
      'changeCourse' : 'instructor_app/changeCourse',
      'changeApp': 'instructor_app/changeApp',
      'loadInstalledApps': 'apps/loadInstalledApps'
    })
  },

  computed: {
    show() {
      if (!this.currentCourse.id){
        if (this.$route.path != '/apps/instructor'){
          this.$router.push('/apps/instructor')
        }
        return 'select';
      }
      if (this.currentCourse.id )
        return 'dashboard';
      return false;
    },
    activeTab() {
      var path =  this.$route.path;
      var filtered = this.apps.filter((el) => el.target.indexOf(path)==0)
      var tab =  filtered.length > 0 ? filtered[0] : null
      return tab;
    },
    ...mapGetters({
      'instructor' : 'instructor_app/instructor',
      // 'getInstructor' : 'apps/getInstructor',
      'userRoles': 'apps/userRoles',
      'instructorCourses': 'apps/instructorCourses',
      'currentCourse':'instructor_app/currentCourse',
      'courses': 'instructor_app/courses'
    })
  },
  mounted(){
    // this.$store.dispatch("changeCourse",'fabacademy2017')
    //
    const vm = this;
    this.$nextTick(function(){

        vm.loadInstalledApps().then((success) => {
        
          if (vm.currentCourse && vm.currentCourse.id) {
            const instr =  vm.getInstructor(vm.currentCourse.id)
            if (instr && instr.instructor) {
              console.log('Found instructor')
              console.log(instr.instructor)
              vm.loadInstructor(instr.instructor.id)
            }
          }
          if (this.instructorCourses){
            vm.loadCourses(this.instructorCourses)
          }
        }).catch((error)=>{
          console.log('error')
          console.log(error)
          // this.$router.push('/')
        });
    })

    this.changeApp('/apps/instructor')
  },
  watch: {
    currentCourse(val){
      if (val){
        const instr =  this.getInstructor(val.id)
        console.log(instr)
        if (instr && instr.instructor) {
          console.log(instr.instructor)
          this.loadInstructor(instr.instructor.id)
        }
      }
    }
  },
  data (){
    return {
      fullSidebar: true,
      selectedIndex:0,
      apps:[

        {
          'label': 'Home',
          'description': 'Home',
          'target' : '/apps/instructor/',
          'icon' : 'home'
          // 'component' : Programs
        },
        {
          'label': 'Students',
          'description': 'Monitor student progress',
          'target' : '/apps/instructor/students',
          'icon' : 'users'
          // 'component' : Programs
        },
        {
          'label': 'Final Projects',
          'description': 'Manage Final projects presentations and tracking',
          'target' : '/apps/instructor/finalprojects',
          'icon' : 'rocket'
        },
        {
          'label': 'Evaluations',
          'description': 'Manage Evaluation sessions',
          'target' : '/apps/instructor/evaluations',
          'icon' : 'graduation-cap'
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
