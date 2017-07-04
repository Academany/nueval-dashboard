<template>
  <MDView>
    <MLTable slot="master" ref="masterTable" :value="evaluations" :selectedRow="selectedRow" :tableColumns="tableColumns" @select="handleSelect" @edit="handleEdit" @delete="handleDelete" />
    <MDDetailView :entity="entity" :selectedRow="selectedRow" v-model="tabs" @newItem="handleNew" @delete="handleDelete" slot="detail">
      <BasicDetail :item="selectedRow" slot="tab-content-0" @cancelEdit="handleCancel" />
      <StudentsList ref="studentsList" :item="selectedRow" @submit="handleAddStudent" @assign="handleAssignEvaluator" @remove="handleResetEvaluator" slot="tab-content-1" />
      <Evaluators :item="selectedRow" @submit="handleAddEvaluator" slot="tab-content-2" />
      <Graduated :item="selectedRow" slot="tab-content-3" />
      <NextCycle :item="selectedRow" slot="tab-content-4" />
      <Waiting :item="selectedRow" slot="tab-content-5" />
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
import Evaluators from './Evaluators.vue'
import Graduated from './Graduated.vue'
import NextCycle from './NextCycle.vue'
import Waiting from './Waiting.vue'
import { mapActions, mapGetters } from 'vuex'
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
    StudentsList,
    Evaluators,
    MDNotImplemented,
    Graduated,
    NextCycle,
    Waiting
  },
  data() {
    return {
      entity: 'Evaluation Session',
      tableColumns: [
        { id: 1, label: 'Name', prop: 'name', width: 250 },
        { id: 2, label: 'Date', prop: 'date' },
        { id: 3, label: 'Students', prop: 'pairings.length' },
        { id: 4, label: 'Kind', prop: 'kind' }
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
        },
        {
          id: 'evaluators',
          label: 'Evaluators',
          name: 'evaluators',
          hide: true
        },
        {
          id: 'graduates',
          label: 'Graduates',
          name: 'graduates',
          hide: true
        },
        {
          id: 'nextcycle',
          label: 'Next Cycle',
          name: 'nextcycle',
          hide: true
        },
        {
          id: 'waiting',
          label: 'Pending feedback',
          name: 'waiting',
          hide: true
        }
      ]
    }
  },
  computed: {
    ...mapGetters(['currentCourse', 'evaluations', 'evaluationStudents'])
  },
  watch: {
  },
  mounted() {
    const vm = this
    this.loadEvaluations(this.currentCourse.id);
  },
  methods: {
    handleAssignEvaluator(params) {
      const vm = this;
      this.assignEvaluator(params)
        .then((response) => {
          vm.notify(
            "Success",
            "Assigned evaluator"
          )
          // this.handleCancel()
        }).catch((error) => {
          vm.notify("Error", "Failed to assign evaluator")
        })
    },
    handleResetEvaluator(params) {
      const vm = this;
      this.resetEvaluator(params)
        .then((response) => {
          vm.notify(
            "Success",
            "Evaluator reset"
          )
          // this.handleCancel()
          // vm.$refs['studentsList'].$forceUpdate()

        }).catch((error) => {
          vm.notify("Error", "Failed to assign evaluator")
        })
    },
    handleAddStudent(student) {
      const vm = this;
      this.addStudent({
        'session': vm.selectedRow,
        'student': student
      }).then((succes) => {
        vm.notify(
          "Success",
          "Added student"
        )
      }).catch((error) => {
        vm.notify("Error", "Failed to add student")
      })
    },
    handleRemoveStudent(student) {
      const vm = this;
      this.removeStudent({
        'session': vm.selectedRow,
        'student': evaluator
      }).then((succes) => {

        vm.notify("Success", "Removed student")
      }).catch((error) => {
        vm.notify("Error", "Failed to remove student")
      })
    },
    handleAddEvaluator(evaluator) {
      const vm = this;
      vm.addEvaluator({
        'session': vm.selectedRow,
        'evaluator': evaluator
      }).then((succes) => {
        vm.notify("Success", "Added evaluator")
      }).catch((error) => {
        vm.notify("Error", "Failed to add evaluator")
      })
    },
    handleRemoveEvaluator(evaluator) {
      const vm = this;
      this.removeEvaluator({
        'session': vm.selectedRow,
        'evaluator': evaluator
      }).then((succes) => {

        vm.notify("Success", "Removed evaluator")
      }).catch((error) => {
        vm.notify("Error", "Failed to remove evaluator")
      })
    },
    handleNew() {
      this.selectedRow = {
        courseId: this.currentCourse.id,
      }
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
      const vm = this;
      if (this.selectedRow) {
        this.deleteEvaluation(this.selectedRow).then((succes) => {
          vm.notify("Success", "Item deleted succcessfully")
          vm.handleCancel()
        }).catch((error) => {
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
    ...mapActions(['loadEvaluations', 'deleteEvaluation', 'addEvaluator', 'removeEvaluator', 'addStudent', 'removeStudent', 'assignEvaluator', 'resetEvaluator'])
  }
}
</script>
