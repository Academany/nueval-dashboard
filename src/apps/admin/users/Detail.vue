<template>

<div class="form clearfix">
  <h3><span v-if="form.id">Edit</span>
    <span v-if="!form.id">Fill the form to create a new</span>
     User <span v-if="form.id">#{{form.id}}</span> </h3>
  <el-form ref="myForm" :rules="rules" :model="form" label-position="left" label-width="150px" >
    <el-form-item label="Email" prop="email">
      <el-input v-model="form.email"></el-input>
    </el-form-item>
    <el-form-item label="Username" prop="username">
      <el-input v-model="form.username"></el-input>
    </el-form-item>
    <el-form-item label="First" prop="first_name">
      <el-input v-model="form.first_name"></el-input>
    </el-form-item>
    <el-form-item label="Last" prop="last_name">
      <el-input v-model="form.last_name"></el-input>
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
                   { required: true, message: 'Please enter Email', trigger: 'blur' }
              ],
              username: [
                  { required: true, message: 'Please enter Username', trigger: 'blur'}
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
              this.createUser({
                email: this.item.email,
                first_name: this.item.first_name,
                last_name: this.item.last_name,
                username: this.item.username
              }).then(function(success){
                vm.notify('Success', 'New user created');
                vm.resetForm();
                //formW.resetFields();
              }).catch(function(error){
                vm.notify('Error', 'Some error happened');
              });
            } else {
              this.updateUser({
                id: this.item.id,
                email: this.item.email,
                first_name: this.item.first_name,
                last_name: this.item.last_name,
                username: this.item.username
              }).then(function(success){
                vm.notify('Success', 'User updated');
                vm.resetForm();
                //formW.resetFields();
              }).catch(function(error){
                //console.log(error);
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
      ...mapActions(['createUser','updateUser'])

    }
  }
</script>
<style scoped>
.form {
  width: 100%;
}
</style>
