<template>
  <div class="master-detail-view">
    <multipane layout="vertical">
      <div class="master" :style="{ width: '48%', maxWidth: '75%', minWidth: '25%' }">
        <slot name="master"></slot>
      </div>
      <multipane-resizer></multipane-resizer>
      <div class="detail" :style="{ flexGrow: 1, maxWidth: '75%' }">
        <slot name="detail"></slot>
      </div>
    </multipane>
  </div>
</template>
<script>
import { Multipane, MultipaneResizer } from 'vue-multipane'

export default {
  components: {
    Multipane,
    MultipaneResizer,
  },
}
</script>
<style scoped>
.adjust {
  margin-bottom: -3px;
}

.fullwidth {
  width: 100%;
}

.layout-v>.multipane-resizer {
  background: #dedede;
  border-left: 1px solid #aaa;
  border-right: 1px solid #aaa;
  margin-left: -5px;
  margin-right: 5px;
  width: 3px;
  height: 90vh;
  z-index: 99;
}

.layout-v>.multipane-resizer :before {
  display: block;
  content: "";
  width: 3px;
  height: 40px;
  position: absolute;
  top: 50%;
  left: 50%;
  margin-top: -20px;
  margin-left: -1.5px;
  border-left: 1px solid #ccc;
  border-right: 1px solid #ccc;
}

.detail {
  margin-left: 10px;
}





























/* .master-detail-view {
  position: absolute;
  top: 0px;
  left: 0px;
  bottom: 0px;
  right: 0px;
}

.pane {
  width: 100%;
  padding: 12px;
}




 */


/*


.master {
  position: absolute;
  width: 50%;
  left: 0px;
  top: 0px;
  bottom: 0px;
  padding: 0px;
  padding-top: 0px;
  overflow-y: scroll;
  overflow-x: none;
}

.dragbar {
  position: absolute;
  left: 50%;
  width: 10px;
  top: 0px;
  bottom: 0px;
  padding: 0px;
  background: red;
}

.detail {
  background-color: #d2d8e2;
  position: absolute;
  width: calc(50% - 10px);
  right: 0px;
  top: 0px;
  bottom: 0px;
  padding-top: 24px;
  overflow-y: scroll;
  overflow-x: none;
}
*/

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

.custom-resizer {
  width: 100%;
  height: 400px;
}

.custom-resizer>.pane {
  text-align: left;
  padding: 15px;
  overflow: hidden;
  background: #eee;
  border: 1px solid #ccc;
}

.custom-resizer>.pane~.pane {}

.custom-resizer>.multipane-resizer {
  margin: 0;
  left: 0;
  position: relative;
}

.custom-resizer>.multipane-resizer :before {
  display: block;
  content: "";
  width: 3px;
  height: 40px;
  position: absolute;
  top: 50%;
  left: 50%;
  margin-top: -20px;
  margin-left: -1.5px;
  border-left: 1px solid #ccc;
  border-right: 1px solid #ccc;
}
</style>