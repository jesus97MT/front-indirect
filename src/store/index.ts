import Vue from 'vue'
import Vuex from 'vuex'

import { account } from './account.module'
import { user } from './user.module'
import { indirect } from './indirect.module'

Vue.use(Vuex)

export const store =  new Vuex.Store({
  modules: {
    account,
    user,
    indirect
  }
})
