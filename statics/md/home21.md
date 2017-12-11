# 事件跟踪

本指南介绍如何使用 analytics.js 实现事件跟踪。

## 概览

“事件”是指用户与内容进行的互动，可以独立于网页或屏幕的加载而进行跟踪。下载、移动广告点击、小工具、Flash 元素、AJAX 嵌入式元素以及视频播放都是可以作为事件进行跟踪的操作。

如果您不熟悉 Google Analytics（分析）中的事件，则应该首先阅读 [Google Analytics（分析）帮助中心](https://support.google.com/analytics?hl=zh-cn)中的[事件简介](https://support.google.com/analytics/answer/1033068?hl=zh-cn)这篇文章。

## 实现

可以通过使用 [`send`](https://developers.google.cn/analytics/devguides/collection/analyticsjs/command-queue-reference?hl=zh-cn#send) 命令并将 [hitType](https://developers.google.cn/analytics/devguides/collection/analyticsjs/field-reference?hl=zh-cn#hitType) 指定为 `event` 来发送事件匹配。针对 `event` 匹配类型的 `send` 命令使用以下签名：

```
ga('send', 'event', [eventCategory], [eventAction], [eventLabel], [eventValue], [fieldsObject]);
```

### 事件字段

下表概述了所有事件字段：

| 字段名称                                     | 值类型     | 是否必须提供 | 说明                              |
| ---------------------------------------- | ------- | ------ | ------------------------------- |
| [`eventCategory`](https://developers.google.cn/analytics/devguides/collection/analyticsjs/field-reference?hl=zh-cn#eventCategory) | text    | **是**  | 通常是用户与之互动的对象（例如 `'Video'`）      |
| [`eventAction`](https://developers.google.cn/analytics/devguides/collection/analyticsjs/field-reference?hl=zh-cn#eventAction) | text    | **是**  | 互动类型（例如 `'play'`）               |
| [`eventLabel`](https://developers.google.cn/analytics/devguides/collection/analyticsjs/field-reference?hl=zh-cn#eventLabel) | text    | 否      | 用于对事件进行分类（例如 `'Fall Campaign'`） |
| [`eventValue`](https://developers.google.cn/analytics/devguides/collection/analyticsjs/field-reference?hl=zh-cn#eventValue) | integer | 否      | 与事件相关的数值（例如 `42`）               |

有关各个字段的详细说明，请查看 Google Analytics（分析）帮助中心中的[事件解析](https://support.google.com/analytics/answer/1033068?hl=zh-cn#Anatomy)。

## 示例：

以下命令向 Google Analytics（分析）发送一个事件，指明用户播放了秋季广告系列推广视频：

```
ga('send', 'event', 'Videos', 'play', 'Fall Campaign');

```

注意，在使用所有 `send` 命令时，通过便捷参数传递的字段也可以通过 `fieldsObject` 指定。上述命令可改写为：

```
ga('send', {
  hitType: 'event',
  eventCategory: 'Videos',
  eventAction: 'play',
  eventLabel: 'Fall Campaign'
});

```

要了解关于发送匹配的更多详情、示例和最佳做法，请参阅[向 Google Analytics（分析）发送数据](https://developers.google.cn/analytics/devguides/collection/analyticsjs/sending-hits?hl=zh-cn)指南。要详细了解 `send` 命令的调用签名，请参阅[命令队列参考](https://developers.google.cn/analytics/devguides/collection/analyticsjs/command-queue-reference?hl=zh-cn#send)。

### 出站链接和表单跟踪

如果用户点击指向您网站其他网页的链接，则在用户到达时，该网页通常发送网页浏览匹配。因为有一系列的网页浏览，Google Analytics（分析）可以在后端明确用户导航的出入位置。但是，如果用户点击了链接或向域外提交了表单，则除非您将所发生的情况明确告知 Google Analytics（分析），否则该操作不会被捕获。

可以通过发送事件以及在某个事件字段中指定目标网址来完成对出站链接和表单的跟踪。可以使用下面的事件处理函数将出站链接点击事件发送给 Google Analytics（分析）：

```
function handleOutboundLinkClicks(event) {
  ga('send', 'event', {
    eventCategory: 'Outbound Link',
    eventAction: 'click',
    eventLabel: event.target.href
  });
}

```

出站链接和表单可能会非常难于跟踪，因为大多数浏览器会在开始加载新网页时停止在当前网页上执行 JavaScript。解决此问题的一种方式是将 [`transport`](https://developers.google.cn/analytics/devguides/collection/analyticsjs/field-reference?hl=zh-cn#transport) 字段设置为 `beacon`：

```
function handleOutboundLinkClicks(event) {
  ga('send', 'event', {
    eventCategory: 'Outbound Link',
    eventAction: 'click',
    eventLabel: event.target.href,
    transport: 'beacon'
  });
}
```

对于不支持信标传输方法的浏览器，您必须推迟向下一个页面导航的操作，直到事件完成发送。[向 Google Analytics（分析）发送数据](https://developers.google.cn/analytics/devguides/collection/analyticsjs/sending-hits?hl=zh-cn)指南的[了解匹配发送时间](https://developers.google.cn/analytics/devguides/collection/analyticsjs/sending-hits?hl=zh-cn#knowing_when_the_hit_has_been_sent)一节详细介绍了操作方式。

**请注意**：希望跟踪出站链接和表单的开发者可使用 [autotrack](https://github.com/googleanalytics/autotrack)，其中提供了可为您处理这些复杂问题的 [outboundLinkTracker](https://github.com/googleanalytics/autotrack#outboundlinktracker) 和 [outboundFormTracker](https://github.com/googleanalytics/autotrack#outboundformtracker) 插件。有关使用和安装说明，请参阅 [autotrack 文档](https://github.com/googleanalytics/autotrack)。

### 非互动事件

在某些情况下，您可能需要将某个事件作为[非互动事件](https://support.google.com/analytics/answer/1033068?hl=zh-cn#NonInteractionEvents)发送。为此，请将 `send` 命令的 `fieldsObject` 中的 [`nonInteraction`](https://developers.google.cn/analytics/devguides/collection/analyticsjs/field-reference?hl=zh-cn#nonInteraction) 字段设为 `true`：

```
ga('send', 'event', 'Videos', 'play', 'Fall Campaign', {
  nonInteraction: true
});

```

要详细了解非互动匹配以及何时使用这些匹配，请参阅 Google Analytics（分析）帮助中心中的[非互动事件](https://support.google.com/analytics/answer/1033068?hl=zh-cn#NonInteractionEvents)

Except as otherwise noted, the content of this page is licensed under the [Creative Commons Attribution 3.0 License](http://creativecommons.org/licenses/by/3.0/), and code samples are licensed under the [Apache 2.0 License](http://www.apache.org/licenses/LICENSE-2.0). For details, see our [Site Policies](https://developers.google.cn/terms/site-policies?hl=zh-cn). Java is a registered trademark of Oracle and/or its affiliates.

上次更新日期：二月 13, 2017