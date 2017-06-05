<template>

<div class="form clearfix">
  <h3><span v-if="form.id">Edit</span>
    <span v-if="!form.id">Fill the form to create a new</span>
     Student <span v-if="form.id">#{{form.id}}</span> </h3>
  <el-form ref="myForm" :rules="rules" :model="form" label-position="left" label-width="150px" >
    <el-form-item label="Student ID" prop="student_id">
      <el-input type="text" v-model="form.student_id" placeholder="student id">
      </el-input>
    </el-form-item>
    <el-form-item label="Username" prop="username">
      <el-input type="text" v-model="form.username" placeholder="username from fablabs.io">
      </el-input>
      <small>Required for the student to be able to Login</small>
    </el-form-item>

    <div label="Personal information">
      <div slot="header"><h5>Personal information</h5></div>
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
    </div>

    <div label="Lab">
      <div slot="header"><h5>Lab</h5></div>
    <el-form-item label="Lab" prop="labId" :site="40">
      <el-select v-model="form.labId" placeholder="Select">
       <el-option
         v-for="a in labs"
         :key="a.id"
         :label="a.name"
         :value="a.id">
       </el-option>
     </el-select>
      </el-form-item>
    </div>

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
        dialogVisible : false,
        rules: {
              username: [
                  {  message: 'Please enter Username', trigger: 'blur' }
              ],
              first_name: [
                  { required: true, message: 'Please enter First Name', trigger: 'blur' }
              ],
              last_name: [
                  { required: true, message: 'Please enter Last Name', trigger: 'blur' }
              ],
              email: [
                  { required: true, message: 'Please enter Email', trigger: 'blur' }
              ],
              student_id: [
                  { required: true, message: 'Please enter Student ID', trigger: 'blur' }
              ],
              labId: [
                  { required: false, message: 'Please select a LAB', trigger: 'change' }
              ]
        }
    }
  },
  mounted(){
    
   
    // this.loadUsers();
    this.loadLabs(this.currentCourse.id)  
  },
  computed: {
    form(){return this.item || {}},
      ...mapGetters(['currentCourse','users','labs'])
  },
  methods: {
    handleSelectLab(val){
      // this.form.labId = val
    },
    handleCreateStudent(){
        var vm = this;
        if (!vm.currentCourse)
          return vm.notify('Error', 'Select a course first');
        // console.log('template ' + JSON.stringify(template));
        vm.createStudent({
          username: vm.form.username,
          email: vm.form.email,
          labId: vm.form.labId,
          courseId: vm.currentCourse.id,
          first_name: vm.form.first_name,
          last_name: vm.form.last_name,
          student_id: vm.form.student_id
        }).then(function(success){
          vm.notify('Success', 'Student created');
          vm.resetForm();
          //formW.resetFields();
        }).catch(function(error){
          vm.notify('Error', 'Some error happened');
        });
      },
      handleUpdateStudent(){
        var vm = this;
      
        vm.updateStudent(  {
          username: vm.form.username,
          email: vm.form.email,
          labId: vm.form.labId,
          student_id: vm.form.student_id,
          first_name: vm.form.first_name,
          last_name: vm.form.last_name,
          courseId: vm.form.courseId,
          id: vm.form.id
        }).then(function(success){
          vm.notify('Success', 'Student saved');
          // vm.resetForm();
          //formW.resetFields();
        }).catch(function(error){
          console.log(error);
          vm.notify('Error', 'Some error happened');
        });
      },
      submitForm(formName,mode) {
        
        var vm = this;
        var formW =this.$refs[formName];
        formW.validate((valid) => {
          if (valid) {
            if (!vm.form.id) {
              vm.handleCreateStudent();
            } else {
              vm.handleUpdateStudent();
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
      ...mapActions({
        currentCourse: 'currentCourse',
        createStudent: 'admin/students/createStudent',
        updateStudent: 'admin/students/updateStudent',
        // loadUsers: 'loadUsers',
        loadLabs: 'loadLabs'
      })

    }
  }
</script>
<style scoped>
.form {
  width: 100%;
}
</style>
