<template>
    <div class="sheet">
        <div class="header" v-if="student">
            <h3>
                Final project</h3>
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
