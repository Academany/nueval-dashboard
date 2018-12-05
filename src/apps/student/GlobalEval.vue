<template>
  <div class="sheet">
    <div class="header" v-if="student">
      <h3>Global Assessment & Evaluation</h3>
      <p>{{currentCourse && currentCourse.name}}</p>
      <div v-if="evaluations.length == 0">
        <p>No Global evaluation session started yet</p>
      </div>
      <div v-for="globalEval in evaluations" :key="globalEval.id">
        <div v-if="!globalEval.records || !globalEval.records.length">
          <p>The global evaluation didn't start yet, check back soon for feedback</p>
        </div>
        <div v-else>
          <el-row :gutter="24">
            <el-col :span="6">
              <table class="module-list-header">
                <tr>
                  <div v-if="globalEval.evaluation">
                    <td>
                      <h3>{{globalEval.evaluation.name}}</h3>
                    </td>
                    <td>{{ globalEval.evaluation.date || moment }}</td>
                  </div>
                  <td v-if="globalEval.instructor">
                    <strong>Instructor</strong>
                    {{ globalEval.instructor.username}}
                  </td>
                </tr>
              </table>
              <SelectModule
                :data="modules"
                :records="globalEval.records"
                @select-module="handleSelectModule"
              />
            </el-col>
            <el-col :span="16">
              <UnitPage
                v-if="module && record"
                :module="module"
                :record="record"
                :readonly="true"
                :global="true"
              ></UnitPage>
            </el-col>
          </el-row>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import SelectModule from "./components/SelectModule.vue";
import UnitPage from "./components/UnitPage.vue";
export default {
  components: {
    SelectModule,
    UnitPage
  },
  methods: {
    handleSelectModule({ module, record }) {
      // this.$notify({ title: 'Success', message: module.id })
      this.selectModule({ module, record });
    },
    ...mapActions({
      selectModule: "student_app/selectModule"
    })
  },
  computed: {
    isGlobal: () => {
      return globalEval => (globalEval ? globalEval.kind === "global" : false);
    },
    ...mapGetters({
      module: "student_app/selectedModule",
      record: "student_app/selectedRecord",
      modules: "student_app/courseModules",
      currentCourse: "currentCourse",
      evaluations: "student_app/evaluations",
      // records: 'student_app/localEvalRecords',
      student: "student_app/student"
    })
  }
};
</script>

<style>
.sheet {
  padding: 24px;
}

.module-list-header {
  padding: 0;
  margin: 0;
  width: 100%;
  border-top: 1px solid #dedede;
  border-left: 1px solid #dedede;
  border-right: 1px solid #dedede;
  background-color: #feeeee;
}

.module-list-header td {
  padding-left: 12px;
}
</style>
