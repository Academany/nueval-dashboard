<template>
    <el-dialog :title="title" :visible.sync="visible">
        <el-form ref="myForm" :model="form" :rules="rules">
            <el-form-item label="Name" :label-width="formLabelWidth" prop="name">
                <el-input v-model="form.name" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="Description" :label-width="formLabelWidth">
                <el-input v-model="form.description" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="Lecture URL" :label-width="formLabelWidth">
                <el-input v-model="form.lecture_url" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="Date" :label-width="formLabelWidth">
                <el-date-picker v-model="formDate" type="date" placeholder="Pick a date">
                </el-date-picker>
            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button @click="handleCancel">Cancel</el-button>
            <el-button type="primary" @click="handleSubmit">Confirm</el-button>
        </span>
    </el-dialog>
</template>
<script>
export default {
    props: [
        'visible',
        'item'
    ],
    data() {
        return {
            form: {
                name: '',
                description: '',
                date: new Date(),
                lecture_url: ''
            },
            formDate: new Date(),
            formLabelWidth: '130',
            rules: {
                "name": { required: true, type: 'string' }
            }
        }
    },
    computed: {
        title() { return (this.item && this.item.id) ? `Edit ${this.item.name}` : 'New module' }
    },
    mounted() {
        this.form = this.item || {}
        this.formDate = this.item && this.item.date || new Date()
    },
    watch: {
        item: function (val) {
            this.form = val || {}
            this.formDate = val && val.date || new Date()
        }
    },
    methods: {
        handleSubmit() {
            var vm = this;
            this.form.date = vm.formDate
            this.$refs.myForm.validate(
                (valid) => {
                    if (valid) {
                        this.$emit('submit', vm.form)
                        // vm.$refs.myForm.resetFields();
                    } else {
                        this.$message('Please fill all the required fields');
                    }
                }
            )
        },
        handleCancel() {
            // this.$refs.myForm.resetFields();
            this.$emit('cancel')
        }
    }
}
</script>
