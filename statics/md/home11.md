# analytics.js 的工作原理

您需要使用 analytics.js 进行的所有跟踪几乎都可以使用 `ga()` 命令队列完成。本指南介绍什么是命令队列、其工作原理以及如何执行命令来跟踪用户互动。

## `ga` 命令队列

[JavaScript 跟踪代码段](https://developers.google.cn/analytics/devguides/collection/analyticsjs/?hl=zh-cn#the_javascript_tracking_snippet)定义了一个称为“命令队列”的全局函数 `ga`。之所以称其为命令队列，是因为该函数不会立即执行其中的命令，而是将这些命令加入到队列中，将这些命令的执行被延迟 analytics.js 库加载完成后进行。

在 JavaScript 中，函数也是对象，这意味着函数中也可以包含属性。跟踪代码段在 `ga` 函数对象上定义了一个值为空数据的 `q` 属性。在 analytics.js 库尚未加载完成之前，调用 `ga()` 函数会将传递给 `ga()` 函数的参数列表附加到 `q` 数组的尾部。

例如，如果您运行跟踪代码段并立即将 `ga.q` 中的内容写入控制台日志，就会看到一个数组，其中有两个元素，分别包含已传递给 `ga()` 函数的两组参数：

```
console.log(ga.q);

// Outputs the following:
// [
//   ['create', 'UA-XXXXX-Y', 'auto'],
//   ['send', 'pageview']
// ]

```

analytics.js 加载完成后，会立即查看 `ga.q` 数组的内容并依次执行每条命令。然后，`ga()` 函数将被重新定义以立即执行之后的调用。

在这种模式下，开发者在使用 `ga()` 命令队列时无需担心 analytics.js 库是否已完成加载。该模式提供了一种类似于同步代码的简单接口，规避了异步代码的诸多复杂性。

### 将命令添加到队列

对 `ga()` 命令队列的所有调用都使用同一个签名。第一个参数，“命令”，是一个标识特定 analytics.js 方法的字符串。其他参数是要传递给该方法的参数。

特定命令所使用的方法可以是全局方法（例如 [`ga` 对象](https://developers.google.cn/analytics/devguides/collection/analyticsjs/ga-object-methods-reference?hl=zh-cn)的 `create` 方法），也可以是[跟踪对象](https://developers.google.cn/analytics/devguides/collection/analyticsjs/tracker-object-reference?hl=zh-cn)的实例方法（例如 `send`）。如果 `ga()` 命令队列收到一条它无法识别的命令，会直接将其忽略，因此，在调用 `ga()` 函数时请仔细慎重，因为这些调用几乎不可能报错。

要查看可通过命令队列执行的所有命令的详尽列表，请参阅 [`ga()` 命令队列参考](https://developers.google.cn/analytics/devguides/collection/analyticsjs/command-queue-reference?hl=zh-cn)。

### 命令参数

大多数 analytics.js 命令（及其相应方法）都接受多种不同格式的参数。这是为了便于向特定方法传递常用字段。

以下面的 JavaScript 跟踪代码段中的两条命令为例：

```
ga('create', 'UA-XXXXX-Y', 'auto');
ga('send', 'pageview');

```

在第一条命令中，`create` 接受了通过第二个、第三个和第四个可选参数指定的相应 [`trackingId`](https://developers.google.cn/analytics/devguides/collection/analyticsjs/field-reference?hl=zh-cn#trackingId)、[`cookieDomain`](https://developers.google.cn/analytics/devguides/collection/analyticsjs/field-reference?hl=zh-cn#cookieDomain) 和 [`name`](https://developers.google.cn/analytics/devguides/collection/analyticsjs/field-reference?hl=zh-cn#name) 字段。`send` 命令接受通过第二个可选参数指定的 [`hitType`](https://developers.google.cn/analytics/devguides/collection/analyticsjs/field-reference?hl=zh-cn#hitType)。

所有命令均接受普遍适用的 `fieldsObject` 参数，该这种参数可用于指定任何字段。例如，可将上述跟踪代码段中的两条命令改写为：

```
ga('create', {
  trackingId: 'UA-XXXXX-Y',
  cookieDomain: 'auto'
});
ga('send', {
  hitType: 'pageview'
});

```

要查看每个命令所允许的可选参数的详尽列表，请参阅 [`ga()` 命令队列参考](https://developers.google.cn/analytics/devguides/collection/analyticsjs/command-queue-reference?hl=zh-cn)。

## 后续步骤

阅读本指南后，您应该对如何使用 analytics.js 执行命令以及命令队列的工作原理有了相当透彻的了解。下一篇指南将介绍[如何创建跟踪器对象](https://developers.google.cn/analytics/devguides/collection/analyticsjs/creating-trackers?hl=zh-cn)。

Except as otherwise noted, the content of this page is licensed under the [Creative Commons Attribution 3.0 License](http://creativecommons.org/licenses/by/3.0/), and code samples are licensed under the [Apache 2.0 License](http://www.apache.org/licenses/LICENSE-2.0). For details, see our [Site Policies](https://developers.google.cn/terms/site-policies?hl=zh-cn). Java is a registered trademark of Oracle and/or its affiliates.

上次更新日期：九月 29, 2016