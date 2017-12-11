# 异常跟踪

本指南将介绍如何使用 analytics.js 发送异常。您可以通过异常跟踪衡量网络资源上发生崩溃或错误的数量和类型。

## 实现

可以使用 [`send`](https://developers.google.cn/analytics/devguides/collection/analyticsjs/command-queue-reference?hl=zh-cn#send) 命令并将 [hitType](https://developers.google.cn/analytics/devguides/collection/analyticsjs/field-reference?hl=zh-cn#hitType) 指定为 `exception` 来发送异常匹配。`send` 命令在用于 `exception` 匹配类型时的调用签名为如下所示：

```
ga('send', 'exception', [fieldsObject]);
```

### 异常字段

下表列出了所有异常字段：

| 字段名称                                     | 值类型       | 必填   | 说明                 |
| ---------------------------------------- | --------- | ---- | ------------------ |
| [`exDescription`](https://developers.google.cn/analytics/devguides/collection/analyticsjs/field-reference?hl=zh-cn#exDescription) | text      | 否    | 对异常的说明。            |
| [`exFatal`](https://developers.google.cn/analytics/devguides/collection/analyticsjs/field-reference?hl=zh-cn#exFatal) | `boolean` | 否    | `true` 表示异常属于严重类型。 |

## 示例

以下 `try/catch` 块中封装的命令逻辑可能会出错。如果发生错误，它就会向 Google Analytics（分析）发送一个异常匹配：

```
try {
  // Runs code that may or may not work.
  window.possiblyUndefinedFunction();
} catch(err) {
  ga('send', 'exception', {
    'exDescription': err.message,
    'exFatal': false
  });
}

```

Except as otherwise noted, the content of this page is licensed under the [Creative Commons Attribution 3.0 License](http://creativecommons.org/licenses/by/3.0/), and code samples are licensed under the [Apache 2.0 License](http://www.apache.org/licenses/LICENSE-2.0). For details, see our [Site Policies](https://developers.google.cn/terms/site-policies?hl=zh-cn). Java is a registered trademark of Oracle and/or its affiliates.

上次更新日期：三月 7, 2017