<template>
<MDView>
  <MLTable
    slot="master"
    ref="masterTable"
    :value="evaluations"
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
    <StudentsList :item="selectedRow" slot="tab-content-1"/>
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
  data() {
    return {
      entity: 'Evaluation Session',
      tableColumns: [
        {id: 1, label: 'Name', prop: 'name', width: 250 },
        {id: 2, label: 'Date', prop: 'date' },
        {id: 3, label: 'Students', prop: 'students' }
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
          id: 'students',
          label: 'Students',
          name: 'students',
          hide: true
        }
      ]
    }
  },
  computed: {
    ...mapGetters(['currentCourse', 'evaluations'])
  },
  mounted() {
    this.loadEvaluations(this.currentCourse.id);
  },
  methods: {
    
    handleNew() {
      this.selectedRow = {
        courseId: this.currentCourse.id,
      }
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
    handleDelete( index,row){
      // console.log(index + ' ' + row)

      const vm = this;
      if (this.selectedRow){
        this.deleteEvaluation(this.selectedRow).then((succes) => {
            vm.notify("Success", "Item deleted succcessfully")
            vm.handleCancel()
        }).catch((error)=>{
            vm.notify("Error", "Some error occurred:\n" + JSON.stringify(error));
        });
      }
    },
    notify(title, msg) {
      const h = this.$createElement;

      this.$notify({
        title: title,
        message: h('i', {
          style: 'color: teal'
        }, msg)
      });
    },
    ...mapActions(['loadEvaluations','deleteEvaluation'])
  }
}
</script>
