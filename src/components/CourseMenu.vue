<template>
  <div class="embcontrol" :disabled="true">
    <el-select v-model="course" @change="handleSelect" placeholder="Select a course">
        <el-option
          v-for="item in courses"
          :key="item.id"
          :label="item.name"
          :value="item.id"
          :disabled="!item.active"
          >
        </el-option>

      </el-select>
      <router-link to="/apps/manager/courses">
        <fa-icon name="gear"></fa-icon>
      </router-link>
  </div>

</template>

<script>
import {mapGetters,mapActions} from 'vuex'

export default {
  computed: {
    ...mapGetters(['courses','currentCourse'])
  },
  watch: {
    currentCourse(val){
      // console.log('currentCourse changed to' + JSON.stringify(val))
      this.course = (val && val.id) ? val.id : null;
      // console.log(this.course);
    }
  },
  methods: {
    handleSelect(value){
      // console.log('selected ' + JSON.stringify(value))
      var courses = this.courses.filter((el)=>el.id===value)
      var selected = courses.length > 0 ? courses[0] : null;
      if (selected) {
        this.changeCourse(selected)
        // this.$router.push('/apps/manager')
      }
      if (!this.currentCourse){
        this.changeCourse(null)
      }
    },
    ...mapActions(['loadCourses','changeCourse'])
  },
  data(){
    return {
      course: null
    }
  },
  mounted() {
    console.log('mounted!');
    this.course = this.currentCourse.id || null;
    this.loadCourses(false)
  }
}
</script>
<style>
.embcontrol {
  padding: 12px;
}
</style>
