<template>
  <div class="form clearfix">
    <h3>
      <span v-if="form.id">Edit</span>
      <span v-if="!form.id">Fill the form to create a new</span>
      Evaluation Session
      <span v-if="form.id">#{{form.id}}</span>
    </h3>
    <el-form ref="myForm" :rules="rules" :model="form" label-position="left" label-width="150px">
      <el-form-item label="Session name" prop="name">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="Date">
        <el-date-picker v-model="selectedDate" type="date" placeholder="Pick a day">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="Kind">
        <el-tooltip class="item" effect="dark" placement="right">
          <div slot="content">In Local sessions, students are assigned to their instructors.
            <br>In Global sessions students must be assigned to evaluators.</div>
  
          <el-select v-model="form.kind" placeholder="Select">
            <el-option v-for="k in options" :key="k.value" :label="k.label" :value="k.value">
            </el-option>
          </el-select>
        </el-tooltip>
      </el-form-item>
  
      <div style="margin-top:22px">
        <br>
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
} from 'vuex'
import moment from 'moment'

export default {
  props: [
    'item'
  ],
  data() {
    return {
      options: [
        { value: 'local', label: 'Local' },
        { value: 'global', label: 'Global' }
      ],
      selectedDate: this.item && this.item.date || new Date(),
      rules: {
        name: [{
          required: true,
          message: 'Please enter Session Name',
          trigger: 'blur'
        }],
        // selectedDate: [{
        //   type: 'date',
        //   required: true,
        //   message: 'Please enter Session Date',
        //   trigger: 'blur'
        // }],

      },

    }
  },
  computed: {
    form: function () {
      return this.item || {}
    }
  },
  methods: {
    convertSelectedDate() {
      return moment(this.selectedDate).format('YYYY-MM-DD')
    },
    submitForm(formName) {
      console.log(this.selectedDate)
      var vm = this;
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (!vm.item.id) {
            vm.createEvaluation({
              name: vm.item.name,
              date: this.convertSelectedDate(),
              courseId: vm.item.courseId,
              kind: vm.item.kind || 'local'
            }).then((success) => {
              vm.notify('Success', 'Session created')
              vm.resetForm('myForm')
            }).catch((error) => {
              vm.notify('Error', 'Some error happened' + error)
            })
          } else {
            vm.updateEvaluation({
              id: vm.item.id,
              name: vm.item.name,
              date: this.convertSelectedDate(),
              courseId: vm.item.courseId,
              kind: vm.item.kind
            }).then((success) => {
              vm.notify('Success', 'Session updated');
              vm.resetForm('myForm')
            }).catch((error) => {
              vm.notify('Error', 'Some error happened ' + error);
            });
          }
        } else {
          vm.notify('Error', 'Form is not valid');
          return false;
        }
      });
    },
    resetForm(formName) {
      if (this.$refs[formName])
        this.$refs[formName].resetFields();
      this.$nextTick(function () {
        this.$emit('cancelEdit');
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
    ...mapActions(['createEvaluation', 'updateEvaluation'])
  }
}
</script>
<style scoped>
.form {
  width: 100%;
}
</style>
