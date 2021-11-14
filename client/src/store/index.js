import { createStore } from 'vuex'
import users from './modules/users'
import lessons from './modules/lessons'

export default createStore({
  modules: {
    lessons,
    users,
  }
})
  