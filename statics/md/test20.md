# 网页跟踪

您可以通过网页跟踪来衡量网站上特定网页获得的浏览次数。网页通常对应于整个 HTML 文档，但也可以表现动态加载的内容，这种情况也称为“虚拟网页浏览”。

本指南介绍如何使用 analytics.js 实现网页跟踪。

## 概览

[JavaScript 跟踪代码段](https://developers.google.cn/analytics/devguides/collection/analyticsjs/?hl=zh-cn#the_javascript_tracking_snippet)中包含创建跟踪器对象的命令，在此命令之后包含向 Google Analytics（分析）发送网页浏览的命令。在创建跟踪器时，会基于浏览器的具体情况设置跟踪器中的若干字段。[`title`](https://developers.google.cn/analytics/devguides/collection/analyticsjs/field-reference?hl=zh-cn#title)字段会设为 `document.title` 的值，[`location`](https://developers.google.cn/analytics/devguides/collection/analyticsjs/field-reference?hl=zh-cn#location) 字段会设为 `document.location` 的值，并忽略网址的定位点部分。

**请注意**：如果网址的定位点部分包含[广告系列参数](https://support.google.com/analytics/answer/1033863?hl=zh-cn#parameters)，这些参数会保留在定位点中，并发送到 Google Analytics（分析）进行处理（除非将 [`allowAnchor`](https://developers.google.cn/analytics/devguides/collection/analyticsjs/field-reference?hl=zh-cn#allowAnchor) 字段定义为 `false`）。

在执行 `send` 命令时，会发送跟踪器上存储的 `title` 和 `location` 字段，Google Analytics（分析）使用这些值来向您显示用户访问了哪些网页。

默认跟踪器不会设置 [`page`](https://developers.google.cn/analytics/devguides/collection/analyticsjs/field-reference?hl=zh-cn#page) 字段，但如果您手动设置了该字段，其值将会取代 `location` 字段的值，在报告中用作网页路径。

## 实现

可以通过使用 [`send`](https://developers.google.cn/analytics/devguides/collection/analyticsjs/command-queue-reference?hl=zh-cn#send) 命令并将 [hitType](https://developers.google.cn/analytics/devguides/collection/analyticsjs/field-reference?hl=zh-cn#hitType) 指定为 `pageview` 来发送网页浏览匹配。针对 `pageview` 匹配类型的 `send` 命令使用以下签名：

```
ga('send', 'pageview', [page], [fieldsObject]);
```

### 网页浏览字段

下表汇总了与网页浏览相关的主要字段。要了解详细信息（以及某些附加字段），请参阅[字段参考](https://developers.google.cn/analytics/devguides/collection/analyticsjs/field-reference?hl=zh-cn#content)的[内容信息部分](https://developers.google.cn/analytics/devguides/collection/analyticsjs/field-reference?hl=zh-cn)。

| 字段名称                                     | 值类型  | 必填   | 说明                         |
| ---------------------------------------- | ---- | ---- | -------------------------- |
| [`title`](https://developers.google.cn/analytics/devguides/collection/analyticsjs/field-reference?hl=zh-cn#title) | text | 否    | 网页的标题（例如“首页”）              |
| [`location`](https://developers.google.cn/analytics/devguides/collection/analyticsjs/field-reference?hl=zh-cn#location) | text | 否 *  | 所跟踪网页的网址。                  |
| [`page`](https://developers.google.cn/analytics/devguides/collection/analyticsjs/field-reference?hl=zh-cn#page) | text | 否 *  | 网址的路径部分。此值应以斜杠 (`/`) 字符开头。 |

**\**** 虽然 page 字段和 location 字段都不是必需的，但必须使用两者之一，否则匹配无效。*

## 示例：

以下命令向 Google Analytics（分析）发送网页浏览匹配和当前页面的路径。

```
ga('send', 'pageview', location.pathname);

```

注意，在使用所有 `send` 命令时，通过便捷参数传递的字段也可以通过 `fieldsObject` 指定。上述命令可改写为：

```
ga('send', {
  hitType: 'pageview',
  page: location.pathname
});

```

要了解关于发送匹配的更多详情、示例和最佳做法，请参阅[向 Google Analytics（分析）发送数据](https://developers.google.cn/analytics/devguides/collection/analyticsjs/sending-hits?hl=zh-cn)指南。要详细了解 `send` 命令的调用签名，请参阅[命令队列参考](https://developers.google.cn/analytics/devguides/collection/analyticsjs/command-queue-reference?hl=zh-cn#send)。

### 修改页面的网址

在某些情况下，您要向 Google Analytics（分析）发送的网址与用户浏览器地址栏中显示的网址不同。例如，某个网站包含几个网页，用户可以登录和查看/修改其个人信息。如果此网站为个人信息、帐号信息和通知设置使用不同网页，这些网页可能会使用如下所示的网址：

- `/user/**USER_ID**/profile`
- `/user/**USER_ID**/account`
- `/user/**USER_ID**/notifications`

如果您想了解总共有多少人访问过这些网页，通过在这些网址中包含唯一用户 ID 值的方式并不容易计算。

要解决此问题，可以指定一个 `page` 值，并移除用户 ID：

```
// Checks to see if the current user's userID is
// found in the URL, if it is, remove it.
// (Note, this assume the user ID is stored
// in a variable called `userID`)

if (document.location.pathname.indexOf('user/' + userID) > -1) {
  var page = document.location.pathname.replace('user/' + userID, 'user');
  ga('send', 'pageview', page);
}

```

这将会发送所有用户的以下 `page` 值：

- `/user/profile`
- `/user/account`
- `/user/notifications`

如果当前网页正在发送其他匹配（例如事件），您需要确保发送的每个匹配都具有正确的网址。在这种情况下，您应该更新跟踪器上的 `page` 字段，而不应通过 `send` 命令来传递该字段。

在跟踪器上进行设置可以确保将新的 `page` 值用于之后的所有匹配：

```
if (document.location.pathname.indexOf('user/' + userID) > -1) {
  var page = document.location.pathname.replace('user/' + userID, 'user');

  // Sets the page value on the tracker.
  ga('set', 'page', page);

  // Sending the pageview no longer requires passing the page
  // value since it's now stored on the tracker object.
  ga('send', 'pageview');
}

```

### 跟踪虚拟网页浏览

如今许多网站都通过 AJAX 动态加载内容，在加载每个“网页”时无需将其完全载入。这些网站通常称为[单一网页应用](http://en.wikipedia.org/wiki/Single-page_application)。

如果您的网站动态加载网页内容并更新文档的网址，您通常需要发送额外的网页浏览以跟踪这些“虚拟网页浏览”。有关实现方面的详尽信息，请参阅使用 analytics.js 进行[单一网页应用跟踪](https://developers.google.cn/analytics/devguides/collection/analyticsjs/single-page-applications?hl=zh-cn)指南。

Except as otherwise noted, the content of this page is licensed under the [Creative Commons Attribution 3.0 License](http://creativecommons.org/licenses/by/3.0/), and code samples are licensed under the [Apache 2.0 License](http://www.apache.org/licenses/LICENSE-2.0). For details, see our [Site Policies](https://developers.google.cn/terms/site-policies?hl=zh-cn). Java is a registered trademark of Oracle and/or its affiliates.

上次更新日期：二月 13, 2017