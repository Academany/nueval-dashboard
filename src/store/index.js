import Vuex from 'vuex'
import getters from './getters'
import actions from './actions'
import mutations from './mutations'
import state from './state'
import presentations from './modules/presentations'
import supernodes from './modules/supernodes'

export default new Vuex.Store({
  modules:
  [ {
    state,
    getters,
    actions,
    mutations
    },
    presentations,
    supernodes
]}
)
