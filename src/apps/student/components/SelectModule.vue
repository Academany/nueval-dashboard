<template>
    <el-table border :show-header="false" highlight-current-row ref="modulesTable" @current-change="handleModuleChange" :data="data" style="width: 100%">
        <el-table-column prop="name" :min-width="100">
            <template slot-scope="scope">
                {{scope.row.name | truncate(38)}}
            </template>
        </el-table-column>
        <el-table-column prop="progress" :width="120">
            <template slot-scope="scope">
                <el-progress :percentage="progressFor(scope.row)" type="line" :status="isCompleted(scope.row) ? 'success' : ''" style="width: 100px "></el-progress>
            </template>
        </el-table-column>
    </el-table>
</template>

<script>
export default {
    props: [
        'data',
        'records'
    ],
    methods: {
        colorOf(progress) {
            if (!progress || progress < 30) {
                return 'exception'
            } else if (progress > 90) {
                return 'success'
            }
            return null
        },
        handleModuleChange(val) {
            // alert(JSON.stringify(val));
            const vm = this
            if (val)
                this.$nextTick(function () {
                    const record = vm.recordFor(val)
                    vm.$emit('select-module', { module: val, record: record })
                })
        },
        recordFor(module) {
            // console.log('Record for looking into ' + this.records.length)
            const recs = this.records || []
            const record = recs.find((r) => r.moduleId === module.id)
            if (!record) console.log('No record found ' + module.id)
            // console.log(module.id)
            return record
        }
    },
    computed: {
        progressFor() {
            return (module) => {
                const record = this.recordFor(module)
                if (record && record.progress) {
                    return parseInt(record.progress)
                }
                return 0
            }
        },
        isCompleted() {
            return (module) => {
                const record = this.recordFor(module)
                return (record && record.completed)
            }
        }
    }
}
</script>

<style>

</style>
