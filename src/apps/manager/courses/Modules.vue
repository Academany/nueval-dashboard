<template>
  <div>
    <el-row>
      <el-col :span="12">
        <h3>Modules</h3>
      </el-col>
      <el-col :span="12" class="right padded-top">
        <el-button type="success" size="small" @click="handleNew"> New module</el-button>
      </el-col>
    </el-row>
    <el-table :data="modules" style="width: 100%" border>
      <el-table-column prop="date" label="Date" :width="180">
        <template scope="scope">
          {{ scope.row.date | moment('YYYY-MM-DD') }}
        </template>
      </el-table-column>
      <el-table-column prop="name" label="Name">
      </el-table-column>
      <el-table-column label="" :width="60">
        <template scope="scope">
          <el-dropdown :hide-on-click="true" trigger="click" size="mini" menu-align="start" @command="handleCommand">
            <el-button type="primary" size="mini">
              <fa-icon name="gear"></fa-icon>
            </el-button>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item :command="JSON.stringify({cmd: 'edit', item: scope.row})">
                <fa-icon name="pencil"></fa-icon> Edit</el-dropdown-item>
              <el-dropdown-item :command="JSON.stringify({cmd: 'delete', item: scope.row})" divided>
                <fa-icon name="trash"></fa-icon> Delete</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </template>
      </el-table-column>
    </el-table>
    <ModulesForm :item="selectedItem" :visible="formVisible" @submit="handleSubmit" @cancel="handleCancel" />
    <el-dialog title="Delete module" :visible.sync="confirmVisible" size="tiny" :before-close="handleClose">
      <span>Do you really want to delete this module?</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="confirmVisible = false">Cancel</el-button>
        <el-button type="primary" @click="confirmDelete">Confirm</el-button>
      </span>
    </el-dialog>
  
  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import ModulesForm from './ModulesForm.vue'
export default {
  props: [
    'item'
  ],
  data() {
    return {
      selectedItem: null,
      formVisible: false,
      confirmVisible: false
    }
  },
  components: {
    ModulesForm
  },
  mounted() {
    if (this.item && this.item.id) {
      this.loadModules(this.item.id)
    }
  },
  watch: {
    item: function (val) {
      if (val) {
        // debugger
        this.loadModules(val.id)
      }
    }
  },
  computed: {
    ...mapGetters({
      'modules': 'admin/course/modules/modules'
    })
  },
  methods: {
    handleModuleClick() {

    },
    handleNew() {
      this.selectedItem = {}
      this.formVisible = true
    },
    handleClose() {
      this.selectedItem = {}
    },
    handleSubmit(form) {
      var vm = this;
      console.log(form);
      if (this.selectedItem && this.selectedItem.id) {
        this.updateModule(form).then((success) => {
          vm.$message('Module successfully updated')
          vm.formVisible = false;
        }).catch((error) => {
          console.log(error)
          vm.$message('Some error occurred, please try again')
        })
      } else {
        this.createModule(form).then((success) => {
          vm.$message('Module successfully created')
          vm.formVisible = false;
        }).catch((error) => {
          console.log(error)
          vm.$message('Some error occurred, please try again')
        })
      }
    },
    handleCommand(param) {
      console.log(param)
      const vm = this;
      const { cmd, item } = JSON.parse(param);
      // vm.$message(cmd + ' on ' + item.id)
      if (cmd === 'edit') {
        this.handleEdit(item)
      } else if (cmd === 'delete') {
        this.handleDelete(item)
      }
    },
    handleEdit(row) {
      this.selectedItem = row
      // this.$message("Edit row " + row.id)
      this.$nextTick(() => {
        this.formVisible = true
      })
    },
    handleDelete(row) {
      this.selectedItem = row
      this.confirmVisible = true
    },
    confirmDelete() {
      // delete stuff
      this.confirmVisible = false

      this.deleteModule(this.selectedItem).then((response) => {
        this.$nextTick(() => {
          this.$message("Module deleted successfully")
        })
      }).catch((error) => {
        this.$nextTick(() => {
          this.$message("Cannot delete module, please reload and try again")
        })
      })
    },
    handleCancel() {
      this.formVisible = false;
    },
    ...mapActions({
      loadModules: 'admin/course/modules/loadModules',
      createModule: 'admin/course/modules/createModule',
      updateModule: 'admin/course/modules/updateModule',
      deleteModule: 'admin/course/modules/deleteModule'
    })
  }
}
</script>
<style scoped>
.right {
  text-align: right
}

.padded-top {
  margin-top: 14px;
}
</style>