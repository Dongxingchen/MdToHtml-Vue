<template>
	<div v-cloak>
		<div class='home-left'>
			 <div :class='{nav_model:navHideOrShow}' v-for='(item,i) in homeList' :key='item.id' v-cloak> 
				<!--侧边导航  -->
				 <span>{{item.homeName}}</span>
				<ul>
					<li v-for='(homeNavItem,key) in item.homeNav' :key='key'
					 @click='reload(homeNavItem,(i+1)+""+key)'
					 :class='{active:activeName== homeNavItem}'>
						<router-link :to="'/home/'+(i+1)+key">
							{{homeNavItem}}
						</router-link>
					</li>
				</ul> 
			 </div> 
		</div>
		<!--md渲染内容区域  -->
		<div v-html='mdHtml' class="md-content" v-show='mdHtml.length>0'></div>
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
			homeList: [{
				homeNav: []
			}
			],
			mdHtml: [],
			activeName: '',
			navHideOrShow: true,
		}
	},
	created: function() {
		this.getJson()
		// 根据二级路由参数实现首页及刷新后页面的渲染
		this.reload([],this.$route.params.homeId)
		// console.log(this.$route.params.homeId)
	},
	methods: {
		selected: function(homeNavItem) {
			this.activeName = homeNavItem
			this.navHideOrShow = false
		},
		// 获取左侧目录数据
		getJson: function() {
			const url = '/statics/json/home.json'
			// 发送本地请求
			this.$http.get(url).then(Response => {
				this.homeList = Response.body
			}, err => {
				console.log(err)
			})
		},
		// 渲染md
		getmdHtml: function(argu) {
			// 设置目录对应的markdown文档路径
			const url = '/statics/md/home' + argu + '.md'
			// 发送本地请求
			this.$http.get(url).then(Response => {
				this.mdHtml = md.render(Response.body)
			}, err => {
				console.log(err)
			})
		},
		reload: function(homeNavItem, argu) {
			// debugger
			// this.$router.go(0)
			this.selected(homeNavItem)
			this.getmdHtml(argu)
		}
	}
}
</script>
