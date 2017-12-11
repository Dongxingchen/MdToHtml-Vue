# 增强的链接归因

增强的链接归因功能会自动使用 link 元素 ID 区别单个页面上指向相同网址的多个链接，从而提高网页内分析报告的准确性。

## 用法

要使用增强的链接归因功能，请执行以下操作：

1. 在 Google Analytics（分析）帐户的管理界面中[启用增强的链接归因](https://support.google.com/analytics/answer/2558867?hl=zh-cn#enable)。
2. 在每个页面上更新跟踪代码以加载增强的链接归因插件（也称为“linkid”）。

下列代码展示了如何加载增强的链接归因插件：

```
ga('create', 'UA-XXXXX-Y', 'auto');
ga('require', 'linkid');
ga('send', 'pageview');
```

**注意**： 为了获得最准确的链接归因，页面上的每个链接都应使用唯一的元素 ID。

## 自定义增强的归因链接

增强的链接归因插件会使用链接（或父级元素）的元素 ID 和 Cookie 区分指向相同网址的链接。您可以在加载插件时提供配置选项，自定义插件在 DOM 的多大范围内查找元素 ID，以及自定义此 Cookie 的行为。

以下是可用选项及其默认值：

| 选项           | 值类型      | 默认      | 说明                                       |
| ------------ | -------- | ------- | ---------------------------------------- |
| `cookieName` | `string` | `_gali` | Cookie 的名称                               |
| `duration`   | `number` | 30      | 保存 Cookie 的时长上限（秒）                       |
| `levels`     | `number` | `3`     | 为查找现有 ID 而查看的 DOM 层级数上限。例如，以下链接中不包含 ID 属性，但（两个层级之上的）`` 元素中包含该属性：`  [Home](/)  [About](/about)  [Contact Us](/contact)`如果 `levels` 选项设为 `1`，就找不到 "sidebar" ID，链接仍将保持匿名。 |

下例显示了在使用增强的链接归因插件时如何指定自定义配置选项：

```
ga('create', 'UA-XXXXX-Y', 'auto');
ga('require', 'linkid', {
  'cookieName': '_ela',
  'duration': 45,
  'levels': 5
});
ga('send', 'pageview');
```

Except as otherwise noted, the content of this page is licensed under the [Creative Commons Attribution 3.0 License](http://creativecommons.org/licenses/by/3.0/), and code samples are licensed under the [Apache 2.0 License](http://www.apache.org/licenses/LICENSE-2.0). For details, see our [Site Policies](https://developers.google.cn/terms/site-policies?hl=zh-cn). Java is a registered trademark of Oracle and/or its affiliates.

上次更新日期：九月 29, 2016