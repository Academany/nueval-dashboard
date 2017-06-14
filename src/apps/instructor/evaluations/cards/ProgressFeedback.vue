<template>
    <el-card>
        <div slot="header">Instructor Feedback</div>
        <el-row>
            <el-col :span="12" class="centered">
                <el-tag>Molding and casting</el-tag>
                <br>
                <small>2017-05-05</small>
                <br/> Name surname
                <el-rate v-model="value5" disabled show-text :texts="['oops', 'disappointed', 'normal', 'good', 'great']" text-color="#ff9900" text-template="{value}">
                </el-rate>
            </el-col>
            <el-col :span="12">
                <cite>{{ stringa | truncate(130)}}</cite>
            </el-col>
        </el-row>
        <div class="card-footer">
            <el-button>See all feedback</el-button>
            <el-button>
                <fa-icon class="fa-fix" name="reply"></fa-icon> Reply</el-button>
    
        </div>
    </el-card>
</template>

<script>
export default {
    data() {
        return {
            stringa: 'lorem ipsum dolor sit emet, comm nuc sint averse, dolur dolut dolent',
            value5: 5
        }
    }
}
</script>

<style scoped>
.card-footer {
    width: 100%;
    padding: 0;
    margin-top: 12px;
    text-align: center;
    padding-top: 12px;
    border-top: 1px solid #dedede;
}

.fa-fix {
    margin-bottom: -4px;
}
</style>
