<template>
    <el-card>
        <div slot="header">Computer controlled cutting</div>
        <el-tabs @tab-click="handleClick">
            <el-tab-pane label="Description">
    
                <UnitTasks />
    
            </el-tab-pane>
            <el-tab-pane label="Learning outcomes">
    
                <UnitOutcomes />
            </el-tab-pane>
            <el-tab-pane label="Feedback">
    
                <FeedbackItem />
    
                <FeedbackItem :isRight="true" />
    
                <FeedbackItem />
    
                <FeedbackForm />
    
            </el-tab-pane>
            <el-tab-pane label="FAQ">
    
                <UnitFAQ />
    
            </el-tab-pane>
        </el-tabs>
    
    </el-card>
</template>

<script>
import FeedbackItem from '../fragments/FeedbackItem.vue'
import FeedbackForm from '../forms/FeedbackForm.vue'
import UnitFAQ from '../fragments/UnitFAQ.vue'
import UnitOutcomes from '../fragments/UnitOutcomes.vue'
import UnitTasks from '../fragments/UnitTasks.vue'
export default {
    components: {
        UnitFAQ,
        UnitOutcomes,
        UnitTasks,
        FeedbackForm,
        FeedbackItem
    },
    data() {
        return {
            value7: 0
        }
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
</style>
