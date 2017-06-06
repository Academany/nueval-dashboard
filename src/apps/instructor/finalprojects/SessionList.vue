<template>
    <div>
          <el-radio-group v-model="radio2" class="fixfirst">
            <el-radio v-for="s in sessions" :key="s.id" :disabled="
            parseInt(s.booked && s.booked.length || 0) >= parseInt(s.max)" :label="s.id"> 
            {{s.name}} {{s.date| moment('MM-DD-YYYY')}}
            ({{s.booked && s.booked.length || 0}})</el-radio>
          </el-radio-group>
    </div>
</template>
<script>
export default {

  props: [
    'sessions'
  ],
  data() {
   return {radio2: null}
  },
  computed: {
    loading: function(){ return this.sessions.length == 0;}
  },
  mounted() {
    if (!this.loading){
      if (this.sessions.length > 0){
        this.radio2 = this.sessions[0].id
      }
    }
  },
  watch: {
    sessions: function(val){
      if (val.length > 0){
        this.radio2 = val[0].id
        this.$emit('selectedSession',val);
      }        
    },
    radio2: function(val) {
        let sessions =  this.sessions || []
        sessions = sessions.filter((e)=>(e.id==val)) || null
        if (sessions.length > 0) {
          this.selectSession(sessions[0])
        }
    }
  },
  methods: {
    selectSession: function(val){
      this.$emit('selectedSession',val);
    }
  }
}
</script>
<style scoped>
.styled {
  padding: 0;
  margin: 0;
  line-height: 32px;
}
.fixfirst :first-child {
  margin-left: 15px;
}
</style>
