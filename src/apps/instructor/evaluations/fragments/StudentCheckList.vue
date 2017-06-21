<template>
    <div class="card">
        <h3 slot="header">Student's checklist {{completed}}/{{total}}
    
        </h3>
        <div v-for="(task,idx) in tasks" :key="idx">
            <h4>Task: {{task.name}}</h4>
            <p>Have you...</p>
            <el-checkbox-group v-model="checklist">
                <el-checkbox :disabled="readonly" class="block" v-for="(item,item_idx) in task.checklist" :label="task.name + ':' +item_idx" :key="item_idx">
                    {{item}}
                </el-checkbox>
            </el-checkbox-group>
        </div>
    
        <div class="button-container">
            <el-button type="success" size="large" :disabled="readonly" @click="handleSaveButton">Save</el-button>
        </div>
    
    </div>
</template>
<script>
export default {
    props: [
        'module',
        'record',
        'readonly'
    ],
    data() {
        return { checklist: [] }
    },
    methods: {
        // checkboxValue(task, item_idx) {
        //     if (this.record && this.record.checklist) {
        //         this.record.checklist.find((i) => {
        //             if (i && i.label && i.label.indexOf(task.name + ':' + item_idx) == 0) {
        //                 return i.checked
        //             }
        //         })
        //     }
        // },
        handleSaveButton() {
            const vm = this
            this.$confirm('Do you really want to save student checkboxes?', 'Confirm', {
                confirmButtonText: 'OK',
                cancelButtonText: 'Cancel',
                type: 'info'
            }).then(() => {
                // TODO SISTEMARE CHECKLIST DEVE ESSERE Una lista di oggetti!!!

                console.log(this.checklist)
                const toSave = this.checklist.map((e) => {
                    if (typeof e === 'string') {
                        const splitted = e.split(':')
                        return { label: e, checked: true }
                    }
                })

                console.log(this.checklist)
                vm.$emit('save', toSave)
                // this.$message({
                //     type: 'success',
                //     message: 'Save completed'
                // });
            }).catch(() => {
                // this.$message({
                //     type: 'danger',
                //     message: 'Error saving, please retry'
                // });
            });
        }
    },
    mounted() {
        if (this.record && this.record.checklist)
            this.checklist = this.record.checklist.filter((l) => l && l.label).map((l) => l.label)
    },
    watch: {
        record(val) {
            if (val && val.checklist)
                this.checklist = val.checklist.filter((l) => l && l.label).map((l) => l.label)
        }
    },
    computed: {
        completed() {
            return this.checklist && this.checklist.length
        },
        total() {
            let count = 0
            this.tasks.forEach((t) => count += (t.checklist ? t.checklist.length : 0))
            return count
        },
        tasks() {
            const module = this.module
            return module && module.rules && module.rules.tasks || []
        },

    }
}
</script>
<style scoped>
.el-checkbox+.el-checkbox {
    margin-left: 0px;
}

.block {
    display: block;
    width: 100%;
}

.button-container {
    padding-top: 30px;
}
</style>
