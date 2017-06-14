<template>
    <div>
        <h4>
            Task: Laser Cutting</h4>
    
        <p class="label">Demonstrate and describe parametric 2D modelling processes</p>
        <div class="slider-pad">
            <el-slider v-model="value7" :step="25" show-stops></el-slider>
        </div>
        <p class="label">Identify and explain processes involved in using the laser cutter.</p>
        <div class="slider-pad">
            <el-slider v-model="value7" :step="25" show-stops></el-slider>
        </div>
        <p class="label">Develop, evaluate and construct the final prototype</p>
        <div class="slider-pad">
            <el-slider v-model="value7" :step="25" show-stops></el-slider>
        </div>
    
        <h4>Task: Vinyl Cutting</h4>
        <p class="label">Identify and explain processes involved in using this machine.</p>
        <div class="slider-pad">
            <el-slider v-model="value7" :step="25" show-stops></el-slider>
        </div>
        <p class="label">Design and create the final object</p>
        <div class="slider-pad">
            <el-slider v-model="value7" :step="25" show-stops></el-slider>
        </div>
        <br>
        <el-button type="success" style="width:100%">Save</el-button>
    </div>
</template>

<script>
export default {

}
</script>

<style>

</style>
