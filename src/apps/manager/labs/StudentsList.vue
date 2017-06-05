<template>
<div class="form clearfix">
  <h3>Students</h3>

  <el-form ref="myForm" :rules="rules" :model="form" label-position="left" label-width="150px" >
    <el-autocomplete
   class="inline-input"
   v-model="form.input"
   :fetch-suggestions="querySearch"
   placeholder="Please Input"
   :trigger-on-focus="false"
   @select="handleSelect"
 ></el-autocomplete>
    <el-button  type="primary" @click="submitForm('myForm')">Add Student</el-button>
  </el-form>

  <div><br/></div>

  <el-table
    :data="students"
    style="width: 100%">
    <el-table-column
      prop="student_id"
      label="Student ID"
      fit>
    </el-table-column>
    <el-table-column
      prop="username"
      label="Username"
      fit>
    </el-table-column>
    <el-table-column
      prop="email"
      label="Email"
      fit>
    </el-table-column>
    <el-table-column
      label=""
      :width="50">
      <el-button size="small"><fa-icon name="gear"></fa-icon></el-button>
    </el-table-column>
  </el-table>

  <div class="clearfix" style="margin-top: 24px">
  <el-button type="info">Register a new student</el-button>
</div>
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
        
      }
    },
    computed: {
      students() { return this.item.students}
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
