# 展示广告功能

本指南将介绍如何使用 analytics.js 的展示广告功能插件。

## 概览

analytics.js 的展示广告功能插件可用于启用 [Google Analytics（分析）中的广告功能](https://support.google.com/analytics/answer/3450482?hl=zh-cn)，例如[再营销](https://support.google.com/analytics/answer/2611268?hl=zh-cn)、[受众特征和兴趣报告](https://support.google.com/analytics/answer/2799357?hl=zh-cn)等。

[详细了解 Google Analytics（分析）广告功能。](https://support.google.com/analytics/answer/3450482?hl=zh-cn)

## 具体实现

**注意**：现在不需要为您的网站重新添加代码，即可[启用展示广告功能](https://support.google.com/analytics/answer/2444872?hl=zh-cn)。

要启用展示广告功能插件，只需在 JavaScript 跟踪代码段中加入一行额外代码。

要加载插件，请添加一个 `require` 调用，并指定 `displayfeatures` 插件。

```
ga('create', 'UA-XXXXX-Y', 'auto');
ga('require', 'displayfeatures');
ga('send', 'pageview');
```

**注意**：请务必在创建跟踪器之后发送网页浏览之前进行 require 插件的操作。

此插件的工作原理是向 `stats.g.doubleclick.net` 发送一个额外的请求，以便提供 Google Analytics（分析）中的广告功能（例如再营销以及受众特征和兴趣报告）。该插件还会创建一个名为 `_gat` 的新 Cookie，其有效时间为 10 分钟。该 Cookie 不会存储任何用户信息，而只会用于限制发送到 `doubleclick.net` 的请求数量。

### 更改 Cookie 名称

该 Cookie 的默认名称为 `_gat`。您可以在对插件进行 require 操作时，设置 `cookieName` 选项来更改此名称。

```
ga('require', 'displayfeatures', {cookieName: 'display_features_cookie'});
```

请注意，第三个参数一般用于指定脚本的位置。由于此插件包含在 analytics.js 中，因此只需传递 `undefined` 即可。

### 使用多个跟踪器

要在有多个跟踪器的情况下使用展示广告功能插件，请在 `require` 调用的前面附加跟踪器名称，如下例所示：

```
// create a tracker named 'foo' for property UA-XXXXX-Y
ga('create', 'UA-XXXXX-Y', {name: 'foo'});
ga('foo.require', 'displayfeatures');
ga('foo.send', 'pageview');

// create a second tracker named 'bar' for a different property UA-XXXX-Z
ga('create', 'UA-XXXXX-Z', {name: 'bar'});
ga('bar.require', 'displayfeatures');
ga('bar.send', 'pageview');
```

为某个已命名的跟踪器加载展示广告功能插件会导致 Cookie 名称后面附加上跟踪器名称。上面的例子创建的 Cookie 将名为 `_gat_foo` 和 `_gat_bar`。

### 停用展示广告功能

由于可[通过 Google Analytics（分析）中“管理”下的设置启用](https://support.google.com/analytics/answer/2444872?hl=zh-cn)展示广告功能，有时您可能需要以编程方式停用该功能。

要停用所有展示广告功能，请将展示广告功能[任务](https://developers.google.cn/analytics/devguides/collection/analyticsjs/tasks?hl=zh-cn)设置为不运行：

```
ga('create', 'UA-XXXXX-Y', 'auto');
ga('set', 'displayFeaturesTask', null);
ga('send', 'pageview');
```

请注意，在上方代码中，展示广告功能插件不是必需的，因为已经在 Google Analytics（分析）中启用了展示广告功能。

Except as otherwise noted, the content of this page is licensed under the [Creative Commons Attribution 3.0 License](http://creativecommons.org/licenses/by/3.0/), and code samples are licensed under the [Apache 2.0 License](http://www.apache.org/licenses/LICENSE-2.0). For details, see our [Site Policies](https://developers.google.cn/terms/site-policies?hl=zh-cn). Java is a registered trademark of Oracle and/or its affiliates.

上次更新日期：二月 13, 2017