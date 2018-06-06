<template>
    <div class="lazy-image">
        <img :src="src" v-if="loaded" />
        <div v-if="loading">Loading image... </div>
        <div v-if="hasError">Image not found</div>
    </div>
</template>

<script>
export default {
    props: [
        'src'
    ],
    data(){
        return {
            loaded: false,
            loading: false,
            hasError: false
        }
    },
    watch: {
        'src': (oldval,newval)=>{
            if (oldval==newval){
                //console.log('src not changed')
            } else {
                this.loaded = false
                this.loading = false
                this.hasError = false
                this.preload()
            }
        }
    },
    mounted(){
        if (this.src)
            this.preload()
    },
    methods: {
        preload(){
            const vm = this
            if (this.src) {
                var img = new Image();
                img.src = this.src;
                img.onload = () => {
                    vm.$nextTick(()=>{
                        vm.loaded = true
                        vm.hasError = false
                        vm.loading = false
                    })
                }
                img.onerror = () => { 
                    vm.$nextTick(()=>{
                        vm.loaded = false
                        vm.hasError = true
                        vm.loading = false
                    })
                }
            }
        }
    }
}
</script>

<style>
.lazy-image img{
    width: 100%
}
</style>
