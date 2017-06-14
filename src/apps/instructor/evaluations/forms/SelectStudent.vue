<template>
    <el-form labelPosition="top" class="static">
        <el-form-item label="Select a Lab" prop="labId">
            <el-select v-model="lab" placeholder="Select Lab" style="width:100%">
                <el-option v-for="item in labs" :key="item.id" :label="item.name" :value="item">
                </el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="Select a student" prop="studentId">
            <el-table :show-header="false" highlight-current-row ref="studentsTable" @current-change="handleCurrentChange" :data="tableData" style="width: 100%">
                <el-table-column prop="desc" label="" />
            </el-table>
        </el-form-item>
    </el-form>
</template>

<script>
export default {
    props: [
        'labs',
        'lab',
        'students'
    ],
    methods: {
        handleCurrentChange(val) {

        }
    }
}
</script>

<style>

</style>
