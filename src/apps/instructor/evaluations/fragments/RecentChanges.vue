<template>
    <el-collapse v-model="activeNames" @change="handleChange">
        <el-collapse-item title="Recent changes" name="1">
            <el-table :data="logItems" border striped>
                <el-table-column label="Date" :width="200">
                    <template scope="scope">
                        <small>{{ scope.row.timestamp | moment }}</small>
                    </template>
                </el-table-column>
                <el-table-column prop="description" label="Action" fit></el-table-column>
            </el-table>
        </el-collapse-item>
    </el-collapse>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
    data() {
        return {
            activeNames: [],
        }
    },
    computed: {
        ...mapGetters({
            'logItems': 'instructor_app/records/logs'
        })
    },
    methods: {
        handleChange() {

        }
    }
}
</script>

<style>

</style>
