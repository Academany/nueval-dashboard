<template>
<div class="form clearfix">

  <el-table
    :data="item.booked"
    style="width: 100%">
    <el-table-column
      prop="student_id"
      label="ID"
      fit>
    </el-table-column>
    <el-table-column
      prop="first_name"
      label="First"
      fit>
    </el-table-column>
    <el-table-column
      prop="last_name"
      label="Last"
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
    ],
    data() {
      return {
        form: {
          input: ''
        },
        rules: {

        },
        links: [
          { "value": "vue", "link": "https://github.com/vuejs/vue" },
          { "value": "element", "link": "https://github.com/ElemeFE/element" },
          { "value": "cooking", "link": "https://github.com/ElemeFE/cooking" },
          { "value": "mint-ui", "link": "https://github.com/ElemeFE/mint-ui" },
          { "value": "vuex", "link": "https://github.com/vuejs/vuex" },
          { "value": "vue-router", "link": "https://github.com/vuejs/vue-router" },
          { "value": "babel", "link": "https://github.com/babel/babel" }
         ]
      }
    },
    computed: {
    },
    methods: {
      querySearch(queryString, cb) {
        var links = this.links
        var results = queryString ? links.filter(this.createFilter(queryString)) : links
        // call callback function to return suggestions
        cb(results)
      },
      createFilter(queryString) {
        return (link) => {
          return (link.value.indexOf(queryString.toLowerCase()) === 0);
        };
      },
      handleSelect(item) {
        console.log(item);
      }
    }
}
</script>
<style scoped>
</style>
