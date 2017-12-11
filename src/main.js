// 导入第三方库
import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// 集成vue
Vue.use(VueRouter)
Vue.use(VueResource)
Vue.use(Element)
//导入Vue项目中要渲染的首屏文件
import App from './App.vue'
//vue组件一级路由
import home from './components/home/home.vue'
import reference from './components/reference/reference.vue'
import support from './components/support/support.vue'
// 创建并且设置路由
const router = new VueRouter({
    routes: [{
            // 配置home 路由规则
            path: '/',
            redirect: '/home/10'
        },
        // 配置home二级路由规则
        {
            path: '/home',
            component: home,
            children: [{
                    path: '/home',
                    redirect: '/home/10'
                },
                {
                    path: '/home/:homeId',
                    component:home
                },
            ]
        },
        // 配置reference路由规则
        {
            path: '/reference',
            redirect: '/reference/10'
        },
        // 配置reference二级路由规则
        {
            path: '/reference',
            component: reference,
            children: [{
                    path: '/reference',
                    redirect: '/reference/10'
                },
                {
                    path: '/reference/:referenceId',
                    component:reference
                }
            ]
        },
        // 配置support一级路由规则
        {
            path: '/support',
            component: support
        },
    ]
})
// 设置路由跳转至其他页面时默认在顶部位置
router.afterEach((to, from, next) => {
    window.scrollTo(0, 0);
})
new Vue({
    el: '#app',
    // 注入路由
    router,
    render: function (createElement) {
        return createElement(App)
    }
})