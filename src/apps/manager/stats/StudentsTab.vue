<template>
  <div class="tab">
    <div v-if="labs && labs.length > 0">
      Select lab  <el-select v-model="selectedLabIdx" placeholder="Select a lab" @change="selectLabChange">
       <el-option
         v-for="(item,index) in labs"
         :key="item.id"
         :label="item.name"
         :value="index">
       </el-option>
     </el-select>
    </div>
    <div v-else>

      Loading labs...
    </div>

    <div v-if="selectedLab && students.length == 0">
        <br><br>
      Loading students...
    </div>
    <div v-if="selectedLab && students.length > 0">
      <p>Local evaluation</p>
      <el-table
        :data="tableData"
        stripe
        style="margin-right: 12px;">
        <el-table-column
          prop="username"
          label="student"
          width="180">
        </el-table-column>
        <el-table-column
          prop="status"
          label="status"
          width="130">
          <template slot-scope="scope">
            <el-button size="mini" :type="scope.row.status === 'graduated' ? 'success' : 'secondary'">{{scope.row.status}}</el-button>
          </template>
        </el-table-column>
        <el-table-column
          v-for="mod,idx in modules"
          :label="'w' + (idx+1)"
          :key="idx"
        > <template slot-scope="scope">
          <div v-if="scope.row.has_progress">
            <div v-if="scope.row.sheet && scope.row.sheet.records[idx] && scope.row.sheet.records[idx].progress">
               <el-tooltip class="item" effect="dark" :content="mod.name" placement="top">
                 <el-button size="mini" :type="scope.row.sheet.records[idx].progress==100 ? 'success' : 'secondary'">{{scope.row.sheet.records[idx].progress}}%</el-button>
               </el-tooltip>
            </div>
          </div>
        </template>
        </el-table-column>

      </el-table>
    </div>

  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  mounted() {
    // console.log(this.currentCourse)
    this.loadLabs(this.currentCourse.id);
    this.loadModules(this.currentCourse.id)
  },
  data(){
    return {
      selectedLabIdx: null,
      selectedLab: null,
      students: []
    }
  },
  methods:{
    selectLabChange(newVal){
      console.log(newVal)
      var vm = this
      if (newVal >= 0){
        vm.selectedLab = vm.labs[newVal]
        vm.students = []
        vm.$nextTick(()=>{
          console.log('loading ' + vm.selectedLab.id)
          vm.loadStats(vm.selectedLab.id).then((res)=>{
            console.log(res)
            vm.students = res.stats
          }).catch((error)=>{
            console.log(error)
            vm.$notify({title: "Error", message:  error})
          })
        })
      } else {
        vm.selectedLab = null
      }
    },
    ...mapActions({loadLabs: 'loadLabs',
                   loadModules: "loadModules",
                   loadStats: 'manager_app/loadStats'})
  },
  computed:{
    tableData(){
      return this.students.map((s)=>{
        let status = 'registered'
        if (s.dropped) status='dropped'
        else if (s.next_cycle) status='next cycle'
        else if (s.graduated) status='graduated'
        // console.log(s.progress)
        let has_progress = false
        let sheet
        if (s.progress && s.progress.length > 0){
          has_progress = true
          const localEvals = s.progress.filter((p)=>{
            return (p.evaluation.kind == 'local')
          })
          sheet = localEvals.length ? localEvals[0] : null
        }
        return {
          username: s.first_name + ' ' + s.last_name,
          status: status,
          has_progress: has_progress,
          sheet: has_progress ? sheet : []}
      })
    },
    ...mapGetters(['labs','modules','currentCourse'])
  }
}
</script>
<style>
.tab {
  padding-top: 12px
}
</style>
