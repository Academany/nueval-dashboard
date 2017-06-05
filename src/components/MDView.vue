<template>
  <div class="master-detail-view">
        <div class="master">
          <slot name="master"></slot>
        </div>
        <div class="detail">
          <slot name="detail"></slot>
        </div>
  </div>
</template>
<script>
  export default {

  }
</script>
<style scoped>

.adjust {
  margin-bottom: -3px;
}
.fullwidth{
  width: 100%;
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
.master::-webkit-scrollbar,
.detail::-webkit-scrollbar {
width: 5px;
}

.master::-webkit-scrollbar-track,
.detail::-webkit-scrollbar-track {
  background: #ddd;
}

.master::-webkit-scrollbar-thumb,
.detail::-webkit-scrollbar-thumb {
  background: #ff4949;
}
</style>
