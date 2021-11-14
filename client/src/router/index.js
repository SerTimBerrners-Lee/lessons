import { createRouter, createWebHistory } from 'vue-router'
import Authorization from '@/views/Authorization.vue'
import App from '@/App.vue'
import ErrorPage from '@/views/ErrorPage.vue'
import NotFound from '@/views/NotFound.vue'
import Lessons from '@/views/Lessons.vue'
import Lession from '@/components/Lessons/Lession.vue'
const routes = [ 
  {
    path: '/lesson',
    name: 'Лекция',
    component: Lession
  },
  {
    path: '/lessons',
    name: 'Лекции',
    component: Lessons
  },
  {
    path: '/auth',
    name: 'Авторизация',
    component: Authorization
  },
  {
    path: '/',
    name: 'Главная',
    component: App
  },
  {
    path: '/error',
    name: 'Ошибка',
    component: ErrorPage
  },
  { 
    path: "/:catchAll(.*)", 
    name: 'Страница не найдена', 
    component: NotFound, 
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})
router.beforeEach(async(to, from, next) => {
  const user = localStorage.getItem('user')
  if(to.path == '/' &&  (user || user != 'null')) return next('/lessons')
  if((!user || user == 'null') && to.path == '/') return next('/auth')
  else if((!user || user == 'null') 
    && to.path != '/error'
    && to.path != '/auth') return next('/error')
  else return next()
})

export default router
