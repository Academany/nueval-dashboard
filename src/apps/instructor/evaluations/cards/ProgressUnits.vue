<template>
    <el-card>
        <div slot="header">{{evaluation.evaluation.name}}
            <br>
            <small>{{evaluation.evaluation.date | moment('YYYY-MM-DD')}}</small>
            <small v-if="evaluation.instructor"> by
                <el-tag type="primary">{{ evaluation.instructor.username || ''}}</el-tag>
            </small>
        </div>
        <div class="centered" v-if="records && records.length > 0">
            <el-progress type="circle" :percentage="statusPercentage" :status="statusType"></el-progress>
            <br>
            <el-tag>{{statusLabel}}</el-tag>
            <p>
                <b>Units completed:</b>
                <small> {{completedUnitsCount}} / {{ records.length }}</small>
            </p>
            <p>
                <el-button type="info" size="medium" @click="handleDetails">View details &raquo;</el-button>
    
            </p>
        </div>
        <div class="centered" v-if="!records || records.length === 0">
    
            <el-progress type="circle" :percentage="0"></el-progress>
            <el-tag>Pending</el-tag>
    
            <p>Check back soon for evaluation details</p>
        </div>
    
    </el-card>
</template>
<script>
export default {
    props: [
        'evaluation'
    ],
    computed: {
        statusLabel() {
            const val = this.statusPercentage
            if (val < 20) return 'Pending'
            else if (val >= 20 && val < 50) return 'In progress'
            else if (val >= 50 && val < 90) return 'Almost done'
            else return 'Complete'
        },
        statusType() {
            if (this.isCompleted) {
                return 'success'
            }
            return ''
            // return 'warning'
        },
        records() {
            return this.evaluation && this.evaluation.records || []
        },
        completedUnits() {
            const completed = this.records.filter((r) => r.completed)
            return completed
        },
        isCompleted() {
            return (this.evaluation.completed || this.completedUnits.length === this.records.length)
        },
        statusPercentage() {
            const perc = Math.round(this.completedUnits.length / this.records.length * 100)
            // console.log(this.completed.length + ' / ' + this.records.length + ' = ' + perc)
            return perc
        },
        completedUnitsCount() {
            return this.completedUnits.length
        }
    },
    methods: {
        handleDetails() {
            this.$emit('showDetails', this.evaluation)
        }
    }
}
</script>
<style scoped>
.centered {
    text-align: center
}
</style>

