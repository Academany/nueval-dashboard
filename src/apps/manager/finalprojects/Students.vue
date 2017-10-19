<template>
  <div class="form clearfix">
  
    <el-table :data="students" style="width: 100%">
      <el-table-column prop="student_id" label="ID" :width="60">
      </el-table-column>
      <el-table-column prop="first_name" label="First" :width="130">
      </el-table-column>
      <el-table-column prop="last_name" label="Last" :width="130">
      </el-table-column>
      <el-table-column prop="status" label="Status" :width="100" :filters="[{ text: 'Booked', value: 'booked' }, { text: 'Presented', value: 'presented' }, {text: 'No Show', value: 'no show'}]" :filter-method="filterTag" filter-placement="bottom-end">
        <template slot-scope="scope">
          <el-tag :type="statusIcon(scope.row.status)">{{ scope.row.status }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column fit>
        <template slot-scope="scope">
          <el-button @click="handleNoshow(scope.row)" :disabled="scope.row.status != 'booked'" size="mini" type="warning">No-show</el-button>
          <el-button @click="handlePresented(scope.row)" :disabled="scope.row.status != 'booked'" size="mini" type="success">Presented</el-button>
          <el-button @click="handleUnbook(scope.row)" :disabled="scope.row.status != 'booked'" size="mini" type="danger">Remove</el-button>
        </template>
      </el-table-column>
  
    </el-table>
  
  </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  props: [
    'item'
  ],
  data() {
    return {
      form: {
        input: ''
      },
      rules: {

      },


    }
  },
  computed: {
    students: function () {
      let tstudents = []

      if (this.filter === 'presented')
        tstudents = (this.item && this.item.presented) || []
      else
        tstudents = (this.item && this.item.booked) || []

      tstudents = tstudents.map((e) => {
        e.status = this.studentStatus(e)
        return e
      }, this)
      return tstudents
    }
  },
  methods: {
    ...mapActions([
      'confirmStudent',
      'cancelStudent',
      'unbookStudent'
    ]),
    filterTag(value, row) {
      return row.status === value;
    },
    statusIcon(status) {
      if (status === 'no show')
        return 'warning'
      if (status === 'booked')
        return 'primary'
      return 'success'
    },
    studentStatus(student) {
      var booked = this.item && this.item.booked || []
      var presented = this.item && this.item.presented || []
      var noshow = this.item && this.item.noshow || []
      var isBooked = booked.filter((e) => { return (e.id === student.id) }).length > 0
      var isPresented = presented.filter((e) => { return (e.id === student.id) }).length > 0
      var isNoshow = noshow.filter((e) => { return (e.id === student.id) }).length > 0
      if (isPresented) {
        return 'presented'
      } else if (isNoshow) {
        return 'no show'
      }
      return 'booked'
    },
    querySearch(queryString, cb) {
      var links = this.links
      var results = queryString ? links.filter(this.createFilter(queryString)) : links
      // call callback function to return suggestions
      cb(results)
    },
    createFilter(queryString) {
      return (link) => {
        return (link.value.indexOf(queryString.toLowerCase()) === 0);
      };
    },
    handlePresented(row) {
      // this.$alert("Student " + item.username + " presented");
      const vm = this
      this.$confirm('Are you sure ' + row.username + ' presented?')
        .then(_ => {
          vm.confirmStudent({ session: vm.item, student: row }).then((success) => {
            vm.$emit("refresh")
            done()
          }).catch((err) => {
            vm.$notice("Error", "Error updating student ")
          })
        })
        .catch(_ => { });
    },
    handleNoshow(row) {
      const vm = this
      this.$confirm('Are you sure ' + row.username + ' didn\'t show up?')
        .then(_ => {
          vm.cancelStudent({ session: vm.item, student: row }).then((success) => {
            vm.$emit("refresh")
          }).catch((err) => {
            vm.$notice("Error", "Error updating student ")
          })
        })
        .catch(_ => { });
    },
    handleUnbook(row) {
      const vm = this
      this.$confirm('Do your really want to remove ' + row.username + ' from this session?')
        .then(_ => {
          vm.unbookStudent({ session: vm.item, student: row }).then((success) => {
            vm.$emit("refresh")
          }).catch((err) => {
            vm.$notice("Error", "Error updating student ")
          })
        })
        .catch(_ => { });
    },
    handleSelect(item) {
      console.log(item);
    }

  }
}
</script>
<style scoped>

</style>
