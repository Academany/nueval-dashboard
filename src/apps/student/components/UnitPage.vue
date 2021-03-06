<template>
  <el-card>
    <div slot="header">
      {{module ? module.name : ''}}
      <div class="pull-right">
        <el-tag v-if="module">Ver. {{module.rules && module.rules.version}}</el-tag>
      </div>
    </div>
    <div class="card-body">
      <h4>Overall progress</h4>
      <UnitStatus
        :readonly="readonly"
        :module="module"
        :record="record"
        @showFeedback="handleShowFeedback"
      />

      <h4>Unit description</h4>
      <UnitTasks :module="module"/>

      <h4>Learning outcomes</h4>
      <UnitOutcomes :readonly="true" :module="module" :record="record"/>

      <div v-if="!global">
        <h4>Checklist</h4>
        <StudentCheckList
          :readonly="readonly"
          :module="module"
          :record="record"
          @save="handleUpdateCheckList"
        />
      </div>

      <h4>Feedback</h4>
      <FeedbackList ref="FeedbackForm" :messages="messages"/>

      <FeedbackForm @newFeedback="handleNewFeedback"/>

      <h4>FAQ</h4>
      <UnitFAQ :module="module"/>

      <h4>Recent Changes</h4>
      <RecentChanges :record="record"/>
    </div>
  </el-card>
</template>

<script>
import StudentCheckList from "./fragments/StudentCheckList.vue";

import FeedbackList from "./forms/FeedbackList.vue";
import FeedbackForm from "./forms/FeedbackForm.vue";
import UnitFAQ from "./fragments/UnitFAQ.vue";
import UnitOutcomes from "./fragments/UnitOutcomes.vue";
import UnitTasks from "./fragments/UnitTasks.vue";
import UnitStatus from "./cards/UnitStatus.vue";
import RecentChanges from "./fragments/RecentChanges.vue";

import { mapActions, mapGetters } from "vuex";
import VueScrollTo from "vue-scrollto";

export default {
  props: ["module", "record", "readonly", "global"],
  components: {
    UnitFAQ,
    UnitOutcomes,
    UnitTasks,
    UnitStatus,
    FeedbackForm,
    FeedbackList,
    StudentCheckList,
    RecentChanges
  },
  data() {
    return {
      selectedTab: "status"
    };
  },
  computed: {
    ...mapGetters({
      messages: "student_app/recordMessages"
    })
  },
  methods: {
    handleClick(tab, event) {},
    handleShowFeedback() {
      // const tabs = this.$refs.tabs
      // this.selectedTab = 'feedback'
      const el = this.$refs.FeedbackForm.$el;
      el.scrollIntoView(true);
    },
    triggerUpdate() {
      this.$emit("refresh", { module: this.module, record: this.record });
    },
    handleUpdateProgress() {},
    // handleSaveProgress(progress) {
    //     var vm = this;
    //     vm.updateProgress(progress)
    //         .then((success) => {
    //             vm.logOk("Progress recorded successfully")
    //             vm.triggerUpdate()
    //         }).catch((error) => {
    //             vm.logError(error)
    //         })
    // },
    handleSaveProgress(progress) {},
    handleUpdateCheckList(checklist) {
      var vm = this;
      // debugger
      vm.updateChecklist(checklist)
        .then(success => {
          vm.logOk("Checklist recorded successfully");
          vm.triggerUpdate();
        })
        .catch(error => {
          vm.logError(error);
        });
    },
    // handleMarkComplete(checklist) {
    //     var vm = this;
    //     vm.markComplete(checklist)
    //         .then((success) => {
    //             vm.logOk("Unit marked complete")
    //             vm.triggerUpdate()
    //         }).catch((error) => {
    //             vm.logError(error)
    //         })
    // },
    // handleMarkNotComplete(checklist) {
    //     var vm = this;
    //     vm.markNotComplete(checklist)
    //         .then((success) => {
    //             vm.logOk("Unit is not complete")
    //             vm.triggerUpdate()
    //         }).catch((error) => {
    //             vm.logError(error)
    //         })
    // },
    handleNewFeedback(feedback) {
      var vm = this;
      vm.leaveFeedback(feedback)
        .then(success => {
          vm.logOk("Feedback recorded successfully");
          vm.triggerUpdate();
        })
        .catch(error => {
          vm.logError(error);
        });
    },
    logError(err) {
      this.$notify({
        title: "Error",
        message: JSON.stringify(err) //message: "There was an error processing your request, please try later"
      });
    },
    logOk(msg) {
      this.$notify({
        title: "Information",
        message: msg
      });
    },
    ...mapActions({
      // markNotComplete: /instructor/records/markNotComplete',
      // updateProgress: /instructor/records/updateProgress',
      // updateChecklist: /instructor/records/updateChecklist',
      // markComplete: /instructor/records/markComplete',
      // leaveFeedback: /instructor/records/leaveFeedback'
      updateChecklist: "student_app/updateChecklist",
      leaveFeedback: "student_app/leaveFeedback"
    })
  }
};
</script>

<style scoped>
.feedback {
  margin-bottom: 12px;
}

.feedback-header {
  clear: both;
  vertical-align: bottom;
  margin-bottom: 14px;
}

.feedback-title {
  font-weight: bold;
  display: block;
  margin-left: 54px;
  margin-top: -50px;
}

.feedback-description {
  font-size: 0.9em;
  padding-left: 0px;
}

.feedback-icon {
  display: inline;
}

.micro {
  width: 48px;
  height: 48px;
  border-radius: 24px;
}

.slider-pad {
  width: 90%;
  margin-left: 8px;
}

.label {
  font-size: 0.8em;
}

.fa-fix {
  margin-bottom: -2px;
}

.title {
  margin-top: -32px;
  margin-left: 32px;
}

.description {
  margin-left: 32px;
}

.pull-right {
  float: right;
}

h4 {
  border-bottom: 1px solid #dedede;
  font-size: 1.2em;
  color: #666;
  text-transform: uppercase;
}
</style>
