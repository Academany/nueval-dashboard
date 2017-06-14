<template>
    <el-row :gutter="12">
        <el-col :span="7">
            <SelectModule :data="modules" />
        </el-col>
        <el-col :span="17">
            <el-row :gutter="12">
                <el-col :span="12">
                    <UnitDescription />
                </el-col>
                <el-col :span="12">
                    <UnitStatus />
                    <br>
                    <StudentCheckList />
                </el-col>
            </el-row>
        </el-col>
    </el-row>
</template>

<script>

import StudentCheckList from '../cards/StudentCheckList.vue'
import UnitDescription from '../cards/UnitDescription.vue'
import UnitStatus from '../cards/UnitStatus.vue'
import SelectModule from '../forms/SelectModule.vue'

export default {
    props: [
        'modules'
    ],
    components: {
        StudentCheckList,
        UnitDescription,
        UnitStatus,
        SelectModule
    }
}
</script>

<style>

</style>
