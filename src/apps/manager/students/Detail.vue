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
    <el-form-item label="User"  >
      <el-autocomplete :fetch-suggestions="querySearchAsync"
          placeholder="Please select a user" size="large"
          @select="handleSelect" :value="(form.user && form.user.email)||''"></el-autocomplete>
          <div v-if="form.userId">
            {{form.userId}}
          </div>
          <div v-if="form.user">
            {{form.user.email}}
          </div>

    </el-form-item>
    <el-form-item label="Lab" prop="lab" :site="40">
      <el-select v-model="form.labId" clearable placeholder="Select" @change="handleSelect2">
       <el-option
         v-for="item in labs"
         :key="item.id"
         :label="item.name"
         :value="item.id">
       </el-option>
     </el-select>
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
        dialogVisible : false,
        rules: {
              name: [
                  { required: false, message: 'Please select User', trigger: 'blur' }
              ],
              student_id: [
                  { required: true, message: 'Please enter Student ID', trigger: 'blur' }
              ]
        },
        form: {}
    }
  },
  mounted(){


    this.loadUsers();
    this.loadLabs(this.currentCourse.id);
    this.form = Object.assign({
      course: this.currentCourse,
      courseId: this.currentCourse.id,
      userId: null,
      user: null,
      labId: null,
      lab: null
    },this.item);
  },
  computed: {
      ...mapGetters(['currentCourse','users','labs']),

  },
  watch: {
    currentCourse: function(val){
      this.form.course = val;
      this.form.courseId = val.id;
    },
  },
  methods: {
    getUser: function(userId){
      const users = this.users.filter( (el) => (el.id === userId) )
      if (users.length > 0){
        return users[0];
      }return null;
    },
    getLab: function(labId){
      const data = this.labs.filter( (el) => (el.id === labId) )
      if (data.length > 0){
        return data[0];
      }return null;

    },
      querySearchAsync(queryString, cb) {
        // debugger
            var links = this.users.map((el)=>{
              el.value = el.email || '';
              return el;
            });
            if (!queryString) return cb(links);
            var results = queryString ?
            links.filter(this.createFilter(queryString)) : links;
            cb(results);
      },
      createFilter(queryString) {
        return (link) => {
            if (link.email)
              return (link.email.indexOf(queryString.toLowerCase()) === 0);
            return false;
        };
      },
      handleSelect(anItem) {
          console.log("select");
          console.log(anItem);
          // console.log(this.form);
          this.form.userId = anItem.id;
          this.form.user = this.getUser(anItem.id);
          // this.form = Object.assign({},this.form, {userId: anItem.id,
            // user: this.getUser(anItem.id)});
      },
      handleSelect2(anItem) {
          console.log("select2");
          console.log(anItem);
          // console.log(this.form);
          // this.form.labId = anItem.id;
          this.form.lab = this.getLab(anItem.id);
          this.form = Object.assign({},this.form);
          // this.form = Object.assign({},this.form, {userId: anItem.id,
            // user: this.getUser(anItem.id)});
      },
      handleCreateStudent(){
        var vm = this;
        if (!vm.currentCourse)
          vm.notify('Error', 'Select a course first');
        var template = {
          userId: vm.form.userId || null ,
          labId: vm.form.labId || null,
          student_id: vm.form.student_id,
          course: vm.form.courseId,
        };
        console.log('template ' + JSON.stringify(template));
        vm.createStudent(template).then(function(success){
          vm.notify('Success', 'Student created');
          vm.resetForm();
          //formW.resetFields();
        }).catch(function(error){
          vm.notify('Error', 'Some error happened');
        });
      },
      handleUpdateStudent(){
        var vm = this;
        var template = {
          id: vm.form.id,
          userId: vm.form.userId,
          labId: vm.form.labId,
          student_id: vm.form.student_id,
          courseId: vm.form.courseId
        };
        console.log(template);
        vm.updateStudent(template).then(function(success){
          vm.notify('Success', 'Student saved');
          vm.resetForm();
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
            if (mode == 'create') {
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
      ...mapActions(['currentCourse','createStudent','updateStudent','loadUsers','loadLabs'])

    }
  }
</script>
<style scoped>
.form {
  width: 100%;
}
</style>
