<template>
    <el-select v-model="selectedKey" placeholder="Select" size="mini">
        <el-option v-for="a in keys" :key="a" :label="a" :value="a">
        </el-option>
    </el-select>
</template>

<script>
export default {
    props: [
        'keys' // [ { value, link } ...],
        , 'userObject'
    ],
    data() {
        return {
            selectedKey: null
        }
    },
    watch: {
        selectedKey(newVal) {
            this.$emit('keySelected', { userObject: this.userObject, key: newVal })
        }
    }

}
</script>

<style>

</style>
