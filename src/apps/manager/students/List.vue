<template>
<MDView>
  <MLTable
    slot="master"
    ref="masterTable"
    :value="students"
    :selectedRow="selectedRow"
    :tableColumns="tableColumns"
    @select="handleSelect"
    @edit="handleEdit"
    @delete="handleDelete"/>
  <MDDetailView :entity="entity"
                :selectedRow="selectedRow"
                v-model="tabs"
                @newItem="handleNew"
    slot="detail">
    <BasicDetail :item="selectedRow"
                  slot="tab-content-0"
                  @cancelEdit="handleCancel"/>
    <BasicDetail :item="selectedRow" slot="tab-content-1"/>
  </MDDetailView>
</MDView>
</template>

<script>
import MDDetailView from '../../../components/MDDetailView.vue'
// import MLHeader from './Header.vue'
import MLTable from '../../../components/MDTable.vue'
import MDView from '../../../components/MDView.vue'
import MDNotImplemented from '../../../components/MDNotImplemented.vue'
import lodash from 'lodash'
import BasicDetail from './Detail.vue'
import {mapGetters,mapActions} from 'vuex'

let startId=0
//
// lodash.forEach(sampleData.data, (el)=>{
//   el.id = ++startId;
//   el.supernode = 'nosupernode';
//   el.isSupernode = false;
// })

export default {
  components: {
    // MLDetail,
    // MLDetailInfo,
    // MLDetailRel1,
    // MLDetailRel2,
    // MLHeader,
    MLTable,
    MDDetailView,
    // MLPermissionsRel,
    MDView,
    BasicDetail,
    MDNotImplemented
  },
  computed: mapGetters(['students','currentCourse']),
  data() {
    return {
      entity: 'Student',

      tableColumns: [
        {id: 1, label: 'Student id', prop: 'student_id', width: 200 },
        {id: 2, label: 'Email', prop: 'user.email' },
        {id: 3, label: 'Lab', prop: 'lab.name' }
      ],
      selectedRow: null,
      activeName: 'basic',
      tabs: [
        {
          id: 'basic',
          label: 'Basic',
          name: 'basic',
          hide: false,
        }
      ]
    }
  },
  mounted(){
    this.loadStudents(this.currentCourse.id)
  },
  methods: {
    handleNew() {
      this.selectedRow = {};
    },
    handleCancel() {
      this.$refs.masterTable.clearSelection()
      this.selectedRow = null;
      this.loadStudents(this.currentCourse.id);
    },
    handleClick (id,e){
      // tabs event handler
    },
    handleSelect (index,row){
      // console.log(row)
      this.selectedRow = row
    },
    handleEdit (index,row){
      // console.log(row)
      this.selectedRow = row
    },
    handleDelete( index,row){
      // console.log(index + ' ' + row)
      if (this.selectedRow){
        this.deleteStudent(this.selectedRow).then(
            (succes) => console.log('delete ok')
        );
      }
    },
    ...mapActions(['loadStudents','deleteStudent'])
  }
}
</script>
<style scoped>

</style>
