<template>
<div class="form clearfix">
  <h3>Supernode
     <span v-if="item.supernode">
    : {{ item.supernode.name }}
  </span>
  </h3>

<p>Select a supernode:</p>
  <el-form ref="snForm" :rules="rules" :model="snForm" label-position="left" label-width="150px" >
    <el-form-item label="Supernode name" prop="supernode"  class="inline-input">
      <el-select v-model="selectedNode"  placeholder="Select" @input="handleSelect">
        <el-option
          v-for="item in filteredList()"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item>
      <el-button :disabled="!selectedNode" type="primary" @click="submitForm('snForm')">Save</el-button>
    </el-form-item>
</el-form>
</div>

</template>
<script>
import {mapActions,mapGetters} from 'vuex'
export default {
    props: [
      'item'
    ],
    data() {
      return {
        rules: {
              supernode: [
                   { message: 'Please select a supernode', trigger: 'change' }
              ]
        },
        // supernodes: [
        //   {label: 'No Supernode', value: 'nosupernode'}
        // ],
        selectedNode: this.item.supernode ? { label: this.item.supernode.name, value: this.item.supernode} : null ,        
        snForm: {
          "supernode": null
        }
    }
  },
  mounted(){
    this.loadSupernodes(this.currentCourse.id)
  },
  computed: {
      ...mapGetters(['supernodes','currentCourse']),
      form: function(){ return  this.item || {} },
      selectDisabled: function(){ return this.item.isSupernode; }
  },
    methods: {
      filteredList(){
        return (this.supernodes || []).map((el)=>{return {label: el.name, value: el}})
      },
      handleSelect(a) {
        // console.log(item);
        //this.form.supernode = a.link;
      },
      submitForm(formName) {
        var vm = this;
        this.$refs[formName].validate((valid) => {
          if (valid && this.selectedNode) {
            // alert(this.selectedNode.id);
            // this
            this.updateLab({
              id: vm.item.id,
              courseId: vm.currentCourse.id,
              supernodeId: vm.selectedNode.id
            }).then((success)=>{
                vm.notify('Success', 'Supernode updated');
                vm.resetForm();
            }).catch((error)=>{
                 console.log(error);
                vm.notify('Error', 'Some error happened');
            })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        // this.$refs[formName].resetFields();
      },
      notify(title, msg){
        const h = this.$createElement;

        this.$notify({
          title: title,
          message: h('i', { style: 'color: teal' }, msg)
        });
      },
      ...mapActions(['loadSupernodes','updateLab'])
    }
  }
</script>
<style scoped>
.form {
  width: 100%;
}
</style>
