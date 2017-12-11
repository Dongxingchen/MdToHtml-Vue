# 实验

本指南将介绍如何搭配使用内容实验与 analytics.js。

## 概览

[Google Analytics（分析）内容实验框架](https://developers.google.cn/analytics/devguides/platform/features/experiments?hl=zh-cn)可帮助您测试媒体资源的几乎所有变更或变体，了解这些变更或变体是否有助于优化特定的目标（例如，提高目标达成次数或降低跳出率）。如此一来，您就可以根据变更对网站效果的直接影响来确定相应的变更是否值得实现。

本文档的目标受众为有高级需求的用户，以及想要将 Google Analytics（分析）实验与其服务集成在一起（如[实验功能参考](https://developers.google.cn/analytics/devguides/platform/features/experiments?hl=zh-cn)中所述）的开发者。

## 标准实现

如果是刚刚开始使用内容实验，您应考虑为网站使用标准实现方法。这种实验方法的大部分步骤都可在 Google Analytics（分析）网络界面中完成，并且提供可搭配 analytics.js 库使用的必需的 JavaScript 代码。

这种实现方法使用客户端重定向来向用户显示为他们选定的变体。请访问 Google Analytics（分析）帮助中心了解实验的益处以及如何在您的网站上实现实验。要了解详情，请参阅以下资料：

- [实验的好处](https://support.google.com/analytics/bin/answer.py?answer=1745147&hl=zh-cn)（帮助中心）— 概述内容实验以及通过开展这些实验可达到的目的。
- [运行实验](https://support.google.com/analytics/bin/answer.py?answer=1745154&hl=zh-cn)（帮助中心）— 了解如何准备、配置实验和跟踪实验的进度。

## 仅适用于浏览器的实现

在使用 analytics.js 时，如果实现方法中变体选择是在客户端的浏览器中进行，则可使用 [Content Experiments JavaScript API](https://developers.google.cn/analytics/devguides/collection/analyticsjs/experiments?hl=zh-cn#cxjs) 来执行大部分与为用户选择变体和存储实验值相关的工作。

当您要在使用 JavaScript 的网页上通过更改 DOM/CSS 来测试变更时，通常便可使用这种实现方法。换言之，在这种实现方法中针对每位用户的所有变体决定和变更都是在客户端的浏览器中进行。例如，您可以运行实验来测试以下元素的变体：

- 页面上的图片。
- 按钮颜色。
- 字号。
- 页面内容。

要为用户选择变体，每次将用户纳入实验时都需要执行以下步骤：

1. 使用 [experiment](https://developers.google.cn/analytics/devguides/collection/analyticsjs/experiments?hl=zh-cn#cxjs) 查询参数加载 `Content Experiments JavaScript API 客户端`，以指定页面上所运行实验的 ID。
2. 调用 [`chooseVariation`](https://developers.google.cn/analytics/devguides/collection/analyticsjs/experiments?hl=zh-cn#cxjs-choose) 方法。
3. 评估 [chooseVariation](https://developers.google.cn/analytics/devguides/collection/analyticsjs/experiments?hl=zh-cn#cxjs-choose) 方法`返回的值`，并采取相应措施（例如更改图片、按钮颜色等）。
4. 加载 analytics.js 库并向 Google Analytics（分析）发送至少一个匹配（例如网页浏览、事件等）。

**小心**：选择变体并不会向 Google Analytics（分析）发送任何数据。您需确保在选择变体后向 Google Analytics（分析）发送至少一个匹配（例如网页浏览、事件等）。

### 示例

下面是一个简单的示例，它会为每个用户选择变体并显示相应的图片。

```
<html>
<head>
<!-- 1. Load the Content Experiments JavaScript Client -->
<script src="//www.google-analytics.com/cx/api.js?experiment=YByMKfprRCStcMvK8zh1yw"></script>

<script>
  var image_variations = [
      'original.png',
      'variation1.png',
      'variation2.png'
  ]

  // 2. Choose the Variation for the User
  var variation = cxApi.chooseVariation();

  window.onload = function(){
    // 3. Evaluate the result and update the image
    exp_image = document.getElementById('hero_image');
    exp_image.src = image_variations[variation];
  }
</script>

<!-- 4. Load analytics.js and send a hit to Google Analytics -->
<script>
  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

  ga('create', 'UA-XXXXX-Y', 'auto');
  ga('send', 'pageview');

</script>
</head>
<body>
  <h1>Welcome</h1>
  <img id="hero_image"/>
  <p>Welcome to my experiment!</p>
</body>
</html>
```

## 服务器端实现

这种实现方法通常用于执行以下任务：

- 在包含动态内容的网站上运行实验。
- 测试会对您的目标造成影响的非界面变更。例如，返回给用户的数据库查询结果集。
- 将 Google Analytics（分析）实验与您的服务（例如内容管理提供者）集成。
- 使用您自己的优化平台管理实验。

在这种方法中，变体选择是在服务器上进行，但是变体最终在浏览器中向用户显示，同时 analytics.js 库也是从浏览器向 Google Analytics（分析）发送数据。因此，服务器与客户端必须协调一致，才能正确将纳入实验的用户的实验数据发送到 Google Analytics（分析）。

发送到 Google Analytics（分析）的值包括：

- **实验 ID** — 用户参与的实验的 ID。
- **选择的变体** — 向用户显示的变体的索引。

要详细了解如何确定实验 ID 和选择的变体，请参阅[实验功能参考](https://developers.google.cn/analytics/devguides/platform/features/experiments?hl=zh-cn#users)。

您可以使用 [analytics.js 集合方法](https://developers.google.cn/analytics/devguides/collection/analyticsjs/field-reference?hl=zh-cn#experiments)向 Google Analytics（分析）报告向用户显示了哪个变体。

要设置实验值，每次将用户纳入实验并向其显示变体时都需要执行以下步骤：

1. 加载 analytics.js 库。
2. 设置[ `experimentId`](https://developers.google.cn/analytics/devguides/collection/analyticsjs/field-reference?hl=zh-cn#experimentId)。
3. 将[ `experimentVariant`](https://developers.google.cn/analytics/devguides/collection/analyticsjs/field-reference?hl=zh-cn#experimentVariant) 设为所选变体。
4. 向 Google Analytics（分析）发送至少一个匹配（例如网页浏览、事件等）。

您应使用服务器逻辑来动态写入要求的 JavaScript，以便将实验 ID 和变体编号设置到最终向用户显示的页面。这可确保当变体页面在用户的浏览器中呈现时，系统会设置该用户的实验值并将实验值与来自 analytics.js 的匹配一起发送给 Google Analytics（分析）。

### 示例

通常情况下，针对每位用户您都应在服务器上确定页面上是否在运行实验，如果有，则应确定向用户显示哪个变体。不过，在下面的 PHP 示例中，为了方便起见，实验 ID 和变体编号都是在页面开头部分定义。

```
<?php
// The Id of the experiment running on the page
$experimentId = 'YByMKfprRCStcMvK8zh1yw';

// The variation chosen for the user
$chosenVariation= 2;
?>
```

在为用户选择实验 ID 和变体之后，下一步是添加一些逻辑以向设置实验值所需的 JavaScript 字符串动态地写入实验数据：

```
<html>
<head>
<script>
  // 1. Load analytics.js -->
  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

  ga('create', 'UA-XXXXX-Y', 'auto');

  // 2. Set the chosen variation for the User (Dynamically in this case) -->
<?php
<<<HTML
  ga('set', 'expId', '$experimentId');     // The id of the experiment the user has been exposed to.
  ga('set', 'expVar', '$chosenVariation'); // The index of the variation shown to the user.
HTML;
?>

  // 3. Send a pageview hit to Google Analytics.
  ga('send', 'pageview');

</script>
</head>
<!-- Begin body -->
```

PHP 脚本完成执行后，实验值会输出到页面上。当页面上的 JavaScript 在浏览器中呈现后，系统就会设置所有实验值并将它们与来自 analytics.js 库中的网页浏览匹配一起发送出去。

**注意**：设置实验值并不会发送任何数据给 Google Analytics（分析）。您需要确保在设置实验值后向 Google Analytics（分析）发送至少一个匹配（例如网页浏览、事件等）。

## Content Experiments JavaScript API 参考

Content Experiments JavaScript API 可用于：

- **为用户选择变体** — 针对客户端实现方法，此 API 可让您轻松地为新用户选择实验变体，或获取向用户展示过的变体。
- **设置为用户选择的变体** — 如果您在服务器端处理实验选择且希望从客户端向 Google Analytics（分析）报告所选择的变体，这会非常有用。
- **获取为用户选择的变体** — 检索以前为用户选择并存储的变体。

### 加载 API 客户端

要在实验页面上加载 Content Experiments JavaScript API 客户端，您应向页面添加一段 JavaScript 代码：

```
<script src="//www.google-analytics.com/cx/api.js"></script>
```

或者，您也可以使用 `experiment` 查询参数指定实验 ID 并为该实验加载信息。

```
<script src="//www.google-analytics.com/cx/api.js?experiment=YByMKfprRCStcMvK8zh1yw"></script>
```

如果计划使用 [`chooseVariation`](https://developers.google.cn/analytics/devguides/collection/analyticsjs/experiments?hl=zh-cn#cxjs-choose) 方法，您应在加载客户端时指定实验 ID。如果您从服务器端选择变体且不打算使用 `chooseVariation` 方法，则应加载客户端而不指定实验 ID，因为这可利用在浏览器中缓存脚本而获得的性能优势。

客户端会同步加载并创建名为 `cxApi` 的全局对象。开发者可使用 `cxApi` 对象来选择变体，以及设置和获取实验值。

### cxApi 对象的常量

有三个常量可用于定义常见变体：

- `cxApi.ORIGINAL_VARIATION` – 表示实验的原始内容。
- `cxApi.NO_CHOSEN_VARIATION` – 表示尚未针对用户选择任何变体。
- `cxApi.NOT_PARTICIPATING` – 表示用户未参与实验。

### cxApi 对象的方法

### chooseVariation

为用户选择变体。

如果用户已经是实验的一部分，`chooseVariation` 将返回已向用户展示过的变体编号（除非实验已结束或该变体处于停用状态，在这种情况下，该变量将返回 `cxApi.ORIGINAL_VARIATION` 以指定原始内容）。如果用户没有在实验内，它将决定是否要基于配置的参与率将用户纳入实验。如果用户在实验中，它将使用实验权重来随机为用户选择变体并将值写入 Cookie。

`chooseVariation` 可简化确定要向用户显示哪个变体的过程。无论何时它都会返回一个变体，如果用户未在实验中，它会返回 `cxApi.ORIGINAL_VARIATION`。与此相对的是，[`getChosenVariation`](https://developers.google.cn/analytics/devguides/collection/analyticsjs/experiments?hl=zh-cn#cxjs-getchosen) 会告诉您之前为用户选择的变体，包括告诉您未为用户选择任何变体或用户被排除在实验之外

**请注意**：要使用 `chooseVariation` 方法，您必须在[加载客户端](https://developers.google.cn/analytics/devguides/collection/analyticsjs/experiments?hl=zh-cn#cxjs-load)期间指定实验的 ID。

```
cxApi.chooseVariation();
```

#### 返回值

- `*Integer*` – 所选变体的索引。

#### 示例

选择要向用户显示的变体：

```
variationNumber = cxApi.chooseVariation();
```

### setChosenVariation

设置已经为纳入实验的用户选择的变体，并将值写入 Cookie。

```
cxApi.setChosenVariation(chosenVariation, opt_experimentId);
```

#### 参数

- `Integer chosenVariation` - 向用户显示的变体的索引或 `cxApi.NOT_PARTICIPATING`。
- `String opt_experimentId` - 要为之设置所选变体的实验 ID。如果未提供，将使用在加载客户端时指定的第一个实验。

#### 示例

设置为用户选择的变体：

```
cxApi.setChosenVariation(2, ‘YByMKfprRCStcMvK8zh1yw’);
```

当客户端加载期间指定了实验 ID 时设置为用户选择的变体：

```
cxApi.setChosenVariation(2);
```

### getChosenVariation

获取之前为用户选择的变体，如果有的话。

```
cxApi.getChosenVariation(opt_experimentId);
```

#### 参数

- `*String* opt_experimentId` – 要为之获取所选变体的实验 ID。如果未提供，将使用在加载客户端时指定的第一个实验。

#### 返回值

- ``Integer - 为用户所选变体的索引。如果返回 `cxApi.NO_CHOSEN_VARIATION`，表示用户未纳入新实验，您需要决定对用户执行什么操作（例如选择变体）。如果返回 `cxApi.NOT_PARTICIPATING`，表示用户是未被选中纳入实验的回访者。

#### 示例

获取为用户选择的变体：

```
variationNumber = cxApi.getChosenVariation(‘YByMKfprRCStcMvK8zh1yw’);
```

当客户端加载期间指定了实验 ID 时获取为用户选择的变体：

```
variationNumber = cxApi.getChosenVariation();
```

### 实验 Cookie

API 包括一些可自定义如何保存 Cookie 的可选调用。

### setDomainName

设置在写入实验 Cookie 时使用的域名。此值应与为 analytics.js 跟踪代码指定的值相同。

```
cxApi.setDomainName(domainName);
```

#### 参数

- `String domainName` - 要使用的域名。

### setCookiePath

设置在写入实验 Cookie 时使用的 Cookie 路径。此值应与为 analytics.js 跟踪代码指定的值相同。

```
cxApi.setCookiePath(cookiePath);
```

#### 参数

- `*String* cookiePath` – 要使用的 Cookie 路径。

### setAllowHash

设置在写入实验 Cookie 时使用的 Cookie 网域哈希设置。此值应与为 analytics.js 跟踪代码指定的值相同。

```
cxApi.setAllowHash(allowHash);
```

#### 参数

- `*Boolean* allowHash` – 是否允许网域哈希。

Except as otherwise noted, the content of this page is licensed under the [Creative Commons Attribution 3.0 License](http://creativecommons.org/licenses/by/3.0/), and code samples are licensed under the [Apache 2.0 License](http://www.apache.org/licenses/LICENSE-2.0). For details, see our [Site Policies](https://developers.google.cn/terms/site-policies?hl=zh-cn). Java is a registered trademark of Oracle and/or its affiliates.

上次更新日期：九月 29, 2016