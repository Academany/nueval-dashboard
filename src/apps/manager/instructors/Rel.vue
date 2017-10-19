<template>
<div class="form clearfix">
  <el-form ref="myForm" :rules="rules" :model="form" label-position="left" label-width="150px" >
    <el-autocomplete
   class="inline-input"
   v-model="form.input"
   :fetch-suggestions="querySearch"
   placeholder="Please Input"
   :trigger-on-focus="false"
   @select="handleSelect"
 ></el-autocomplete>
    <el-button  type="primary" @click="submitForm('myForm')">Add to node</el-button>
  </el-form>

  <div><br></div>

  <el-table
    :data="tableData"
    style="width:100%">
    <el-table-column
      prop="name"
      label="Name" :width="150">
    </el-table-column>
    <el-table-column
      prop="country"
      label="Country" :width="150">
    </el-table-column>
    <el-table-column
      label=""
      >
      <template slot-scope="scope">
        <el-button size="small"><fa-icon name="gear"></fa-icon></el-button>
        <el-button size="small" type="danger"><fa-icon name="trash"></fa-icon></el-button>
    </template>
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
         ],
        tableData: [
          { name: 'Fab Lab Napoli', label: 'Fab Lab Napoli', country: 'Italy', id: 1 }
        ],
        students: this.item.students
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
      loadAll() {
        return [
          { "value": "vue", "link": "https://github.com/vuejs/vue" },
          { "value": "element", "link": "https://github.com/ElemeFE/element" },
          { "value": "cooking", "link": "https://github.com/ElemeFE/cooking" },
          { "value": "mint-ui", "link": "https://github.com/ElemeFE/mint-ui" },
          { "value": "vuex", "link": "https://github.com/vuejs/vuex" },
          { "value": "vue-router", "link": "https://github.com/vuejs/vue-router" },
          { "value": "babel", "link": "https://github.com/babel/babel" }
         ]
      },
      handleSelect(item) {
        console.log(item);
      }
    }
}
</script>
<style scoped>
</style>
