<template>
  <el-row type="flex">
    <el-col :lg="{ span: 18, offset: 3}">
  <div class="sheet">
  <h1>Your account</h1>
    <el-row type="flex" :gutter="12">
      <el-col>
        <h3>Personal information</h3>
        <el-card class="box-card" v-if="userProfile">
          <el-form :v-model="userProfile" label-position="left">

            <el-form-item label="First Name" prop="first_name">
              <el-input type="text" v-model="userProfile.first_name"/>
            </el-form-item>
            <el-form-item label="Last Name" prop="last_name">
              <el-input type="text" v-model="userProfile.last_name"/>
            </el-form-item>
            <el-form-item label="Username" prop="username">
                <el-input disabled type="text" v-model="userProfile.username"/>
            </el-form-item>
            <el-form-item label="Email" prop="email">
              <el-input type="text" v-model="userProfile.email"/>
            </el-form-item>
            <el-form-item label="Avatar" prop="avatar">
              <img :src="userProfile.avatar" v-if="userProfile.avatar" class="avatar">
              <el-input type="text" v-model="userProfile.avatar"/>
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
      email_notifications: false
    }
  },
  computed:{
    accessToken:  () => localStorage.getItem("token"),
    ...mapGetters(['userProfile'])
  },
  methods:{
    handleSubmit(){
      const self = this;
      this.loading=true;
      // alert('submit');
      // this.loading=false;
      this.updateProfile({
        url: '/api/me/profile',
        data: {
          first_name: this.userProfile.first_name,
          last_name: this.userProfile.last_name,
          email: this.userProfile.email,
          avatar: this.userProfile.avatar
        },
        callback(err,res){
          console.log('callback');
          self.loading=false;
          const h = self.$createElement;

          self.$notify({
            title: 'Profile updated',
            message: h('i', { style: 'color: teal' }, 'Your profile was successfully updated')
          });
        }
      });

    },
    ...mapActions(['logout','updateProfile'])
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
