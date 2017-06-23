<template>
    <div>
        <el-row>
            <el-col :span="6">
                <div class="text-center">
                    <el-progress type="circle" :percentage="unitProgress" :status="record && record.completed ? 'success' : ''"></el-progress>
                    <br> {{progressLabel(unitProgress)}}
                </div>
            </el-col>
            <el-col :span="6">
                <p>
                    <el-button size="large" type="success" :disabled="!canMarkComplete" @click="handleButton1">
                        <fa-icon class="fa-fix" name="check" /> Mark unit complete</el-button>
                </p>
                <p>
                    <el-button size="large" type="primary" @click="handleButton2">
                        <fa-icon class="fa-fix" name="envelope" /> Leave Feedback</el-button>
                </p>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import RecentChanges from '../fragments/RecentChanges.vue'
export default {
    components: {
        RecentChanges
    },
    props: [
        'record', 'module', 'readonly'
    ],
    data() {
        return {
            unitProgress: 0
        }
    },
    watch: {
        record: function (val) {
            // console.log("Watch works")
            const vm = this
            this.$nextTick(() => {
                vm.updateProgress()
            })
        }
    },
    computed: {
        canMarkComplete() {
            if (this.unitProgress && this.unitProgress > 90) {
                return true
            }
            return false
        }
    },
    mounted() {
        this.updateProgress()
    },
    methods: {
        updateProgress(val) {
            let progress = 0
            if (this.record && this.record.progress) {
                progress = parseInt(this.record.progress)
            } else {
                progress = 0
            }
            this.unitProgress = progress
        },
        progressLabel(val) {
            if (!val) return 'Pending'
            if (this.record && this.record.completed) return 'Completed'
            if (val < 20) return 'Pending'
            else if (val >= 20 && val < 50) return 'In progress'
            else if (val >= 50 && val < 90) return 'Almost done'
            else return 'Ready'
        },
        handleButton1() {
            if (this.unitProgress && this.unitProgress >= 90)
                this.$emit('markComplete')
        },
        handleButton2() {
            this.$emit('showFeedback')
        },
        handleChange(val) {

        }
    }
}
</script>
<style scoped>
.text-center {
    text-align: center;
}

.pad {
    margin: 4px;
}

.fullwidth {
    width: 100%;
}

.fa-fix {
    margin-bottom: -3px;
}
</style>
