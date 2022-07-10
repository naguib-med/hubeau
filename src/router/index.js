import Vue from 'vue'
import VueRouter from 'vue-router'
import tableView from "@/views/TableView";
import chartView from "@/views/ChartView";
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'table',
    component: tableView
  },
  {
    path: '/chart',
    name: 'chart',
    component: chartView
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
