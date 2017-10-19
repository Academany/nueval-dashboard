<template>
  <el-row>
    <el-col :span="14" :offset="5">
      <h3></h3>
      <p>Before starting we need to select a course
        <span v-if="!hideCreate" , or create a new one</span>
      </p>
      <el-row>
        <el-col :span="11">
          <el-card class="box-card">
            <div slot="header">
              <h1 style="margin:0">Select a course</h1>
            </div>
            <el-select size="large" v-model="myCourse" placeholder="Select">
              <el-option v-for="course in courses" :key="course.id" :label="course.name" :value="course">
              </el-option>
            </el-select>
          </el-card>
        </el-col>
        <el-col :span="11" :offset="1" v-if="!hideCreate">
          <el-card class="box-card">
            <div slot="header">
              <h1 style="margin:0">Create a course</h1>
            </div>
            <el-button type="success" size="large" @click="newCourse">Create new course</el-button>
          </el-card>
        </el-col>
      </el-row>

    </el-col>
  </el-row>
  <!-- ADD LOADING -->
</template>
<script>
export default {
  props: [
    'courses',
    'hideCreate'
  ],
  data() {
    return {
      myCourse: null
    }
  },
  watch: {
    myCourse(newVal) {
      this.$emit('courseChange', newVal)
    },
    courses(newVal) {
      if (newVal && newVal.length == 1) {
        this.$emit('courseChange', newVal[0])
      }
    }
  },
  mounted() {
    // if (this.courses && this.courses.length == 1) {
    // this.$emit('courseChange', this.courses[0])
    // }
  },
  methods: {
    changeCourse(course) {
      // console.log('Got ' + JSON.stringify(course));
      this.$emit('courseChange', course)
    },
    newCourse() {
      this.$emit('newCourse')
    }
  }
}
</script>
<style scoped>
.right {
  text-align: right;
}

.centered {
  text-align: center;
}
</style>