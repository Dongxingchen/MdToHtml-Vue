# 创建跟踪器

跟踪器对象（也称为“跟踪器”）指的是可以收集和存储数据并将这些数据发送给 Google Analytics（分析）的对象。

在创建新的跟踪器时，您必须指定一个[跟踪 ID](https://developers.google.cn/analytics/devguides/collection/analyticsjs/field-reference?hl=zh-cn#trackingId)（与“媒体资源 ID”相同，对应于您的一个 [Google Analytics（分析）媒体资源](https://support.google.com/analytics/answer/2649554?hl=zh-cn)）和一个 [Cookie 网域](https://developers.google.cn/analytics/devguides/collection/analyticsjs/field-reference?hl=zh-cn#cookieDomain)（指定如何存储 Cookie，推荐值 `'auto'` 表示[自动配置 Cookie 网域](https://developers.google.cn/analytics/devguides/collection/analyticsjs/cookies-user-id?hl=zh-cn#automatic_cookie_domain_configuration)。）

如果指定了网域但无对应的 Cookie，将生成一个[客户端 ID](https://developers.google.cn/analytics/devguides/collection/analyticsjs/field-reference?hl=zh-cn#clientId) 并将其存储在新创建的 Cookie 中，同时将用户识别为“新”用户。如果存在包含客户端 ID 值的 Cookie，则在跟踪器中设置该客户端 ID，并将该用户识别为“回访”用户。

创建后，跟踪器对象还会收集关于当前浏览上下文的信息（例如页面标题和网址）、关于设备的信息（例如屏幕分辨率、视口尺寸）以及文档编码。当需要向 Google Analytics（分析）发送数据时，会将跟踪器对象中当前存储的所有信息发送出去。

## create 方法

analytics.js 库提供了创建跟踪器的各种方式，最常见的方式是使用 [`create`](https://developers.google.cn/analytics/devguides/collection/analyticsjs/command-queue-reference?hl=zh-cn#create) 命令，并将[跟踪 ID](https://developers.google.cn/analytics/devguides/collection/analyticsjs/field-reference?hl=zh-cn#trackingId) 和 [Cookie 网域](https://developers.google.cn/analytics/devguides/collection/analyticsjs/field-reference?hl=zh-cn#cookieDomain)字段分别作为第二个和第三个参数传递给该命令：

```
ga('create', 'UA-XXXXX-Y', 'auto');

```

### 给跟踪器命名

您还可以选择给跟踪器命名，方法是将 [name](https://developers.google.cn/analytics/devguides/collection/analyticsjs/field-reference?hl=zh-cn#name) 字段作为第四个参数传递给 `create` 命令。如果您要为相同页面创建多个跟踪器，就需要对跟踪器进行命名。详细原因，请参阅下面的[使用多个跟踪器](https://developers.google.cn/analytics/devguides/collection/analyticsjs/creating-trackers?hl=zh-cn#working_with_multiple_trackers)部分。

```
ga('create', 'UA-XXXXX-Y', 'auto', 'myTracker');

```

在未设置 `name` 字段的情况下创建的跟踪器也称为“默认”跟踪器。默认跟踪器具有内部名称“t0”。

### 在创建时指定字段值

您还可以选择传递[字段对象](https://developers.google.cn/analytics/devguides/collection/analyticsjs/field-reference?hl=zh-cn)，通过这种方式可以在创建时设置任何 analytics.js 字段，以便将这些字段存储在跟踪器中并应用于所有要发送的匹配。

```
ga('create', 'UA-XXXXX-Y', 'auto', 'myTracker', {
  userId: '12345'
});

```

和对 `ga()` 函数的所有调用一样，也可使用[字段对象](https://developers.google.cn/analytics/devguides/collection/analyticsjs/field-reference?hl=zh-cn)来同时指定所有字段：

```
ga('create', {
  trackingId: 'UA-XXXXX-Y',
  cookieDomain: 'auto',
  name: 'myTracker',
  userId: '12345'
});

```

请参阅 [`create`](https://developers.google.cn/analytics/devguides/collection/analyticsjs/command-queue-reference?hl=zh-cn#create) 方法参考，了解更为全面的详细信息。

## 使用多个跟踪器对象

在一些情况下，您可能想要从单个页面发送数据到多个媒体资源。这对由多名负责人分别管理各个版块的网站非常有用；每名负责人都可以查看自己的媒体资源。

要为两个不同的媒体资源跟踪数据，需要创建两个不同的跟踪器，至少其中一个必须是已命名的跟踪器。以下两条命令创建了一个默认跟踪器和一个名为“clientTracker”的跟踪器：

```
ga('create', 'UA-XXXXX-Y', 'auto');
ga('create', 'UA-XXXXX-Z', 'auto', 'clientTracker');

```

### 针对特定跟踪器执行命令

要针对特定跟踪器执行 analytics.js 命令，需要用跟踪器名和句点给命令名添加前缀。如果不指定跟踪器名，命令就针对默认跟踪器执行。

要为上述两个跟踪器发送网页浏览量数据，需要执行以下两条命令：

```
ga('send', 'pageview');
ga('clientTracker.send', 'pageview');

```

以后发布的指南会详细介绍执行特定命令的语法。您也可以参阅[命令队列参考](https://developers.google.cn/analytics/devguides/collection/analyticsjs/command-queue-reference?hl=zh-cn)，了解所有 analytics.js 命令的详尽语法。

## 后续步骤

创建跟踪器后，您可能需要访问存储在该跟踪器对象中的数据。下一篇指南介绍如何[获取和设置跟踪器数据](https://developers.google.cn/analytics/devguides/collection/analyticsjs/accessing-trackers?hl=zh-cn)。

Except as otherwise noted, the content of this page is licensed under the [Creative Commons Attribution 3.0 License](http://creativecommons.org/licenses/by/3.0/), and code samples are licensed under the [Apache 2.0 License](http://www.apache.org/licenses/LICENSE-2.0). For details, see our [Site Policies](https://developers.google.cn/terms/site-policies?hl=zh-cn). Java is a registered trademark of Oracle and/or its affiliates.

上次更新日期：二月 13, 2017