<template>
<el-menu mode="horizontal" defaultActive="/" theme="light" class="nofrills">
      <slot name="header-menu">
          <el-menu-item index="/">
            <router-link to="/"><fa-icon name="arrow-left"></fa-icon></router-link>
         </el-menu-item>
    </slot>
  </el-menu>
</template>
<script>
export default {
  
}
</script>
