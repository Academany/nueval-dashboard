<template>
  <div class="sheet">
  <div class="header">
    <el-row :gutter="8">
      <el-col :span="6">
        <h2 style="margin-left:12px">Programs</h2>
      </el-col>
    </el-row>
  </div>
  <div class="master">
<el-table
 stripe
  :data="tableData"
  style="width: 100%">
  <el-table-column
    prop="date"
    label="Date"
    width="180">
  </el-table-column>
  <el-table-column
    prop="name"
    label="Name"
    width="180">
  </el-table-column>
  <el-table-column
    prop="address"
    label="Address">
  </el-table-column>
  <el-table-column
     label="Operations">
     <template slot-scope="scope">
       <el-button
         size="small"
         @click="handleEdit(scope.$index, scope.row)">Edit</el-button>
       <el-button
         size="small"
         type="danger"
         @click="handleDelete(scope.$index, scope.row)">Delete</el-button>
     </template>
   </el-table-column>
</el-table>
  </div>
  <div class="detail">

  </div>
</div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [{
        date: '2016-05-03',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles'
      }, {
        date: '2016-05-02',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles'
      }, {
        date: '2016-05-04',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles'
      }, {
        date: '2016-05-01',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles'
      }]
    }
  }
}
</script>
