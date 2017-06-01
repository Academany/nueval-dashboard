<template>

<div class="form clearfix">
  <h3><span v-if="form.id">Edit</span>
    <span v-if="!form.id">Fill the form to create a new</span>
     Evaluation Session <span v-if="form.id">#{{form.id}}</span> </h3>
  <el-form ref="myForm" :rules="rules" :model="form" label-position="left" label-width="150px" >
    <el-form-item label="Session name" prop="name">
      <el-input v-model="form.name"></el-input>
    </el-form-item>
    <el-form-item label="Date" prop="date">
      <el-input v-model="form.date"></el-input>
    </el-form-item>

    <div style="margin-top:22px"><br></div>

    <el-form-item>
      <el-button v-if="!form.id" type="primary" @click="submitForm('myForm')">Create</el-button>
      <el-button v-if="form.id" type="primary" @click="submitForm('myForm')">Save</el-button>
      <el-button @click="resetForm('myForm')">Cancel</el-button>
    </el-form-item>
</el-form>
</div>
</template>


<script>
export default {
    props: [
      'item'
    ],
    data() {
      return {
        rules: {
              name: [
                   { required: true, message: 'Please enter Session Name', trigger: 'blur' }
              ],
              date: [
                   { required: true, message: 'Please enter Session Date', trigger: 'blur' }
              ],
            
        },

    }
  },
  computed: {
      form: function(){ return  this.item || {} }
  },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
        this.$emit('cancelEdit');
      }
    }
  }
</script>
<style scoped>
.form {
  width: 100%;
}
</style>
