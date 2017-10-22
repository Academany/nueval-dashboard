
<script>
import csv from '../api/csv'
export default {
    methods: {
        tableHeaders() {
            return []
        },
        tableRows() {
            return []
        },
        exportData() {
            const headers = this.tableHeaders()
            const rows = this.tableRows()
            let data = [headers]
            data.push(...rows)
            return data
        },
        handleExport() {
            const vm = this
            const filename = 'nueval_table.csv'
            const exportData = this.exportData()
            csv.toCSV(exportData, filename, false, function(msg) {
                vm.$message(msg);
            })
        }
    }
}
</script>
<style scoped>
.adjust {
    vertical-align: text-bottom
}
</style>


