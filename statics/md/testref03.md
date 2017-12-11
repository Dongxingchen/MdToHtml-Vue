# Model 对象参考

本参考介绍 `Model` 对象提供的方法。

## 方法概述

| 方法                                       |                                      |
| ---------------------------------------- | ------------------------------------ |
| [`get(fieldName)`](https://developers.google.cn/analytics/devguides/collection/analyticsjs/model-object-reference?hl=zh-cn#get) | **返回值**：`*`获取模型中存储的一个字段值。            |
| [`set(fieldName\|fieldsObject, [fieldValue\], [temporary])`](https://developers.google.cn/analytics/devguides/collection/analyticsjs/model-object-reference?hl=zh-cn#set) | **返回值**：`undefined`在模型上设置一个或一组字段/值对。 |

## 方法详解

### `get`

获取模型中存储的一个字段值。

#### 用法

```
model.get(fieldName);
```

#### 参数

| 名称          | 类型       | 是否必需  | 说明               |
| ----------- | -------- | ----- | ---------------- |
| `fieldName` | `string` | **是** | 字段名，指定要获取哪个字段的值。 |

#### 返回值

`*`

#### 示例

```
ga('create', 'UA-XXXXX-Y', 'auto');

ga(function(tracker) {
  // Modifies sendHitTask to log the model's "hitPayload" field.
  tracker.set('sendHitTask', function(model) {
    var hitPayload = model.get('hitPayload');
    console.log(hitPayload);
  });
});

ga('send', 'pageview');
```

------

### `set`

在模型上设置一个或一组字段/值对。

#### 用法

```
// Sets a single field/value pair.
model.set(fieldName, fieldValue, [temporary]);
```

```
// Sets a group of field/value pairs.
model.set(fieldsObject, null, [temporary]);
```

#### 参数

| 名称          | 类型        | 是否必需 | 说明                         |
| ----------- | --------- | ---- | -------------------------- |
| `temporary` | `boolean` | 否    | 如果为 `true`，则在模型上仅对当前匹配设置值。 |

关于各字段的说明，请参阅[字段参考](https://developers.google.cn/analytics/devguides/collection/analyticsjs/field-reference?hl=zh-cn)。

#### 返回值

`undefined`

#### 示例

```
ga('create', 'UA-XXXXX-Y', 'auto');

ga(function(tracker) {

  // Grabs a reference to the default sendHitTask function.
  var originalSendHitTask = tracker.get('sendHitTask');

  // Updates sendHitTask to obfuscate personally identifiable information (PII).
  tracker.set('sendHitTask', function(model) {

    var hitPayload = model.get('hitPayload')
        .replace(/%PII%/g, 'XXXXX');

    // Updates the hitPayload string for the current hit.
    model.set('hitPayload', hitPayload, true);

    originalSendHitTask(model);
  });
});

ga('send', 'pageview');
```

Except as otherwise noted, the content of this page is licensed under the [Creative Commons Attribution 3.0 License](http://creativecommons.org/licenses/by/3.0/), and code samples are licensed under the [Apache 2.0 License](http://www.apache.org/licenses/LICENSE-2.0). For details, see our [Site Policies](https://developers.google.cn/terms/site-policies?hl=zh-cn). Java is a registered trademark of Oracle and/or its affiliates.

上次更新日期：二月 13, 2017