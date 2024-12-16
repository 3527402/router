import { h, ref } from 'vue'

let Vue = null
class Router {
  constructor(options) {
    this.mode = options.mode || 'hash'
    this.routes = options.routes || []
    this.currentRoute = ref('/')
    this.init()
    this.routersMap = this.createMap(this.routes)
  }
  // 初始化监听
  init() {
    if (this.mode === 'hash') {
      location.hash ? '' : (location.hash = '/')
      window.addEventListener('load', () => {
        this.currentRoute.value = location.hash.slice(1)
      })
      window.addEventListener('hashchange', () => {
        this.currentRoute.value = location.hash.slice(1)
      })
    } else {
      window.addEventListener('load', () => {
        this.history.current = location.pathname
      })
      window.addEventListener('popstate', () => {
        this.history.current = location.pathname
      })
    }
  }
  // 路由映射
  createMap(routes) {
    return routes.reduce((memo, current) => {
      memo[current.path] = current.component
      return memo
    }, {})
  }

  install(vue) {
    // vue是Vue的实例
    let router = this
    Vue = vue

    Vue.component('router-view', {
      render() {
        return h(router.routersMap[router.currentRoute.value])
      },
    })
    Vue.component('router-link', {
      props: {
        to: {
          required: true,
          type: [String, Object],
        },
        tag: {
          type: String,
          default: 'a',
        },
      },
      render() {
        return h(
          this.tag,
          {
            href: '#' + this.to,
          },
          [...this.$slots.default()]
        )
      },
    })
  }
}

export default Router
