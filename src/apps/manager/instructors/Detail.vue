<template>
  <div class="form clearfix">
    <h3>
      <span v-if="form.id">Edit</span>
      <span v-if="!form.id">Fill the form to create a new</span>
      Instructor
      <span v-if="form.id">{{form.lab_id}}</span>
    </h3>
    <el-form ref="myForm" :rules="rules" :model="form" label-position="top" label-width="150px">
      <el-form-item label="Username" prop="username">
        <el-input type="text" v-model="form.username" placeholder="username from fablabs.io">
        </el-input>
        <small>Required for the user to be able to Login</small>
      </el-form-item>

      <div label="Personal information">
        <div slot="header">
          <h5>Personal information</h5>
        </div>
        <el-form-item label="Email" prop="email">
          <el-input type="text" v-model="form.email" placeholder="email address">
          </el-input>
        </el-form-item>
        <el-form-item label="First Name" prop="first_name">
          <el-input type="text" v-model="form.first_name" placeholder="First name">
          </el-input>
        </el-form-item>
        <el-form-item label="Last Name" prop="last_name">
          <el-input type="text" v-model="form.last_name" placeholder="Last name">
          </el-input>
        </el-form-item>

        <el-form-item label="Graduation year" prop="graduation_year">
          <el-input type="text" v-model="form.graduation_year" placeholder="2017"></el-input>
        </el-form-item>

        <el-form-item label="Years teaching" prop="years_teaching">
          <el-input type="text" v-model="form.years_teaching" placeholder="0"></el-input>
        </el-form-item>

        <el-form-item label="Comment" prop="comment">
          <el-input type="textarea" :rows="8" placeholder="" v-model="form.comment">
          </el-input>
        </el-form-item>
      </div>

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
} from 'vuex';

export default {

  props: [
    'item'
  ],
  data() {
    return {
      rules: {
        username: [{
          message: 'Please enter Username',
          trigger: 'blur'
        }],
        first_name: [{
          required: true,
          message: 'Please enter First Name',
          trigger: 'blur'
        }],
        last_name: [{
          required: true,
          message: 'Please enter Last Name',
          trigger: 'blur'
        }],
        email: [{
          required: true,
          message: 'Please enter Email',
          trigger: 'blur'
        }]
      },

    }
  },
  computed: {
    form: function() {
      return this.item || {}
    },
    ...mapGetters(['currentCourse'])
  },
  methods: {
    handleCreate() {
      var vm = this;
      if (!vm.currentCourse)
        return vm.notify('Error', 'Select a course first');
      // console.log('template ' + JSON.stringify(template));
      vm.createInstructor({
        username: vm.form.username,
        email: vm.form.email,
        courseId: vm.currentCourse.id,
        first_name: vm.form.first_name,
        last_name: vm.form.last_name,
        years_teaching: vm.form.years_teaching,
        graduation_year: vm.form.graduation_year,
        comment: vm.form.comment
      }).then(function(success) {
        vm.notify('Success', 'Instructor created');
        vm.resetForm();
        //formW.resetFields();
      }).catch(function(error) {
        vm.notify('Error', 'Some error happened');
      });
    },
    handleUpdate() {
      var vm = this;
      if (!vm.currentCourse)
        return vm.notify('Error', 'Select a course first');

      vm.updateInstructor({
        username: vm.form.username,
        email: vm.form.email,
        first_name: vm.form.first_name,
        last_name: vm.form.last_name,
        courseId: vm.currentCourse.id,
        years_teaching: vm.form.years_teaching,
        graduation_year: vm.form.graduation_year,
        comment: vm.form.comment,
        id: vm.form.id
      }).then(function(success) {
        vm.notify('Success', 'Instructor saved');
        vm.resetForm();
        //formW.resetFields();
      }).catch(function(error) {
        //console.log(error);
        vm.notify('Error', 'Some error happened');
      });
    },
    submitForm(formName, mode) {

      var vm = this;
      var formW = this.$refs[formName];
      formW.validate((valid) => {
        if (valid) {
          if (!vm.form.id) {
            vm.handleCreate();
          } else {
            vm.handleUpdate();
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
      // this.$refs[formName].resetFields();
      this.$emit('cancelEdit');
    },
    ...mapActions({
      createInstructor: 'admin/instructors/createInstructor',
      updateInstructor: 'admin/instructors/updateInstructor',
    })
  }
}
</script>
<style scoped>
.form {
  width: 100%;
}
</style>
