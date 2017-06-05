<template>
  <div></div>
</template>
<script>
if (!webix){
  export default {

  }
} else {

  function data_handler(value) {
  var view = webix.$$(this.webixId);

  if(view){
    console.log('View found setting value')

      if (typeof value === "object"){
        if (view.setValues) {
          view.setValues(value);
        } else if (view.parse){
          view.clearAll();
          view.parse(value)
        }
      } else if (view.setValue) {
        view.setValue(value);
      }
      webix.ui.each(view, function(sub){
        if (sub.hasEvent && sub.hasEvent("onValue")) {
          sub.callEvent("onValue", [value]);
        }
      }, this, true);

  } else {
    console.log("No view for " + this.webixId);
    console.log("Not yet mounted?")
  }
  }

  export default {
    props: ['config', 'value'],
    watch:{
      value:{
        handler: data_handler
      }
    },
    mounted:function(){
      let config = webix.copy(this.config)
      config.$scope = this
      console.log(this.$el)

      this.webixId = webix.ui(config, this.$el)

      console.log('Mounted component id')
      console.log(this.webixId)

      if (this.value)
        data_handler.call(this, this.value);
    },
    destroyed:function(){
      webix.$$(this.webixId).destructor();
    }
  }
}
</script>
<style scoped>
</style>
