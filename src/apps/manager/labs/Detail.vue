<template>

<div class="form clearfix">
  <h3><span v-if="form.id">Edit</span>
    <span v-if="!form.id">Fill the form to create a new</span>
     Lab <span v-if="form.id">{{form.lab_id}}</span> </h3>
  <el-form ref="myForm" :rules="rules" :model="form" label-position="left" label-width="150px" >
    <el-form-item label="Lab name" prop="name">
      <el-input v-model="form.name"></el-input>
    </el-form-item>
    <el-form-item label="Country" prop="country">
      <el-input v-model="form.country"></el-input>
    </el-form-item>
    <el-form-item label="Continent" prop="continent">
      <el-input v-model="form.continent"></el-input>
    </el-form-item>
    <el-form-item label="Path" prop="lab_id">
       <el-input v-model="form.lab_id"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button v-if="!form.id" type="primary" @click="submitForm('myForm')">Create</el-button>
      <el-button v-if="form.id" type="primary" @click="submitForm('myForm')">Save</el-button>
      <el-button @click="resetForm('myForm')">Cancel</el-button>
    </el-form-item>
</el-form>
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
        rules: {
              name: [
                   { required: true, message: 'Please enter Lab Name', trigger: 'blur' }
              ],
              lab_id: [
                   { required: true, message: 'Please enter Lab ID', trigger: 'blur' }
              ],
              country: [
                   { required: true, message: 'Please select Country', trigger: 'blur' }
              ],
              continent: [
                   { required: true, message: 'Please select Continent', trigger: 'blur' }
              ]
        },

    }
  },
  computed: {
      form: function(){ return  this.item || {} },
      ...mapGetters(['currentCourse'])
  },
    methods: {
      ...mapActions(['createLab','updateLab']),
      submitForm(formName,mode) {
        var vm = this;
        var formW =this.$refs[formName];
        formW.validate((valid) => {
          if (valid) {
            if (mode == 'create') {
              this.createLab({
                courseId: this.currentCourse.id,
                course: this.currentCourse,
                name: this.item.name,
                lab_id: this.item.lab_id,
                country: this.item.country,
                continent: this.item.continent
              }).then(function(success){
                vm.notify('Success', 'New lab created');
                vm.resetForm();
                //formW.resetFields();
              }).catch(function(error){
                vm.notify('Error', 'Some error happened');
              });
            } else {
              this.updateLab({
                id: this.item.id,
                courseId: this.currentCourse.id,
                course: this.currentCourse,
                name: this.item.name,
                lab_id: this.item.lab_id,
                country: this.item.country,
                continent: this.item.continent
              }).then(function(success){
                vm.notify('Success', 'Lab updated');
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
    }
  }
</script>
<style scoped>
.form {
  width: 100%;
}
</style>
