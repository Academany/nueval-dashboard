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
    <RepoForm v-if="selectedRow && selectedRow.id" :item="selectedRow" slot="tab-content-1"/>
    <ModulesList v-if="selectedRow && selectedRow.id" :item="selectedRow" slot="tab-content-2"/>
    <StudentsList v-if="selectedRow && selectedRow.id" :item="selectedRow" slot="tab-content-3"/>
    <LabsList v-if="selectedRow && selectedRow.id" :item="selectedRow" slot="tab-content-4"/>
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
    ModulesList,
    RepoForm,
    LabsList,
    MDNotImplemented
  },
  computed: mapGetters(['modules']),
  mounted(){
    this.loadModules(this.selectedRow);
  },
  data() {
    return {
      saved: true,
      entity: 'Module',
      tableColumns: [
        {id: 1, label: 'Name', prop: 'name', width: 170 },
        {id: 2, label: 'Date', prop: 'date'},
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
  methods: {
    handleNew() {
      this.selectedRow = {};
    },
    handleCancel() {
      this.$refs.masterTable.clearSelection()
      this.selectedRow = {};
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
        this.deleteModule(this.selectedRow).then(
            (succes) => console.log('delete ok')
        );
      }
    },
    ...mapActions(['loadModules','deleteModule']),
  }
}
</script>
<style scoped>

</style>
