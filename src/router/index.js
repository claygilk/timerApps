import Vue from 'vue'
import VueRouter from 'vue-router'
import Interval from '../components/Interval.vue'
import Stopwatch from '../components/Stopwatch.vue'
import Timer from '../components/Timer.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/interval',
    name: 'interval',
    component: Interval
  },
  {
    path: '/',
    name: 'stopwatch',
    component: Stopwatch
  },
  {
    path:'/timer',
    name: 'timer',
    component: Timer
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
