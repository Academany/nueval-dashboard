<template>
<MDView>
  <MLTable
    slot="master"
    ref="masterTable"
    :value="courses"
    :selectedRow="selectedRow"
    :tableColumns="tableColumns"
    @select="handleSelect"
    @edit="handleEdit"
    @delete="handleDelete"/>
  <MDDetailView :entity="entity"
                :selectedRow="selectedRow"
                v-model="tabs"
                @newItem="handleNew"
                @delete="handleDelete"
    slot="detail">
    <BasicDetail :item="selectedRow"
                  slot="tab-content-0"
                  @cancelEdit="handleCancel"/>
    <StudentsList :item="selectedRow" slot="tab-content-2"/>
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
import StudentsList from './Students.vue'
import {mapActions,mapGetters} from 'vuex'
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
    StudentsList,
    MDNotImplemented
  },
  computed: mapGetters(['courses']),
  mounted(){
    this.loadCourses();
  },
  data() {
    return {
      saved: true,
      entity: 'Course',
      tableColumns: [
        {id: 1, label: 'Name', prop: 'name', width: 170 },
        {id: 2, label: 'Year', prop: 'year'},
        {id: 3, label: 'Program', prop: 'program', width: 150 },
        {id: 4, label: 'Students', prop: 'students.length' },
        {id: 5, label: 'Module', prop: 'modules.length'}
      ],
      selectedRow: null,
      activeName: 'basic',
      tabs: [
        {
          id: 'basic',
          label: 'Basic',
          name: 'basic',
          hide: false,
        },

        {
          id: 'modules',
          label: 'Modules',
          name: 'modules',
          hide: true
        },
        {
          id: 'students',
          label: 'Students',
          name: 'students',
          hide: true
        },
        {
          id: 'labs',
          label: 'Labs',
          name: 'labs',
          hide: true
        },
      ]
    }
  },
  beforeRouteLeave (to, from, next) {
    if (this.saved || window.confirm('Not saved, are you sure you want to navigate away?')) {
      next()
    } else {
      next(false)
    }
  },
  methods: {
    handleNew() {
      this.selectedRow = {};
    },
    handleCancel() {
      this.$refs.masterTable.clearSelection()
      this.selectedRow = null
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
    handleDelete(){
      // console.log(index + ' ' + row)
      if (this.selectedRow){
        this.deleteCourse(this.selectedRow).then(
            (succes) => console.log('delete ok')
        );
      }
    },
    ...mapActions(['loadCourses','deleteCourse']),
  }
}
</script>
<style scoped>

</style>
