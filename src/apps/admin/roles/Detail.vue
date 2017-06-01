<template>

<div class="form clearfix">
  <h3><span v-if="form.id">Edit</span>
    <span v-if="!form.id">Fill the form to create a new</span>
     Role <span v-if="form.id">#{{form.id}}</span> </h3>
  <el-form ref="myForm" :rules="rules" :model="form" label-position="left" label-width="150px" >
    <el-form-item label="Role name" prop="name">
      <el-input v-model="form.name"></el-input>
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
import {mapActions} from 'vuex';
 export default {
    props: [
      'item'
    ],
    data() {
      return {
        dialogVisible : false,
        rules: {
              name: [
                   { required: true, message: 'Please enter Role Name', trigger: 'blur' }
              ]

        },

    }
  },
  computed: {
      form: function(){ return  this.item || {} }
  },
    methods: {

      submitForm(formName,mode) {
        var vm = this;
        var formW =this.$refs[formName];
        formW.validate((valid) => {
          if (valid) {
            if (mode == 'create') {
              this.createRole({
                name: this.item.name,

              }).then(function(success){
                vm.notify('Success', 'New role created');
                vm.resetForm();
                //formW.resetFields();
              }).catch(function(error){
                vm.notify('Error', 'Some error happened');
              });
            } else {
              this.updateRole({
                id: this.item.id,
                name: this.item.name
              }).then(function(success){
                vm.notify('Success', 'Course updated');
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
      ...mapActions(['createRole','updateRole'])

    }
  }
</script>
<style scoped>
.form {
  width: 100%;
}
</style>
