# 将 analytics.js 添加到网站中

Analytics.js 库是一种可用于衡量用户与您网站的互动情况的 JavaScript 库。本文介绍如何将 analytics.js 添加到您的网站。

## JavaScript 跟踪代码段

将以下代码（也称为“JavaScript 跟踪代码段”）添加到您的网站模板是着手使用 analytics.js 的最简单方法。

应该将此代码添加在结束标记 `` 之前，并用您希望跟踪的 Google Analytics（分析）[媒体资源 ID](https://support.google.com/analytics/answer/1032385?hl=zh-cn)（也称为“跟踪 ID”）替换字符串 `'UA-XXXXX-Y'`。

**提示**：如果您不知道您的媒体资源 ID，可以使用[帐户浏览器](https://ga-dev-tools.appspot.com/account-explorer/?hl=zh-cn)来查找。

```
<!-- Google Analytics -->
<script>
(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

ga('create', 'UA-XXXXX-Y', 'auto');
ga('send', 'pageview');
</script>
<!-- End Google Analytics -->
```

以上代码进行了以下四项操作：

1. 创建了一个 `` 元素，并开始从 `https://www.google-analytics.com/analytics.js`异步下载 analytics.js JavaScript 库。
2. 初始化了一个全局函数 `ga`（也称为[ `ga()` 命令队列](https://developers.google.cn/analytics/devguides/collection/analyticsjs/how-analyticsjs-works?hl=zh-cn)），您可以通过该函数来安排要在 analytics.js 库加载完毕可供使用时执行的命令。
3. 在 `ga()` 命令队列中添加一条命令，为通过 `'UA-XXXXX-Y'` 参数指定的媒体资源[创建一个新的跟踪器对象](https://developers.google.cn/analytics/devguides/collection/analyticsjs/creating-trackers?hl=zh-cn)。
4. 在 `ga()` 命令队列中添加另一条命令，为当前页面[向 Google Analytics（分析）发送网页浏览数据](https://developers.google.cn/analytics/devguides/collection/analyticsjs/sending-hits?hl=zh-cn)。

自定义实现时可能需要修改 JavaScript 跟踪代码段的最后两行（`create` 和 `send` 命令）或添加更多代码来跟踪更多互动。但不应该更改加载 analytics.js 库或初始化 `ga()` 命令队列函数的代码。

### 备用异步跟踪代码段

虽然上述 JavaScript 跟踪代码段可以确保该脚本在所有浏览器中加载和异步执行，但不足之处是不能让新型浏览器预加载该脚本。

下面的备用异步跟踪代码段增加了对预加载的支持，从而有助于在新型浏览器中实现小幅的性能提升，但在 IE 9 以及不识别 `async` 脚本属性的旧版移动浏览器中，会降级为同步加载和执行。建议您仅在网站访问者大多使用新型浏览器的情况下才使用此跟踪代码段。

```
<!-- Google Analytics -->
<script>
window.ga=window.ga||function(){(ga.q=ga.q||[]).push(arguments)};ga.l=+new Date;
ga('create', 'UA-XXXXX-Y', 'auto');
ga('send', 'pageview');
</script>
<script async src='https://www.google-analytics.com/analytics.js'></script>
<!-- End Google Analytics -->
```

## 跟踪代码段可以捕获哪些数据？

当您在网站中添加了上述任何一种跟踪代码段之后，就会针对用户访问的每个页面发送网页浏览数据。Google Analytics（分析）通过处理此数据可以推导出大量信息，其中包括：

- 用户总共在您网站上停留了多少时间。
- 用户在每个网页上停留的时间以及用户查看这些网页的次序。
- 用户点击了哪些内部链接（根据下一个网页浏览的网址得到）。

此外，IP 地址、用户代理字符串以及 analytics.js 在创建新跟踪器时查看的初始网页可用于确定以下这类信息：

- 用户的地理位置。
- 用户使用的浏览器和操作系统。
- 屏幕尺寸以及是否安装了 Flash 或 Java。
- 引荐网站。

## 后续步骤

对于基本的报表需求，通过 JavaScript 跟踪代码段收集数据已经足够，但在许多情况下，您还需要解决与用户相关的其他问题。

本网站上的指南介绍了如何使用 analytics.js 来跟踪您所关心的互动，但在您实现具体功能之前，我们强烈建议您阅读左侧导航栏中“基础知识”部分列出的相关指南。这些指南可以帮助您概要了解 analytics.js 库和更好地理解本网站中的所有代码示例。

本系列中的下一个指南将介绍 [analytics.js 的工作原理](https://developers.google.cn/analytics/devguides/collection/analyticsjs/how-analyticsjs-works?hl=zh-cn)。

Except as otherwise noted, the content of this page is licensed under the [Creative Commons Attribution 3.0 License](http://creativecommons.org/licenses/by/3.0/), and code samples are licensed under the [Apache 2.0 License](http://www.apache.org/licenses/LICENSE-2.0). For details, see our [Site Policies](https://developers.google.cn/terms/site-policies?hl=zh-cn). Java is a registered trademark of Oracle and/or its affiliates.

上次更新日期：九月 29, 2016