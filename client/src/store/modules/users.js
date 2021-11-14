
export default {
  state: {
  users: [],
  user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : {}
  },
  getters: { 
    getUsers(state) {
      return state.users
    },
    getCurrentUser(state) {
      return state.user
    }
  }, 
  actions: {
    async fetchRoles() {
      const res = await fetch(`api/roles`)
      if(res.ok) 
        return await res.json()
    },
    async fetchAuthUser(ctx, data) { 
      const res = await fetch(`api/users`, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        method: "post",
        body: JSON.stringify(data)
      })
      const result = await res.json()
      ctx.commit('updateUser', result)
      if(res.ok) return {message: 'Вы успешно авторизованы', ok: true}
    },
    async fetchCreateUser(ctx, data) { 
      const res = await fetch(`api/users/registration`, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        method: "post",
        body: JSON.stringify(data)
      })
      const result = await res.json()
      ctx.commit('updateUser', result)
      if(res.ok) return {message: 'Пользователь успешно создан', ok: true}
      return result
    },
    async fetchAllUser(ctx) {
      const res = await fetch(`api/users/`)
      if(res.ok) {
        const result = await res.json()
        ctx.commit('pushAllUser', result)
      }
    },
  },
  mutations: {
    pushAllUser(state, users) { 
      state.users = users
    },
    updateUser(state, user) {
      state.user = user
      localStorage.setItem('user', JSON.stringify(state.user))
    },
    clearUserData(state) {
      state.user = {}
      localStorage.setItem('user', null)
    }
  }
}