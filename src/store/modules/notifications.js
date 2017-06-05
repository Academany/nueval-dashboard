
import Vapi from "vuex-rest-api"
import Vuex from 'vuex'

// Step 2 
const notifications = new Vapi({
  baseURL: "https://jsonplaceholder.typicode.com",
    state: {
      notifications: []
    }
  })
  // Step 3a 
  .get({
    action: "getNotifications",
    property: "notifications",
    path: () => '/me/notifications'
  })
  // Step 4 
  .getStore()
 
// Step 5 
const store = new Vuex.Store(notifications)
export default store