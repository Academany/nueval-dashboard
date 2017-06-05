<template>
  <el-row type="flex">
    <el-col :lg="{ span: 18, offset: 3}">
      <div class="apps" v-if="apps && apps.length > 0">
        <el-row  :gutter="12">
           <el-col :xs="24" :sm="8" :md="8" :lg="8" :key="app.target"  v-for="app in apps">
             <div class="grid-content">
               <AppCard :item="app"></AppCard>
             </div>
           </el-col>
        </el-row>
      </div>
      <div v-if="apps.length == 0">
        No apps available for you at the moment.
      </div>
    </el-col>
  </el-row>
</template>
<script>
import AppCard from './AppCard.vue'
import lodash from 'lodash'

export default {
  components: {
    AppCard
  },
  props: [
    'apps'
  ],
}

</script>
<style scoped>
.apps {
  padding: 24px;
}
.el-row {
   margin-bottom: 20px;
   &:last-child {
     margin-bottom: 0;
   }
}
</style>
