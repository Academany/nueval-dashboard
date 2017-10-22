<template>
    <div class="form clearfix">
        <h3>Students</h3>
        <p>The following {{students ? students.length : 0}} students have been sent to next cycle</p>
        <div style="padding: 12px; float: right;">
            <el-button class="export-btn" size="mini" @click="handleExport">
                <fa-icon name="table" style="vertical-align: text-bottom"></fa-icon> Export to CSV</el-button>
        </div>
        <div>
            <br/>
        </div>

        <el-table :data="students" border style="width: 100%">
            <el-table-column prop="student_id" sortable label="ID" :width="80">
            </el-table-column>
            <el-table-column prop="username" sortable label="Username" :width="180">
            </el-table-column>
            <el-table-column prop="email" sortable label="Email" :width="230">
            </el-table-column>
            <el-table-column sortable label="Lab" :width="200">
                <template slot-scope="scope">
                    {{ scope.row.lab ? scope.row.lab.name : '' | truncate(25) }}
                </template>
            </el-table-column>
            <el-table-column label="Instructor" sortable :width="130" v-if="item.kind === 'local'">
                <template slot-scope="scope">
                    <span v-if="scope.row.evaluator">
                        {{scope.row.evaluator.username}}
                    </span>
                </template>
            </el-table-column>
            <el-table-column prop="evaluator.username" v-if="item.kind === 'global'" sortable label="Evaluator" :width="130">
                <template slot-scope="scope">
                    <span v-if="scope.row.evaluator">
                        {{scope.row.evaluator.username}}
                    </span>

                </template>
            </el-table-column>

        </el-table>

    </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import CSVTable from '../../../mixins/CSVTable.vue'

import Vue from 'vue'
export default {
    props: [
        'item'
    ], mixins: [
        CSVTable
    ],

    data() {
        return {


        }
    },
    computed: {

        students() {
            if (!this.item) return []
            let list = []
            // if (this.item.kind &&  this.item.kind === 'global') {
            list = this.evaluationStudents(this.item) || []
            // }
            list = list.filter((s) => s.next_cycle === true)
            if (this.item.kind && this.item.kind === 'local') {
                function hasGlobalEval(student) {
                    const sheets = student.sheets || []
                    const res = sheets.filter((e) => e.evaluation.kind === 'global').length > 0
                    // if (res) console.log('has global eval')
                    return res
                }

                list = list.filter((s) => !hasGlobalEval(s))
            }
            // console.log('unknown session kind')
            return list
        },

        ...mapGetters({
            evaluationStudents: 'evaluationStudents',
            localInstructor: 'evaluationLocalInstructor',
            allStudents: 'admin/students/students'
        })
    },
    methods: {
        tableHeaders() {
            return ["ID", "Username", "Email", "Lab", this.item.kind === 'global' ? "Evaluator" : "Instructor"]
        },
        tableRows() {
            let rows = []
            const vm = this
            for (var i = 0; i < this.students.length; i++) {
                const student = this.students[i]
                rows.push([
                    student.student_id,
                    student.username,

                    student.email,
                    student.lab && student.lab.name || '',
                    student.evaluator && (student.evaluator.first_name + ' ' + student.evaluator.last_name) || ''
                ])
            }
            return rows
        },
        ...mapActions({
            loadStudents: 'admin/students/loadStudents'
        }),
        handleSelect(item) {
            console.log(item);
        }
    }
}
</script>
<style scoped>
.fa-fix {
    margin-bottom: -4px;
    margin-left: -4px;
}
</style>
