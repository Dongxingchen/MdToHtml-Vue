# 自定义维度和指标

本指南将介绍如何使用 analytics.js 发送自定义的维度和指标。

## 概览

使用自定义维度和指标是向 Google Analytics（分析）发送自定义数据的有效方式。网络开发者可以使用自定义维度和指标来细分并衡量登录和退出的用户之间、网页作者之间、游戏中的关卡之间或页面上存在的任何其他业务数据之间的差异。

有关此功能工作方式的完整概述，请阅读[自定义维度和指标功能参考](https://support.google.com/analytics/answer/2709828?hl=zh-cn)。

您可以使用以下任意一个值（或两个一起用）发送自定义维度和指标数据：

| 字段名称            | 值类型     | 是否必须提供 | 说明                                       |
| --------------- | ------- | ------ | ---------------------------------------- |
| dimension[0-9]+ | text    | 否      | 维度索引。每个自定义维度都有关联的索引。自定义维度最多可以有 20 个（Premium 帐户为 200 个）。索引后缀必须是大于 0 的正整数（如 dimension3）。 |
| metric[0-9]+    | integer | 否      | 指标索引。每个自定义指标都有关联的索引。自定义指标最多可以有 20 个（Premium 帐户为 200 个）。索引后缀必须是大于 0 的正整数（如 metric5）。 |

## 实现

您必须先通过 Google Analytics（分析）界面配置自定义维度或指标。配置完成后，系统会向自定义维度或指标分配用于识别并将其与其他自定义维度或指标区分开来的专属索引。然后，您可在 analytics.js 库中使用索引来发送特定自定义维度或指标的数据。

要了解如何配置自定义维度或指标，请参阅 Google Analytics（分析）帮助中心中的[创建和修改自定义维度和指标](https://support.google.com/analytics/answer/2709828?hl=zh-cn)。

### 发送数据

自定义维度或指标数据只能与现有的匹配一起发送。例如，要为 `pageview` 类型的匹配发送索引为 `15` 的自定义维度，您应使用：

```
ga('send', 'pageview', {
  'dimension15':  'My Custom Dimension'
});

```

要为 `event` 类型的匹配发送索引为 `18` 的自定义指标，您应使用：

```
ga('send', 'event', 'category', 'action', {
  'metric18': 8000
});

```

如果为自定义指标配置了货币类型，您可以发送小数值：

```
ga('send', 'event', 'category', 'action', {
  'metric19': 24.99
});

```

在某些情况下，您可能想要将某个自定义维度或指标与指定网页上的所有匹配一起发送（或在跟踪器对象的整个生命周期内始终发送）。在这类情况下，您可以使用 `set` 命令设置自定义维度或指标：

```
ga('set', 'dimension5', 'custom data');

```

要使用 `set` 同时设置维度和指标的值，您可以使用以下代码：

```
ga('set', {
  'dimension5': 'custom dimension data',
  'metric5': 'custom metric data'
});

```

如需了解发送此数据所需的具体格式，请参阅“字段参考”文档中的[“自定义维度和指标”部分](https://developers.google.cn/analytics/devguides/collection/analyticsjs/field-reference?hl=zh-cn#customs)。

## 示例

如果您的内容网站上有许多作者，便非常适合使用自定义维度。作为分析师，您可能想了解哪些作者的内容最受欢迎。要获得这个问题的答案，您可以查看按作者比较网页浏览量的报告。虽然Google Analytics（分析）默认并不提供作者数据，但您可以将此数据作为一项自定义维度与要跟踪的每个网页浏览一起发送。

此解决方案的第一步是，在管理界面中配置一个新的自定义维度。维度名称应为`author`，范围类型应为`hit`。配置完成后，系统将为新的自定义维度分配一个索引。对于本示例，我们假设该索引为`5`。

在配置`author`自定义维度并为其指定索引后，现在我们可以将其搭配analytics.js库来使用，以一个自定义维度的形式发送作者数据。例如，如果您的网页是以PHP编写，网页的实际作者可能会存储在PHP变量（如`$author`）中。在 PHP 模板内，您可以使用此作者变量将作者值传给自定义维度：

```
ga('send', 'pageview', {
  'dimension5': '<?=$author?>'
});

```

[mediaQueryTracker](https://github.com/googleanalytics/autotrack#mediaquerytracker) 插件（随 [autotrack](https://github.com/googleanalytics/autotrack) 库一起提供）使用自定义维度以允许用户定义并跟踪其网站上媒体查询的使用情况。有关使用和安装说明，请参阅 [autotrack 文档](https://github.com/googleanalytics/autotrack)。

Except as otherwise noted, the content of this page is licensed under the [Creative Commons Attribution 3.0 License](http://creativecommons.org/licenses/by/3.0/), and code samples are licensed under the [Apache 2.0 License](http://www.apache.org/licenses/LICENSE-2.0). For details, see our [Site Policies](https://developers.google.cn/terms/site-policies?hl=zh-cn). Java is a registered trademark of Oracle and/or its affiliates.

上次更新日期：二月 13, 2017