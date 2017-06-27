<template>
    <div class="sheet">
        <div class="header" v-if="student">
            <h3>
                Final project</h3>
    
            <el-card>
    
                <div v-if="student.booked && student.booked.length > 0">
                    <strong>Final project presentation:</strong>
                    <br>
                    <div v-for="booking in student.booked" :key="booking.id">
                        {{booking.name }} {{booking.date | moment('YYYY-MM-DD')}}
                        <div v-if="student.presented && student.presented.length > 0">
                            <el-tag type="success">Presented</el-tag>
                        </div>
    
                        <div v-if="student.noshow && student.noshow.length > 0">
                            <el-tag type="danger">No show</el-tag>
                        </div>
                    </div>
    
                </div>
    
            </el-card>
    
        </div>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
    computed: {
        ...mapGetters({
            student: 'student_app/student'
        })
    }
}
</script>

<style>
.sheet {
    padding: 24px;
}
</style>
