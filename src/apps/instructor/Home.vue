<template>
<div class="sheet">
<h1>Instructor home</h1>
<div v-if="instructor">
<h3>Hi!   {{ instructor.username }}</h3>

<p>You mentor the following labs in this course</p>
<ul>
<li :key="lab.lab_id" v-for="lab in instructor.labs">
   {{lab.name }}, {{lab.country}}
</li>
<li v-if="instructor.labs.length == 0">
    No labs found, check you are using the right FabLabs.io account!
</li>
</ul>
</div>
<div v-else>
<p>Loading your data...</p>
</div>

</div>
</template>
<script>
import {mapGetters} from 'vuex'
export default {
  computed: mapGetters({
      instructor: 'instructor_app/instructor'
  })
}
</script>

<style scoped>
.sheet {
    margin-left: 24px;
}
</style>