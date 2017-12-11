# 跟踪器对象参考

本参考介绍`跟踪器`对象提供的方法。

## 方法概述

| 方法                                       |                                          |
| ---------------------------------------- | ---------------------------------------- |
| [`get(fieldName)`](https://developers.google.cn/analytics/devguides/collection/analyticsjs/tracker-object-reference?hl=zh-cn#get) | **返回值**：`*`获取存储在跟踪器上的某个字段值。              |
| [`set(fieldName\|fieldsObject, [fieldValue\])`](https://developers.google.cn/analytics/devguides/collection/analyticsjs/tracker-object-reference?hl=zh-cn#set) | **返回值**：`undefined`在跟踪器上设置一个或一组字段/值对。    |
| [`send([hitType\], [...fields], [fieldsObject])`](https://developers.google.cn/analytics/devguides/collection/analyticsjs/tracker-object-reference?hl=zh-cn#send) | **返回值**：`undefined`向 Google Analytics（分析）发送一个匹配。 |

## 方法详解

### `get`

获取存储在跟踪器上的某个字段值。

#### 用法

```
tracker.get(fieldName);
```

#### 参数

| 名称          | 类型       | 是否必需  | 说明               |
| ----------- | -------- | ----- | ---------------- |
| `fieldName` | `string` | **是** | 字段名，指定要获取哪个字段的值。 |

#### 返回值

`*`

#### 示例

```
// Creates a default tracker.
ga('create', 'UA-XXXXX-Y', auto);

// Gets the client ID of the default tracker and logs it.
ga(function(tracker) {
  var clientId = tracker.get('clientId');
  console.log(clientId);
});
```

------

### `set`

在跟踪器上设置一个或一组字段/值对。

#### 用法

```
// Sets a single field/value pair.
tracker.set(fieldName, fieldValue);
```

```
// Sets a group of field/value pairs.
tracker.set(fieldsObject);
```

**请注意：**建议使用 `ga` 命令队列来调用 `set` 方法。有关详情，请参阅 [set 方法参考](https://developers.google.cn/analytics/devguides/collection/analyticsjs/command-queue-reference?hl=zh-cn#set)。

#### 参数

关于各字段的说明，请参阅[字段参考](https://developers.google.cn/analytics/devguides/collection/analyticsjs/field-reference?hl=zh-cn)。

#### 返回值

`undefined`

#### 示例

```
// Creates a default tracker.
ga('create', 'UA-XXXXX-Y', auto);

ga(function(tracker) {
  // Sets the page field to "/about.html".
  tracker.set('page', '/about.html');
});
```

```
// Creates a default tracker.
ga('create', 'UA-XXXXX-Y', auto);

ga(function(tracker) {
  // Sets both the page and title fields.
  tracker.set({
    page: '/about.html',
    title: 'About'
  });
});
```

------

### `send`

向 Google Analytics（分析）发送一个匹配。

#### 用法

```
tracker.send([hitType], [...fields], [fieldsObject]);
```

所发送的字段值是通过将 `...fields` 参数和 `fieldsObject` 指定的值与跟踪器中当前存储的值合并到一起得到的。

**请注意**：虽然 `...fields` 和 `fieldsObject` 中指定的值与当前匹配一起发送，但这些值不会存储在跟踪器对象上。请使用 [set](https://developers.google.cn/analytics/devguides/collection/analyticsjs/tracker-object-reference?hl=zh-cn#set) 方法来更新跟踪器。

#### 参数

可以通过 `...fields` 参数指定的字段因匹配类型而异。下表列出了与每种匹配类型对应的字段。其中未列出的匹配类型不接受 `...fields` 参数，仅接受 `fieldsObject`。

| 匹配类型       | `...fields`                              |
| ---------- | ---------------------------------------- |
| `pageview` | [`page`](https://developers.google.cn/analytics/devguides/collection/analyticsjs/field-reference?hl=zh-cn#page) |
| `event`    | [`eventCategory`](https://developers.google.cn/analytics/devguides/collection/analyticsjs/field-reference?hl=zh-cn#eventCategory)、[`eventAction`](https://developers.google.cn/analytics/devguides/collection/analyticsjs/field-reference?hl=zh-cn#eventAction)、[`eventLabel`](https://developers.google.cn/analytics/devguides/collection/analyticsjs/field-reference?hl=zh-cn#eventLabel)、[`eventValue`](https://developers.google.cn/analytics/devguides/collection/analyticsjs/field-reference?hl=zh-cn#eventValue) |
| `social`   | [`socialNetwork`](https://developers.google.cn/analytics/devguides/collection/analyticsjs/field-reference?hl=zh-cn#socialNetwork)、[`socialAction`](https://developers.google.cn/analytics/devguides/collection/analyticsjs/field-reference?hl=zh-cn#socialAction)、[`socialTarget`](https://developers.google.cn/analytics/devguides/collection/analyticsjs/field-reference?hl=zh-cn#socialTarget) |
| `timing`   | [`timingCategory`](https://developers.google.cn/analytics/devguides/collection/analyticsjs/field-reference?hl=zh-cn#timingCategory)、[`timingVar`](https://developers.google.cn/analytics/devguides/collection/analyticsjs/field-reference?hl=zh-cn#timingVar)、[`timingValue`](https://developers.google.cn/analytics/devguides/collection/analyticsjs/field-reference?hl=zh-cn#timingValue)、[`timingLabel`](https://developers.google.cn/analytics/devguides/collection/analyticsjs/field-reference?hl=zh-cn#timingLabel) |

关于各字段的说明，请参阅[字段参考](https://developers.google.cn/analytics/devguides/collection/analyticsjs/field-reference?hl=zh-cn)。

**请注意：**建议使用 `ga` 命令队列来调用 `send` 方法。有关详情，请参阅 [send 方法参考](https://developers.google.cn/analytics/devguides/collection/analyticsjs/command-queue-reference?hl=zh-cn#send)。

#### 返回值

`undefined`

#### 示例

```
// Creates a default tracker.
ga('create', 'UA-XXXXX-Y', auto);

ga(function(tracker) {
  // Sends a pageview hit.
  tracker.send('pageview');
});
```

```
// Creates a default tracker.
ga('create', 'UA-XXXXX-Y', auto);

ga(function(tracker) {
  // Sends an event hit for the tracker named "myTracker" with the
  // following category, action, and label, and sets the nonInteraction
  // field value to true.
  tracker.send('event', 'link', 'click', 'http://example.com', {
    nonInteraction: true
  });
});
```

Except as otherwise noted, the content of this page is licensed under the [Creative Commons Attribution 3.0 License](http://creativecommons.org/licenses/by/3.0/), and code samples are licensed under the [Apache 2.0 License](http://www.apache.org/licenses/LICENSE-2.0). For details, see our [Site Policies](https://developers.google.cn/terms/site-policies?hl=zh-cn). Java is a registered trademark of Oracle and/or its affiliates.

上次更新日期：二月 13, 2017