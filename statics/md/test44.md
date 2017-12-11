# 链接器

如针对 analytics.js 的[跨网域跟踪指南](https://developers.google.cn/analytics/devguides/collection/analyticsjs/cross-domain?hl=zh-cn)所述，链接器插件可简化跨网域跟踪的实现过程。

**重要提示**：您必须按照[跨网域跟踪指南](https://developers.google.cn/analytics/devguides/collection/analyticsjs/cross-domain?hl=zh-cn#ignoring_self_referrals)中的说明将所有网域加入[引荐排除](https://support.google.com/analytics/answer/2795830?hl=zh-cn)列表，才能使跨网域跟踪正常运行。

## 概览

通过在来源网域和目标网域之间共享唯一的[客户 ID](https://developers.google.cn/analytics/devguides/collection/analyticsjs/field-reference?hl=zh-cn#clientId)，实现跨网域跟踪。此流程分为两步：

1. 来源网域需要确保指向目标网域的所有网址均包含来源网域的客户 ID。
2. 目标网址需要知道在用户导航到该网址后检查该网址中是否包含客户 ID。

链接器插件通过为指向目标网域的网址添加[链接器参数](https://developers.google.cn/analytics/devguides/collection/analyticsjs/field-reference?hl=zh-cn#linkerParam)来完成此流程。链接器参数包含客户 ID 以及当前时间戳和编码在其中的浏览器元数据。时间戳和元数据可用于避免[网址共享带来的问题](https://developers.google.cn/analytics/devguides/collection/analyticsjs/cross-domain?hl=zh-cn#detecting_url_sharing)。

以下是链接器参数的示例：

```
_ga=1.199239214.1624002396.1440697407

```

在目标网域上，会提供 [`allowLinker`](https://developers.google.cn/analytics/devguides/collection/analyticsjs/field-reference?hl=zh-cn#allowLinker) 字段，其值为 `true` 时，指示 analytics.js 检查网址中的链接器参数。如果找到了链接器参数且该参数是有效的，则将提取该参数中的客户 ID 并保存。

利用链接器插件，可通过自动和手动方式向网页上的链接和表单中的网址添加链接器参数。在大部分情况下，建议采用自动方式添加链接器参数。

## 自动添加链接器参数

要在来源网域上为指向目标网域的网址设置跨网域自动链接，必须[请求](https://developers.google.cn/analytics/devguides/collection/analyticsjs/using-plugins?hl=zh-cn)链接器插件并调用其 `autoLink` 方法。

### `autoLink`

`autoLink` 方法可通过[命令队列](https://developers.google.cn/analytics/devguides/collection/analyticsjs/how-analyticsjs-works?hl=zh-cn#the_ga_command_queue)进行调用。

运行后，analytics.js 将监听对指向目标网域的链接的点击，并在导航即将开始之前，为这些链接添加链接器参数。等待用户点击链接后再添加链接器参数非常有必要，因为链接器参数的有效期只有两分钟。

如果您的网站上有指向目标网域的表单，则应指定可选的 `decorateForms` 参数并将其值设为 `true`。

#### 用法

```
ga('[trackerName.]linker:autoLink', domains, [useAnchor], [decorateForms]);

```

#### 参数

| 名称              | 类型                      | 是否必需  | 说明                                       |
| --------------- | ----------------------- | ----- | ---------------------------------------- |
| `domains`       | `Array[RexExp\|string]` | **是** | 用于匹配网址的 `hostname` 的一组字符串或正则表达式，指示应对哪些网域应用自动链接。如果传递字符串，analytics.js 将执行子字符串匹配，也就是说，`example.com` 将匹配指向 `blog.example.com` 的链接。 |
| `useAnchor`     | `boolean`               | 否     | 如果为 true，链接器参数将添加到网址的定位点部分，而非查询部分。       |
| `decorateForms` | `boolean`               | 否     | 如果为 true，链接器插件将向表单提交（指向匹配 `domain` 参数的目标网址）添加链接器参数。 |

#### 示例

```
// Loads the Linker plugin
ga('require', 'linker');

// Instructs the Linker plugin to automatically add linker parameters
// to all links and forms pointing to the domain "destination.com".
ga('linker:autoLink', ['destination.com'], false, true);

```

**请注意**：`autoLink` 方法不会向 iframe 添加链接器参数。有关在 iframe 中实现跨网域跟踪的策略，请参阅[跨网域跟踪指南](https://developers.google.cn/analytics/devguides/collection/analyticsjs/cross-domain?hl=zh-cn#iframes)。

## 手动添加链接器参数

您可以通过 `decorate` 方法，为特定的 `[`](undefined) 或 `` 元素手动添加链接器参数。只有在不使用上面介绍的 `autoLink` 方法时，才需要使用该方法。

### `decorate`

`decorate` 方法可通过[命令队列](https://developers.google.cn/analytics/devguides/collection/analyticsjs/how-analyticsjs-works?hl=zh-cn#the_ga_command_queue)进行调用。

务必尽量在导航即将开始之前才调用 decorate 方法，这一点很重要，因为链接器参数的有效期只有两分钟。多数情况下，应在事件处理程序中调用此方法。

#### 用法

```
ga('[trackerName.]linker:decorate', element, [useAnchor]);

```

#### 参数

| 名称          | 类型        | 是否必需  | 说明                                 |
| ----------- | --------- | ----- | ---------------------------------- |
| `element`   | `HTML 元素` | **是** | 要附加链接器参数的 `[`](undefined) 或 `` 元素。 |
| `useAnchor` | `boolean` | 否     | 如果为 true，链接器参数将添加到网址的定位点部分，而非查询部分。 |

#### 示例

```
// Loads the Linker plugin
ga('require', 'linker');

// Gets a reference to a link pointing to an external domain.
var destinationLink = document.getElementById('destination-link');

// Adds click handler that decorates `destinationLink`.
destinationLink.addEventListener('click', function() {
  ga('linker:decorate', destinationLink);
});

```

### `linkerParam`

除了 `decorate` 方法外，您也可以通过 [`linkerParam`](https://developers.google.cn/analytics/devguides/collection/analyticsjs/field-reference?hl=zh-cn#linkerParam) 字段，手动获取供跟踪器使用的链接器参数。

```
ga(function(tracker) {
  var linkerParam = tracker.get('linkerParam');
});

```

## 配置网站以接受链接器参数

当用户到达网址中包含链接器参数的目标网域上的网页时，analytics.js 需要知道查找该参数。

您可以在创建跟踪器时，将 [`allowLinker`](https://developers.google.cn/analytics/devguides/collection/analyticsjs/field-reference?hl=zh-cn#allowLinker) 字段设置为 `true`，从而指示目标网页查找链接器参数。

```
ga('create', 'UA-XXXXXX-X', 'auto', {
  'allowLinker': true
});

```

## 双向跨网域跟踪

在单向跨网域跟踪中，用户流的特征是：用户总是先访问来源网域，然后才转到目标网域。上文中的说明即以这类用户流作为前提假设。

如果不知道您的用户会先访问哪个网域，则必须实现双向跨网域跟踪，将每个网域都配置为来源网域或目标网域。

要实现双向跨网域跟踪，您需要对这两种网域都启用自动链接，并配置为接受链接器参数。

在 `source.com` 上：

```
ga('create', 'UA-XXXXX-Y', 'auto', {allowLinker: true});
ga('require', 'linker');
ga('linker:autoLink', ['destination.com']);

```

在 `destination.com` 上：

```
ga('create', 'UA-XXXXX-Y', 'auto', {allowLinker: true});
ga('require', 'linker');
ga('linker:autoLink', ['source.com']);

```

### 在所有网域上使用同一个代码段

为了进一步简化，您可以在 `autoLink` 方法中列出所要跟踪的所有可能的网域，从而在每个网域上使用相同的代码段：

```
ga('create', 'UA-XXXXX-Y', 'auto', {allowLinker: true});
ga('require', 'linker');
ga('linker:autoLink', ['source.com', 'destination.com']);

```

Except as otherwise noted, the content of this page is licensed under the [Creative Commons Attribution 3.0 License](http://creativecommons.org/licenses/by/3.0/), and code samples are licensed under the [Apache 2.0 License](http://www.apache.org/licenses/LICENSE-2.0). For details, see our [Site Policies](https://developers.google.cn/terms/site-policies?hl=zh-cn). Java is a registered trademark of Oracle and/or its affiliates.

上次更新日期：九月 29, 2016