<template>
  <div>
    <el-radio-group v-model="radio2" class="fixfirst">
      <el-radio v-for="s in sessions" :key="s.id" :disabled="
                                                                                            parseInt(s.booked && s.booked.length || 0) >= parseInt(s.max)" :label="s.id">
        {{s.name}} {{s.date| moment('MM-DD-YYYY')}} ({{s.booked && s.booked.length || 0}})</el-radio>
    </el-radio-group>
  </div>
</template>
<script>

const bookable = function (sessions) {
  const available = sessions
  const candidates = available.filter((s) => {
    return !s.booked || (parseInt(s.booked.length || 0) < parseInt(s.max))
  })
  return (candidates.length > 0) ? candidates[0] : null;
}

export default {

  props: [
    'sessions'
  ],
  data() {
    return { radio2: null }
  },
  computed: {
    loading: function () { return this.sessions.length == 0; }
  },
  mounted() {
    if (!this.loading) {
      const candidate = bookable(this.sessions)
      if (candidate) {
        this.radio2 = candidate.id
        this.$emit('selectedSession', candidate);

      }
    }
  },
  watch: {
    sessions: function (val) {
      const candidate = bookable(val)
      if (candidate) {
        this.radio2 = candidate.id
        this.$emit('selectedSession', candidate);
      }
    },
    radio2: function (val) {
      let sessions = this.sessions || []
      sessions = sessions.filter((e) => (e.id == val)) || null
      if (sessions.length > 0) {
        this.selectSession(sessions[0])
      }
    }
  },
  methods: {
    selectSession: function (val) {
      this.$emit('selectedSession', val);
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
