<template>

<div class="form clearfix">
  <h3><span v-if="form.id">Edit</span>
    <span v-if="!form.id">Fill the form to create a new</span>
     Module <span v-if="form.id">#{{form.id}}</span> </h3>
  <el-form ref="myForm" :rules="rules" :model="form" label-position="left" label-width="150px" >
      <el-form-item label="Date" prop="date">  
      <el-input v-model="form.name"></el-input>
    </el-form-item>
    <el-form-item label="Date" prop="date">
      <el-input v-model="form.date"></el-input>
    </el-form-item>
    <el-form-item label="Description" prop="description">
      <el-input v-model="form.description"></el-input>
    </el-form-item>
    <el-form-item label="Lecture URL" prop="lecture_url">
      <el-input v-model="form.lecture_url"></el-input>
    </el-form-item>
    <el-form-item label="Assessment URL" prop="assess_url">
      <el-input v-model="form.assess_url">
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
import {mapActions,mapGetters} from 'vuex';
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
                   { required: true, message: 'Please enter Module Name', trigger: 'blur' }
              ],
              date: [
                   {  type: 'date', required: true, message: 'Please enter Module date', trigger: 'blur' }
              ]
        },

    }
  }
  computed: {
      form: function(){ return  this.item || {} }
  },
  methods: {
      submitForm(formName,mode) {
        this.item.year = this.selectedYear.getFullYear();
        var vm = this;
        var formW =this.$refs[formName];
        formW.validate((valid) => {
          if (valid) {
            if (mode == 'create') {
              this.createModule({
                name: this.item.name,
                date: this.item.date,
                description: this.item.description,
                lecture_url: this.item.lecture_url,
                assess_url: this.item.assess_url,
                course: this.item.course.id
              }).then(function(success){
                vm.notify('Success', 'New course created');
                // vm.resetForm();
                //formW.resetFields();
              }).catch(function(error){
                vm.notify('Error', 'Some error happened');
              });
            } else {
              this.updateModule({
                id: this.item.id,
                name: this.item.name,
                date: this.item.date,
                description: this.item.description,
                lecture_url: this.item.lecture_url,
                assess_url: this.item.assess_url,
              }).then(function(success){
                vm.notify('Success', 'Course updated');
                // vm.resetForm();
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
      ...mapActions(['createModule','updateModule'])

    }
  }
</script>
<style scoped>
.form {
  width: 100%;
}
</style>
