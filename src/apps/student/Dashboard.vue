<template>
    <div class="app">
        <div class="title">
            <el-menu mode="horizontal" defaultActive="/" theme="light" class="nofrills">
                <el-menu-item index="/">
                    <router-link to="/">
                        <fa-icon name="arrow-left"></fa-icon>
                    </router-link>
                </el-menu-item>
                <el-menu-item v-if="student" index="">
                    {{student.course && student.course.name}}
                </el-menu-item>
            </el-menu>
        </div>
        <div class="body">
            <div :class="{sidebar: true, full: fullSidebar }">
                <SidebarMenu :apps="apps" :label="true" :collapse="false" @menuSelect="handleMenuSelect" @toggleMenu="handleToggleMenu" />
            </div>
            <div :class="{childview: true, slim: fullSidebar}">
                <router-view></router-view>
            </div>
        </div>
    </div>
</template>

<script>
import CourseMenu from '../../components/UserCourseMenu.vue'
import CourseSelect from '../../components/CourseSelect.vue'
import SidebarMenu from '../../components/SidebarMenu.vue'
import AppBar from '../../components/AppBar.vue'

import { mapGetters, mapActions } from 'vuex'
// or import all icons if you don't care about bundle size
export default {
    name: 'StudentDashboard',
    components: {
        // CourseMenu,
        SidebarMenu,
        // CourseSelect,
        AppBar
    },
    methods: {
        handleToggleMenu() {
            // this.fullSidebar = !this.fullSidebar
        },
        handleCourseChange(newCourse) {
            // console.log('New course is ' + newCourse);
            // this.changeCourse(newCourse);
        },
        handleMenuSelect(item) {
            this.$nextTick(() => {
                this.$router.push(item)
                this.changeApp(item)
            })
        },
        ...mapActions({
            // 'bootApp': 'instructor_app/bootApp',
            // 'loadInstructor' : 'instructor_app/loadInstructor',
            // 'loadCourses' : 'instructor_app/loadCourses',
            // 'changeCourse' : 'instructor_app/changeCourse',
            'changeApp': 'student_app/changeApp',
            // 'loadInstalledApps': 'apps/loadInstalledApps'
        })
    },
    mounted() {
        console.log('Mounting dashboard')
        if (!this.student) {
            this.$nextTick(() => this.$router.push('/app/student'))
        }
    },
    computed: {
        activeTab() {
            var path = this.$route.path;
            var filtered = this.apps.filter((el) => el.target.indexOf(path) == 0)
            var tab = filtered.length > 0 ? filtered[0] : null
            return tab;
        },
        ...mapGetters({
            'student': 'student_app/student',
            'apps': 'student_app/apps'
            // 'getInstructor' : 'apps/getInstructor',
            // 'courses': 'instructor_app/courses'
        })
    },
    data() {
        return {
            fullSidebar: true,
            selectedIndex: 0,
        }
    }
}
</script>
<style scoped>
.apps {
    padding: 24px;
}

.sidebar {
    /*overflow-y: hidden;*/
    /*max-height: 900px;*/
    /* light theme
    background-color: #eef1f6; */
    /* dark theme */
    background-color: #324157;
    position: fixed;
    width: 36px;
    top: 120px;
    left: 0px;
    bottom: 0px;
}

.sidebar.full {
    width: 150px;
}

.childview {
    position: absolute;
    left: 36px;
    right: 0px;
    top: 120px;
    bottom: 0px;
}

.childview.slim {
    left: 151px;
}

.inverted {
    background-color: #dedede;
}

.spacer {
    min-height: 1000px;
}

.el-row {
    margin-bottom: 20px;
    &:last-child {
        margin-bottom: 0;
    }
}

.title {
    text-align: left;
    position: fixed;
    top: 60px;
    width: 100%;
    z-index: 99
}

.action {
    float: right;
    font-size: 14px;
    padding-top: 12px;
    padding-right: 24px;
}

.right {
    float: right;
}

.fa-vc {
    margin-bottom: -2px;
}

.larger {
    font-size: 120%;
}

.wrap {
    padding: 24px;
}
</style>
