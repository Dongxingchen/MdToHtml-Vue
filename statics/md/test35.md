# 任务

本指南将介绍“任务”。这是一项高级功能，用于自定义 analytics.js 验证、构造和发送 Measurement Protocol 请求的方式。

## 概览

每次调用 [`send`](https://developers.google.cn/analytics/devguides/collection/analyticsjs/command-queue-reference?hl=zh-cn#send) 命令时，analytics.js 都会执行一系列任务来验证 、构造和发送 [Measurement Protocol](https://developers.google.cn/analytics/devguides/collection/protocol/v1/?hl=zh-cn) 请求，并将其从用户的浏览器发送到 Google Analytics（分析）。下表将对其中的每项任务进行说明，任务按其执行顺序排列：

| 任务名称                  | 说明                                       |
| --------------------- | ---------------------------------------- |
| `previewTask`         | 如果网页的渲染只是用于生成 Safari 的“Top Sites”缩略图，则中止该请求。 |
| `checkProtocolTask`   | 如果网页的协议不是 `http` 或 `https`，则中止该请求。       |
| `validationTask`      | 如果必需字段缺失或无效，则中止该请求。                      |
| `checkStorageTask`    | 如果跟踪器被配置为使用 Cookie 但用户的浏览器停用了 Cookie，则中止该请求。 |
| `historyImportTask`   | 从 ga.js 和 urchin.js Cookie 导入信息，以便在网站迁移到 Universal Analytics 时保留访问者的历史记录。 |
| `samplerTask`         | 根据此跟踪器的 `sampleRate` 设置对访问者进行抽样。         |
| `buildHitTask`        | 构建 Measurement Protocol 请求字符串，并将其存储于 `hitPayload` 字段中。 |
| `sendHitTask`         | 将存储于 `hitPayload` 字段中的 Measurement Protocol 请求传输到 Google Analytics（分析）服务器。 |
| `timingTask`          | 根据此跟踪器的 `siteSpeedSampleRate` 设置，自动生成网站速度计时匹配。 |
| `displayFeaturesTask` | 如果[展示广告功能](https://developers.google.cn/analytics/devguides/collection/analyticsjs/display-features?hl=zh-cn)已启用并且尚未在展示广告功能 Cookie (_gat) 设置的超时时限内发送前一个匹配，则将发送一次额外的匹配。 |

每项任务都以 JavaScript 函数的形式实现，这些函数都接受一个模式参数作为输入信息。模式是一个简单的对象，可提供对 [Analytics.js 字段参考](https://developers.google.cn/analytics/devguides/collection/analyticsjs/field-reference?hl=zh-cn)中定义的任何字段的访问。

可以使用标准跟踪器 `[get](/analytics/devguides/collection/analyticsjs/method-reference#get)` 和 `[set](/analytics/devguides/collection/analyticsjs/method-reference#set)` 方法访问或替代任务。借助这些方法，您可以用自己的自定义函数来替换任务，也可以让您的自定义函数在现有任务之前或之后链式执行，以此来对现有功能进行补充。

## 实现

此节将介绍如何向现有任务添加新功能、用自定义代码来替换内置任务函数，或完全停用某个任务函数。

### 替换任务

要替换任务，您可以将其值 [`set`](https://developers.google.cn/analytics/devguides/collection/analyticsjs/command-queue-reference?hl=zh-cn#set) 为完成不同工作的函数。替换任务常见的原因是测试您的 analytics.js 实现时进行功能[存根](https://en.wikipedia.org/wiki/Method_stub)。

下面的代码使用将匹配负载记录到控制台的函数替换 `sendHitTask`：

```
ga('create', 'UA-XXXXX-Y', 'auto');
ga('set', 'sendHitTask', function(model) {
  console.log(model.get('hitPayload'));
});

```

**请注意**：此 [autotrack](https://github.com/googleanalytics/autotrack) 库会在测试它的插件时使用这种技术。例如 [eventTracker 测试](https://github.com/googleanalytics/autotrack/blob/0.6.1/test/event-tracker.html#L13-L22)会使用检查以确保设置了正确的事件字段的代码替换 `sendHitTask`。

### 向任务添加功能

要插入新功能，您可以让您的自定义任务函数在现有任务之前或之后链式执行。在下例中，`sendHitTask` 被一个自定义任务函数所替代，该函数会先调用原有 `sendHitTask` 函数来向 google-analytics.com/collection 发送正常请求信标，然后执行自定义代码来向本地服务器发送 Measurement Protocol 请求的副本。

```
ga('create', 'UA-XXXXX-Y', 'auto');

ga(function(tracker) {

  // Grab a reference to the default sendHitTask function.
  var originalSendHitTask = tracker.get('sendHitTask');

  // Modifies sendHitTask to send a copy of the request to a local server after
  // sending the normal request to www.google-analytics.com/collect.
  tracker.set('sendHitTask', function(model) {
    originalSendHitTask(model);
    var xhr = new XMLHttpRequest();
    xhr.open('POST', '/localhits', true);
    xhr.send(model.get('hitPayload'));
  });
});

ga('send', 'pageview');

```

### 中止任务流程

任务可以引发异常，以此来中止后续任务流程。如果会引发异常的任务在 `sendHitTask` 之前执行，则会阻止向 Google Analytics（分析）服务器发送 Measurement Protocol 请求。在下例中，我们会在用户浏览器中包含名为“testing”的 Cookie 并且其值为“true”时中止请求。

```
ga('create', 'UA-XXXXX-Y', 'auto');

ga(function(tracker) {
  var originalBuildHitTask = tracker.get('buildHitTask');
  tracker.set('buildHitTask', function(model) {
    if (document.cookie.match(/testing=true/)) {
      throw 'Aborted tracking for test user.';
    }
    originalBuildHitTask(model);
  });
});

ga('send', 'pageview');

```

### 停用某个任务

要停用任意内置任务函数，请用 null 来替换该函数。

```
ga('create', 'UA-XXXXX-Y', 'auto');
ga('set', 'checkProtocolTask', null); // Disables file protocol checking.
ga('send', 'pageview');

```

Except as otherwise noted, the content of this page is licensed under the [Creative Commons Attribution 3.0 License](http://creativecommons.org/licenses/by/3.0/), and code samples are licensed under the [Apache 2.0 License](http://www.apache.org/licenses/LICENSE-2.0). For details, see our [Site Policies](https://developers.google.cn/terms/site-policies?hl=zh-cn). Java is a registered trademark of Oracle and/or its affiliates.

上次更新日期：九月 29, 2016