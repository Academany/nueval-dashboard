<template>
    <el-card :class="{'margin-bottom':1,'noborder':1, postit: isRight}" :body-style="{ padding: '6px' }">
        <p>
            <div :class="{right: isRight}">
                <table class="message-table" style="width: 100%">
                    <tr class="header">
                        <td style="width: 52px">
                            <fa-icon class="grey" name="comments" scale="3"></fa-icon>
                        </td>
                        <td>
                            <div>
                                <div style="float: right">
                                    <small>{{ message.timestamp | moment('YYYY-MM-DD hh:mm z')}}</small>
                                </div>
                                <p>
                                    <strong>{{ message.subject }} </strong>
                                    <br> {{message.from}}
                                </p>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td></td>
                        <td>
                            <div class="feedback-item-body">
                                <vue-markdown>{{message.body}}</vue-markdown>
                            </div>
                        </td>
                    </tr>
                </table>
    
            </div>
        </p>
    </el-card>
</template>

<script>
import VueMarkdown from 'vue-markdown'

export default {
    components: {
        VueMarkdown
    },
    props: [
        'message',
        'isRight'
    ]
}
</script>

<style scoped>
.feedback-item-body p {
    font-size: 0.8em;
}

.postit {
    background-color: #FFFFEE
}

.margin-bottom {
    margin-bottom: 0px;
    /*border: none;*/
    box-shadow: none;
    padding: 0px;
}

.grey {
    color: #dedede;
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

.noborder {
    border: none;
    border-bottom: 1px dotted #dedede;
}

.message-table .header td {}

.message-table {
    border: none;
    padding: 0px;
}

.message-table td {
    margin: 0px;
    padding-left: 3px;
    padding-right: 3px;
}

.feedback-item-body {
    font-size: .9em;
}
</style>
