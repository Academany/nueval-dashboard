<template>
    <el-form labelPosition="top" class="static">
        <el-form-item label="Select a Lab">
            <el-select  placeholder="Select Lab" style="width:100%" @change="handleLabChange" v-model="selectedLab">
                <el-option v-for="item in labs" :key="item.id" :label="item.name" :value="item.id">
                </el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="Select a student">
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
            students: [],
            currentLab: null,
        }
    },
    methods: {
        handleLabChange(val) {
          debugger
            // alert(JSON.stringify(val))
            const targetId = val
            let currentLab
            for ( let idx in this.labs){
              let lab = this.labs[idx]
              if (lab.id === targetId){
                currentLab = lab
            }}
            this.students = currentLab.students.map((s) => {
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
