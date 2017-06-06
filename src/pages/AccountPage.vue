<template>
  <el-row type="flex">
    <el-col :lg="{ span: 18, offset: 3}">
  <div class="sheet">
  <h1>Your account</h1>
    <el-row type="flex" :gutter="12">
      <el-col>
        <h3>Personal information</h3>
        <el-card class="box-card" v-if="userProfile">
          <el-form :model="form" :rules="rules" ref="myForm" label-position="left">
            <el-form-item label="Username" prop="username">
                <el-input disabled type="text" v-model="form.username"/>
            </el-form-item>
            <el-form-item label="Email" prop="email">
              <el-input disabled type="text" v-model="form.email"/>
            </el-form-item>

            <el-form-item label="First Name" prop="first_name">
              <el-input type="text" v-model="form.first_name"/>
            </el-form-item>
            <el-form-item label="Last Name" prop="last_name">
              <el-input type="text" v-model="form.last_name"/>
            </el-form-item>

            <el-form-item label="Avatar" prop="avatar">
              <img :src="form.avatar" v-if="form.avatar && form.avatar == userProfile.avatar" class="avatar">
              <el-input type="text" v-model="form.avatar"/>
            </el-form-item>
            <el-form-item class="buttonbar">
              <el-button type="primary" style="width:100%;" @click.native.prevent="handleSubmit" :loading="loading">Save</el-button>
            </el-form-item>
          </el-form>
        </el-card>
      </el-col>

     <el-col>
       <h3>Notifications</h3>
       <el-card class="box-card">
         <el-form label-position="left">
           <el-form-item label="Email notifications">
             <el-switch
              v-model="email_notifications"
              on-text="On"
              :width="70"
              off-text="Off">
            </el-switch>
           </el-form-item>
         </el-form>
       </el-card>
       <h3>Access Token</h3>
       <el-card class="box-card">
         <el-form label-position="left">
           <el-form-item label="Token Code">
               <el-input type="text" v-model="accessToken"/>
           </el-form-item>
         </el-form>
       </el-card>
     </el-col>
    </el-row>
  </div>
</el-col>
</el-row>
</template>
<script>
import {mapGetters,mapActions} from 'vuex'
export default {
  data() {
    return {
      loading: false,
      email_notifications: false,
      form: {},
      rules: {
          first_name: [
                { required: true, message: 'Please enter First Name', trigger: 'blur' }
          ],
          last_name: [
                { required: true, message: 'Please enter Last Name', trigger: 'blur' }
          ],
          email: [
                { required: true, message: 'Please enter Email', trigger: 'blur' }
          ],
          username: [
              { required: true, message: 'Please enter Username', trigger: 'blur'}
          ]
      }
    }
  },
  computed:{
    accessToken:  () => localStorage.getItem("token"),
    ...mapGetters(['userProfile'])
  },
  watch: {
    userProfile(val){
      if (val)
        this.form = {...val}
      else
        this.form = {}
    }
  },
  mounted(){
    this.form = {...this.userProfile}
    this.loadUserProfile()
  },
  methods:{
    handleSubmit(){
      const formW = this.$refs.myForm;
      formW.validate((valid) => {
          if (valid) {
            const self = this;
            this.loading=true;
            // alert('submit');
            // this.loading=false;
            this.updateProfile({
              url: '/api/me/profile',
              data: {
                first_name: this.form.first_name,
                last_name: this.form.last_name,
                email: this.form.email,
                avatar: this.form.avatar
              },
              callback(err,res){
                const h = self.$createElement;
                console.log('callback');
                self.loading=false;
                if (err) {
                  return self.$notify({
                        title: 'Profile update error',
                        message: h('i', { style: 'color: teal' }, 'Your profile could not be updated, please retry')
                  });
                }
                self.$notify({
                  title: 'Profile updated',
                  message: h('i', { style: 'color: teal' }, 'Your profile was successfully updated')
                });
              }
            });
        }
      })
    },
    ...mapActions(['logout','loadUserProfile', 'updateProfile'])
  }
}
</script>
<style scoped>
.sheet {
  margin-left: auto;
  margin-right: auto;
}
.avatar {
  width: 64px;
  float: right;
  margin-bottom: 12px;
}
.buttonbar {
  width: 100%;
  text-align: right;
}
</style>
