<template>
  <div>
      <div class="tableTop">
        <el-button type="success" v-show="!selectedRow" @click="handleNew()"><fa-icon name="plus" class="adjust"></fa-icon> New {{entity}}</el-button>
        <el-button type="danger" v-if="selectedRow && selectedRow.id" @click="handleDelete()"><fa-icon name="trash" class="adjust"></fa-icon> Delete</el-button>
      </div>
      <el-tabs ref="tabWidget" type="border-card" v-if="selectedRow" v-model="activeName" @tab-click="handleClick">
        <el-tab-pane
          v-for="(item, index) in tabs"
          :key="item.id"
          :label="item.label"
          :name="item.name"
        >
            <template scope="scope">
              <slot :name="'tab-content-'+index"></slot>
            </template>
        </el-tab-pane>
      </el-tabs>
      <el-dialog
        title="Confirm"
        :visible.sync="dialogVisible"
        size="tiny"
        :before-close="handleClose">
        <span>Do you really want to delete this {{entity}}?</span>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">Cancel</el-button>
          <el-button type="primary" @click="handleConfirmDelete">Confirm</el-button>
        </span>
      </el-dialog>
  </div>
</template>

<script>
/**
<el-tab-pane ref="tabWidget" v-for="tab in tabs" :key="tab.id" :label="tab.label" :name="tab.id">
  <div>
    <component is="tab.component" :item="selectedRow"/>
  </div>
</el-tab-pane>

**/

import MDNotImplemented from './MDNotImplemented.vue'
export default {
  props: [
    'value',
    'selectedRow',
    'entity'
  ],
  components: {
    MDNotImplemented
  },
  data(){
    return {
      dialogVisible: false,
      activeName: 'basic',
      tabs: this.value,
    }
  },
  methods: {
    handleConfirmDelete(){
      this.dialogVisible = false;
      // alert('confirm!')
      this.$emit("delete")
    },
    handleClose(){
      this.dialogVisible = false;
    },
    handleClick() {
      this.$emit("tabSelected")
    },
    handleNew() {
      // this.selectedRow = {};
      this.$emit("newItem")
    },
    handleDelete(){
      // this.$emit("deleteItem")
      this.dialogVisible = true;
    }
  },
  mounted(){
    // this.$refs.tabWidget
  }
}
</script>
<style>
.tableTop {
  text-align: right;
  margin-bottom: 20px;
  margin-left: 12px;
  margin-right: 12px;
}
</style>
