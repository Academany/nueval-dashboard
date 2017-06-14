<template>
    <el-form class="feedback">
        <el-form-item label="Leave feedback">
            <el-input type="textarea" :rows="2" placeholder="Please input" v-model="textarea">
            </el-input>
        </el-form-item>
    
        <el-button type="primary" class="floatbutton">
            <fa-icon name="send"></fa-icon>
        </el-button>
    
    </el-form>
</template>

<script>
export default {

}
</script>

<style scoped>
.feedback {
    position: relative;
}

.floatbutton {
    position: absolute;
    bottom: 12px;
    right: 12px;
}
</style>
