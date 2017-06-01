<template>
  <div>
  <h2>Not Implemented</h2>
  <pre>{{item}}</pre>
  </h2>
</div>
</template>
<script>
export default {
  name:'MDNotImplemented',
  props: [
    'item'
  ],
  data(){
    return {
      item: this.item
    }
  }
}
</script>
