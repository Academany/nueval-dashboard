<template>
<div class="form clearfix">
  <h3>Labs</h3>

  <el-table
    :data="item.labs"
    style="width: 100%">
    <el-table-column
      prop="lab_id"
      label="LAB ID"
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
import {mapActions,mapGetters} from 'vuex'
export default {
    props: [
      'item'
    ],
    methods: {      
    }
}
</script>
<style scoped>
</style>
