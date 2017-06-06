<template>
<el-table
  ref="myTable"
  fit
  :data="items"
  style="width: 100%"
  highlight-current-row
  @current-change="handleCurrentChange"
  @sort-change="handleSortChange"
  >

  <el-table-column v-for="col in columns" :prop="col.prop" :label="col.label" :key="col.id" fit :width="col.width" :sortable="true">
  </el-table-column>

</el-table>
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
export default {
  props: [
    "value",
    "tableColumns",
    "selectedRow"
  ],
  computed: {
    items(){
     return this.value
    }
  },
  filters: {
    date: (val)=>{
      if (!val) return '';
      return moment(val).toLocaleString()
    }
  },
  data(){
    return {

      columns: this.tableColumns || []
    }
  },
  methods: {
    handleSortChange(){
      // console.log(this.$refs)
      this.$refs.myTable.setCurrentRow()
    },
    handleCurrentChange(row){
      this.$emit("select",-1, row)
    },
    handleEdit(index,row){
      this.$emit("edit", index,row)
    },
    handleDelete(index,row){
      this.$emit("delete", index,row)
    },
    clearSelection(){
      this.$refs.myTable.setCurrentRow()
    }
  }
}
</script>
<style scoped>
.el-table__body tr.current-row>td {
  background-color: #cdfdcd;
}
</style>
