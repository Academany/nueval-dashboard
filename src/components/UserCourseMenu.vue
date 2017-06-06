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
  </div>

</template>

<script>
import {mapGetters,mapActions} from 'vuex'

export default {

  computed: {
    ...mapGetters({
      'courses' : 'instructor_app/courses',
      'currentCourse' : 'instructor_app/currentCourse'
    })
  },
  watch: {
    currentCourse(val){
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
        this.$router.push('/apps/instructor')
      }
      if (!this.currentCourse){
        this.changeCourse(null)
      }
    },
    ...mapActions({
      'changeCourse': 'instructor_app/changeCourse'
    })
  },
  data(){
    return {
      course: null
    }
  },
  mounted() {
    console.log('mounted!');
    this.course = this.currentCourse && this.currentCourse.id || null;
    // this.loadCourses(false)
  }
}
</script>
<style scoped>
.embcontrol {
  padding: 12px;
}
</style>
