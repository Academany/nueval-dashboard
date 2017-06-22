<template>
    <el-card>
        <div slot="header">{{module.name}}
            <div class="pull-right">
    
                <el-tag v-if="module">Ver. {{module.rules && module.rules.version}}</el-tag>
            </div>
        </div>
        <el-tabs @tab-click="handleClick" ref="tabs" v-model="selectedTab">
            <el-tab-pane label="Status" name="status">
    
                <UnitStatus :readonly="readonly" :module="module" :record="record" @markComplete="handleMarkComplete" @showFeedback="handleShowFeedback" />
    
            </el-tab-pane>
    
            <el-tab-pane label="Description" name="description">
    
                <UnitTasks :module="module" />
    
            </el-tab-pane>
            <el-tab-pane label="Learning outcomes" name="outcomes">
    
                <UnitOutcomes :readonly="readonly" :module="module" :record="record" @updateProgress="handleUpdateProgress" @save="handleSaveProgress" />
            </el-tab-pane>
            <el-tab-pane label="Have you...?" name="checklist">
                <StudentCheckList :readonly="readonly" :module="module" :record="record" @save="handleUpdateCheckList" />
            </el-tab-pane>
            <el-tab-pane label="Feedback" name="feedback">
    
                <!--<FeedbackItem />
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            <FeedbackItem :isRight="true" />
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            <FeedbackItem />-->
                <FeedbackList :messages="messages" />
                <FeedbackForm @newFeedback="handleNewFeedback" />
    
            </el-tab-pane>
            <el-tab-pane label="FAQ" name="faq">
    
                <UnitFAQ :module="module" />
    
            </el-tab-pane>
        </el-tabs>
    
    </el-card>
</template>

<script>
import StudentCheckList from '../fragments/StudentCheckList.vue'

import FeedbackList from '../forms/FeedbackList.vue'
import FeedbackForm from '../forms/FeedbackForm.vue'
import UnitFAQ from '../fragments/UnitFAQ.vue'
import UnitOutcomes from '../fragments/UnitOutcomes.vue'
import UnitTasks from '../fragments/UnitTasks.vue'
import UnitStatus from '../cards/UnitStatus.vue'

import { mapActions, mapGetters } from 'vuex'


export default {
    props: [
        'module',
        'record',
        'readonly'
    ],
    components: {
        UnitFAQ,
        UnitOutcomes,
        UnitTasks,
        UnitStatus,
        FeedbackForm,
        FeedbackList,
        StudentCheckList
    },
    data() {
        return {
            selectedTab: 'status'
        }
    },
    computed: {
        ...mapGetters({
            messages: 'instructor_app/records/messages'
        })
    },
    methods: {
        handleClick(tab, event) {

        },
        handleShowFeedback() {
            // const tabs = this.$refs.tabs
            this.selectedTab = 'feedback'
        },
        triggerUpdate() {
            this.$emit('refresh', { module: this.module, record: this.record })
        },
        handleUpdateProgress() {

        },
        handleSaveProgress(progress) {
            var vm = this;
            vm.updateProgress(progress)
                .then((success) => {
                    vm.logOk("Progress recorded successfully")
                    vm.triggerUpdate()
                }).catch((error) => {
                    vm.logError(error)
                })
        },
        handleUpdateCheckList(checklist) {
            var vm = this;
            vm.updateChecklist(checklist)
                .then((success) => {
                    vm.logOk("Checklist recorded successfully")
                    vm.triggerUpdate()
                }).catch((error) => {
                    vm.logError(error)
                })
        },
        handleMarkComplete(checklist) {
            var vm = this;
            vm.markComplete(checklist)
                .then((success) => {
                    vm.logOk("Unit marked complete")
                    vm.triggerUpdate()
                }).catch((error) => {
                    vm.logError(error)
                })
        },
        handleNewFeedback(feedback) {
            var vm = this;
            vm.leaveFeedback(feedback)
                .then((success) => {
                    vm.logOk("Feedback recorded successfully")
                    vm.triggerUpdate()
                }).catch((error) => {
                    vm.logError(error)
                })
        },
        logError(err) {
            this.$notify({
                title: "Error",
                message: JSON.stringify(err)//message: "There was an error processing your request, please try later"
            })
        },
        logOk(msg) {
            this.$notify({
                title: "Information",
                message: msg
            })
        },
        ...mapActions({
            updateProgress: 'instructor_app/records/updateProgress',
            updateChecklist: 'instructor_app/records/updateChecklist',
            markComplete: 'instructor_app/records/markComplete',
            leaveFeedback: 'instructor_app/records/leaveFeedback'
        })
    }
}
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
    margin-left: 8px
}

.label {
    font-size: .8em;
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
    float: right
}
</style>
