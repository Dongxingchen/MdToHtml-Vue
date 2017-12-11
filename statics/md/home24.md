# 用户计时

本指南将介绍如何使用 analytics.js 衡量时间段。

## 概览

研究表明，减少网页加载时间可改善网站的整体用户体验。Google Analytics（分析）有许多[功能强大的报告](https://support.google.com/analytics/answer/1205784?hl=zh-cn)可自动衡量网页加载时间并生成报告。不过，您也可以通过跟踪自定义计时信息来衡量与您网站相关的特定效果信息。

用户计时功能允许开发者使用 analytics.js 库来衡量时间段。如果开发者要衡量提交 AJAX 请求和加载网页资源的延迟时间或所需时间，该功能特别有用。

## 实现

可以通过使用 [`send`](https://developers.google.cn/analytics/devguides/collection/analyticsjs/command-queue-reference?hl=zh-cn#send) 命令并将 [hitType](https://developers.google.cn/analytics/devguides/collection/analyticsjs/field-reference?hl=zh-cn#hitType) 指定为 `timing` 来发送用户计时匹配。针对 `timing` 匹配类型的 `send` 命令使用以下签名：

```
ga('send', 'timing', [timingCategory], [timingVar], [timingValue], [timingLabel], [fieldsObject]);
```

### 用户计时字段

下表对各用户计时字段进行了概要说明：

| 字段名称                                     | 值类型     | 必填    | 说明                                       |
| ---------------------------------------- | ------- | ----- | ---------------------------------------- |
| [`timingCategory`](https://developers.google.cn/analytics/devguides/collection/analyticsjs/field-reference?hl=zh-cn#timingCategory) | text    | **是** | 用于将所有用户计时变量归类到相应逻辑组的字符串（例如 `'JS Dependencies'`）。 |
| [`timingVar`](https://developers.google.cn/analytics/devguides/collection/analyticsjs/field-reference?hl=zh-cn#timingVar) | text    | **是** | 用于标识要记录的变量（例如 `'load'`）的字符串。             |
| [`timingValue`](https://developers.google.cn/analytics/devguides/collection/analyticsjs/field-reference?hl=zh-cn#timingValue) | integer | **是** | 向 Google Analytics（分析）报告的，以毫秒为单位的历时时间（例如 `20`）。 |
| [`timingLabel`](https://developers.google.cn/analytics/devguides/collection/analyticsjs/field-reference?hl=zh-cn#timingLabel) | text    | 否     | 可用于提高报告中显示用户计时数据灵活性的字符串（例如 `'Google CDN'`）。 |

## 示例：

以下命令向 Google Analytics（分析）发送用户计时匹配，指明当前网页加载其所有外部 JavaScript 依赖关系耗时 3549 毫秒：

```
ga('send', 'timing', 'JS Dependencies', 'load', 3549);

```

注意，在使用所有 `send` 命令时，通过便捷参数传递的字段也可以通过 `fieldsObject` 指定。上述命令可改写为：

```
ga('send', {
  hitType: 'timing',
  timingCategory: 'JS Dependencies',
  timingVar: 'load',
  timingValue: 3549
});

```

要了解关于发送匹配的更多详情、示例和最佳做法，请参阅[向 Google Analytics（分析）发送数据](https://developers.google.cn/analytics/devguides/collection/analyticsjs/sending-hits?hl=zh-cn)指南。要详细了解 `send` 命令的调用签名，请参阅[命令队列参考](https://developers.google.cn/analytics/devguides/collection/analyticsjs/command-queue-reference?hl=zh-cn#send)。

### 衡量时间

在发送用户计时数据时，您可以在 `timingValue` 参数中指定以毫秒为单位的时间值。编写代码捕获此时间段的工作需由您自己完成。

最简单的方法是在时间段的开头创建时间戳，然后在时间段的结尾创建另一个时间戳。然后，您可以利用两个时间戳之间的差异来计算所花费的时间。

大多数新型浏览器都支持 [Navigation Timing API](https://developer.mozilla.org/en-US/docs/Web/API/Navigation_timing_API)，该 API 中 [window.performance](https://developer.mozilla.org/en-US/docs/Web/API/Window/performance) 对象提供的一些方法可通过高精度时间数据来衡量网页性能。

下例使用了 [`performance.now()`](https://developer.mozilla.org/en-US/docs/Web/API/Performance/now) 方法，该方法返回从网页最初加载到目前为止的时长：

```
// Feature detects Navigation Timing API support.
if (window.performance) {
  // Gets the number of milliseconds since page load
  // (and rounds the result since the value must be an integer).
  var timeSincePageLoad = Math.round(performance.now());

  // Sends the timing hit to Google Analytics.
  ga('send', 'timing', 'JS Dependencies', 'load', timeSincePageLoad);
}

```

## 有关抽样的注意事项

Google Analytics（分析）会在处理过程中对计时匹配进行抽样，以确保针对此功能公平分配系统资源。

计时匹配的抽样率取决于系统针对相应媒体资源在前一天所接收到的网页浏览匹配总数。下表简要说明了计时抽样率的确定方式。

| 网页浏览匹配总数（前一天）    | 系统最多可处理的计时匹配数 |
| ---------------- | ------------- |
| 0 - 1000         | 100           |
| 1000 - 100000    | 网页浏览匹配总数的 10% |
| 100000 - 1000000 | 10000         |
| 1000000+         | 网页浏览匹配总数的 1%  |

### 限制所发送的匹配数

为避免向 Google Analytics（分析）发送得不到处理的匹配，analytics.js 通过 [`sampleRate`](https://developers.google.cn/analytics/devguides/collection/analyticsjs/field-reference?hl=zh-cn#sampleRate) 和 [`siteSpeedSampleRate`](https://developers.google.cn/analytics/devguides/collection/analyticsjs/field-reference?hl=zh-cn#siteSpeedSampleRate) 配置选项来让您控制要发送的匹配的比例。默认情况下，这两个字段分别设置为 100% 和 1%。您可以根据您的平均每日网页浏览量来调整这些数值，以使其更接近于 Google Analytics（分析）将会处理的计时匹配数。

Except as otherwise noted, the content of this page is licensed under the [Creative Commons Attribution 3.0 License](http://creativecommons.org/licenses/by/3.0/), and code samples are licensed under the [Apache 2.0 License](http://www.apache.org/licenses/LICENSE-2.0). For details, see our [Site Policies](https://developers.google.cn/terms/site-policies?hl=zh-cn). Java is a registered trademark of Oracle and/or its affiliates.

上次更新日期：二月 13, 2017