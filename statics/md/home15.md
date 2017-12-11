# 使用插件

插件是用于增强 analytics.js 的功能以帮助衡量用户交互情况的脚本。插件特指一组并非所有 Google Analytics（分析）用户都需要使用的功能，例如[电子商务](https://developers.google.cn/analytics/devguides/collection/analyticsjs/enhanced-ecommerce?hl=zh-cn)或[跨网域跟踪](https://developers.google.cn/analytics/devguides/collection/analyticsjs/cross-domain?hl=zh-cn)，因此默认情况下未包含在 analytics.js 中。

本指南说明如何请求和使用 analytics.js 插件。

## 请求插件

[`require`](https://developers.google.cn/analytics/devguides/collection/analyticsjs/command-queue-reference?hl=zh-cn#require) 命令需要使用插件名称，并注册该插件以便在 `ga()` 命令队列中使用。如果插件接受配置选项，可以将这些选项作为排在最后的参数传递给 `require` 命令。

下面是完整的 `require` 命令签名：

```
ga('[trackerName.]require', pluginName, [pluginOptions]);

```

例如，您应该用以下命令调用来请求[增强型电子商务](https://developers.google.cn/analytics/devguides/collection/analyticsjs/enhanced-ecommerce?hl=zh-cn)插件，以便将其与默认跟踪器搭配使用：

```
ga('require', 'ec');

```

下例显示了如何为名称为 "myTracker" 的跟踪器请求[展示广告功能](https://developers.google.cn/analytics/devguides/collection/analyticsjs/display-features?hl=zh-cn)插件，并通过传递配置选项替换默认的 Cookie 名称值：

```
ga('myTracker.require', 'displayfeatures', {
  cookieName: 'display_features_cookie'
});

```

### 加载插件代码

`require` 命令会初始化插件的方法以便在 `ga()` 命令队列中使用，但该命令本身不会加载插件脚本。如果您要使用第三方插件或自己[编写插件](https://developers.google.cn/analytics/devguides/collection/analyticsjs/writing-plugins?hl=zh-cn)，则需要在网页中手动添加插件代码。

在网页中添加插件代码的推荐方式是使用 `` 标记并设置 `async` 属性，以确保该插件不会阻止您网站上其他功能的加载。

以下代码请求并加载了一个假设的链接跟踪插件：

```
<script>
ga('create', 'UA-XXXXX-Y', 'auto');
ga('require', 'linkTracker');
ga('send', 'pageview');
</script>

<!--Note: plugin scripts must be included after the tracking snippet. -->
<script async src="/path/to/link-tracker-plugin.js"></script>

```

**请注意**：用于 analytics.js 的官方 Google Analytics（分析）插件是在收到请求时自动加载的，您无需为其添加脚本代码。您可以在左侧导航栏的官方插件**部分查看 analytics.js 官方插件的完整列表。

### 等待插件加载完成

由于 analytics.js 库和 analytics.js 插件都是异步加载的，因此不易确定插件何时加载完成可供使用。

analytics.js 库解决此问题的方式是，在命令队列遇到 `require` 命令对尚未加载的插件进行请求时暂停命令队列的执行。当插件加载后，立即恢复命令队列的正常执行。

因此，对您要使用的插件进行测试以确保其成功加载和正确运行非常重要。如果某个插件无法加载或出错，就会造成后面所有的 analytics.js 命令都无法执行。

## 调用插件的方法

对插件发出请求后，就可以使用 `ga()` 命令队列调用其方法。下面是调用插件方法的命令签名：

```
ga('[trackerName.][pluginName:]methodName', ...args);

```

例如，您可以用如下代码调用[增强型电子商务](https://developers.google.cn/analytics/devguides/collection/analyticsjs/enhanced-ecommerce?hl=zh-cn)插件的 `addProduct` 方法：

```
ga('ec:addProduct', {
  'id': 'P12345',
  'quantity': 1
});

```

您也可以在以上命令字符串中添加跟踪器名称，针对已命名的跟踪器调用该方法：

```
ga('myTracker.ec:addProduct', {
  'id': 'P12345',
  'quantity': 1
});

```

## 后续步骤

阅读了这一部分的所有指南文章后，您应该已经熟悉 analytics.js 的大多数功能。下一篇指南将介绍如何[调试您的 analytics.js 实现](https://developers.google.cn/analytics/devguides/collection/analyticsjs/debugging?hl=zh-cn)以轻松发现错误并确保代码的执行情况完全符合预期。

Except as otherwise noted, the content of this page is licensed under the [Creative Commons Attribution 3.0 License](http://creativecommons.org/licenses/by/3.0/), and code samples are licensed under the [Apache 2.0 License](http://www.apache.org/licenses/LICENSE-2.0). For details, see our [Site Policies](https://developers.google.cn/terms/site-policies?hl=zh-cn). Java is a registered trademark of Oracle and/or its affiliates.

上次更新日期：二月 13, 2017