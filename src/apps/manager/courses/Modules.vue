<template>
<div>
<h3>Modules</h3>

  <el-table
    :data="item.modules"
    style="width: 100%">
    <el-table-column
      prop="date"
      label="Date"
      fit>
    </el-table-column>
    <el-table-column
      prop="module_id"
      label="Module ID"
      fit>
    </el-table-column>
    <el-table-column
      prop="name"
      label="Name"
      fit>
    </el-table-column>
    <el-table-column
      label=""
      :width="50">
      <el-button size="small"><fa-icon name="gear"></fa-icon></el-button>
    </el-table-column>
  </el-table>


</div>

</template>
<script>
export default {
    props: [
        'item'
    ]
}
</script>
