<template>
  <MDView>
    <MLTable slot="master" ref="masterTable" :value="labs" :selectedRow="selectedRow" :tableColumns="tableColumns" @select="handleSelect" @edit="handleEdit" @delete="handleDelete" />
    <MDDetailView :entity="entity" :selectedRow="selectedRow" v-model="tabs" @newItem="handleNew" @delete="handleDelete" slot="detail">
      <BasicDetail :item="selectedRow" slot="tab-content-0" @cancelEdit="handleCancel" />
      <Supernode :item="selectedRow" slot="tab-content-1" />
      <InstructorsList :item="selectedRow" slot="tab-content-2" />
      <StudentsList :item="selectedRow" slot="tab-content-3" />
    </MDDetailView>
  </MDView>
</template>

<script>
import sampleData from './sample-data.js'
import BasicDetail from './Detail.vue'
import Supernode from './Supernode.vue'
import InstructorsList from './InstructorsList.vue'
import StudentsList from './StudentsList.vue'
import MLPermissionsRel from '../../../components/Permissions.vue'
import MLHeader from './Header.vue'
import MLTable from '../../../components/MDTable.vue'
import MDView from '../../../components/MDView.vue'
import MDDetailView from '../../../components/MDDetailView.vue'

import MDNotImplemented from '../../../components/MDNotImplemented.vue'
import lodash from 'lodash'
let startId = 0
import { mapGetters, mapActions } from 'vuex'

// lodash.forEach(sampleData.data, (el)=>{
//   el.id = ++startId;
//   el.supernode = 'nosupernode';
//   el.isSupernode = false;
// })

export default {
  components: {
    BasicDetail,
    Supernode,
    InstructorsList,
    StudentsList,
    MLHeader,
    MLTable,
    MLPermissionsRel,
    MDView,
    MDDetailView
  },
  mounted() {
    this.loadLabs(this.currentCourse.id);
  },
  computed: mapGetters(['labs', 'currentCourse']),
  data() {
    return {
      entity: 'Lab',
      tableData: sampleData.data,
      tableColumns: [
        { id: 1, label: 'Name', prop: 'name', width: 190 },
        { id: 2, label: 'Country', prop: 'country', width: 130 },
        { id: 3, label: 'Continent', prop: 'continent', width: 130 },
        { id: 4, label: 'Supernode', prop: 'supernode.name' }
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
          id: 'supernode',
          label: 'Supernode',
          name: 'supernode',
          hide: true
        },
        {
          id: 'instructors',
          label: 'Instructors',
          name: 'instructors',
          hide: true
        },
        {
          id: 'students',
          label: 'Students',
          name: 'students',
          hide: true
        },
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
    handleClick(id, e) {
      // tabs event handler
    },
    handleSelect(index, row) {
      // console.log(row)
      this.selectedRow = row
    },
    handleEdit(index, row) {
      // console.log(row)
      this.selectedRow = row
    },
    handleDelete() {
      // alert('delete')
      if (this.selectedRow) {
        this.deleteLab(this.selectedRow).then((success) => {
          console.log('delete ok')
        });
      }
    },
    ...mapActions(['deleteLab', 'loadLabs'])
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

.fullwidth {
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
  position: absolute;
  ;
  width: 50%;
  left: 0px;
  top: 0px;
  bottom: 0px;
  padding: 0px;
  padding-top: 0px;
  overflow-y: scroll;
  overflow-x: none;
  font-size: 0.8em;
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
