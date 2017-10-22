<template>
  <div>
    <el-button class="export-btn" size="mini" @click="handleExport">
      <fa-icon name="table" class="adjust"></fa-icon> Export to CSV</el-button>
    <el-table ref="myTable" border :height="tableHeight" :data="items" style="width: 100%" highlight-current-row @current-change="handleCurrentChange" @sort-change="handleSortChange">

      <el-table-column v-for="col in columns.filter((c) => c.prop === 'date')" :prop="col.prop" :label="col.label" :key="col.id" fit :width="col.width" :sortable="true">
        <template slot-scope="scope">
          {{ scope.row.date | moment('YYYY-MM-DD') }}
        </template>
      </el-table-column>

      <el-table-column v-for="col in columns.filter((c) => c.prop != 'date')" :prop="col.prop" :label="col.label" :key="col.id" fit :width="col.width" :sortable="true">
      </el-table-column>

    </el-table>
  </div>
</template>
<script>
import moment from 'moment'
/**
<el-button
  size="small"
  @click="handleEdit(scope.$index, scope.row)"><fa-icon name="edit"></fa-icon></el-button>
<el-button
  size="small"
  @click="handleDelete(scope.$index, scope.row)"><fa-icon name="trash"></fa-icon></el-button>
  **/

import csv from '../api/csv'
export default {
  props: [
    "value",
    "tableColumns",
    "selectedRow"
  ],
  computed: {
    items() {
      return this.value
    }
  },
  created: function() {
    console.log('adding listener')
    window.addEventListener('resize', this.handleResize)
  },
  destroyed: function() {
    window.removeEventListener('resize', this.handleResize)
  },
  filters: {
    date: (val) => {
      if (!val) return '';
      return moment(val).toLocaleString()
    }
  },
  data() {
    return {
      columns: this.tableColumns || [],
      tableHeight: window.innerHeight - 120
    }
  },
  methods: {
    handleResize() {
      console.log('resize!')
      this.tableHeight = window.innerHeight - 120
      this.$refs.myTable.$forceUpdate();
    },
    handleSortChange() {
      // console.log(this.$refs)
      this.$refs.myTable.setCurrentRow()
    },
    handleCurrentChange(row) {
      this.$emit("select", -1, row)
    },
    handleEdit(index, row) {
      this.$emit("edit", index, row)
    },
    handleDelete(index, row) {
      this.$emit("delete", index, row)
    },
    handleExport() {
      console.log('columns')
      console.log(this.columns)
      const vm = this
      const filename = 'nueval_table.csv'
      const data = this.items || []
      const cols = this.columns || []
      let exportData = []

      let header = []
      for (var i = 0; i < cols.length; i++) {
        header.push(cols[i].label)
      }
      exportData.push(header)
      for (var r = 0; r < data.length; r++) {
        let row = []
        const item = data[r]
        for (var i = 0; i < cols.length; i++) {
          const prop = cols[i].prop
          let val
          if (prop.indexOf('.') > -1) {
            val = item[prop.split('.')[0]][prop.split('.')[1]]
          } else {
            val = item[cols[i].prop]
          }
          row.push(val)
        }
        exportData.push(row)
      }

      csv.toCSV(exportData, filename, false, function(msg) {
        vm.$message(msg);
      })
    },
    clearSelection() {
      this.$refs.myTable.setCurrentRow()
    }
  }
}
</script>
<style scoped>
.el-table__body tr.current-row>td {
  background-color: #cdfdcd;
}

.adjust {
  vertical-align: text-bottom
}

.export-btn {
  margin: 12px;
  float: right;
  clear: both;
}
</style>
