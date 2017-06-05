<template>

<div class="form clearfix">
  <h3><span v-if="form.id">Edit</span>
    <span v-if="!form.id">Fill the form to create a new</span>
     Final Project Sessions <span v-if="form.id">#{{form.id}}</span> </h3>
  <el-form ref="myForm" :rules="rules" :model="form" label-position="left" label-width="150px" >
    <el-form-item label="Session name" prop="name">
      <el-input v-model="form.name"></el-input>
    </el-form-item>
    <el-form-item label="Date" prop="selectedDate">
      <el-date-picker
      v-model.date="selectedDate"
      type="datetime"
      placeholder="Pick a day">
    </el-date-picker>
    </el-form-item>
    <el-form-item label="Max students" prop="max" style="width: 300px">
      <el-input type="number" v-model.number="form.max" :min="1" :max="100"></el-input>
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
      selectedDate: this.item && this.item.date || new Date(),
      rules: {
        name: [{
          required: true,
          message: 'Please enter Session Name',
          trigger: 'blur'
        }],
        date: [{
          type: 'datetime',
          required: true,
          message: 'Please enter Session Date',
          trigger: 'change'
        }],
        max: [{
          type: 'number',
          required: true,
          message: 'Please enter Maximum number of students',
          trigger: 'change'
        }],
      },
    }
  },
  computed: {
    form: function () {
      return this.item || {}
    }

  },
  methods: {   
    convertSelectedDate(){
     return moment(this.selectedDate).toDate()
    },
    submitForm(formName) {
      var vm = this;
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (!vm.item.id) {
            vm.createPresentation({
              name: vm.item.name,
              date: vm.convertSelectedDate(),
              max: vm.item.max,
              courseId: vm.item.courseId
            }).then((success) => {
              vm.notify('Success', 'Session created')
              vm.resetForm('myForm')
            }).catch((error) => {
              vm.notify('Error', 'Some error happened' + error)
            })
          } else {
            vm.updatePresentation({
              id: vm.item.id,
              name: vm.item.name,
              date: vm.convertSelectedDate(),
              max: vm.item.max,
              courseId: vm.item.courseId
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
      this.$nextTick(function(){
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
    ...mapActions(['createPresentation', 'updatePresentation'])
  }
}
</script>
<style scoped>
.form {
  width: 100%;
}
</style>
