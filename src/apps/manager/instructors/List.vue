<template>
  <div class="master-detail-view">
        <div class="master">
          <MLTable :value="tableData" :tableColumns="tableColumns" @select="handleSelect" @edit="handleEdit" @delete="handleDelete"/>
        </div>
        <div class="detail" >
            <div class="tableTop">
              <el-button type="success" @click="handleNew()"><fa-icon name="plus" class="adjust"></fa-icon> New instructor</el-button>
              <el-button type="danger" v-if="selectedRow" @click="deleteLab()"><fa-icon name="trash" class="adjust"></fa-icon> Delete</el-button>
            </div>
            <el-tabs type="border-card" v-if="selectedRow" v-model="activeName" @tab-click="handleClick">
             <el-tab-pane label="Basic Information" name="settings">
               <div>
                 <MLDetail :item="selectedRow"/>
               </div>
             </el-tab-pane>
             <el-tab-pane label="Mentored Nodes" name="nodes">
               <div>
                 <MDRel :item="selectedRow"/>
               </div>
             </el-tab-pane>

           </el-tabs>
          <br/>
        </div>
  </div>
</template>

<script>
// import sampleData from './sample-data.js'
import MLDetail from './Detail.vue'
import MDRel from './Rel.vue'
import MLHeader from './Header.vue'
import MLTable from '../../../components/MDTable.vue'
//import Permissions from '../../../components/Permissions.vue'
import lodash from 'lodash'
let startId=0

// lodash.forEach(sampleData.data, (el)=>{
//   el.id = ++startId;
//   el.supernode = 'nosupernode';
//   el.isSupernode = false;
// })

export default {
  components: {
    MLDetail,
    MLHeader,
    MLTable,
    MDRel,
  //  Permissions
  },
  data() {
    return {
      tableData: [
        {'name': 'Fiore Basile', id: 1, 'labs': 4,  'email' : 'fiore.basile@gmail.com'}
      ],
      tableColumns: [
        {id: 1, label: 'Name', prop: 'name', width: 250 },
        {id: 2, label: 'Labs', prop: 'labs', width: 150},
        {id: 3, label: 'Email', prop: 'mail', width: 150 }
      ],
      selectedRow: null,
      activeName: 'settings'
    }
  },
  methods: {
    handleNew() {
      this.selectedRow = {
      };
    },
    deleteLab(){

    },
    handleClick (id,e){

    },
    handleSelect (index,row){
      // console.log(row)
      this.selectedRow = row
    },
    handleEdit (index,row){
      // console.log(row)
      this.selectedRow = row
    },
    handleDelete( index,row){
      // console.log(index + ' ' + row)
    }
  }
}
</script>

<style scoped>
.adjust {
  margin-bottom: -3px;
}
.sheet {
  padding: 24px;
}
.fullwidth{
  width: 100%;
}
.tableTop {

  text-align: right;
  margin-bottom: 20px;
  margin-left: 12px;
  margin-right: 12px;
}
.master-detail-view {
  position: absolute;
  top: 0px;
  left: 0px;
  bottom: 0px;
  right: 0px;
}

.master {
  position: absolute;;
  width: 50%;
  left: 0px;
  top: 0px;
  bottom: 0px;
  padding: 0px;
  padding-top: 0px;
  overflow-y: scroll;
  overflow-x: none;

}

.detail {
    background-color: #d2d8e2;
   position: absolute;
   width: 50%;
   right: 0px;
   top: 0px;
   bottom: 0px;
   padding-top: 24px;
   overflow-y: scroll;
   overflow-x: none;
}
</style>
