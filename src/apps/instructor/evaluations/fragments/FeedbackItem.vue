<template>
    <el-card :class="{'margin-bottom':1, postit: isRight}" :body-style="{ padding: '12px' }">
        <p>
            <div :class="{right: isRight}">
                <img src="http://placehold.it/48x48" class="image">
                <strong>{{ isRight? 'Instruct' : 'Student'}} </strong>
                <br> 2017/06/03 23:33
            </div>
            <div class="feedback-item-body">
                <p>lorem ipsum dolor si amus lorem ipsum dolor si amus lorem ipsum dolor si amus lorem ipsum dolor si amus lorem ipsum dolor si amus lorem ipsum dolor si amus lorem ipsum dolor si amus lorem ipsum dolor si amus lorem ipsum dolor si amus lorem ipsum dolor si amus </p>
            </div>
        </p>
    </el-card>
</template>

<script>
export default {
    props: [
        'isRight'
    ]
}
</script>

<style scoped>
.feedback-item-body {
    font-size: 0.9em;
}

.postit {
    background-color: #FFFFEE
}

.margin-bottom {
    margin-bottom: 12px;
}

.right {
    text-align: right;
}

.right .image {
    float: right;
    margin-left: 12px;
}

.image {
    float: left;
    margin-right: 12px;
    border-radius: 24px;
}
</style>
