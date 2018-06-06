<template>
    <div style="padding: 12px">
        <el-form ref="feedbackForm" id="feedback" :model="form" :rules="rules" class="feedback">
    
            <el-form-item label="Leave feedback" prop="subject">
                <el-input type="text" placeholder="Subject" v-model="form.subject"></el-input>
            </el-form-item>
            <el-form-item label="" prop="body">
                Message
                <a class="minibtn" @click="preview = !preview">
                    <fa-icon name="eye" style="margin-bottom: -3px" />
                </a>
    
                <el-input v-if="!preview" type="textarea" :rows="8" placeholder="Please input **your** __feedback__ here" v-model="form.body">
                </el-input>
    
                <div v-if="preview" class="preview">
                    <vue-markdown :source="form.body"></vue-markdown>
                </div>
    
            </el-form-item>
            <el-button @click="handleSend" v-show="!preview" type="primary" class="floatbutton">
                <fa-icon name="send"></fa-icon>
            </el-button>
    
        </el-form>
        <br>
        <div class="hint">
            <fa-icon name="info-circle" style="margin-bottom: -3px; color: grey"></fa-icon> You can use
            <a href="https://www.gitbook.com/book/gitbookio/markdown/details" target="_blank">markdown</a> to format message body text. Toggle the preview with the eye icon</div>
    </div>
</template>

<script>
import VueMarkdown from 'vue-markdown'
import { mapGetters, mapActions } from 'vuex'
export default {
    components: {
        VueMarkdown
    },
    data() {
        return {
            form: {
                subject: '',
                body: ''
            },
            preview: false,
            rules: {
                'subject': [{ 'message': 'Subject is required', required: true, trigger: 'blur' }],
                'body': [{ 'message': 'Message Body is required', required: true, trigger: 'blur' }],
            }
        }
    },
    computed: {
        ...mapGetters({
            'currentStudent': 'instructor_app/evaluations/currentStudent',
            'instructor': 'instructor_app/instructor',
            'userProfile': 'userProfile'
        })
    },
    methods: {
        handleSend() {
            const vm = this;
            const formRef = this.$refs.feedbackForm;
            formRef.validate(function (valid) {
                if (valid) {
                    vm.$emit('newFeedback', {
                         from: vm.instructor.username,
                         to: vm.currentStudent.username,
                         subject: vm.form.subject,
                         body: vm.form.body,
                         userId: vm.userProfile && vm.userProfile.id,
                         timestamp: new Date().toISOString()
                     })
                    vm.form.subject = ''
                    vm.form.body = ''
                    vm.preview = false
                } else {
                    vm.$notify({
                        title: "Information",
                        message: "Please enter a message"
                    })
                }
            })

        }
    }
}
</script>

<style scoped>
.feedback {
    position: relative;
}

.hint {
    font-size: 0.9em;
    color: gray;
    background-color: aliceblue;
    padding: 8px;
}

.preview {
    background-color: aliceblue;
    line-height: 12px;
    padding-top: 0px;
    padding-left: 12px;
    min-height: 180px;
    border: 1px solid #dedede;
}

.floatbutton {
    position: absolute;
    bottom: 12px;
    right: 12px;
}

.minibtn {
    padding: 4px;
    font-size: 0.8em;
    border: 1px solid #dedede;
    cursor: pointer;
    border-radius: 4px;
    color: #666;
}

.minibtn:hover {
    color: #333;
    border-color: #666;
}
</style>
