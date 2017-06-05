<template>

<div class="form clearfix">
 <h3>Repository</h3>
  <el-form ref="myForm" :rules="rules" :model="form" label-position="left" label-width="150px" >
   
    <el-form-item label="Repository URL" prop="repository_url">
      <el-input v-model="form.repository_url"></el-input>
    </el-form-item>
    <el-form-item label="Access Token" prop="repository_token">
      <el-input v-model="form.repository_token"></el-input>
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
        selectedYear: null,
        dialogVisible : false,
        rules: {
        },

    }
  },
  computed: {
     form: function(){ return  this.item || {} }
  },
  mounted(){
  },
  methods: {
      submitForm(formName,mode) {
        this.item.year = this.selectedYear.getFullYear();
        var vm = this;
        var formW =this.$refs[formName];
        formW.validate((valid) => {
          if (valid) {
              this.updateCourse({
                repository_url: this.item.repository_url,
                repository_token: this.item.repository_url
              }).then(function(success){
                vm.notify('Success', 'Course updated');
                // vm.resetForm();
                //formW.resetFields();
              }).catch(function(error){
                console.log(error);
                vm.notify('Error', 'Some error happened');
              });
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
      ...mapActions(['updateCourse'])

    }
  }
</script>
<style scoped>
.form {
  width: 100%;
}
</style>
