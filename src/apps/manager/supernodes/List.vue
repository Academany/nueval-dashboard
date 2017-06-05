<template>
  <MDView>
    <MLTable
      slot="master"
      ref="masterTable"
      :value="supernodes"
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
      <LabsList :item="selectedRow"
                    slot="tab-content-1"
                    @cancelEdit="handleCancel"/>
      
    </MDDetailView>
  </MDView>
</template>

<script>
import BasicDetail from './Detail.vue'
import LabsList from './Labs.vue'
import MLPermissionsRel from '../../../components/Permissions.vue'
import MLHeader from './Header.vue'
import MLTable from '../../../components/MDTable.vue'
import MDView from '../../../components/MDView.vue'
import MDDetailView from '../../../components/MDDetailView.vue'
import MDNotImplemented from '../../../components/MDNotImplemented.vue'
import lodash from 'lodash'
let startId=0
import {mapGetters,mapActions} from 'vuex'

// lodash.forEach(sampleData.data, (el)=>{
//   el.id = ++startId;
//   el.supernode = 'nosupernode';
//   el.isSupernode = false;
// })

export default {
  components: {
    BasicDetail,
    MLHeader,
    MLTable,
    MLPermissionsRel,
    MDView,
    MDDetailView,
    LabsList
  },
  mounted(){
    this.loadSupernodes(this.currentCourse.id);
  },
  computed: mapGetters(['supernodes','currentCourse']),
  data() {
    return {
      entity: 'Supernode',
      tableColumns: [
        {id: 1, label: 'Name', prop: 'name' },
        {id: 1, label: 'Contact', prop: 'contact_name' },
        {id: 1, label: 'Email', prop: 'contact_email' },
      ],
      selectedRow: null,
      activeName: 'settings',
      tabs: [
        {
          id: 'basic',
          label: 'Basic',
          name: 'basic',
          hide: false,
        },
        {
          id: 'nodes',
          label: 'Nodes',
          name: 'nodes',
          hide: true
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
      var vm = this;
      if (this.selectedRow){
        this.deleteSupernode(this.selectedRow).then( (success) => {
              console.log('delete ok')
              
        });
      }
    },
    ...mapActions(['deleteSupernode','loadSupernodes'])
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
.master::-webkit-scrollbar,
.detail::-webkit-scrollbar {
width: 5px;
}

.master::-webkit-scrollbar-track,
.detail::-webkit-scrollbar-track {
  background: #ddd;
}

.master::-webkit-scrollbar-thumb,
.detail::-webkit-scrollbar-thumb {
  background: #ff4949;
}
</style>
