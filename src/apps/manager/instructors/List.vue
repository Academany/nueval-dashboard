<template>
<MDView>
  <MLTable
    slot="master"
    ref="masterTable"
    :value="instructors"
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
import {mapGetters,mapActions,createNamespacedHelpers} from 'vuex'
// import sampleData from './sample-data.js'
let startId=0

// lodash.forEach(sampleData.data, (el)=>{
//   el.id = ++startId;
//   el.supernode = 'nosupernode';
//   el.isSupernode = false;
// })

export default {
  components: {
    MLTable,
    MDDetailView,
    // MLPermissionsRel,
    MDView,
    BasicDetail,
    MDNotImplemented,
  //  Permissions
  },
  computed: {
    ...mapGetters({
      instructors: 'admin/instructors/instructors',
      isLoading: 'admin/instructors/loading',
      currentCourse: 'currentCourse'
    })
  },
  data() {
   return {
      entity: 'Instructor',
      tableColumns: [
        {id: 2, label: 'Username', prop: 'username'},
        {id: 3, label: 'First', prop: 'first_name'},
        {id: 4, label: 'Last', prop: 'last_name'},
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
    this.loadInstructors(this.currentCourse.id)
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
    handleDelete( index,row){
      // console.log(index + ' ' + row)
      const vm = this
      if (this.selectedRow){
        this.deleteInstructor(this.selectedRow).then(
            (succes) => {
              console.log('delete ok')
              vm.notify("Success","Instructor deleted")
            }
        );
      }
    },
    ...mapActions( {
      loadInstructors: 'admin/instructors/loadInstructors',
      deleteInstructor: 'admin/instructors/deleteInstructor'
    }),
     notify(title, msg) {
      const h = this.$createElement;

      this.$notify({
        title: title,
        message: h('i', {
          style: 'color: teal'
        }, msg)
      });
    },
  }
}
</script>

<style scoped>
.adjust {
  margin-bottom: -3px;
}
.sheet {
  padding: 24px;
}
.fullwidth{
  width: 100%;
}
.tableTop {

  text-align: right;
  margin-bottom: 20px;
  margin-left: 12px;
  margin-right: 12px;
}
.master-detail-view {
  position: absolute;
  top: 0px;
  left: 0px;
  bottom: 0px;
  right: 0px;
}

.master {
  position: absolute;;
  width: 50%;
  left: 0px;
  top: 0px;
  bottom: 0px;
  padding: 0px;
  padding-top: 0px;
  overflow-y: scroll;
  overflow-x: none;

}

.detail {
    background-color: #d2d8e2;
   position: absolute;
   width: 50%;
   right: 0px;
   top: 0px;
   bottom: 0px;
   padding-top: 24px;
   overflow-y: scroll;
   overflow-x: none;
}
</style>
