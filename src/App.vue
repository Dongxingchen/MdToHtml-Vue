<template>
    <div>
        <header id='header'>
            <el-menu class="el-menu-demo" mode="horizontal" background-color="#545c64" text-color="#fff" active-text-color="#ffd04b">
                <el-menu-item index="1">
                    <router-link to='/home'>&nbsp;&nbsp;指南&nbsp;&nbsp; </router-link>
                </el-menu-item>
                <el-menu-item index="2">
                    <router-link to='/reference'>参考网页</router-link>
                </el-menu-item>
                <el-menu-item index="3">

                    <router-link to='/home'>
                        <el-button type="text" @click="open">&nbsp;&nbsp;支持&nbsp;&nbsp;
                        </el-button>
                    </router-link>
                </el-menu-item>
            </el-menu>
        </header>
        <!--路由站位  -->
        <router-view class='center-content'></router-view>
    </div>
</template>

<style>
/*element 修改部分 */

#header {
    position: fixed;
    right: 0;
    left: 0;
    top: 0;
    z-index: 1;
}

#header a {
    width: 100%;
    height: 100%;
    display: block;
}

.el-button--text {
    color: #fff;
}

.el-button--text:focus,
.el-button--text:hover {
    color: #039be5;
}
/*导航li标签  */
.el-menu-item{}


/*路由跳转触发被选中元素  */

.router-link-active {
    color: #039be5!important;
}

.home-left ul li {
    line-height: 16px;
    margin: 8px 0 0;
}

.home-left ul a {
    font-size: 13px;
    color: #212121;
    line-height: 16px;
}

.home-left ul li:hover a {
    color: #039be5;
    font-weight: 500;
}

.home-left span {
    font-size: 14px;
    font-weight: bold;
    color: gray;
}


/*顶部样式  */

.center-content {
    position: relative;
    top: 70px;
    width: 100%;
    height: 1000px;
}


/*md占位区域  */

.md-content {
    margin-left: 300px;
    padding-right: 20px;
}


/*-----------------占位组件样式 ------------ */


/*左侧导航  */

.active a {
    color: #039be5;
}

.home-left {
    position: fixed;
    width: 220px;
    height: 85%;
    /* overflow: auto; */
    background-color: #F7F7F7;
    padding: 16px;
    overflow-y: auto;
}

.home-left::-webkit-scrollbar {
    width: 4px;
}

.home-left::-webkit-scrollbar-track {
    height: 30px;
}

.home-left::-webkit-scrollbar-button {
    display: none;
}

.home-left::-webkit-scrollbar-thumb {
    background: #B7B7B7;
    border-radius: 4px;
}

.home-left ul {
    text-decoration: none;
    list-style: none;
    padding: 0;
    padding-bottom: 10px;
    border-bottom: 1px solid #ccc;
}

/*解决跳转解析前出现[]bug  */

[v-cloak] {
    display: none;
}


/*md样式  */

a {
    color: #039be5;
    text-decoration: none;
}

code {
    font: 500 90%/1 Roboto Mono, monospace;
    word-break: break-word;
    background: #f7f7f7;
    color: #37474f;
}

pre {
    font: 14px/20px Roboto Mono, monospace;
    margin: 16px 0;
    overflow-x: auto;
    padding: 8px;
    background: #f7f7f7;
    color: #37474f;
    background: #F7F7F7;
}

h1 {
    color: #757575;
    font: 300 34px/40px Roboto, sans-serif;
}

h2 {
    color: #212121;
    font-weight: normal;
    border-bottom: 1px solid #ccc;
}

p {
    color: #212121;
}

p:last-child,
p:nth-last-of-type(2) {
    color: #757575;
    font-size: 12px;
    font-style: italic;
}

table {
    border: 0;
    border-collapse: collapse;
    border-spacing: 0;
    font: 14px/20px Roboto, sans-serif;
    width: 100%;
    display: table;
    color: #212121;
}

tbody {
    vertical-align: middle;
    border-color: inherit;
    border-collapse: collapse;
}

tr {
    background: #78909c;
    border: 0;
    border-top: 1px solid #cfd8dc;
    display: table-row;
    vertical-align: inherit;
    border-collapse: collapse;
}

th {
    color: #fff;
    font: 500 16px/24px Roboto, sans-serif;
    height: 48px;
    padding: 8px;
    vertical-align: middle;
    border: 0;
    margin: 0;
    text-align: left;
    box-sizing: inherit;
    display: table-cell;
}

td {
    background: rgba(255, 255, 255, .95);
    vertical-align: top;
    color: #212121;
    padding: 7px 8px 8px;
    border: 0;
    margin: 0;
    text-align: left;
    display: table-cell;
    box-sizing: inherit;
}
</style>
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
export default {
    methods: {
        open() {
            this.$alert('更多功能，敬请期待！☺', '友情提示', {
                confirmButtonText: '确定',
            });
        }
    }
}
// -----------回到顶部-------------------
$.fn.fastTop = function(options) {
    // $.fn.extend(object),扩展jquery方法，扩展top插件
    var opts = $.extend({}, options);
    // this指向$
    return this.each(function() {
        var fastTop = $(this);
        var html = '<div class="goto-top"></div>'
        $(fastTop).append(html);
        // 导航图标
        fastTop.find('.goto-top').css({
            position: "fixed",
            bottom: '140px',
            right: '20px',
            cursor: 'pointer',
            height: '48px',
            width: '48px',
            borderRadius: '4px',
            backgroundRepeat: 'no-repeat',
            display: 'none',
            backgroundImage: 'url(../../../../statics/img/theme_z_0733f12.png)',
        });

        //  鼠标滚动监听,导航图标出现隐藏
        $(window).scroll(function() {
            if ($(this).scrollTop() > 200) {
                fastTop.find('.goto-top').fadeIn(300);
            } else {
                fastTop.find('.goto-top').fadeOut(300);
            }
        });
        // 鼠标移入导航图标颜色淡入淡出
        $(fastTop.find('.goto-top')).hover(function() {
            $(fastTop.find('.goto-top')).css('background-position', '-63px 0px')
        }, function() {
            $(fastTop.find('.goto-top')).css('background-position', '0px 0px')
        })
        $('.goto-top').click(function() {
            $('body,html').animate({
                scrollTop: 0
            }, 400);
            return false;
        });
    })
}

function fastTotop() {
    $('body').fastTop();
}
fastTotop()
</script>