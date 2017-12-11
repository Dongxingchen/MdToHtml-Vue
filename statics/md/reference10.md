# ga 命令队列参考

`ga()` 命令队列提供了一个接口，几乎所有需要利用 analytics.js 库来执行的任务都可以通过该接口完成。

[JavaScript 跟踪代码段](https://developers.google.cn/analytics/devguides/collection/analyticsjs?hl=zh-cn)定义了初始的 `ga()` 命令队列函数，您甚至可以在 analytics.js 库完全加载之前使用该函数。analytics.js 库一旦加载完成，命令队列中的所有命令就会按其在队列中的顺序依次执行。这些命令执行完成后，新添加到命令队列中的命令就会立即执行。

**请注意**：JavaScript 跟踪代码段允许重命名 `ga()` 命令队列函数。如果您进行了重命名，请确保在从此网站中复制的所有代码中引用相应的新名称。

为了让跟踪代码段尽可能小，`ga()` 命令队列以重载方式接受多种不同格式的参数。本文详细介绍调用 `ga()` 命令队列函数的各种方式。

| 函数签名                                     |                                          |
| ---------------------------------------- | ---------------------------------------- |
| [`ga(command, [...fields\], [fieldsObject])`](https://developers.google.cn/analytics/devguides/collection/analyticsjs/command-queue-reference?hl=zh-cn#adding-commands-to-the-queue) | 使用下列函数签名来调用 `ga()` 命令队列会将命令加入队列，以便在库载入后调度执行。 |
| [`ga(readyCallback)`](https://developers.google.cn/analytics/devguides/collection/analyticsjs/command-queue-reference?hl=zh-cn#ready-callback) | 如果在调用 `ga()` 命令队列函数时向其传递一个函数，会将该函数的执行安排在队列中的下一位置。由于只有在 analytics.js 库完全载入之后才能执行命令，向命令队列传递函数最常见的情况是指定回调函数，以便在 analytics.js 库完全载入和可用时调用。 |

## 将命令添加到队列

使用下列函数签名来调用 `ga()` 命令队列会将命令加入队列，以便在库载入后调度执行。

#### 用法

```
ga(command, [...fields], [fieldsObject])
```

#### 参数

| 名称                                       | 类型       | 是否必需  | 说明                                       |
| ---------------------------------------- | -------- | ----- | ---------------------------------------- |
| [`command`](https://developers.google.cn/analytics/devguides/collection/analyticsjs/command-queue-reference?hl=zh-cn#method-details) | `string` | **是** | 一个标识符，代表要添加到队列中的命令。该标识符由三部分组成（前两部分不是必需的）：`[trackerName.][pluginName:]methodName``trackerName`跟踪器的名称，将针对该跟踪器调用要执行的命令。如果未指定跟踪器名称，则针对默认跟踪器调用相应的命令。`pluginName`已请求的 analytics.js 插件的名称。如果指定了`pluginName`，则 `methodName` 必须为该插件提供的方法。`methodName`要调度执行的方法。 如果未指定插件名，则此方法必须为下面所列的[命令方法](https://developers.google.cn/analytics/devguides/collection/analyticsjs/command-queue-reference?hl=zh-cn#method-details)之一。 |
| `...fields`                              | `*`      | 否     | 一个或多个可选便捷参数，用于快速指定常用字段。允许的参数个数和具体字段根据调用的具体方法而异。 |
| `fieldsObject`                           | `对象`     | 否     | 用于指定 `fields` 参数中未指定的其余值的对象。如果 `fields` 参数和 `fieldsObject` 中均设置了某个字段，将使用 `fieldsObject` 中的值。 |

关于各字段的说明，请参阅[字段参考](https://developers.google.cn/analytics/devguides/collection/analyticsjs/field-reference?hl=zh-cn)。

#### 示例

要查看各个命令的示例，请参阅[命令方法](https://developers.google.cn/analytics/devguides/collection/analyticsjs/command-queue-reference?hl=zh-cn#method-details)部分。

## 回调函数准备就绪

如果在调用 `ga()` 命令队列函数时向其传递一个函数，会将该函数的执行安排在队列中的下一位置。

由于只有在 analytics.js 库完全载入之后才能执行命令，向命令队列传递函数最常见的情况是指定回调函数，以便在 analytics.js 库完全载入和可用时调用。

#### 用法

```
ga(readyCallback)
```

#### 参数

| 名称              | 类型   | 是否必需  | 说明                                       |
| --------------- | ---- | ----- | ---------------------------------------- |
| `readyCallback` | `函数` | **是** | 要在库完全载入并可与之交互时调用的回调函数。调用此函数时以默认跟踪器作为第一个参数。如果尚未创建默认跟踪器，第一个参数将为 `undefined`。请注意：在调用此回调函数时，所有 [`ga` 对象方法](https://developers.google.cn/analytics/devguides/collection/analyticsjs/ga-object-methods-reference?hl=zh-cn)均已可供使用。 |

#### 示例

```
// Queues a tracker object for creation.
ga('create', 'UA-XXXXX-Y', 'auto');

// Once the tracker has been created, log the
// client ID to the console.
ga(function(tracker) {
  console.log(tracker.get('clientId'));
});
```

```
// Queues a named tracker object for creation.
ga('create', 'UA-XXXXX-Y', 'auto', 'myTracker');

// When there is no default tracker, the first
// argument of the ready callback is `undefined`.
ga(function(tracker) {
  console.log(tracker); // Logs `undefined`.
});
```

## 命令方法详情

下面列出了可以传递给 `ga()` 命令队列的所有方法（不包括插件方法）。

### `create`

使用指定字段创建一个新的跟踪器实例。

#### 用法

```
ga('create', [trackingId], [cookieDomain], [name], [fieldsObject]);
```

#### 参数

关于各字段的说明，请参阅[字段参考](https://developers.google.cn/analytics/devguides/collection/analyticsjs/field-reference?hl=zh-cn)。

#### 返回值

`undefined`

#### 示例

```
// Creates a default tracker for the Property UA-XXXXX-Y
// and uses automatic cookie domain configuration.
ga('create', 'UA-XXXXX-Y', 'auto');
```

```
// Creates a tracker with the name "myTracker" for the Property
// UA-XXXXX-Y, sets the cookieDomain to "example.com", and specifies
// a transport mechanism of "beacon".
ga('create', 'UA-XXXXX-Y', 'example.com', 'myTracker', {
  transport: 'beacon'
});
```

**重要提示**：不可以在 create 调用的方法部分指定跟踪器名称。例如，`ga('myTracker.create', 'UA-XXXXX-Y`)` 不可行。

要详细了解如何创建跟踪器，请阅读[创建跟踪器](https://developers.google.cn/analytics/devguides/collection/analyticsjs/creating-trackers?hl=zh-cn)指南。

------

### `send`

向 Google Analytics（分析）发送一个匹配。

#### 用法

```
ga('[trackerName.]send', [hitType], [...fields], [fieldsObject]);
```

所发送的字段值是通过将 `...fields` 参数和 `fieldsObject` 指定的值与跟踪器中当前存储的值合并到一起得到的。

**请注意**：虽然 `...fields` 和 `fieldsObject` 中指定的值与当前匹配一起发送，但这些值不会存储在跟踪器对象上。请使用 [set](https://developers.google.cn/analytics/devguides/collection/analyticsjs/command-queue-reference?hl=zh-cn#set) 方法来更新跟踪器。

#### 参数

可以通过 `...fields` 参数指定的字段因匹配类型而异。下表列出了与每种匹配类型对应的字段。其中未列出的匹配类型不接受 `...fields` 参数，仅接受 `fieldsObject`。

| 匹配类型       | `...fields`                              |
| ---------- | ---------------------------------------- |
| `pageview` | [`page`](https://developers.google.cn/analytics/devguides/collection/analyticsjs/field-reference?hl=zh-cn#page) |
| `event`    | [`eventCategory`](https://developers.google.cn/analytics/devguides/collection/analyticsjs/field-reference?hl=zh-cn#eventCategory)、[`eventAction`](https://developers.google.cn/analytics/devguides/collection/analyticsjs/field-reference?hl=zh-cn#eventAction)、[`eventLabel`](https://developers.google.cn/analytics/devguides/collection/analyticsjs/field-reference?hl=zh-cn#eventLabel)、[`eventValue`](https://developers.google.cn/analytics/devguides/collection/analyticsjs/field-reference?hl=zh-cn#eventValue) |
| `social`   | [`socialNetwork`](https://developers.google.cn/analytics/devguides/collection/analyticsjs/field-reference?hl=zh-cn#socialNetwork)、[`socialAction`](https://developers.google.cn/analytics/devguides/collection/analyticsjs/field-reference?hl=zh-cn#socialAction)、[`socialTarget`](https://developers.google.cn/analytics/devguides/collection/analyticsjs/field-reference?hl=zh-cn#socialTarget) |
| `timing`   | [`timingCategory`](https://developers.google.cn/analytics/devguides/collection/analyticsjs/field-reference?hl=zh-cn#timingCategory)、[`timingVar`](https://developers.google.cn/analytics/devguides/collection/analyticsjs/field-reference?hl=zh-cn#timingVar)、[`timingValue`](https://developers.google.cn/analytics/devguides/collection/analyticsjs/field-reference?hl=zh-cn#timingValue)、[`timingLabel`](https://developers.google.cn/analytics/devguides/collection/analyticsjs/field-reference?hl=zh-cn#timingLabel) |

关于各字段的说明，请参阅[字段参考](https://developers.google.cn/analytics/devguides/collection/analyticsjs/field-reference?hl=zh-cn)。

#### 返回值

`undefined`

#### 示例

```
// Sends a pageview hit.
ga('send', 'pageview');
```

```
// Sends an event hit for the tracker named "myTracker" with the
// following category, action, and label, and sets the nonInteraction
// field value to true.
ga('send', 'event', 'link', 'click', 'http://example.com', {
  nonInteraction: true
});
```

要详细了解如何发送匹配数据，请参阅[向 Google Analytics（分析）发送数据](https://developers.google.cn/analytics/devguides/collection/analyticsjs/sending-hits?hl=zh-cn)指南。

------

### `set`

在跟踪器对象上设置一个或一组字段/值对。

#### 用法

```
// Sets a single field and value.
ga('[trackerName.]set', fieldName, fieldValue);
```

```
// Sets a group of field/value pairs.
ga('[trackerName.]set', fieldsObject);
```

#### 参数

关于各字段的说明，请参阅[字段参考](https://developers.google.cn/analytics/devguides/collection/analyticsjs/field-reference?hl=zh-cn)。

#### 返回值

`undefined`

#### 示例

```
// Sets the page field to "/about.html".
ga(set, 'page', '/about.html');
```

```
// Sets the page field to "/about.html" and the title to "About".
ga(set, {
  page: '/about.html',
  title: 'About'
});
```

要详细了解如何更新跟踪器，请参阅[获取和设置跟踪器数据](https://developers.google.cn/analytics/devguides/collection/analyticsjs/accessing-trackers?hl=zh-cn)指南。

------

### `require`

请求一个 analytics.js 插件。

#### 用法

```
ga('[trackerName.]require', pluginName, [pluginOptions]);
```

#### 参数

| 名称              | 类型       | 是否必需  | 说明                                       |
| --------------- | -------- | ----- | ---------------------------------------- |
| `pluginName`    | `string` | **是** | 要请求的插件的名称。**请注意**：如果该插件不是官方提供的 analytics.js 插件，则必须在网页上其他位置[提供](https://developers.google.cn/analytics/devguides/collection/analyticsjs/command-queue-reference?hl=zh-cn#provide)该插件。 |
| `pluginOptions` | `对象`     | 否     | 将在初始化时传递给插件构造函数的初始化对象。                   |

#### 返回值

`undefined`

#### 示例

```
// Requires the Enhanced Ecommerce plugin.
ga('require', 'ec');
```

```
// Requires the Display Features plugin for the tracker
// named "myTracker" and override its default cookie name.
ga('myTracker.require', 'displayfeatures', {
  cookieName: 'display_features_cookie'
});
```

要详细了解如何请求 analytics.js 插件，请参阅[使用插件](https://developers.google.cn/analytics/devguides/collection/analyticsjs/using-plugins?hl=zh-cn)指南。

------

### `provide`

提供一个 analytics.js 插件及其方法，以便在 `ga()` 命令队列中使用。

```
ga('provide', pluginName, pluginConstuctor);
```

**请注意**：与大多数 `ga()` 队列方法不同，provide 不使用跟踪器名称。

#### 参数

| 名称                 | 类型       | 是否必需  | 说明                                       |
| ------------------ | -------- | ----- | ---------------------------------------- |
| `pluginName`       | `string` | **是** | 所提供的插件的名称。此名称必须与 [require](https://developers.google.cn/analytics/devguides/collection/analyticsjs/command-queue-reference?hl=zh-cn#require) 调用使用的名称相同。 |
| `pluginConstuctor` | `函数`     | **是** | 构造函数，其中提供了插件的所有逻辑和方法。此构造函数将通过 [require](https://developers.google.cn/analytics/devguides/collection/analyticsjs/command-queue-reference?hl=zh-cn#require) 方法中指定的 `pluginsOptions` 对象调用。 |

#### 示例

```
// Defines a plugin constructor
function MyPlugin(tracker, options) {
  // ...
}

// Provides the plugin for use with the ga() command queue.
ga('provide', 'myplugin', MyPlugin);
```

要详细了解如何提供 analytics.js 插件，请参阅[编写插件](https://developers.google.cn/analytics/devguides/collection/analyticsjs/writing-plugins?hl=zh-cn)指南。

------

### `remove`

移除一个跟踪器对象。

#### 用法

```
ga('[trackerName.]remove');
```

#### 示例

```
// Remove the default tracker.
ga('remove');
```

```
// Remove the  tracker named "myTracker".
ga('myTracker.remove');
```

Except as otherwise noted, the content of this page is licensed under the [Creative Commons Attribution 3.0 License](http://creativecommons.org/licenses/by/3.0/), and code samples are licensed under the [Apache 2.0 License](http://www.apache.org/licenses/LICENSE-2.0). For details, see our [Site Policies](https://developers.google.cn/terms/site-policies?hl=zh-cn). Java is a registered trademark of Oracle and/or its affiliates.

上次更新日期：九月 29, 2016