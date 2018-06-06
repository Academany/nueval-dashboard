<template>
    <el-card style="width: 100%">

        <div slot="header">
            <strong>Internal Comments</strong>
            <p>These comments are not visible to the student</p>
        </div>

        <div class="card-body">

            <FeedbackList :messages="messages"/>

            <InternalFeedbackForm v-on:newFeedback="handleFeedback"/>


        </div>
    </el-card>
</template>

<script>
import FeedbackList from '../forms/FeedbackList.vue'
import InternalFeedbackForm from '../forms/InternalFeedbackForm.vue'
import { mapActions } from 'vuex';

export default {
    props: [
        'student'
    ],
    components: {
        FeedbackList,
        InternalFeedbackForm
    },
    data(){
        return {
          
        }
    },
    methods:{
        handleFeedback(feedback){
            const vm = this
           // console.log('got feedback ')
           // console.log(feedback)
            this.leaveComment(feedback)
                .then((success) => {
                    vm.logOk("Comment recorded successfully")
               }).catch((error) => {
                    vm.logError(error)
            })
        },
        logError(err) {
            this.$notify({
                title: "Error",
                message: JSON.stringify(err)//message: "There was an error processing your request, please try later"
            })
        },
        logOk(msg) {
            this.$notify({
                title: "Information",
                message: msg
            })
        },
        ...mapActions(
            {'leaveComment': 'instructor_app/evaluations/leaveComment'}
        )
    },
    computed: {
        messages(){
            return this.student && this.student._comments || []
        }
    }
}
</script>

<style>

</style>
