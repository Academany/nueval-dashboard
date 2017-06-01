<template>
  <div>
    <CheckLogin/>

  <AppsGrid :apps="apps"/>
</div>
</template>

<script>
import apps from '../apps/index'
import AppsGrid from '../components/AppsGrid.vue'
import CheckLogin from '../auth/CheckLogin.vue'
import {mapGetters} from 'vuex'
console.log(apps)
export default {
  components: {
    AppsGrid,
    CheckLogin
  },
  data () {
    return {
      apps
    }
  },
  computed: mapGetters(['isLoggedIn']),
  methods: {
      startHacking () {
        if (!this.isLoggedIn) return;
        let localStore = window.localStorage;
        if (localStore.getItem('nag1')) {
          console.log('skipping nag this time');
        } else {
          this.$notify.success({
            title: 'This is your dashboard',
            message: 'Select one of the apps to start',
            duration: 6000,
            offset: 72
          })
          localStore.setItem('nag1','ok')
        }
      }
  },
  mounted (){
    this.startHacking();
  }
}
</script>
