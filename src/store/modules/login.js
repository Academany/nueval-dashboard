export const LOGIN = "LOGIN"
export const LOGIN_SUCCESS = "LOGIN_SUCCESS"
export const LOGIN_FAILED = "LOGIN_FAILED"
export const LOGOUT = "LOGOUT"
import {API_FAILURE} from './failure'
import api from './api'
import {router} from '../../main'
import {LOAD_INSTALLED_APPS} from './apps'

export default {
    getters: {
        isLoggedIn: state => {
            return state.isLoggedIn
        },
        isPending: state => {
            return state.isPending
        }
    },
    actions: {
        login({commit,dispatch}, creds) {
            return new Promise((resolve,reject) => {

                // console.log("login:ctx")
                commit(LOGIN); // show spinner
                // console.log('setting token')
                // console.log(creds)
                if (creds ) {
                    if (creds.token && creds.userId){
                        localStorage.setItem("token", creds.token);
                        localStorage.setItem("userId", creds.userId);

                        commit(LOGIN_SUCCESS)
                        dispatch('apps/loadInstalledApps')
                        dispatch('loadUserProfile')
                        // dispatch('getNotifications')
                        // dispatch('messages/loadMessages')
                        return resolve("Login Success")
                    }
                }
                commit(LOGIN_FAILED)
                return reject("Missing Token")
                

            })
        },
        logout({
            commit
        }) {
            return new Promise((resolve,reject) => {
                localStorage.removeItem("token");
                commit(LOGIN_FAILED);
                resolve();
            });
            // router.push('/login');
        },
    },
    mutations: {
        [LOGIN](state) {
            state.pending = true;
        },
        [LOGIN_SUCCESS](state) {
            state.isLoggedIn = true;
            state.pending = false;
        },
        [LOGIN_FAILED](state) {
            state.isLoggedIn = false;
            state.pending = false;
        },
        [LOGOUT](state) {
            state.isLoggedIn = false;
        },
    },
    state: {
        isLoggedIn: !!localStorage.getItem("token"),
    }
}