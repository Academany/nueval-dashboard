<template>
  <div class="form clearfix">
    <h3>
      <span v-if="form.id">Edit</span>
      <span v-if="!form.id">Fill the form to create a new</span>
      Student
      <span v-if="form.id">#{{form.id}}</span>
    </h3>
  
    <h4>Progress</h4>
  
    <small>Student evaluations found: {{ progress && progress.length || 0}}</small>
  
    <table v-if="progress && progress.length > 0">
      <tr v-for="session in progress" :key="session.id">
        <td class="topcell">
          <div :class="{bubble:1,success:session.completed}">
            <div class="bubble-content">
              {{ session.evaluation && session.evaluation.date || moment('YYYY-MM-DD')}}
              <br> {{ session.evaluation && session.evaluation.name || '' }}
              <br> by
              <el-tag>{{session.instructor && session.instructor.username || ''}}</el-tag>
            </div>
          </div>
        </td>
        <td class="topalign">
          <table>
            <tr v-for="(r,idx) in session.records" :key="r.id" v-if="r.progress">
              <td>
                <el-progress :percentage="r.progress || 0" type="line" style="width: 100px" />
              </td>
              <td>{{r.module.name}}</td>
              <td>
                <div v-if="r.messages && r.messages.length>0">
                  <fa-icon name="envelope" /> {{r.messages && r.messages.length|| 0}}
                </div>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
    <p v-else>Not evaluated yet</p>
  
    <h4>Flags</h4>
  
    <el-form ref="myForm" :rules="rules" :model="form" label-position="left" label-width="150px">
      <el-form-item label="Graduated" prop="graduated">
        <el-checkbox v-model="form.graduated">
        </el-checkbox>
      </el-form-item>
      <el-form-item label="Next Cycle" prop="next_cycle">
        <el-checkbox v-model="form.next_cycle">
        </el-checkbox>
      </el-form-item>
      <el-form-item label="Continuing" prop="continuing">
        <el-checkbox v-model="form.continuing">
        </el-checkbox>
      </el-form-item>
      <el-form-item label="Dropped out" prop="dropped">
        <el-checkbox v-model="form.dropped">
        </el-checkbox>
      </el-form-item>
  
      <div style="margin-top:22px">
        <br>
      </div>
  
      <el-form-item>
        <el-button v-if="form.id" type="primary" @click="submitForm('myForm','update')">Save</el-button>
        <el-button @click="resetForm('myForm')">Cancel</el-button>
      </el-form-item>
    </el-form>
  
  </div>
</template>


<script>
import { mapActions, mapGetters } from 'vuex';
export default {
  props: [
    'item'
  ],
  data() {
    return {
      dialogVisible: false,
      rules: {

      }
    }
  },
  mounted() {

    this.$nextTick(() => {
      if (this.item)
        this.loadProgress(this.item)
    })

  },
  watch: {
    item: function (val) {
      if (val)
        this.loadProgress(val)
    }
  },
  computed: {
    form() { return this.item || {} },
    ...mapGetters({
      'currentCourse': 'currentCourse',
      loading: 'admin/students/loading',
      currentStudent: 'admin/students/student',
      progress: 'admin/students/progress'
    })
  },
  methods: {
    handleSelectLab(val) {
      // this.form.labId = val
    },
    handleCreateStudent() {
      var vm = this;
      if (!vm.currentCourse)
        return vm.notify('Error', 'Select a course first');
      // console.log('template ' + JSON.stringify(template));
      // vm.createStudent({
      //   username: vm.form.username,
      //   email: vm.form.email,
      //   labId: vm.form.labId,
      //   courseId: vm.currentCourse.id,
      //   first_name: vm.form.first_name,
      //   last_name: vm.form.last_name,
      //   student_id: vm.form.student_id
      // }).then(function (success) {
      //   vm.notify('Success', 'Student created');
      //   vm.resetForm();
      //   //formW.resetFields();
      // }).catch(function (error) {
      //   vm.notify('Error', 'Some error happened');
      // });
    },
    handleUpdateStudent() {
      var vm = this;

      vm.updateStudent({
        courseId: vm.currentCourse.id,
        graduated: vm.form.graduated,
        continuing: vm.form.continuing,
        dropped: vm.form.dropped,
        next_cycle: vm.form.next_cycle,
        id: vm.form.id
      }).then(function (success) {
        vm.notify('Success', 'Student saved');
        // vm.resetForm();
        //formW.resetFields();
      }).catch(function (error) {
        console.log(error);
        vm.notify('Error', 'Some error happened');
      });
    },
    submitForm(formName, mode) {
      var vm = this;
      var formW = this.$refs[formName];
      formW.validate((valid) => {
        if (valid) {
          vm.handleUpdateStudent();

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
      loadProgress: 'admin/students/loadProgress'
    })

  }
}
</script>
<style scoped>
.form {
  width: 100%;
}

.bubble {
  border: 1px solid transparent;
  width: 100px;
  height: 100px;
  text-align: center;
  font-size: 0.8em;
  padding: 20px;
  border-radius: 70px;
  background-color: #20a0ff;
  color: white;
}

.bubble.success {
  background-color: greenyellow;
  color: #333;
}

.bubble-content {
  margin-top: 20px;
}

td.topcell {
  vertical-align: top;
  border-right: 4px solid #dedede;
  margin-bottom: 24px;
  padding-right: 10px;
}

td.topalign {
  vertical-align: top;
}
</style>
