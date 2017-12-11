# 单页应用跟踪

本指南将介绍如何使用 analytics.js 跟踪网站上以动态方式加载内容（而不采用传统的整个网页加载方式）的网页。

## 概览

[单页应用](http://en.wikipedia.org/wiki/Single-page_application) (SPA) 指的是在首次加载网页时加载浏览整个网站所需所有资源的网络应用或网站。当用户点击链接并与网页互动时，系统将以动态方式加载后续内容。应用会经常更新地址栏中的网址来模仿传统的网页导航，但始终不会再发出整个网页加载请求。

在传统网站上运行默认的 [JavaScript 跟踪代码段](https://developers.google.cn/analytics/devguides/collection/analyticsjs/?hl=zh-cn#the_javascript_tracking_snippet)没有任何问题，因为该代码段在用户每次加载新页面时都会运行。但是，对于单页应用，网站以动态方式加载新的网页内容，而不采用整个网页加载方式，因此 analytics.js 代码段仅运行一次。也就是说，当有新内容加载时，必须通过人工方式跟踪后续的（虚拟）网页浏览。

**请注意**：创建单页应用的开发者可以使用 [autotrack](https://github.com/googleanalytics/autotrack)，它包含 [urlChangeTracker](https://github.com/googleanalytics/autotrack#urlchangetracker) 插件，用于处理本指南中列出的所有重要注意事项。有关使用和安装说明，请参阅 [autotrack 文档](https://github.com/googleanalytics/autotrack)。

## 跟踪虚拟网页浏览

当应用动态加载内容，并更新地址栏中的网址时，存储在您的跟踪器上的数据也应更新。

要更新跟踪器，请使用 [`set`](https://developers.google.cn/analytics/devguides/collection/analyticsjs/command-queue-reference?hl=zh-cn#set) 命令，并提供新的 [`page`](https://developers.google.cn/analytics/devguides/collection/analyticsjs/field-reference?hl=zh-cn#page) 值：

```
ga('set', 'page', '/new-page.html');

```

在设置了新的 page 值后，所发送的所有后续匹配将使用新值。要记录网页浏览，请在更新跟踪器后立即发送网页浏览匹配。

```
ga('set', 'page', '/new-page.html');
ga('send', 'pageview');
```

尽管从技术角度来说，用于网页浏览匹配的 [`send`](https://developers.google.cn/analytics/devguides/collection/analyticsjs/command-queue-reference?hl=zh-cn#send) 命令可以采用可选 `page` 字段作为第三个参数，但是当跟踪单页应用时不推荐采用这种方式传递 `page` 字段。这是因为并未在跟踪器上设置通过 `send`命令传送的字段，这些字段仅适用于当前的匹配。当您的应用发送任何非网页浏览匹配（例如事件或社交互动）时，如果未更新跟踪器，将导致错误，因为这些匹配将会与创建跟踪器时包含的任何 `page`值关联。

### 处理同一资源的多个网址

当动态加载内容时，部分 SPA 仅更新网址的 # 部分。这种做法可能导致多个不同网页路径指向同一资源。在这些情况下，通常最好选择一个规范网址并始终只将 `page` 值发送给 Google Analytics（分析）。

例如，假设有个网站的“关于我们”页面可通过以下任一网址进行访问：

- `/about.html`
- `/#about.html`
- `/home.html#about.html`

为避免报告中出现重复的内容，最好通过 `/about.html` 跟踪所有相关的网页浏览。

## 重要注意事项

### 不更新文档引荐来源网址

如果使用 [`create`](https://developers.google.cn/analytics/devguides/collection/analyticsjs/command-queue-reference?hl=zh-cn#create) 命令创建跟踪器对象，`document.referrer` 的值存储在跟踪器的 [`referrer`](https://developers.google.cn/analytics/devguides/collection/analyticsjs/field-reference?hl=zh-cn#referrer) 字段上。对于不采用整个网页加载方式的单页应用，`referrer` 字段始终保持不变。

尽管如此，也没有必要在发送网页浏览匹配之前，通过人工方式更新 referrer 字段。Google Analytics（分析）能自动确定正确的导航路径。

### 不更新文档位置

跟踪器为 [`location`](https://developers.google.cn/analytics/devguides/collection/analyticsjs/field-reference?hl=zh-cn#location) 字段使用 `document.location` 的方式与为 `referrer` 字段使用 `document.referrer` 的方式相同，该字段可能采用附加到网址末尾的查询参数的形式包含广告系列数据或其他元数据。

对 Google Analytics（分析）所要检查的任何广告系列字段或其他元数据进行更新，都可能导致现有会话结束并开始一个新会话。为避免此问题，在跟踪单页应用中的虚拟网页浏览时，请不要更新 `location` 字段，而应使用 `page` 字段。

**请注意**：如果您发送的匹配同时包含 `location` 和 `page` 字段，并且路径值不相同，Google Analytics（分析）将使用为 `page` 字段指定的值。

### 不创建新跟踪器

不要试图通过在单页应用中创建新的跟踪器来模拟 [JavaScript 跟踪代码段](https://developers.google.cn/analytics/devguides/collection/analyticsjs/?hl=zh-cn#the_javascript_tracking_snippet)在传统网站中的处理方式。如上文所述，这样做可能会将不正确的引荐来源网址及不正确的广告系列数据发送出去。

Except as otherwise noted, the content of this page is licensed under the [Creative Commons Attribution 3.0 License](http://creativecommons.org/licenses/by/3.0/), and code samples are licensed under the [Apache 2.0 License](http://www.apache.org/licenses/LICENSE-2.0). For details, see our [Site Policies](https://developers.google.cn/terms/site-policies?hl=zh-cn). Java is a registered trademark of Oracle and/or its affiliates.

上次更新日期：九月 29, 2016  