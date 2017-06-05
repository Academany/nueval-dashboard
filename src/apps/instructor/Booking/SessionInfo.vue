<template>
  <el-card>
    <div slot="header">
        <h4 style="margin:0">Current Session</h4>
    </div>
      <div  v-if="session">
        {{session.name}}
        <p>Starting:<br><br>
        {{session.date}}
        09:00 am Eastern - UTC-05:00
        </p>
        <el-row>
          <el-col :span="12">
            <p>Booked students: {{session.students && Object.keys(session.students).length || 0}}</p>
          </el-col>
          <el-col :span="12">
            <p>Max Students: {{session.max_students}}</p>
          </el-col>
        </el-row>

      </div>
      <div v-else>
        Select a session
      </div>

  </el-card>
</template>
<script>
export default {
  props: [
    'session'
  ]
}
</script>
