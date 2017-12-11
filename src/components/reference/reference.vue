<template>
    <div v-cloak>
        <div class='home-left'>
            <div :class='{nav_model_reference:navHideOrShow}' v-for='(item,i) in refList' :key='item.id'>
                <!--侧边导航  -->
                <span>{{item.homeName}}</span>
                <ul>
                    <li v-for='(homeNavItem,key) in item.homeNav' :key='key' @click='reload(homeNavItem,(i+1)+""+key)'>
                        <router-link :to='"/reference/"+(i+1)+key'>
                            {{homeNavItem}}
                        </router-link>
                    </li>
                </ul>
            </div>
        </div>
        <!--路由站位  -->
        <!-- <router-view class='home-center' v-cloak></router-view> -->
        <div class="md-content" v-html='mdHtml' v-show='mdHtml.length>0'></div>

    </div>
</template>
<script>
// 导入markdown-it第三方库
import MarkdownIt from 'markdown-it'
const md = new MarkdownIt({
    html: true,
    linkify: true,
    typographer: true,
    highlight: function(str, lang) {
        if (lang && hljs.getLanguage(lang)) {
            try {
                return hljs.highlight(lang, str).value;
            } catch (__) { }
        }

        return '';
    }
})

// 导出一个vue对象,为组件提供数据支持
export default {
    data: function() {
        return {
            mdHtml: [],
            refList: [{
                homeNav: []
            }
            ],
            activeName: '',
            navHideOrShow: true
        }
    },
    created: function() {
        this.getJson()
        this.reload([],this.$route.params.referenceId)

    },
    methods: {
        selected: function(homeNavItem) {
            this.activeName = homeNavItem
            this.navHideOrShow = false
        },
        getJson: function() {
            const url = '/statics/json/reference.json'
            this.$http.get(url).then(Response => {
                this.refList = Response.body
            }, err => {
                console.log(err)
            })
        },
        getmdHtml: function(argu) {
            // 设置目录对应的markdown文档路径
            const url = '/statics/md/reference' + argu + '.md'
            // 发送本地请求
            this.$http.get(url).then(Response => {
                this.mdHtml = md.render(Response.body)
            }, err => {
                console.log(err)
            })
        }, 
        reload: function(homeNavItem, argu) {
            // this.$router.go(0)
            this.selected(homeNavItem),
            this.getmdHtml(argu)

        }
    }
}
</script>