<template>
    <div v-if="student" style="padding-right: 24px">
        <el-row :gutter="24">
            <el-col :span="12">

                <div v-if="student.lab">
                    <el-card class="website-card">
                        <div slot="header">Student website</div>
                        <a target="_blank" :href="websiteURL">
                            <fa-icon name="globe" class="fa-fix"></fa-icon> Website</a>
                        <a target="_blank" :href="slideURL">
                            <fa-icon name="image" class="fa-fix"></fa-icon> Slide</a>
                        <a target="_blank" :href="videoURL">
                            <fa-icon name="play-circle" class="fa-fix"></fa-icon> Video</a>

                    </el-card>
                </div>
                <br>
                <div v-if="student.booked && student.booked.length > 0">

                    <el-card style="width: 100%">

                        <div slot="header">
                            <strong>Final project presentation:</strong>
                        </div>

                        <div style="display: inline-box" v-for="(booking,idx) in student.booked" :key="booking.id">
                            <div v-if="idx==0">
                            {{booking.name }} {{booking.date | moment('YYYY-MM-DD')}}
                            <span v-if="student.presented && student.presented.length > 0">
                                <el-tag type="success">Presented</el-tag>
                            </span>
                            <span v-else-if="student.noshow && student.noshow.length > 0">
                                <el-tag type="danger">No show</el-tag>
                            </span>
                            <span v-else>
                                <el-tag type="primary">Pending</el-tag>
                            </span>
                            </div>
                        </div>
                    </el-card>
                </div>
                <br>
                <div v-if="student.lab">
                    <el-card style="width: 100%">
                        <div slot="header">Final project slide</div>
                        <a :href="videoURL" target="_blank">
                            <LazyImage style="width: 100%" :src="slideURL"/>
                        </a>
                    </el-card>
                </div>

            </el-col>

            <el-col :span="12">
                <InternalComments :student="student"/>
            </el-col>
        </el-row>
    </div>
</template>
<script>
import InternalComments from '../cards/InternalComments.vue'
import LazyImage from '../fragments/LazyImage.vue'
export default {
    components: {
        InternalComments,
        LazyImage
    },
    props: [
        'student'
    ],
    computed: {
        messages(){
            return []
        },
        websiteURL() {

            if (this.student && this.student.lab){
                // console.log(this.student)
                if (this.student.website) return 'http://fabacademy.org'  + this.student.website;
                else
                  return `http://archive.fabacademy.org/archives/2017/${this.student.lab.lab_id}/students/${this.student.student_id}`
              }
            return ''
        },
        videoURL() {
            if (this.student && this.student.lab)
              if (this.student.website) return 'http://fabacademy.org'  + this.student.website + '/presentation.mp4';
              else
              return `http://archive.fabacademy.org/archives/2017/${this.student.lab.lab_id}/students/${this.student.student_id}/presentation.mp4`
            return ''
        },
        slideURL() {
            if (this.student && this.student.lab)
                if (this.student.website) return 'http://fabacademy.org'  + this.student.website + '/presentation.png';
                else
                return `http://archive.fabacademy.org/archives/2017/${this.student.lab.lab_id}/students/${this.student.student_id}/presentation.png`
            return ''
        }
    }
}
</script>
<style>

</style>
