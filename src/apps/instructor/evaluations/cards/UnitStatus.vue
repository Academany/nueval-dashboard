<template>
    <el-card>
        <div slot="header">Status</div>
        <el-row>
            <el-col :span="12">
                <div class="text-center">
                    <el-progress type="circle" :percentage="35"></el-progress>
                    <br> In progress
                </div>
            </el-col>
            <el-col :span="12">
                <el-button class="fullwidth pad">Mark unit complete</el-button>
                <br>
                <el-button class="fullwidth pad">Leave Feedback</el-button>
            </el-col>
        </el-row>
    
    </el-card>
</template>

<script>
export default {

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
</style>
