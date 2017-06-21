<template>
    <el-dialog title="Select an evaluation session" size="tiny" :visible.sync="visible">
        <el-form :model="form" style="width:200px">
            <el-form-item label="Sessions">
                <el-select v-model="form.session" style="width: 300px" placeholder="Please select a session">
                    <el-option v-for="s in globalSessions" :label="s.name + ' ' + s.date" :key="s.id" :value="s" />
                </el-select>
            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button @click="handleCancel">Cancel</el-button>
            <el-button type="primary" @click="handleConfirm">Confirm</el-button>
        </span>
    </el-dialog>
</template>

<script>
export default {
    props: [
        'visible',
        'sessions'
    ],
    computed: {
        globalSessions() {
            const sessions = this.sessions || []
            return sessions.filter((s) => s.kind === 'global')
        }
    },
    watch: {
        globalSessions(val) {
            if (val && val.length) {
                this.$set(this.form, 'session', val[0])
            }
        }
    },
    mounted() {
        if (this.globalSessions && this.globalSessions.length) {
            this.$set(form, 'session', this.globalSessions[0])
        }
    },
    data() {
        return {
            form: {
                session: null
            }
        }
    },
    methods: {
        handleCancel() {
            this.$emit('cancel')
        },
        handleConfirm() {
            this.$emit('confirm', this.form)
        }
    }
}
</script>

<style>
.small {}
</style>
