import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/home'
import Arrivals from '@/components/arrivals'
import Departures from '@/components/departures'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },

    {
      path: '/arrivals',
      name: 'Arrivals',
      component: Arrivals,
      props: { type: 'arrivals' }      
    },

    {
      path: '/departures',
      name: 'Departures',
      component: Departures,
      props: { type: 'departures' }
    }
  ]
})
