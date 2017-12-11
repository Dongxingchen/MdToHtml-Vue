# 应用/屏幕跟踪

本指南将介绍如何通过 analytics.js 使用屏幕跟踪。

## 概览

Google Analytics（分析）中的屏幕代表用户在应用内查看的内容。此概念相当于网站上的[网页](https://developers.google.cn/analytics/devguides/collection/analyticsjs/pages?hl=zh-cn)。通过衡量屏幕浏览量，您可以了解用户浏览最多的是哪些内容，以及他们如何在不同的内容之间跳转。

## 实现

可以使用 [`send`](https://developers.google.cn/analytics/devguides/collection/analyticsjs/command-queue-reference?hl=zh-cn#send) 命令并将 [hitType](https://developers.google.cn/analytics/devguides/collection/analyticsjs/field-reference?hl=zh-cn#hitType) 指定为 `screenview` 来发送屏幕匹配。针对 `screenview` 匹配类型的 `send` 命令使用以下签名格式：

```
ga('send', 'screenview', [fieldsObject]);
```

### 屏幕字段

| 字段名称                                     | 值类型  | 必填    | 说明     |
| ---------------------------------------- | ---- | ----- | ------ |
| [`screenName`](https://developers.google.cn/analytics/devguides/collection/analyticsjs/field-reference?hl=zh-cn#screenName) | text | **是** | 屏幕的名称。 |

屏幕数据通常是发送到“应用”（而非“网站”）类型的 Google Analytics（分析）数据视图，这意味着除了发送 [`screenName`](https://developers.google.cn/analytics/devguides/collection/analyticsjs/field-reference?hl=zh-cn#screenName) 外，您至少还需要发送 [`appName`](https://developers.google.cn/analytics/devguides/collection/analyticsjs/field-reference?hl=zh-cn#appName) 字段。

下表列出了可以发往应用数据视图的[应用字段](https://developers.google.cn/analytics/devguides/collection/analyticsjs/field-reference?hl=zh-cn#apptracking)列表。

| 字段名称                                     | 值类型  | 必填    | 说明          |
| ---------------------------------------- | ---- | ----- | ----------- |
| [`appName`](https://developers.google.cn/analytics/devguides/collection/analyticsjs/field-reference?hl=zh-cn#appName) | text | **是** | 应用名称。       |
| [`appId`](https://developers.google.cn/analytics/devguides/collection/analyticsjs/field-reference?hl=zh-cn#appId) | text | 否     | 应用的ID。      |
| [`appVersion`](https://developers.google.cn/analytics/devguides/collection/analyticsjs/field-reference?hl=zh-cn#appVersion) | text | 否     | 应用版本。       |
| [`appInstallerId`](https://developers.google.cn/analytics/devguides/collection/analyticsjs/field-reference?hl=zh-cn#appInstallerId) | text | 否     | 应用安装程序的 ID。 |

要详细了解 Google Analytics（分析）中网站数据视图与应用数据视图的差异，请参阅 [Google Analytics（分析）帮助中心](https://support.google.com/analytics?hl=zh-cn)中的[网站数据视图与应用数据视图之间的差异](https://support.google.com/analytics/answer/2649553?hl=zh-cn#WebVersusAppViews)一文。

## 示例

以下命令向 Google Analytics（分析）发送了一个屏幕浏览匹配，应用名为 “myAppName”，屏幕为“Home”：

```
ga('send', 'screenview', {
  'appName': 'myAppName',
  'screenName': 'Home'
});

```

由于发送所有应用匹配时都必须包含 `appName` 字段，一般来说最好使用 [`set`](https://developers.google.cn/analytics/devguides/collection/analyticsjs/command-queue-reference?hl=zh-cn#set) 命令在跟踪器上设置该字段：

```
ga('create', 'UA-XXXXX-Y', 'auto');
ga('set', 'appName', 'myAppName');

// The `appName` field is now set on the tracker, so
// screenview hits don't need to include it.
ga('send', 'screenview', {screenName: 'Home'});

```

要了解关于发送匹配的更多详情、示例和最佳做法，请参阅[向 Google Analytics（分析）发送数据](https://developers.google.cn/analytics/devguides/collection/analyticsjs/sending-hits?hl=zh-cn)指南。要详细了解 `send` 命令的调用签名，请参阅[命令队列参考](https://developers.google.cn/analytics/devguides/collection/analyticsjs/command-queue-reference?hl=zh-cn#send)。

### 使用适用于应用专属数据视图和网络专属数据视图的过滤器

如果您为同一个媒体资源 (UA-XXXXX-Y) 发送网络数据和应用数据，Google Analytics（分析）就会在该媒体资源的数据视图中显示这两组数据。这会将应用数据视图和网络数据视图合并。

如果要为同一个媒体资源发送应用和网络数据，但想要维持单独的应用和/或网络数据视图，您可以创建[过滤器](https://support.google.com/analytics/answer/1033162?hl=zh-cn)。例如，您可以创建一个合并数据视图（默认）、一个网络数据视图和一个应用数据视图。

#### 应用数据视图过滤器

创建仅**包含**应用数据的**自定义过滤器**，方法是将 `Application?` 设为 `yes`。

![Google Analytics（分析）创建过滤器表单。将“过滤器名称”字段设为“应用数据视图”，选择“自定义过滤器”类型，选择“包含”，将“过滤字段”下拉菜单设为“应用？”，将“过滤模式”设为“是”，将“区分大小写”设为“否”。](https://developers.google.cn/analytics/images/devguides/collection/analyticsjs/screens-filter-appview.png?hl=zh-cn)**图 1**：应用数据视图的过滤器设置。

#### 网络数据视图过滤器

创建仅**包含**网络数据的**自定义过滤器**，方法是将 `Application?` 设为 `no`。

![Google Analytics（分析）创建过滤器表单。将“过滤器名称”字段设为“网络数据视图”，选择“自定义过滤器”类型，选择“包含”，将“过滤字段”下拉菜单设为“应用？”，将“过滤模式”设为“否”，将“区分大小写”设为“否”。](https://developers.google.cn/analytics/images/devguides/collection/analyticsjs/screens-filter-webview.png?hl=zh-cn)**图 2**：网络数据视图的过滤器设置。

Except as otherwise noted, the content of this page is licensed under the [Creative Commons Attribution 3.0 License](http://creativecommons.org/licenses/by/3.0/), and code samples are licensed under the [Apache 2.0 License](http://www.apache.org/licenses/LICENSE-2.0). For details, see our [Site Policies](https://developers.google.cn/terms/site-policies?hl=zh-cn). Java is a registered trademark of Oracle and/or its affiliates.

上次更新日期：九月 29, 2016