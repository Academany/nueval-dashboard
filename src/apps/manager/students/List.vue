<template>
  <MDView>
    <MLTable slot="master" ref="masterTable" :value="students" :selectedRow="selectedRow" :tableColumns="tableColumns" @select="handleSelect" @edit="handleEdit" @delete="handleDelete" />
    <MDDetailView :entity="entity" :selectedRow="selectedRow" v-model="tabs" @newItem="handleNew" @delete="handleDelete" slot="detail">
      <BasicDetail :item="selectedRow" slot="tab-content-0" @cancelEdit="handleCancel" />
      <StudentProgress :item="selectedRow" slot="tab-content-1" />
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
import StudentProgress from './StudentProgress.vue'
import { mapGetters, mapActions, createNamespacedHelpers } from 'vuex'

let startId = 0
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
    MDNotImplemented,
    StudentProgress
  },
  computed: {
    ...mapGetters({
      students: 'admin/students/students',
      isLoading: 'admin/students/loading',
      currentCourse: 'currentCourse'
    })
  },
  data() {
    return {
      entity: 'Student',
      tableColumns: [
        { id: 1, label: 'Student id', prop: 'student_id' },
        { id: 2, label: 'Username', prop: 'username' },
        { id: 3, label: 'First', prop: 'first_name' },
        { id: 4, label: 'Last', prop: 'last_name' },
        { id: 5, label: 'Lab', prop: 'lab.lab_id', width: '200' },
        // { id: 6, label: 'G', prop: 'graduatedIcon', width: '50' },
        // { id: 7, label: 'N', prop: 'nextCycleIcon', width: '50' },
        // { id: 8, label: 'D', prop: 'dropped', width: '50' },
        // { id: 9, label: 'C', prop: 'continuing? "Y" : "N"', width: '50' }

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
          id: 'progress',
          label: 'Progress',
          name: 'progress',
          hide: true
        }
      ]
    }
  },
  mounted() {
    this.loadStudents(this.currentCourse.id)
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
    handleDelete(index, row) {
      // console.log(index + ' ' + row)
      const vm = this
      if (this.selectedRow) {
        this.deleteStudent(this.selectedRow).then(
          (succes) => {
            console.log('delete ok')
            vm.notify("Success", "Student deleted")
          }
        );
      }
    },
    ...mapActions({
      loadStudents: 'admin/students/loadStudents',
      deleteStudent: 'admin/students/deleteStudent'
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

</style>
