import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '../components/HelloWorld'
import Search from '../components/search/Search'
import Result from '../components/result/Result'
import Stock from '../components/result/Stock'
import Industry from '../components/result/Industry'
import Fund from '../components/result/Fund'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/hello',
      name: 'hello',
      component: HelloWorld
    },
    {
      path: '/',
      name: 'search',
      component: Search
    },
    {
      path: '/result',
      name: 'result',
      component: Result,
      children: [
        {name: 'stock', path: 'stock', component: Stock},
        {name: 'industry', path: 'industry', component: Industry},
        {name: 'fund', path: 'fund', component: Fund}
      ]
    }
  ]
})
