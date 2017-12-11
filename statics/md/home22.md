# 社交互动

本指南将介绍如何使用 analytics.js 来衡量社交互动。

## 概览

您可以使用社交互动分析来衡量用户点击嵌入网页的社交按钮的次数。例如，您可以衡量 Facebook 上的“赞”或 Twitter 上的“Tweet”。

[事件跟踪](https://developers.google.cn/analytics/devguides/collection/analyticsjs/events?hl=zh-cn)可以非常有效地衡量一般的用户互动，但社交分析可为记录社交互动提供一致的框架，进而提供一套可用于比较多个社交网络上的社交互动的统一报告。

如果您不熟悉 Google Analytics（分析）中的社交互动，或者对于要为社交网络、操作或目标使用什么值没有把握，您应该首先阅读 [Google Analytics（分析）帮助中心](https://support.google.com/analytics?hl=zh-cn)中的[社交插件和社交互动简介](https://support.google.com/analytics/answer/6209874?hl=zh-cn)一文。

## 实现

可以使用 [`send`](https://developers.google.cn/analytics/devguides/collection/analyticsjs/command-queue-reference?hl=zh-cn#send) 命令并指定 `social` 类型的 [hitType](https://developers.google.cn/analytics/devguides/collection/analyticsjs/field-reference?hl=zh-cn#hitType) 来发送社交互动匹配。用于发送 `social` 匹配类型的 `send` 命令使用以下签名：

```
ga('send', 'social', [socialNetwork], [socialAction], [socialTarget], [fieldsObject]);
```

### 社交互动字段

下表简要介绍了所有社交互动字段：

| 字段名称                                     | 值类型  | 必填    | 说明                                       |
| ---------------------------------------- | ---- | ----- | ---------------------------------------- |
| [`socialNetwork`](https://developers.google.cn/analytics/devguides/collection/analyticsjs/field-reference?hl=zh-cn#socialNetwork) | text | **是** | 发生操作的网络（例如Facebook、Twitter）。             |
| [`socialAction`](https://developers.google.cn/analytics/devguides/collection/analyticsjs/field-reference?hl=zh-cn#socialAction) | text | **是** | 发生的操作类型（例如“赞”、“发送”、Tweet）。               |
| [`socialTarget`](https://developers.google.cn/analytics/devguides/collection/analyticsjs/field-reference?hl=zh-cn#socialTarget) | text | **是** | 指定社交互动的目标。此值通常是网址，但也可以是任意文字（例如http://mycoolpage.com） |

有关每个字段的更深入说明，请参阅 Google Analytics（分析）帮助中心中的[数据收集](https://support.google.com/analytics/answer/6209874?hl=zh-cn#collection)。

## 示例

以下命令向 Google Analytics（分析）发送一个社交互动匹配，表明用户针对网站 `http://myownpersonaldomain.com` 点击了 Facebook “赞”按钮。

```
ga('send', 'social', 'Facebook', 'like', 'http://myownpersonaldomain.com');

```

注意，在使用所有 `send` 命令时，通过便捷参数传递的字段也可以通过 `fieldsObject` 指定。上述命令可改写为：

```
ga('send', {
  hitType: 'social',
  socialNetwork: 'Facebook',
  socialAction: 'like',
  socialTarget: 'http://myownpersonaldomain.com'
});

```

要了解关于发送匹配的更多详情、示例和最佳做法，请参阅[向 Google Analytics（分析）发送数据](https://developers.google.cn/analytics/devguides/collection/analyticsjs/sending-hits?hl=zh-cn)指南。要详细了解 `send` 命令的调用签名，请参阅[命令队列参考](https://developers.google.cn/analytics/devguides/collection/analyticsjs/command-queue-reference?hl=zh-cn#send)。

### Facebook

如果您使用官方的 [Facebook“赞”按钮](https://developers.facebook.com/docs/plugins/like-button)且订阅了 `edge.create` 事件，则发生“赞”操作时，您会得到通知。

```
FB.Event.subscribe('edge.create', function(url) {
  ga('send', 'social', 'facebook', 'like', url);
});

```

有关详情，请参考 [Facebook JavaScript SDK](https://developers.facebook.com/docs/reference/javascript/FB.Event.subscribe)。

**请注意**：使用官方 Facebook 或 Twitter 小部件的开发者可以使用 [autotrack](https://github.com/googleanalytics/autotrack)，后者包含 [socialTracker](https://github.com/googleanalytics/autotrack#socialtracker) 插件，可自动跟踪“赞”、“Tweet”和“关注”按钮等社交互动。有关使用和安装说明，请参阅 [autotrack 文档](https://github.com/googleanalytics/autotrack)。

### Google+

默认情况下，Google Analytics（分析）会提供集成的 [+1 按钮](https://developers.google.cn/+/plugins/+1button/?hl=zh-cn)报告。也就是说，如果您在同一个网页上实现了 analytics.js 和 +1 按钮，系统就会通过网页上的每个跟踪器自动将所有 +1 互动报告为社交互动。有关 +1 分析的详细信息（包括问题排查提示），请参阅帮助中心里的[关于社交分析](https://support.google.com/analytics/answer/1683971?hl=zh-cn)。

Except as otherwise noted, the content of this page is licensed under the [Creative Commons Attribution 3.0 License](http://creativecommons.org/licenses/by/3.0/), and code samples are licensed under the [Apache 2.0 License](http://www.apache.org/licenses/LICENSE-2.0). For details, see our [Site Policies](https://developers.google.cn/terms/site-policies?hl=zh-cn). Java is a registered trademark of Oracle and/or its affiliates.

上次更新日期：九月 29, 2016