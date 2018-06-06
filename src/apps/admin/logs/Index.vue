<template>
    <div class="sheet">
        <h2>Logs</h2>
        <div class="block">
            <el-table :data="logRows" border style="width: 98%">
                <el-table-column prop="createdAt" label="Date" :width="240">
                    <template slot-scope="scope">
                        {{ scope.row.createdAt | moment("YYYY-MM-DD hh:mm Z")}}
                    </template>
                </el-table-column>
                <!--<el-table-column prop="log_name"></el-table-column>-->
                <el-table-column prop="causer.username" label="User" :width="140"></el-table-column>
                <el-table-column prop="description" label="Action" :width="200"></el-table-column>
                <!--<el-table-column prop="subject_type"></el-table-column>-->
                <el-table-column prop="properties" label="Properties" fit>
                    <template slot-scope="scope">
                        <pre>{{ JSON.stringify(scope.row.properties, tabs=4)}}</pre>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <div class="block">
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="currentPage" :page-sizes="[50, 100, 200, 300]" :page-size="perPage" layout="total, sizes, prev, pager, next, jumper" :total="total">
            </el-pagination>
        </div>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
    computed: {
        ...mapGetters({
            'logRows': 'admin/logs/logs',
            'isLoading': 'admin/logs/isLoading',
            'currentPage': 'admin/logs/currentPage',
            'perPage': 'admin/logs/perPage',
            'total': 'admin/logs/total'
        })
    },
    mounted() {
        this.initLogs(50)
    },
    methods: {
        ...mapActions({
            'initLogs': 'admin/logs/initLogs',
            'setCurrentPage': 'admin/logs/setCurrentPage'
        }),
        handleSizeChange(val) {
            //console.log(`${val} items per page`);
            this.initLogs(val)
        },
        handleCurrentChange(val) {
            //console.log(`current page: ${val}`);
            this.setCurrentPage(val - 1)
        }
    }
}
</script>

<style scoped>
.sheet {
    margin-left: 24px;
    margin-top: 0px;
}

.block {
    display: block;
    clear: both;
}
</style>
