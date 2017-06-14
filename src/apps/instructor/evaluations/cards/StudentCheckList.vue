<template>
    <el-card>
        <div slot="header">Student's checklist 3/3</div>
        <h4>Task: Laser cutting</h4>
        <el-checkbox-group v-model="checkList">
            <el-checkbox label="Explained how you parametrically designed your files"></el-checkbox>
            <br>
            <el-checkbox label="Shown how you made your press-fit kit"></el-checkbox>
        </el-checkbox-group>
        <h4>Task: Vinyl cutting</h4>
        <el-checkbox-group v-model="checkList">
            <el-checkbox label="Explained how you parametrically designed your files"></el-checkbox>
            <br>
            <el-checkbox label="Shown how you made your press-fit kit"></el-checkbox>
        </el-checkbox-group>
    
    </el-card>
</template>
<script>
export default {
    data() {
        return {
            checklist: ['selected and disabled']
        }
    }
}
</script>
<style scoped>

</style>
