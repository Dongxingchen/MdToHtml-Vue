# 调试

本指南介绍如何使用调试版 analytics.js 库来确保您的实现方案正常工作。

## 调试版 analytics.js 库

Google Analytics（分析）提供了调试版的 analytics.js 库，它在运行时会将详细信息记入 Javascript 控制台日志。这些信息中包括命令成功执行，也包括警告和错误信息，当您的跟踪器设置有误时，这些信息可让您了解问题所在。此机制还可以对发送给 Google Analytics（分析）的每个匹配进行解析，让您了解当前跟踪的具体数据。

要启用调试版 analytics.js，您可将 JavaScript 跟踪代码段中的网址从 `https://www.google-analytics.com/analytics.js` 更改为 `https://www.google-analytics.com/analytics**_debug**.js`：

```
(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','https://www.google-analytics.com/analytics_debug.js','ga');

ga('create', 'UA-XXXXX-Y', 'auto');
ga('send', 'pageview');
```

**请注意**：调试版 analytics.js 应该仅在开发和测试阶段使用，因为该版本比 analytics.js 大得多，会让网页加载速度变慢。

### 在不发送匹配的情况下测试您的实现方案

调试版 analytics.js 也会像非调试版那样向 Google Analytics（分析）发送数据。得益于此，您可以访问运行 analytics.js 代码的网站并检查实现方案，而不会干扰到所跟踪的数据。

在特定情况下（例如在开发或测试环境中），如果您不想向 Google Analytics（分析）发送数据，则可以停用 [`sendHitTask` 任务](https://developers.google.cn/analytics/devguides/collection/analyticsjs/tasks?hl=zh-cn)，之后便不会发送任何数据。

在 localhost 上运行时，使用以下代码可阻止将任何匹配发送到 Google Analytics（分析）：

```
(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','https://www.google-analytics.com/analytics_debug.js','ga');

ga('create', 'UA-XXXXX-Y', 'auto');

if (location.hostname == 'localhost') {
  ga('set', 'sendHitTask', null);
}

ga('send', 'pageview');
```

### 跟踪调试

启用跟踪调试会向控制台输出更冗长的信息。

要启用跟踪调试，请按上述说明加载调试版 analytics.js，然后将下面这行 JavaScript 代码添加到跟踪代码段中，放在对 `ga()` 命令队列的任何调用之前。

```
window.ga_debug = {trace: true};

```

启用了跟踪调试的完整跟踪代码段如下所示：

```
(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','https://www.google-analytics.com/analytics_debug.js','ga');

window.ga_debug = {trace: true};
ga('create', 'UA-XXXXX-Y', 'auto');
ga('send', 'pageview');
```

## Chrome 扩展程序：Google Analytics Debugger

Google Analytics（分析）还提供了让您无需更改跟踪代码即可启用调试版 analytics.js 的 [Chrome 扩展程序](https://chrome.google.com/webstore/detail/google-analytics-debugger/jnkmfdileelhofjcijamephohjechhna?hl=zh-cn)。借助该扩展程序，您不仅可以调试自己的网站，还可以查看其他网站是如何利用 analytics.js 实现 Google Analytics（分析）跟踪功能的。

## Google Tag Assistant

Google Tag Assistant 是 Chrome 扩展程序，可以帮助您验证您网站上的跟踪代码，以及排查常见问题。这是一款十分理想的工具，可以帮助您在本地调试和测试您的 analytics.js 实现方案，确保一切都正确无误后，再将您的代码部署到生产环境中。

Tag Assistant 之所以能够做到这一点，是因为它让您记录了典型的用户流。它会跟踪您发送的所有匹配，检查它们是否存在任何问题，并为您提供完整的互动报告。如果 Tag Assistant 检测到任何问题或可能的改进，会通知您。

[![img](https://developers.google.cn/_static/268f0926ba/images/video-placeholder.svg?hl=zh-cn)您可能无法从当前所在的区域访问此资源。](https://www.youtube.com/watch?v=O_FFUw1tSfI)

要了解详情，请访问帮助中心，参阅 [Tag Assistant 简介](https://support.google.com/tagassistant/answer/2947093?hl=zh-cn)以及 [Tag Assistant 记录简介](https://support.google.com/analytics/answer/6277302?hl=zh-cn)。您还可以观看[此演示视频](https://ga-dev-tools.appspot.com/tag-assistant/?hl=zh-cn)，了解如何使用 Tag Assistant 发现错误和检查[跨网域跟踪](https://developers.google.cn/analytics/devguides/collection/analyticsjs/cross-domain?hl=zh-cn)等高级跟踪实现方案的有效性。

Except as otherwise noted, the content of this page is licensed under the [Creative Commons Attribution 3.0 License](http://creativecommons.org/licenses/by/3.0/), and code samples are licensed under the [Apache 2.0 License](http://www.apache.org/licenses/LICENSE-2.0). For details, see our [Site Policies](https://developers.google.cn/terms/site-policies?hl=zh-cn). Java is a registered trademark of Oracle and/or its affiliates.

上次更新日期：二月 13, 2017