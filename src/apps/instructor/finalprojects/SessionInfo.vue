<template>
  <el-card>
    <div slot="header">
        <h4 style="margin:0">{{session.name}}</h4>
    </div>
      <div  v-if="session">
        <label>Starting:</label>
        <div class="field">
        {{session.date | moment("LLLL")}}
        </div>
        <br>
        <div class="red" v-if="parseInt(session.booked && session.booked.length || 0) >= parseInt(session.max)">
          Session is FULL
        </div>
        <el-row>
          <el-col :span="12">
            <label>Booked students:</label> {{session.booked && session.booked.length || 0}}</p>
          </el-col>
          <el-col :span="12">
            <label>Max Students:</label> {{session.max}}</p>
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
<style scoped>
label {
  font-weight: bold;
  text-color: red;
}
.field {
  margin-top: 20px;
  font-size: .8em;
}
</style>