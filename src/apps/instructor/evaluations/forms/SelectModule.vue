<template>
    <el-table border :show-header="false" highlight-current-row ref="modulesTable" @current-change="handleModuleChange" :data="data" style="width: 100%">
        <el-table-column prop="name" :min-width="100">
            <template scope="scope">
                {{scope.row.name | truncate(32)}}
            </template>
        </el-table-column>
        <el-table-column prop="progress" :width="120">
            <template scope="scope">
                <el-progress :percentage="50" type="line" style="width: 100px "></el-progress>
            </template>
        </el-table-column>
    </el-table>
</template>

<script>
export default {
    props: [
        'data'
    ],
    methods: {
        handleModuleChange() {

        }
    }
}
</script>

<style>

</style>
