<template>
<div class="form clearfix">
  <h3>Supernode</h3>

  <el-form ref="snForm" :rules="rules" :model="snForm" label-position="left" label-width="150px" >
    <el-form-item label="Supernode name" prop="supernode"  class="inline-input">
      <el-select v-model="snForm.supernode" :disabled="selectDisabled" placeholder="Select">
        <el-option
          v-for="item in supernodes"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item>
      <el-button v-if="snForm.id" type="primary" @click="submitForm('snForm')">Save</el-button>
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
              supernode: [
                   { required: true, message: 'Please select a supernode', trigger: 'blur' }
              ]
        },
        supernodes: [
          {label: 'No Supernode', value: 'nosupernode'}
        ],
        snForm: this.item
    }
  },
  computed: {
      form: function(){ return  this.item || {} },
      selectDisabled: function(){ return this.item.isSupernode; }
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
      }
    }
  }
</script>
<style scoped>
.form {
  width: 100%;
}
</style>
