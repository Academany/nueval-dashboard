<template>
  <div class="sheet">
      <div class="block">
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="General" name="general">
            <GeneralTab></GeneralTab>
          </el-tab-pane>
         <el-tab-pane label="Labs" name="labs">
           <LabsTab></LabsTab>
         </el-tab-pane>
         <el-tab-pane label="Students" name="students">
           <StudentsTab></StudentsTab>
         </el-tab-pane>
         <el-tab-pane label="Instructors" name="instructors">
           <InstructorsTab/>
         </el-tab-pane>
         <el-tab-pane label="Global Eval" name="evaluators">
           <EvaluatorsTab />

         </el-tab-pane>
       </el-tabs>
      </div>
  </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
import LabsTab from './LabsTab.vue'
import StudentsTab from './StudentsTab.vue'
import GeneralTab from './GeneralTab.vue'
import EvaluatorsTab from './EvaluatorsTab.vue'
import InstructorsTab from './InstructorsTab.vue'

export default{
  components: {
      LabsTab, StudentsTab, GeneralTab,  EvaluatorsTab, InstructorsTab
  },
  data() {
     return {
       activeName: 'general'
     }
   },
     methods: {
     handleClick(tab, event) {
       console.log(tab, event);
     }
   },

}
</script>
<style scoped>
.sheet {
  margin-left: 23px;
}
</style>
