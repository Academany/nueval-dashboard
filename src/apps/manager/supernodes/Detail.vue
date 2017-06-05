<template>
<div class="form clearfix">
  <h3><span v-if="form.id">Edit</span>
    <span v-if="!form.id">Fill the form to create a new</span>
     Supernode <span v-if="form.id">{{form.id}}</span> </h3>
  <el-form ref="myForm" :rules="rules" :model="form" label-position="top" label-width="150px" >
    <el-form-item label="Lab name" prop="name">
      <el-input v-model="form.name"></el-input>
    </el-form-item>
    <el-form-item label="Contact name" prop="contact_name">
      <el-input v-model="form.contact_name"></el-input>
    </el-form-item>
    <el-form-item label="Contact email" prop="contact_email">
      <el-input v-model="form.contact_email" type="email"></el-input>
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
import {
  mapActions,
  mapGetters
} from 'vuex'
export default {
  props: [
    'item'
  ],
  data() {
    return {
      rules: {
        name: [{
          required: true,
          message: 'Please enter Supernode Name',
          trigger: 'blur'
        }]
      },

    }
  },
  computed: {
    form() {
      return this.item || {}
    },
    ...mapGetters(['currentCourse'])
  },
  methods: {
    submitForm(formName, mode) {
      var vm = this;
      var formW = this.$refs[formName];
      formW.validate((valid) => {
        if (valid) {
          if (!vm.item.id) {
            this.createSupernode({
              courseId: this.currentCourse.id,
              name: this.item.name,
              contact_name: this.item.contact_name || '',
              contact_email: this.item.contact_email || ''
            }).then(function (success) {
              vm.notify('Success', 'New supernode created');
              vm.resetForm();
              //formW.resetFields();
            }).catch(function (error) {
              vm.notify('Error', 'Some error happened');
            });
          } else {
            this.updateSupernode({
              id: this.item.id,
              courseId: this.currentCourse.id,
              name: this.item.name,
              contact_name: this.item.contact_name || '',
              contact_email: this.item.contact_email || ''
            }).then(function (success) {
              vm.notify('Success', 'Supernode updated');
              vm.resetForm();
              //formW.resetFields();
            }).catch(function (error) {
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
    notify(title, msg) {
      const h = this.$createElement;

      this.$notify({
        title: title,
        message: h('i', {
          style: 'color: teal'
        }, msg)
      });
    },
    resetForm(formName) {
      //this.$refs[formName].resetFields();
      this.$emit('cancelEdit');
    },
    ...mapActions(['createSupernode', 'updateSupernode']),

  }
}
</script>
<style scoped>
.form {
  width: 100%;
}
</style>
