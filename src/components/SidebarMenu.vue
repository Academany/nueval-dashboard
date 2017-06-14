<template>
  <el-menu theme="dark" :default-active="apps && apps.length ? apps[0].target : null" mode="vertical" @select="handleMenuSelect">
    <el-menu-item-group title="">
      <el-menu-item class="slim" v-for="(app,index) in apps" :key="app.target" :index="app.target">
        <fa-icon :name="app.icon" class="fa-fix"></fa-icon>
        <span v-if="label"> {{app.label}}</span>
      </el-menu-item>
  
      <el-menu-item v-if="collapse" index="" class="slim" @click="toggleWidth">
        <fa-icon class="fa-fix" name="expand" />
        <span v-if="label">Collapse</span>
      </el-menu-item>
    </el-menu-item-group>
  </el-menu>
</template>
<script>
export default {
  props: [
    'apps', 'label', 'collapse'
  ],
  methods: {
    handleMenuSelect(data) {
      this.$emit('menuSelect', data)
    },
    toggleWidth() {
      this.$emit('toggleMenu')
    }
  }
}
</script>
<style scoped>
.el-menu-item:first-child {
  margin-left: -10px;
}

.el-menu-item {
  line-height: 24px;
  height: 32px;
}

div.el-submenu__title {
  margin-left: 0
}

.el-submenu__icon-arrow {
  margin-top: -20px
}

.slim {
  padding: 0;
  height: 32px;
  padding-top: 4px;
  padding-bottom: 4px;
  margin-top: 0px;
  margin-bottom: 0px;
  margin-left: -10px;
  padding-left: 4px;
  line-height: 24px;
}

.fa-fix {
  height: 16px;
  margin-bottom: -3px;
}
</style>