<template>
    <el-form labelPosition="top" class="static">
        <el-form-item label="Select a Lab" prop="labId">
            <el-select v-model="selectedLab" placeholder="Select Lab" style="width:100%" @change="handleLabChange">
                <el-option v-for="item in labs" :key="item.id" :label="item.name" :value="item">
                </el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="Select a student" prop="studentId">
            <el-table :show-header="false" highlight-current-row ref="studentsTable" @current-change="handleCurrentChange" :data="students" style="width: 100%">
                <el-table-column prop="desc" label="" />
            </el-table>
        </el-form-item>
    </el-form>
</template>

<script>
export default {
    props: [
        'labs',
        'lab'
    ],
    data() {
        return {
            selectedLab: null,
            students: []
        }
    },
    methods: {
        handleLabChange(val) {
            // alert(JSON.stringify(val))
            this.selectedLab = val
            this.students = this.selectedLab.students.map((s) => {
                return { ...s, desc: `${s.first_name} ${s.last_name}` }
            })
        },
        handleCurrentChange(val) {
            // alert(JSON.stringify(val))
            this.$emit('select', val)
        }
    }
}
</script>

<style>

</style>
