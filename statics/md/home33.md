# 重命名 ga 对象

在某些情况下，您可能想在网页中添加 analytics.js，但是 `ga` 变量的名称已被其他元素占用。为解决此问题，analytics.js 提供了一个重命名全局 `ga` 对象的机制。

## 在跟踪代码段中重命名全局对象

通过更改传递给 minified 函数的最终参数，您可以在 [JavaScript 跟踪代码段](https://developers.google.cn/analytics/devguides/collection/analyticsjs/?hl=zh-cn#the_javascript_tracking_snippet)中重命名全局 `ga` 对象。您还需要更新命令队列中的所有相关调用，将 `ga()` 改为您选择的名称。

例如，如果要将 `ga` 对象重命名为 `analytics`，您可以按照以下示例中的方式来更改跟踪代码段：

```
<!-- Google Analytics -->
<script>
(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','//www.google-analytics.com/analytics.js','analytics');

analytics('create', 'UA-XXXXX-Y', 'auto');
analytics('send', 'pageview');
</script>
<!-- End Google Analytics -->
```

## 手动重命名全局对象

重命名全局对象之所以可行，是因为 analytics.js 在加载时会查找一个存放在名为 `GoogleAnalyticsObject` 的全局变量中的字符串。如果找到该变量，就会使用该字符串名作为全局命令队列的新名称。

如果您要加载 analytics.js 但不想使用跟踪代码段，您仍然可以重命名该全局对象，只需在加载 analytics.js 库前在 `GoogleAnalyticsObject` 变量上设置要使用的名称即可。

例如，如果要使用 jQuery 的 `$.getScript` 方法来加载 analytics.js，您可以使用以下代码来重命名该全局对象：

```
<script>
// Instructs analytics.js to use the name `analytics`.
window.GoogleAnalyticsObject = 'analytics';

// Uses jQuery to load analytics.js instead of the tracking snippet.
$.getScript('//www.google-analytics.com/analytics.js', function() {

  // Creates a tracker and sends a pageview using the renamed command queue.
  analytics('create', 'UA-12345-1', 'auto');
  analytics('send', 'pageview');
});
</script>
```

### 备用异步跟踪代码段

与标准的 JavaScript 跟踪代码段不同，[备用异步跟踪代码段](https://developers.google.cn/analytics/devguides/collection/analyticsjs/?hl=zh-cn#alternative_async_tracking_snippet)没有为重命名全局 `ga` 对象提供默认支持。

不过，您仍然可以使用上述技术重命名全局 `ga` 对象，并同时获得备用异步跟踪代码段的预加载优势。

下面的修订版备用异步跟踪代码段将 `GoogleAnalyticsObject` 变量设置为 `analytics` 并将 `ga` 的所有实例也重命名为 `analytics`：

```
<!-- Google Analytics -->
<script>

// Instructs analytics.js to use the name `analytics`.
window.GoogleAnalyticsObject = 'analytics';

// Creates an initial analytics() function.
// The queued commands will be executed once analytics.js loads.
window.analytics = window.analytics || function() {
  (analytics.q = analytics.q || []).push(arguments)
};

// Sets the time (as an integer) this tag was executed.
// Used for timing hits.
analytics.l = +new Date;

// Creates a default tracker with automatic cookie domain configuration.
analytics('create', 'UA-12345-1', 'auto');

// Sends a pageview hit from the tracker just created.
analytics('send', 'pageview');
</script>

<!-- Sets the `async` attribute to load the script asynchronously. -->
<script async src='//www.google-analytics.com/analytics.js'></script>
<!-- End Google Analytics -->
```

Except as otherwise noted, the content of this page is licensed under the [Creative Commons Attribution 3.0 License](http://creativecommons.org/licenses/by/3.0/), and code samples are licensed under the [Apache 2.0 License](http://www.apache.org/licenses/LICENSE-2.0). For details, see our [Site Policies](https://developers.google.cn/terms/site-policies?hl=zh-cn). Java is a registered trademark of Oracle and/or its affiliates.

上次更新日期：二月 13, 2017