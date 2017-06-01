<template>
  <el-card class="box-card">
     <div slot="header" class="card-header clearfix">
    <router-link :to="item.target" class="header-link">{{item.label}}</router-link>

  </div>
    {{item.description}}
  <div class="card-footer">
    <el-button class="opbutton clearfix" type="primary" @click="$router.push(item.target)">
      Open
    </el-button>
  </div>
  </el-card>
</template>

<script>
export default {
  props: ['item']
}
</script>

<style scoped>
.box-card {
  position:relative;
  margin-bottom: 4px;
  min-height: 200px;
}
.card-header {
  height: 12px;
  font-weight: bold;
  text-transform: uppercase;
}
a.header-link {
  color: black;
  text-decoration: none;
}
.card-footer {
  position: absolute;
  left:0;
  bottom: 50px;
  right: 0;
  height: 10px;
  margin-top: 20px;
  margin-left: -20px;
  margin-right: -20px;
  border-top: 1px solid #cdcdcd;
}
.opbutton {
  display: block;
  width: 80%;
  margin-left: auto;
  margin-right: auto;
  margin-top: 12px;
}
</style>
