# 获取和设置跟踪器数据

要获取和设置跟踪器的字段数据有时需要拥有该跟踪器对象本身的引用。由于添加到 [`ga()` 命令队列](https://developers.google.cn/analytics/devguides/collection/analyticsjs/command-queue-reference?hl=zh-cn)的命令是异步执行的，不会返回值，而且跟踪器通常都是使用 [`create`](https://developers.google.cn/analytics/devguides/collection/analyticsjs/command-queue-reference?hl=zh-cn#create) 命令创建的，因此需要等到 `create` 命令执行之后才能获取跟踪器对象的引用。您可以通过 [ready callback](https://developers.google.cn/analytics/devguides/collection/analyticsjs/command-queue-reference?hl=zh-cn#ready-callback) 来完成这项操作。

## ready callback

[ready callback](https://developers.google.cn/analytics/devguides/collection/analyticsjs/command-queue-reference?hl=zh-cn#ready-callback) 是一个函数，您可以将其添加到 `ga()` 命令队列。当 analytics.js 库完全加载，且先前加入队列的所有命令都已执行后，系统就会立即调用此函数。

由于队列中的所有命令都是按顺序执行的，添加 `create` 命令后在队列中添加 ready callback 将确保 ready callback 的执行在跟踪器创建之后。如果在调用 ready callback 时默认跟踪器已创建，会将默认跟踪器作为第一个参数传递给此回调函数。

以下代码显示了如何访问默认跟踪器对象并将其写入控制台日志：

```
ga('create', 'UA-XXXXX-Y', 'auto');

ga(function(tracker) {
  // Logs the tracker created above to the console.
  console.log(tracker);
});

```

## 通过 ga 对象方法获取跟踪器

如果您没有使用默认跟踪器，或您在网页上使用了多个跟踪器，您可以通过一种 [`ga` 对象方法](https://developers.google.cn/analytics/devguides/collection/analyticsjs/ga-object-methods-reference?hl=zh-cn)来访问这些跟踪器。

analytics.js 库已完全加载后，会立即给 `ga` 对象本身添加更多方法。其中的两个方法 [`getByName`](https://developers.google.cn/analytics/devguides/collection/analyticsjs/ga-object-methods-reference?hl=zh-cn#getByName) 和 [`getAll`](https://developers.google.cn/analytics/devguides/collection/analyticsjs/ga-object-methods-reference?hl=zh-cn#getAll) 可用于访问跟踪器对象。

**请注意**：只有在 analytics.js 已完全加载后才能使用 [`ga` 对象方法](https://developers.google.cn/analytics/devguides/collection/analyticsjs/ga-object-methods-reference?hl=zh-cn)，因此，您应该仅在 [ready callback](https://developers.google.cn/analytics/devguides/collection/analyticsjs/command-queue-reference?hl=zh-cn#ready-callback) 中引用这些方法。

### getByName

如果要访问的跟踪器名称已知，可以使用 [`getByName`](https://developers.google.cn/analytics/devguides/collection/analyticsjs/ga-object-methods-reference?hl=zh-cn#getByName) 方法：

```
ga('create', 'UA-XXXXX-Y', 'auto', 'myTracker');

ga(function() {
  // Logs the "myTracker" tracker object to the console.
  console.log(ga.getByName('myTracker'));
});

```

### getAll

要获取所有已创建跟踪器中的一组跟踪器，请使用 [`getAll`](https://developers.google.cn/analytics/devguides/collection/analyticsjs/ga-object-methods-reference?hl=zh-cn#getAll) 方法：

```
ga('create', 'UA-XXXXX-Y', 'auto', 'tracker1');
ga('create', 'UA-XXXXX-Z', 'auto', 'tracker2');

ga(function() {
  // Logs an array of all tracker objects.
  console.log(ga.getAll());
});

```

## 获取跟踪器上存储的数据

只要拥有对跟踪器对象的引用，就可以使用其 [`get`](https://developers.google.cn/analytics/devguides/collection/analyticsjs/tracker-object-reference?hl=zh-cn#get) 方法来访问跟踪器上当前存储的任何[字段](https://developers.google.cn/analytics/devguides/collection/analyticsjs/field-reference?hl=zh-cn)值。

```
ga('create', 'UA-XXXXX-Y', 'auto');

ga(function(tracker) {
  // Logs the trackers name.
  // (Note: default trackers are given the name "t0")
  console.log(tracker.get('name'));

  // Logs the client ID for the current user.
  console.log(tracker.get('clientId'));

  // Logs the URL of the referring site (if available).
  console.log(tracker.get('referrer'));
});

```

## 更新跟踪器数据

可以使用 `set` 方法来更新跟踪器对象。可以使用跟踪器对象本身来调用跟踪器的 `set` 方法，也可以通过在 `ga()` 命令队列中添加 `set` 命令来进行调用。

由于获取跟踪器对象的引用需要使用 ready callback，推荐的方式是使用 `ga()` 命令队列来更新跟踪器。

### 使用 `ga()` 命令队列

[`set`](https://developers.google.cn/analytics/devguides/collection/analyticsjs/command-queue-reference?hl=zh-cn#set) 命令的调用方式有两种：一种是传递两个参数，一个是[字段](https://developers.google.cn/analytics/devguides/collection/analyticsjs/field-reference?hl=zh-cn)，另一个是相应的值；另一种是传递一个包含字段/值对的对象。

以下示例将默认跟踪器的 `page` 字段设为 `'/about'`：

```
ga('set', 'page', '/about');

```

下例同时设置 `page` 和 `title` 字段：

```
ga('set', {
  page: '/about',
  title: 'About Us'
});

```

### 使用已命名的跟踪器

如果您要使用已命名跟踪器而不是默认跟踪器，可以在命令字符串中传递跟踪器名称。

以下调用为名为 "myTracker" 的跟踪器设置 `page` 字段：

```
ga('myTracker.set', 'page', '/about');

```

### 通过跟踪器对象本身进行调用

如果您拥有对跟踪器对象的引用，就可以直接调用该跟踪器的 [`set`](https://developers.google.cn/analytics/devguides/collection/analyticsjs/tracker-object-reference?hl=zh-cn#set) 方法：

```
ga(function(tracker) {
  tracker.set('page', '/about');
});

```

**注意**：跟踪器对象不会自行更新。如果用户更改了窗口大小，或者页面上运行的代码更新了网址，跟踪器对象就不会自动捕获这些信息。要使跟踪器对象能够反映这些更改，您必须手动对其进行更新。

## “&”符号语法

跟踪器字段的获取和设置通常是使用字段名进行的。（要查看完整的 analytics.js 字段和名称列表，请参阅[字段参考](https://developers.google.cn/analytics/devguides/collection/analyticsjs/field-reference?hl=zh-cn)。）

获取和设置字段的另一种备用方法是通过其相应的 [Measurement Protocol 参数名](https://developers.google.cn/analytics/devguides/collection/protocol/v1/parameters?hl=zh-cn)名称来引用相应字段。

例如，以下两个 `console.log` 表达式都将文档标题写入控制台日志：

```
ga(function(tracker) {
  // Gets the title using the analytics.js field name.
  console.log(tracker.get('title'));

  // Gets the title using the measurement protocol
  // parameter name, prefixed with an ampersand.
  console.log(tracker.get('&dt'));
});

```

一般不建议使用“&”语法，应该仅在用于 Measurement Protocol 参数的 analytics.js 字段名不存在时才使用这种方式（当 Measurement Protocol 中添加了 analytics.js 中尚未实现的新功能时有时会出现这种情况）。

## 后续步骤

至此您已了解如何创建跟踪器和更新其上存储的数据，下一步将学习如何[向 Google Analytics（分析）发送数据](https://developers.google.cn/analytics/devguides/collection/analyticsjs/sending-hits?hl=zh-cn)以便进行处理。

Except as otherwise noted, the content of this page is licensed under the [Creative Commons Attribution 3.0 License](http://creativecommons.org/licenses/by/3.0/), and code samples are licensed under the [Apache 2.0 License](http://www.apache.org/licenses/LICENSE-2.0). For details, see our [Site Policies](https://developers.google.cn/terms/site-policies?hl=zh-cn). Java is a registered trademark of Oracle and/or its affiliates.

上次更新日期：九月 29, 2016