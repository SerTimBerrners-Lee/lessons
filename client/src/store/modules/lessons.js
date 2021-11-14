export default {
  state: {
    lessons: [],
    lession: {}
  },
  getters: { 
    getLessons(state) {
      return state.lessons
    },
    getSelectedLession(state) {
      return state.lession
    }
  }, 
  actions: {
    async createNewLesson(ctx, data) { 
      const jwt = ctx.getters.getCurrentUser.jwt
      const res = await fetch(`api/lesson`, {
        method: "post",
        headers: new Headers({
          'Authorization': `Bearer ${jwt}`, 
        }), 
        body: data
      })
      if(res.ok) {
        const result = await res.json()
        ctx.commit('pushLession', result)
        return result
      }
    },
    async fetchUpdateLesson(ctx, data) { 
      const jwt = ctx.getters.getCurrentUser.jwt
      const res = await fetch(`api/lesson`, {
        headers: new Headers({
          'Authorization': `Bearer ${jwt}`, 
        }), 
        method: "put",
        body: data
      })
      if(res.ok) {
        const result = await res.json()
        return result
      }
    },
    async fetchAllLesson(ctx) {
      const jwt = ctx.getters.getCurrentUser.jwt
      const res = await fetch(`api/lesson/`, {
        headers: new Headers({
          'Authorization': `Bearer ${jwt}`, 
        }), 
      })
      if(res.ok) {
        const result = await res.json()
        ctx.commit('pushAllLesson', result)
      }
    },
    async deleteLesson(ctx, _id) {
      const jwt = ctx.getters.getCurrentUser.jwt
      const res = await fetch(`api/lesson/${_id}`, {
        headers: new Headers({
          'Authorization': `Bearer ${jwt}`, 
        }), 
        method: 'delete'
      })
      if(res.ok) 
        ctx.commit('deleteStateLession', _id)
    },
  },
  mutations: {
    pushAllLesson(state, lessons) { 
      state.lessons = lessons
    },
    pushLession(state, lession) {
      console.log(lession)
      state.lessons.push(lession)
    },
    setLession(state, lession) {
      state.lession = lession
    },
    deleteStateLession(state, _id) {
      state.lessons = state.lessons.filter(les => les._id != _id)
    }
  }
}