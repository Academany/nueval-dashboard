<template>
  <div class="sheet">
    <div class="header" v-if="student">
      <h3>Welcome {{student.first_name}}!</h3>
      <p>
        This is your student dashboard. Here you can monitor your progress and
        receive feedback about your assignments.
      </p>
      <p>Navigate the menu on the left to access your Final project schedule, Local and Global evaluations.</p>
    </div>
    <el-row :gutter="12" v-if="progress">
      <el-col :span="6" v-for="evaluation in progress" :key="evaluation.id">
        <EvalProgress :evaluation="evaluation" @showDetails="handleShowDetails"></EvalProgress>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import EvalProgress from "./components/ProgressUnits.vue";
import { mapGetters, mapActions } from "vuex";
export default {
  methods: {
    handleShowDetails(evaluation) {
      // console.log('Show')
      // console.log(evaluation)
      if (evaluation && evaluation.evaluation) {
        if (evaluation.evaluation.kind == "local") {
          this.$nextTick(() => this.$router.push("/apps/student/d/localeval"));
        } else if (evaluation.evaluation.kind === "global") {
          this.$nextTick(() => this.$router.push("/apps/student/d/globaleval"));
        }
      }
    }
  },
  components: {
    EvalProgress
  },
  computed: {
    ...mapGetters({
      student: "student_app/student",
      progress: "student_app/progress"
    })
  }
};
</script>

<style>
.sheet {
  padding: 24px;
}
</style>
