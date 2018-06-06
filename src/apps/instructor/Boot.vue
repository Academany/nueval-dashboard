<template>
    <div v-if="loading">
        <el-row>
            <el-col :span="12" :offset="6">
                <el-card>
                    <h1>Loading...</h1>
                    <p>Please wait, loading your dashboard</p>
                    <el-progress :percentage="loaded"></el-progress>
                </el-card>
            </el-col>
        </el-row>
    </div>
    <div v-else>
        <div v-if="booted">
            <router-view></router-view>
        </div>
    
        <div v-else>
            <el-row v-if="filteredRoles.length > 1">
                <el-col :span="12" :offset="6">
                    <el-card>
                        <p>Looks like you are instructor in more than one course</p>
                        <p>Please select a course</p>
                        <el-select v-model="selectedRoleIdx" @change="selectRole">
                            <el-option v-for="role,idx in filteredRoles" :label="role.instructor.course.name" :value="idx" :key="role.role"></el-option>
                        </el-select>
                        <el-button @click="launchApp">Start</el-button>
                    </el-card>
                </el-col>
            </el-row>
        </div>
    </div>
    </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'

export default {
    data() {
        return {
            loading: false,
            booted: false,
            loaded: 0,
            selectedRoleIdx: null,
            selectedRole: null,
            showSelect: false
        }
    },
    computed: {
        ...mapGetters({
            userRoles: 'apps/userRoles',
            installedApps: 'apps/installedApps'
        }),
        filteredRoles() {
            const roles = this.userRoles || [];
            //console.log(roles)
            return roles.filter((el) => {
                return (el.role === 'instructor')
            })
        }
    },
    methods: {
        selectRole: function(roleIdx){
          this.selectedRole = this.filteredRoles[roleIdx] || null
        },
        launchApp: function () {
            //alert('boot')
            var vm = this;
            this.booted = true
            this.bootApp(this.selectedRole.instructor).then((success) => {
                vm.loading = false;
                vm.loaded = 100;
                // vm.$nextTick(function(){
                vm.$router.push('/apps/instructor/d/home')
                // });
            }).catch((error) => {
                vm.loading = false;
                vm.loaded = 0;
                // vm.$nextTick(function(){
                vm.$router.push('/apps/instructor/error')
                // });
            })
        },
        ...mapActions({
            bootApp: 'instructor_app/bootApp',
            loadInstalledApps: 'apps/loadInstalledApps'
        })
    },
    mounted() {
        const vm = this;
        this.loadInstalledApps().then((success) => {

            if (vm.filteredRoles.length == 1) {
                vm.selectedRole = vm.filteredRoles[0];
                vm.$nextTick(function () {
                    vm.launchApp()
                })
            } 
        }).catch((error) => {
           // console.log('Something bad happened');
            vm.$router.push('/')
        });
    }
}
</script>

