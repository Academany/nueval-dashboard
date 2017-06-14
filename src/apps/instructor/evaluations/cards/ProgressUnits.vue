<template>
    <el-card>
        <div slot="header">Local Evaluation</div>
        <el-row>
            <el-col :span="12" class="centered">
                <el-progress type="circle" :percentage="100" status="success"></el-progress>
                Complete
            </el-col>
            <el-col :span="12">
                Units completed: 18/18
                <br>Machine project:
                <br> presented
                <br>Final project:
                <br> presented
            </el-col>
        </el-row>
    </el-card>
</template>
<script>
export default {

}
</script>
<style scoped>
.centered {
    text-align: center
}
</style>

