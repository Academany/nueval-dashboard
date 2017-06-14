<template>
    <div class="fullwidth graybg padded fixed tableHead">
        <el-row>
            <el-col :span="12">
                <div>
                    <el-tag>999</el-tag> First Last</div>
            </el-col>
            <el-col :span="12" style="margin-top: 4px">
                <el-progress :percentage="70" style="width:200px" label="Progress"></el-progress>
            </el-col>
        </el-row>
    </div>
</template>

<script>
export default {

}
</script>

<style scoped>
.tableHead {
    /*border: 1px solid #dedede;*/
}
</style>
