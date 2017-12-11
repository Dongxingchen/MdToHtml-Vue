# ga 对象方法参考

本参考文档介绍 `ga` 对象提供的方法。

## 方法概述

在 `analytics.js` 库加载完成后，您可以调用 `ga` 对象上的以下方法。由于这些方法并非立即可用，您应该一律使用 `ga` 命令队列的 [ready callback](https://developers.google.cn/analytics/devguides/collection/analyticsjs/command-queue-reference?hl=zh-cn#ready-callback) 来调用它们。

不要在 `readyCallback` 以外使用 `ga` 对象的方法，因为这些方法可能尚未加载。

```
var trackers = ga.getAll();
```

正确的做法是在 `readyCallback` 内使用 `ga` 对象的方法，这样可以确保这些函数已经就绪。

```
ga(function() {
  var trackers = ga.getAll();
});
```

| 方法                                       |                                     |
| ---------------------------------------- | ----------------------------------- |
| [`create([trackingId\], [cookieDomain], [name], [fieldsObject]);`](https://developers.google.cn/analytics/devguides/collection/analyticsjs/ga-object-methods-reference?hl=zh-cn#create) | **返回值**：`Tracker`使用指定字段创建一个新的跟踪器实例。 |
| [`getByName(name)`](https://developers.google.cn/analytics/devguides/collection/analyticsjs/ga-object-methods-reference?hl=zh-cn#getByName) | **返回值**：`Tracker`获取具有指定名称的跟踪器实例。    |
| [`getAll()`](https://developers.google.cn/analytics/devguides/collection/analyticsjs/ga-object-methods-reference?hl=zh-cn#getAll) | **返回值**：`Array`获取所有跟踪器实例。           |
| [`remove(name)`](https://developers.google.cn/analytics/devguides/collection/analyticsjs/ga-object-methods-reference?hl=zh-cn#remove) | **返回值**：`undefined`移除指定名称的跟踪器实例。    |

## 方法详解

### `create`

使用指定字段创建一个新的跟踪器实例。

#### 用法

```
ga.create([trackingId], [cookieDomain], [name], [fieldsObject]);
```

**请注意**：建议通过 `ga` 命令队列来调用 `create` 方法。有关详情，请参阅 [create 方法参考](https://developers.google.cn/analytics/devguides/collection/analyticsjs/command-queue-reference?hl=zh-cn#create)。

#### 参数

关于各字段的说明，请参阅[字段参考](https://developers.google.cn/analytics/devguides/collection/analyticsjs/field-reference?hl=zh-cn)。

#### 返回值

[`Tracker`](https://developers.google.cn/analytics/devguides/collection/analyticsjs/tracker-object-reference?hl=zh-cn)

#### 示例

```
// Creates a default tracker for the property UA-XXXXX-Y
// and uses automatic cookie domain configuration.
ga(function() {
  var tracker = ga.create('UA-XXXXX-Y', 'auto');
})
```

```
// Creates a tracker with the name "myTracker" for the property
// UA-XXXXX-Y, sets the cookieDomain to "example.com" and specifies
// a transport mechanism of "beacon".
ga(function() {
  var myTracker = ga.create('UA-XXXXX-Y', 'example.com', 'myTracker', {
    transport: 'beacon'
  });
});
```

------

### `getByName`

获取具有指定名称的跟踪器实例。

#### 用法

```
ga.getByName(name);
```

#### 参数

| 名称     | 类型    | 是否必需  | 说明          |
| ------ | ----- | ----- | ----------- |
| `name` | `字符串` | **是** | 要获取的跟踪器的名称。 |

#### 返回值

[`Tracker`](https://developers.google.cn/analytics/devguides/collection/analyticsjs/tracker-object-reference?hl=zh-cn)

#### 示例

```
// Gets the default tracker.
ga(function() {
  ga.getByName('t0');
});
```

```
// Gets the tracker with the name "myTracker".
ga(function() {
  ga.getByName('myTracker');
});
```

------

### `getAll`

获取所有跟踪器实例。

```
ga.getAll();
```

#### 返回值

`Array`

#### 示例

```
// Logs a list of all tracker names to the console.
ga(function() {
  var trackers = ga.getAll();
  trackers.forEach(function(tracker) {
    console.log(tracker.get('name'));
  });
});
```

------

### `remove`

移除指定名称的跟踪器实例。

#### 用法

```
ga.remove(name);
```

**请注意**：建议通过 `ga` 命令队列来调用 `remove` 方法。有关详情，请参阅 [remove 方法参考](https://developers.google.cn/analytics/devguides/collection/analyticsjs/command-queue-reference?hl=zh-cn#remove)。

#### 参数

| 名称     | 类型    | 是否必需  | 说明          |
| ------ | ----- | ----- | ----------- |
| `name` | `字符串` | **是** | 要移除的跟踪器的名称。 |

#### 返回值

`undefined`

#### 示例

```
// Removes the default tracker.
ga(function() {
  // Note that, unlike the ga command queue's remove method,
  // this method requires passing a tracker name, even when
  // removing the default tracker.
  ga.remove('t0');
});
```

```
// Removes the tracker with the name "myTracker".
ga(function() {
  ga.remove('myTracker');
});
```

Except as otherwise noted, the content of this page is licensed under the [Creative Commons Attribution 3.0 License](http://creativecommons.org/licenses/by/3.0/), and code samples are licensed under the [Apache 2.0 License](http://www.apache.org/licenses/LICENSE-2.0). For details, see our [Site Policies](https://developers.google.cn/terms/site-policies?hl=zh-cn). Java is a registered trademark of Oracle and/or its affiliates.

上次更新日期：九月 29, 2016