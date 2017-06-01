<template>
<MDView>
  <MLTable
    slot="master"
    ref="masterTable"
    :value="roles"
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
// import StudentsList from './Students.vue'
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
    // StudentsList,
    MDNotImplemented
  },
  computed: mapGetters(['roles']),
  mounted(){
    this.loadRoles();
  },
  data() {
    return {
      saved: true,
      entity: 'Role',
      tableColumns: [
        {id: 1, label: 'Name', prop: 'name', width: 250 },
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
        // {
        //   id: 'students',
        //   label: 'Students',
        //   name: 'students',
        //   hide: true
        // }
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
    ...mapActions(['loadRoles','deleteRole']),
  }
}
</script>
<style scoped>

</style>
