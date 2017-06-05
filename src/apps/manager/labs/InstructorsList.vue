<template>
<div class="form clearfix">
  <h3>Instructors</h3>

  <el-form ref="myForm" :rules="rules" :model="form" label-position="left" label-width="150px" >
    <el-autocomplete
   class="inline-input"
   v-model="form.input"
   :fetch-suggestions="querySearch"
   placeholder="Please Input"
   @select="handleSelect"
 ></el-autocomplete>
    <el-button  type="primary" @click="submitForm('myForm')" :disabled="!form.instructor">Add to Lab</el-button>
  </el-form>

  <div><br></div>

  <el-table
    :data="instructors"
    style="width: 100%">
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
    </el-table-column>
  </el-table>

  <div class="clearfix" style="margin-top: 24px">
  <el-button type="info">Register a new instructor</el-button>
</div>

</div>

</template>
<script>
import {mapActions,mapGetters} from 'vuex'
export default {
    props: [
      'item'
    ],
    data() {
      return {
        form: {
          input: '',
          instructor: null
        },
        rules: {
           instructor: [
                   { required: true, message: 'Select an instructor', trigger: 'blur' }
              ],
             
        },

      }
    },
    computed: {
      instructors(){ return this.item.instructors && this.item.instructors || [] },
      ...mapGetters({
        'allInstructors':'admin/instructors/instructors',
        'currentCourse':'currentCourse'
        })
    },
    mounted(){
      this.loadInstructors(this.currentCourse.id)
    },
    methods: {
      submitForm(formName) {
        // alert('submit! ' + this.form.input)
        if (this.form.instructor) {
          this.assignLab( {instructor: this.form.instructor, lab: this.item}).then((success)=>{
              this.notify("Success", "Instructor updated")
          }).catch((error)=>{
              this.notify("Error", "Some error occurred")
              console.log(error)
          });
        }
      },
       notify(title, msg){
        const h = this.$createElement;

        this.$notify({
          title: title,
          message: h('i', { style: 'color: teal' }, msg)
        });
      },
      resetForm(formName) {
        //this.$refs[formName].resetFields();
        this.$emit('cancelEdit');
      },
      querySearch(queryString, cb) {
        var links = this.allInstructors
        var results = queryString ? links.filter(this.createFilter(queryString)) : links
        // call callback function to return suggestions
        results = results.map((el)=>{ return { value: el.username, link:el} })
        cb(results)
      },
      createFilter(queryString) {
        return (link) => {
          return (link.username.indexOf(queryString.toLowerCase()) === 0);
        };
      },
      handleSelect(item) {
        // console.log(item);
        this.form.instructor = item.link;
      },
      ...mapActions({
        'loadInstructors' : 'admin/instructors/loadInstructors',
        'assignLab': 'admin/instructors/assignLab'
      })
    }
}
</script>
<style scoped>
</style>
