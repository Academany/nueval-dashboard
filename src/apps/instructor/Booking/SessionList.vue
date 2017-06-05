<template>
  <div>
      <p v-if="loading">
        <el-button :loading="loading">Loading...</el-button></p>
      <ul>
          <li v-for="s in sessions" @click="selectSession(s)">
            <a href="#">{{s.session}}</a>
          </li>
      </ul>
    </div>
</template>
<script>
export default {
  template: '#session-list',
  props: [
    'sessions'
  ],
  computed: {
    loading: function(){ return this.sessions.length == 0;}
  },
  methods: {
    selectSession: function(val){
      this.$emit('selectedSession',val);
    }
  }
}
</script>
