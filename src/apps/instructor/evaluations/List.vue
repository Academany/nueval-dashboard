<template>
    <div class="sheet">
        <el-row class="fullheight">
            <el-col :span="4" class="topPad leftPad rightPad tealbg fullheight selector">
                <SelectStudent :labs="labs" :lab="lab" :students="tableData" />
            </el-col>
            <el-col :span="20" class="fullheight vscroll detail">
                <TableHead/>
                <el-tabs v-model="activeName" @tab-click="handleClick" class="tabs">
                    <el-tab-pane label="Overall progress" name="general">
                        <TabGeneral/>
                    </el-tab-pane>
                    <el-tab-pane label="Local Evaluation" name="local">
                        <TabEvaluation :modules="modulesData" />
                    </el-tab-pane>
                    <el-tab-pane label="Global Evaluation #1" name="global1">
                        <TabEvaluation :modules="modulesData" />
                    </el-tab-pane>
                </el-tabs>
            </el-col>
        </el-row>
    </div>
</template>
<script>
/**
<el-row>
                    <el-col :span="13">
                        <el-card class="bottomMargin">
                            <div slot="header">
                                Student info</div>
                            Student id
                            <br>First
                            <br>Last
                            <br>Email
    
                        </el-card>
                        Units
                        <el-table :show-header="false" highlight-current-row ref="modulesTable" @current-change="handleCurrentChange" :data="modulesData" style="width: 100%">
                            <el-table-column prop="desc" label="" />
                        </el-table>
                    </el-col>
                    <el-col :span="11" class="topPad rightPad">
    
                        <el-card>
                            <div slot="header">
                                Student progress</div>
                            Student id
                            <br>First
                            <br>Last
                            <br>Email
    
                        </el-card>
                    </el-col>
                </el-row>
                **/
import { mapGetters } from 'vuex'
import SelectStudent from './forms/SelectStudent.vue'
import TableHead from './cards/TableHead.vue'
import TabEvaluation from './tabs/TabEvaluation.vue'
import TabGeneral from './tabs/TabGeneral.vue'

export default {
    data() {
        return {
            lab: null,
            currentRow: null,
            activeName: 'general'
        }
    },
    components: {
        SelectStudent,
        TableHead,
        TabEvaluation,
        TabGeneral
    },
    methods: {
        setCurrent(row) {
            this.$refs.studentsTable.setCurrentRow(row);
        },
        handleCurrentChange(val) {
            this.currentRow = val;
        },
        handleClick(tab, event) {
            console.log(tab, event);
        },
        handleModuleChange(val) {

        }
    },
    computed: {
        tableData() {
            const stud = this.labStudents(this.lab) || []
            return stud.map((s) => {
                return { desc: s.student_id + '. ' + s.first_name + ' ' + s.last_name }
            })
        },
        modulesData() {
            if (!this.currentCourse) return []
            debugger
            const mods = this.currentCourse.modules || []
            return mods.map((m, idx) => {
                return { idx: idx + 1, name: m.name, id: m.id }
            })
        },
        ...mapGetters({
            'labs': 'instructor_app/labs',
            'labStudents': 'instructor_app/labStudents',
            'currentCourse': 'instructor_app/currentCourse'
        })
    }
}
</script>
<style scoped>
.sheet {
    /*margin-left: 24px;*/
    /*margin-top: 24px;*/
}

.topPad {
    padding-top: 12px;
    /*margin-left: 5px;*/
    padding-left: 12px;
}

.leftPad {
    padding-left: 12px;
}

.bottomMargin {
    margin-bottom: 12px;
}

.rightPad {
    padding-right: 12px;
}

.fullheight {
    height: calc(100vh - 120px);
}

.graybg {
    background: #eef1f6;
}

.fullwidth {
    width: 100%;
}

.fixed {
    position: fixed;
    z-index: 99;
}

.static {
    position: static;
    z-index: 99;
}

.padded {
    padding: 12px;
}

.tableHead {
    height: 31px;
    margin-top: 1px;
}

.tabs {
    margin-top: 56px;
    padding: 12px;
}

.vscroll {
    overflow-x: hidden;
    overflow-y: scroll;
}

.selector::-webkit-scrollbar,
.detail::-webkit-scrollbar {
    width: 5px;
}

.selector::-webkit-scrollbar-track,
.detail::-webkit-scrollbar-track {
    background: #ddd;
}

.selector::-webkit-scrollbar-thumb,
.detail::-webkit-scrollbar-thumb {
    background: #ff4949;
}

.whitebg {
    background: white;
}

.tealbg {
    background-color: #ddd;
}
</style>