# Google Analytics（分析）Cookie 在网站上的用法

本文档将介绍 Google Analytics（分析）如何使用 Cookie 来衡量网站上的用户互动。

## 概览

Google Analytics（分析）是一款简单易用的工具，可以帮助网站所有者衡量用户与网站内容的互动情况。当用户浏览各个网页时，Google Analytics（分析）向网站所有者提供 JavaScript 代码（库），用来记录与用户查看的网页相关的信息（例如网页的网址）。Google Analytics（分析）JavaScript 库使用 [HTTP Cookie](https://en.wikipedia.org/wiki/HTTP_cookie) 记录用户在之前查看的网页上执行的操作或与网站进行的互动。

**重要提示**：如需详细了解 Google Analytics（分析）所收集的数据，请参阅 [Google Analytics（分析）隐私权](https://www.google.com/analytics/learn/privacy.html?hl=zh-cn)文档。

Google Analytics（分析）支持使用两种 JavaScript 库（代码）来衡量网站使用情况：[analytics.js](https://developers.google.cn/analytics/devguides/collection/analyticsjs/?hl=zh-cn) 和 [ga.js](https://developers.google.cn/analytics/devguides/collection/gajs/?hl=zh-cn)。下文说明了两种库如何使用 Cookie。

## analytics.js - Cookie 用法

[analytics.js JavaScript 库](https://developers.google.cn/analytics/devguides/collection/analyticsjs/?hl=zh-cn)是 [Universal Analytics](https://support.google.com/analytics/bin/answer.py?answer=2790010&hl=zh-cn) 的一部分，使用第一方** Cookie 来执行以下操作：

- 区分唯一身份用户
- 限制要求率

在使用[推荐的 JavaScript 代码段](https://developers.google.cn/analytics/devguides/collection/analyticsjs/?hl=zh-cn)的情况下，analytics.js 会在它能够设置的最高一级网域上设置 Cookie。 例如，如果您的网站地址为 `blog.example.co.uk`，analytics.js 会将 Cookie 网域设置为 `.example.co.uk`。尽可能在最高一级网域上设置 Cookie 让您无需额外配置即可跟踪所有子网域上的用户。

**注意**：analytics.js 并不需要通过设置 Cookie 来向 Google Analytics（分析）传输数据。

analytics.js 设置了以下 Cookie：

| Cookie 名称   | 有效期       | 说明                                       |
| ----------- | --------- | ---------------------------------------- |
| `_ga`       | 2 年       | 用于区分用户。                                  |
| `_gid`      | 24 小时     | 用于区分用户。                                  |
| `_gat`      | 1 分钟      | 用于限制要求率。                                 |
| `AMP_TOKEN` | 30 秒至 1 年 | 包含可用于从 AMP Client ID 服务检索 Client ID 的令牌。其他可能的值表示选择停用、正在进行的请求或从 AMP Client ID 服务检索 Client ID 时出错。 |
| `_gac_`     | 90 天      | 包含用户的广告系列相关信息。如果您已将 Google Analytics（分析）帐号与 AdWords 帐号相关联，AdWords 网站转化跟踪代码会读取此 Cookie，除非您选择停用此功能。 [了解详情](https://support.google.com/adwords/answer/7521212?hl=zh-cn)。 |

### 自定义

如需了解自定义这些默认设置的所有方式，请参阅 analytics.js[“网域和 Cookie”开发者指南](https://developers.google.cn/analytics/devguides/collection/analyticsjs/domains?hl=zh-cn)。

如需详细了解 Universal Analytics 与 Cookie，请参阅 [Universal Analytics 中的安全和隐私权问题](https://support.google.com/analytics/bin/answer.py?answer=2838718&hl=zh-cn)文档。

## ga.js - Cookie 用法

[ga.js JavaScript 库](https://developers.google.cn/analytics/devguides/collection/gajs/?hl=zh-cn)使用**第一方 Cookie 来执行以下操作：

- 确定要衡量的具体网域
- 区分唯一身份用户
- 限制要求率
- 记录之前访问的次数和时间
- 记录流量来源信息
- 确定会话的开始和结束
- 记录访问者一级自定义变量的值

默认情况下，这个库会在 `document.host` 浏览器属性中指定的网域上设置 Cookie，并将 Cookie 路径设置为根级别 `(/)`。

此库会设置以下 Cookie：

| Cookie名称 | 默认有效期        | 说明                                       |
| -------- | ------------ | ---------------------------------------- |
| `__utma` | 设置/更新后 2 年   | 用于区分用户和会话。在 JavaScript 库执行且没有现有的 __utma Cookie 时，系统创建此 Cookie。每次发送数据到 Google Analytics（分析）时，此 Cookie 都会更新。 |
| `__utmt` | 10 分钟        | 用于限制要求率。                                 |
| `__utmb` | 设置/更新后 30 分钟 | 用于确定新的会话/访问。在 JavaScript 库执行且没有现有的 __utmb Cookie 时，系统将创建此 Cookie。每次发送数据到 Google Analytics（分析）时，此 Cookie 都会更新。 |
| `__utmc` | 到浏览器会话结束     | 不在 ga.js 中使用。设置此 Cookie 的目的是为了能与 urchin.js 互操作。一直以来，此 Cookie 都是与 `__utmb` Cookie 结合使用，用于确定用户是否在进行新的会话/访问。 |
| `__utmz` | 设置/更新后 6 个月  | 存储可解释用户如何到达您网站的流量来源或广告系列。此 Cookie 在 JavaScript 库执行时创建，在每次数据发送到 Google Analytics（分析）时更新。 |
| `__utmv` | 设置/更新后 2 年   | 用于存储访问者一级的自定义变量数据。如果开发者搭配 [`_setCustomVar`](https://developers.google.cn/analytics/devguides/collection/gajs/methods/gaJSApiBasicConfiguration?hl=zh-cn#_gat.GA_Tracker_._setCustomVar) 方法使用访问者一级的自定义变量，系统就会创建此 Cookie。此 Cookie 也用于已经弃用的 `_setVar` 方法。每次发送数据到 Google Analytics（分析）时，此 Cookie 都会更新。 |

### 自定义

以下方法可用于自定义 Cookie 设置方式：

- [`_setDomainName`](https://developers.google.cn/analytics/devguides/collection/gajs/methods/gaJSApiDomainDirectory?hl=zh-cn#_gat.GA_Tracker_._setDomainName) – 指定将所有 Cookie 设置到哪个网域。
- [`_setCookiePath`](https://developers.google.cn/analytics/devguides/collection/gajs/methods/gaJSApiDomainDirectory?hl=zh-cn#_gat.GA_Tracker_._setCookiePath) – 指定将所有 Cookie 设置到哪个路径。
- [`_setVisitorCookieTimeout`](https://developers.google.cn/analytics/devguides/collection/gajs/methods/gaJSApiBasicConfiguration?hl=zh-cn#_gat.GA_Tracker_._setVisitorCookieTimeout) – 设置 Google Analytics（分析）访问者 Cookie 有效期（以毫秒为单位）。
- [`_setSessionCookieTimeout`](https://developers.google.cn/analytics/devguides/collection/gajs/methods/gaJSApiBasicConfiguration?hl=zh-cn#_gat.GA_Tracker_._setSessionCookieTimeout) – 设置新的会话 Cookie 超时（以毫秒为单位）。
- [`_setCampaignCookieTimeout`](https://developers.google.cn/analytics/devguides/collection/gajs/methods/gaJSApiCampaignTracking?hl=zh-cn#_gat.GA_Tracker_._setCampaignCookieTimeout) - 设置广告系列跟踪 Cookie 有效期（以毫秒为单位）。
- [`_storeGac`](https://developers.google.cn/analytics/devguides/collection/gajs/methods/gaJSApiDomainDirectory?hl=zh-cn#_gat.GA_Tracker_._storeGac) - 传入 `false` 可停用 GAC Cookie。默认值为 `true`

如需了解如何配置 ga.js 来跨网域衡量用户互动，请参阅[跟踪多个网域](https://developers.google.cn/analytics/devguides/collection/gajs/gaTrackingSite?hl=zh-cn)指南。

## urchin.js - Cookie 用法

Google Analytics（分析）之前提供了一个名为 urchin.js 的 JavaScript 衡量库。在更新的 ga.js 库发布后，我们鼓励开发者迁移至新库。尚未完成迁移的网站请注意，urchin.js 设置 Cookie 的方式与 ga.js 中的设置方式一样。有关详情，请参阅上文中的 [ga.js Cookie 用法](https://developers.google.cn/analytics/devguides/collection/analyticsjs/cookie-usage?hl=zh-cn#gajs)一节。

## Google Analytics（分析）展示广告客户版 - Cookie 用法

对于在使用 [Google Analytics（分析）展示广告客户专用功能](https://support.google.com/analytics/bin/answer.py?answer=2700409&hl=zh-cn)（如[再营销](https://www.google.com/analytics/features/remarketing.html?hl=zh-cn)）的客户，除本文档中介绍的 Cookie 外，系统另外还专门使用一个第三方 DoubleClick Cookie 来支持这些功能。**有关此 Cookie 的详细信息，请参阅 [Google 广告隐私权常见问题解答](https://www.google.com/policies/privacy/ads/?hl=zh-cn#toc-analytics)。

## 内容实验 - Cookie 用法

对于使用 Google Analytics（分析）[内容实验](https://support.google.com/analytics/answer/1745147?hl=zh-cn)的网站来说，除了本文档中描述的其他 Cookie，还会为这些功能使用以下 Cookie：

| Cookie 名称 | 有效期   | 说明                  |
| --------- | ----- | ------------------- |
| `__utmx`  | 18 个月 | 用于确定用户是否包含在实验中。     |
| `__utmxx` | 18 个月 | 用于确定用户包含在其中的实验的有效期。 |

## 优化工具 360 - Cookie 用法

对于使用[优化工具 360](https://www.google.com/analytics/360-suite/optimize/?hl=zh-cn) 的网站来说，除了本文档中描述的其他 Cookie，还会使用以下 Cookie：

| Cookie 名称 | 有效期                 | 说明                              |
| --------- | ------------------- | ------------------------------- |
| `_gaexp`  | 取决于实验的长度，但通常为 90 天。 | 用于确定用户是否包含在实验中以及用户包含在其中的实验的有效期。 |

Except as otherwise noted, the content of this page is licensed under the [Creative Commons Attribution 3.0 License](http://creativecommons.org/licenses/by/3.0/), and code samples are licensed under the [Apache 2.0 License](http://www.apache.org/licenses/LICENSE-2.0). For details, see our [Site Policies](https://developers.google.cn/terms/site-policies?hl=zh-cn). Java is a registered trademark of Oracle and/or its affiliates.

上次更新日期：九月 20, 2017