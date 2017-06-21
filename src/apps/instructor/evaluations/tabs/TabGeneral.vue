<template>
    <el-row :gutter="12">
        <el-col v-for="ev in evaluations" :key="ev.id" :span="8">
            <ProgressUnits :evaluation="ev" @showDetails="handleDetails" />
        </el-col>
    </el-row>
</template>

<script>
import ProgressUnits from '../cards/ProgressUnits.vue'
import ProgressFeedback from '../cards/ProgressFeedback.vue'
export default {
    props: [
        'evaluations'
    ],
    components: {
        ProgressUnits,
        ProgressFeedback,
    },
    methods: {
        handleDetails(ev) {
            this.$emit('showDetails', ev)
        }
    }
}
</script>

<style>

</style>
