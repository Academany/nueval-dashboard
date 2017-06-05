<template>

<div class="form clearfix">
  <h3><span v-if="form.id">Edit</span>
    <span v-if="!form.id">Fill the form to create a new</span>
     Course <span v-if="form.id">#{{form.id}}</span> </h3>
  <el-form ref="myForm" :rules="rules" :model="form" label-position="left" label-width="150px" >
    <el-form-item label="Code" v-if="course_code">
    <span>{{course_code}}</span>
    </el-form-item>
    <el-form-item label="Course name" prop="name">
      <el-input v-model="form.name"></el-input>
    </el-form-item>
    <el-form-item label="Year" prop="selectedYear">
       <el-date-picker
          v-model="selectedYear"
          type="year"
          placeholder="Pick a year">
  </el-date-picker>
    </el-form-item>
    <el-form-item label="Program" prop="program">
      <el-input v-model="form.program"></el-input>
    </el-form-item>


    <div style="margin-top:22px"><br></div>

    <el-form-item>
      <el-button v-if="!form.id" type="primary" @click="submitForm('myForm','create')">Create</el-button>
      <el-button v-if="form.id" type="primary" @click="submitForm('myForm','update')">Save</el-button>
      <el-button @click="resetForm('myForm')">Cancel</el-button>
    </el-form-item>
</el-form>


</div>
</template>


<script>
import moment from 'moment'
import {mapActions} from 'vuex'
export default {
    props: [
      'item'
    ],
    data() {
      return {
        selectedYear: null,
        dialogVisible : false,
        rules: {
              name: [
                   { required: true, message: 'Please enter Course Name', trigger: 'blur' }
              ],
              // selectedYear: [
              //      {  type: 'date', required: true, message: 'Please enter Course Year', trigger: 'blur' }
              // ],
              program: [
                   { required: true, message: 'Please enter Course Program', trigger: 'blur' }
              ],
        },

    }
  },
  computed: {
      course_code: function(){
        if (!this.form.program) return null;
        return this.form.program + '' + this.form.year;
      },
      form: function(){ return  this.item || {} }
  },
  watch: {
    item: function(newVal){
       if (newVal && newVal.year) {
         this.selectedYear = new Date(parseInt(''+newVal.year),1);
       }
    }
  },
  mounted(){
     this.$nextTick(() => {
       if (this.item && this.item.year) {
         this.selectedYear = new Date(parseInt(''+this.item.year),1);
       }
     })
  },
  methods: {
      submitForm(formName,mode) {
        this.item.year = this.selectedYear.getFullYear();
        var vm = this;
        var formW =this.$refs[formName];
        formW.validate((valid) => {
          if (valid) {
            if (mode == 'create') {
              vm.createCourse({
                name: vm.item.name,
                year: moment(vm.selectedYear).year(),
                program: vm.item.program
              }).then(function(success){
                vm.notify('Success', 'New course created');
                vm.resetForm();
                //formW.resetFields();
              }).catch(function(error){
                vm.notify('Error', 'Some error happened');
              });
            } else {
              vm.updateCourse({
                id: vm.item.id,
                name: vm.item.name,
                year: moment(vm.selectedYear).year(),
                program: vm.item.program
              }).then(function(success){
                vm.notify('Success', 'Course updated');
                // vm.resetForm();
                vm.resetForm();
                //formW.resetFields();
              }).catch(function(error){
                console.log(error);
                vm.notify('Error', 'Some error happened');
              });
            }
          } else {
            vm.notify('Error', 'Form is not valid');
            return false;
          }
        });
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
      ...mapActions(['createCourse','updateCourse'])

    }
  }
</script>
<style scoped>
.form {
  width: 100%;
}
</style>
