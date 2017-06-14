<template>
    <el-row :gutter="12">
        <el-col :span="8">
            <ProgressUnits />
            <br>
            <ProgressFeedback />
        </el-col>
        <el-col :span="8">
            <ProgressUnits />
        </el-col>
        <el-col :span="8">
            <ProgressUnits />
        </el-col>
    </el-row>
</template>

<script>
import ProgressUnits from '../cards/ProgressUnits.vue'
import ProgressFeedback from '../cards/ProgressFeedback.vue'
export default {
    components: {
        ProgressUnits,
        ProgressFeedback,
    }
}
</script>

<style>

</style>
