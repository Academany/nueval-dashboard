<template>
    <div>
        <h4>Unit progress</h4>
        <el-progress class="smallProgress" :percentage="totalProgress || 0" :status="colorOf(totalProgress)"></el-progress>
    
        <div v-for="(task,task_idx) in tasks" :key="task_idx">
            <h4>
                Task: {{task.name}} </h4>
            <div v-for="(outcome,idx) in task.outcomes" :key="idx">
                <p class="label">{{outcome}}</p>
                <div class="slider-pad">
                    <el-slider v-model="sliders[task.name + ':'+outcome]" :step="25" show-stops @change="handleSlider"></el-slider>
                </div>
            </div>
        </div>
    
        <div class="button-container">
            <el-button type="success" size="large" :disabled="readonly" @click="handleSave">Save</el-button>
        </div>
    </div>
</template>

<script>

import VueMarkdown from 'vue-markdown'

export default {
    components: {
        VueMarkdown
    },
    props: [
        'module',
        'record',
        'readonly'
    ],
    data() {
        return {
            isUpdating: false,
            sliders: {},
            totalProgress: 0,
        }
    },
    computed: {
        tasks() {
            if (this.module && this.module.rules) {
                return this.module.rules.tasks
            }
            return []
        }
    },
    watch: {
        module(val) {
            this.sliders = {}
            if (val && this.record)
                this.updateSliders(val, this.record)
        },
        record(val) {
            this.sliders = {}
            if (val && this.module)
                this.updateSliders(this.module, val)
        }
    },
    mounted() {
        if (this.module && this.record)
            this.updateSliders(this.module, this.record)
    },
    methods: {
        colorOf(progress) {
            if (!progress || progress < 30) {
                return 'exception'
            } else if (progress > 90) {
                return 'success'
            }
            return null
        },
        handleSlider() {
            const vm = this;
            // this.$nextTick(function () {
            vm.totalProgress = vm.calcTotalProgress()
            vm.$emit('updateProgress', vm.totalProgress)
            // });
        },
        calcTotalProgress() {
            let count = 0
            if (!this.sliders) return count;
            const values = Object.values(this.sliders) || []
            values.forEach((v) => count += v)
            return Math.round(count / values.length)
        },
        handleSave() {
            const vm = this
            this.$confirm('Do you really want to save learning outcomes and update student progress?', 'Confirm', {
                confirmButtonText: 'OK',
                cancelButtonText: 'Cancel',
                type: 'info'
            }).then(() => {
                const rules = vm.module.rules || {}
                const tasks = rules.tasks || []
                let outcomes = []
                tasks.forEach(function (t, idx) {
                    t.outcomes.forEach(function (outcome, outcome_idx) {
                        const key = t.name + ':' + outcome
                        const value = vm.sliders[key]
                        outcomes.push({
                            task: t.name,
                            outcome: outcome,
                            progress: value
                        })
                    })
                })
                vm.$emit('save', { totalProgress: vm.totalProgress, outcomes: outcomes })
            }).catch(() => {

            });
        },
        updateSliders(module, record) {
            // debugger

            var vm = this;
            // this.$nextTick(function (vm) {
            vm.sliders = {}
            const rules = this.module.rules || {}
            const tasks = rules.tasks || []
            const lines = record && record.lines || []
            tasks.forEach(function (t, idx) {
                const outcomes = t.outcomes || []
                outcomes.forEach(function (outcome, outcome_idx) {
                    const key = t.name + ':' + outcome
                    const curVal = lines.find((f) => f.task === t.name && f.outcome === outcome)
                    const progress = curVal && curVal.progress || 0
                    vm.$set(vm.sliders, key, parseInt(progress))
                })
            })

            vm.totalProgress = vm.calcTotalProgress()
            vm.$emit('updateProgress', vm.totalProgress)
            // })

        }
    },

}
</script>

<style scoped>
.label {
    font-size: 0.8em;
}

.smallProgress {
    max-width: 430px;
}

.slider-pad {
    padding-left: 10px;
    padding-right: 10px;
    max-width: 400px;
}

.button-container {
    padding-top: 30px;
}
</style>
