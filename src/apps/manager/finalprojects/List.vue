<template>
<MDView>
  <MLTable
    slot="master"
    ref="masterTable"
    :value="presentations"
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
                 :readonly="true"
    slot="detail">
    <BasicDetail :item="selectedRow"
                  slot="tab-content-0"
                  
                  @cancelEdit="handleCancel"/>
    <StudentsList v-if="selectedRow && selectedRow.id" :item="selectedRow" slot="tab-content-1"/>
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
  mounted() {
    this.loadPresentations(this.currentCourse.id);
  },
  data() {
    return {
      entity: 'Final Project presentation',
      tableData: [
        {'name': 'First Session', 'date': '7 June 2017', 'students' : '120', id: 1}
      ],
      tableColumns: [
        {id: 1, label: 'Name', prop: 'name', width: 200 },
        {id: 2, label: 'Date', prop: 'date'},
        {id: 3, label: 'Cap', prop: 'max' },
        {id: 3, label: 'Booked', prop: 'booked.length' },
        
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
  filters: {
    capitalize: function (value) {
      if (!value) return ''
      value = value.toString()
      return value.charAt(0).toUpperCase() + value.slice(1)
    }
  },
  computed: {
    ...mapGetters(['presentations','currentCourse']),
  },
  methods: {
    handleNew() {
      this.selectedRow = {
        name: 'Final project session',
        courseId: this.currentCourse.id,
        max: 65,
        id: null
      };
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
        this.deletePresentation(this.selectedRow).then((succes) => {
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
    ...mapActions(['loadPresentations','deletePresentation'])
  }
}
</script>
<style scoped>

</style>
