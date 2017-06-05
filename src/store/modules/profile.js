export const SET_PROFILE = "SET_PROFILE"
export const UPDATE_PROFILE = "UPDATE_PROFILE"
export const LOAD_USER_PROFILE = "LOAD_USER_PROFILE"

import {API_FAILURE} from './failure'
import api from './api'

export default {
    actions: {
      loadUserProfile({commit}){
        api.get('/api/me/profile')
        .then((response)=>{
          commit(SET_PROFILE, response.user)
        })
        .catch((error)=>{
          commit(API_FAILURE, error)
        })
      },
      setUserProfile({commit}, newProfile){
          commit(SET_PROFILE, newProfile)
        },
      updateProfile({commit}, data){
        let cb = data.callback || function(){}
        api.post(data.url,data.data)
        .then(function(response){
          commit(UPDATE_PROFILE, response)
          if (cb) cb(null,response);
        })
        .catch(function(error){
          commit(API_FAILURE, error)
          if (cb) cb(error);
        });
      },
    },
    mutations: {
      [LOAD_USER_PROFILE](state){
        // state.userProfile = {}
      },
      [SET_PROFILE](state,newProfile){
        state.userProfile = newProfile;
      },
      [UPDATE_PROFILE](state,response){
        // console.log(updatedProfile);
        console.log(response);
      },
    },
    getters: {
      userProfile: state=>{
        return state.userProfile
      },
    },
    state: {
         userProfile: {},
         
    }
}