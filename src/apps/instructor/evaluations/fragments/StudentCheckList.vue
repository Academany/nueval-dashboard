<template>
  <div class="card">
    <div style="width: 200px; float: right">
      <h4>Student's checklist {{completed}}/{{total}}</h4>
    </div>
    <div v-for="(task,idx) in tasks" :key="idx" class="padded-left">
      <h4>Task: {{task.name}}</h4>
      <p>Checklist</p>
      <el-checkbox-group v-model="checklist">
        <el-checkbox
          :disabled="readonly"
          class="block"
          v-for="(item,item_idx) in task.checklist"
          :label="task.name + ':' +item_idx"
          :key="item_idx"
        >{{item}}</el-checkbox>
      </el-checkbox-group>
    </div>

    <div class="button-container">
      <el-button type="success" size="large" v-if="!readonly" @click="handleSaveButton">Save</el-button>
    </div>
  </div>
</template>
<script>
export default {
  props: ["module", "record", "readonly"],
  data() {
    return { checklist: [] };
  },
  methods: {
    validItems() {
      let validItems = [];
      this.tasks.forEach(task => {
        if (task && task.checklist) {
          validItems.push(task.name);
        }
      });
      return validItems;
    },
    // checkboxValue(task, item_idx) {
    //     if (this.record && this.record.checklist) {
    //         this.record.checklist.find((i) => {
    //             if (i && i.label && i.label.indexOf(task.name + ':' + item_idx) == 0) {
    //                 return i.checked
    //             }
    //         })
    //     }
    // },
    buildChecklist() {
      if (this.checklist)
        return this.checklist
          .map(e => {
            if (typeof e === "string") {
              const splitted = e.split(":");
              if (this.validItems().indexOf(splitted[0]) != -1)
                return { label: e, checked: true };
              return null;
            }
          })
          .filter(e => e != null);
      return [];
    },
    handleSaveButton() {
      const vm = this;
      // this.$confirm('Do you really want to save student checkboxes?', 'Confirm', {
      //     confirmButtonText: 'OK',
      //     cancelButtonText: 'Cancel',
      //     type: 'info'
      // }).then(() => {

      // console.log(this.checklist)

      const toSave = this.buildChecklist();

      // console.log(this.checklist)
      vm.$emit("save", toSave);
      // this.$message({
      //     type: 'success',
      //     message: 'Save completed'
      // });
      // }).catch(() => {
      //     // this.$message({
      //     //     type: 'danger',
      //     //     message: 'Error saving, please retry'
      //     // });
      // });
    }
  },
  mounted() {
    if (this.record && this.record.checklist)
      this.checklist = this.record.checklist
        .filter(l => l && l.label)
        .map(l => l.label);
    else this.checklist = [];
  },
  watch: {
    record(val) {
      if (val && val.checklist)
        this.checklist = val.checklist
          .filter(l => l && l.label)
          .map(l => l.label);
      else this.checklist = [];
    }
  },
  computed: {
    completed() {
      const startIng = (this.checklist && this.checklist.length) || 0;

      return startIng;
    },
    total() {
      let count = 0;
      this.tasks.forEach(t => (count += t.checklist ? t.checklist.length : 0));
      return count;
    },
    tasks() {
      const module = this.module;
      return (module && module.rules && module.rules.tasks) || [];
    }
  }
};
</script>
<style scoped>
.el-checkbox + .el-checkbox {
  margin-left: 0px;
}

.block {
  display: block;
  width: 100%;
}

.button-container {
  text-align: right;
  padding-top: 30px;
}

.padded-left {
  margin-left: 20px;
}

.flush-right {
  text-align: right;
}
</style>
