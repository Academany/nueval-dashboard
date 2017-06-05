<template>
<div class="form clearfix">
  <h3>Instructors</h3>

  <el-table
    :data="item.instructors"
    style="width: 100%">
    <el-table-column
      prop="user_id"
      label="User ID"
      fit>
    </el-table-column>
    <el-table-column
      prop="username"
      label="Username"
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
