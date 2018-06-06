<template>
  <MDView>
    <MLTable slot="master" ref="masterTable" :value="students" :selectedRow="selectedRow" :tableColumns="tableColumns" @select="handleSelect" @edit="handleEdit" @delete="handleDelete" />
    <MDDetailView :entity="entity" :selectedRow="selectedRow" v-model="tabs" @newItem="handleNew" @delete="handleDelete" :readonly="true" slot="detail">
      <BasicDetail :item="selectedRow" slot="tab-content-0" @cancelEdit="handleCancel" />
      <BasicDetail :item="selectedRow" slot="tab-content-1" />
    </MDDetailView>
  </MDView>
</template>

<script>
import MDDetailView from '../../../components/MDDetailView.vue'
import MLTable from '../../../components/MDTable.vue'
import MDView from '../../../components/MDView.vue'
import MDNotImplemented from '../../../components/MDNotImplemented.vue'
import lodash from 'lodash'
import BasicDetail from './Detail.vue'
import { mapGetters, mapActions, createNamespacedHelpers } from 'vuex'

let startId = 0

export default {
  components: {
    MLTable,
    MDDetailView,
    MDView,
    BasicDetail,
    MDNotImplemented
  },
  computed: {
    ...mapGetters({
      students: 'instructor_app/students',
      instructor: 'instructor_app/instructor',
      isLoading: 'admin/students/loading',
      currentCourse: 'instructor_app/currentCourse'
    })
  },
  data() {
    return {
      entity: 'Student',
      tableColumns: [
        { id: 1, label: 'ID', prop: 'student_id', width: 80 },
        { id: 2, label: 'Username', prop: 'username', width: 150 },
        { id: 3, label: 'First', prop: 'first_name', width: 130 },
        { id: 4, label: 'Last', prop: 'last_name', width: 130 },
        { id: 3, label: 'Lab', prop: 'lab.name' },
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
  mounted() {
    // this.loadStudents(this.currentCourse.id)
  },
  methods: {
    handleNew() {
      this.selectedRow = {};
    },
    handleCancel() {
      this.$refs.masterTable.clearSelection()
      this.selectedRow = null
      this.reload()
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
           // console.log('delete ok')
            vm.notify("Success", "Student deleted")
          }
        );
      }
    },
    ...mapActions({
      // loadStudents: 'admin/students/loadStudents',
      reload: 'instructor_app/reloadInstructor',
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
