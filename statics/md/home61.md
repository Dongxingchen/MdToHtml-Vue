# Google Analytics（分析）数据收集限制与配额

本文档介绍了所有 Google Analytics（分析）数据收集代码、库和 SDK 的数据收集限制和配额。

## 概览

数以百万计的网站都在使用 Google Analytics（分析）。为避免系统收到的数据量超出其处理能力，并确保公平分配系统资源，我们设置了一些限制。我们遵循的政策如下所示，但随时可能变更。

以下配额与限制适用于所有 Google Analytics（分析）数据收集代码、库和 SDK。媒体资源与客户端库均存在相应的限制。

## 专门针对媒体资源的限制

这些限制适用于网络媒体资源/媒体资源/跟踪 ID。

- 每个**媒体资源**每月 1000 万次匹配

如果超出此限制，Google Analytics（分析）团队可能会与您联系，让您升级为 Analytics 360 版本，或采取客户端抽样措施以减少发送到 Google Analytics（分析）的数据量。

如需了解 [Analytics 360](https://www.google.com/analytics/360-suite/analytics/?hl=zh-cn) 版每月的总限制，请与客户经理或服务代表联系。

### ga.js 或旧版库

以下限制适用于 ga.js、移动代码段以及其他所有旧版跟踪库。

- 每个**会话** 500 次匹配

如果超出此限制，系统将不会处理该会话中超出部分的匹配。此限制也适用于 [Analytics 360](https://www.google.com/analytics/360-suite/analytics/?hl=zh-cn) 版。

### Universal Analytics 已启用

以下限制适用于 analytics.js、Android iOS SDK 和 Measurement Protocol。

- 每个**用户**每天 20 万次匹配
- 每个**会话** 500 次匹配

如果超出上述任一限制，系统将不会处理相应会话/日期的超出部分匹配。这些限制也适用于 [Analytics 360](https://www.google.com/analytics/360-suite/analytics/?hl=zh-cn) 版。

### 计时匹配

计时匹配（包括由 ga.js 和 analytics.js 自动发送的网站速度匹配）存在一些额外限制。系统每天针对每个媒体资源将要处理的计时匹配的最大数量将多于 1 万个，或者是当天针对该媒体资源而处理的网页浏览总数的 1%。额外限制适用于匹配数较少的情况。有关详情，请参阅[用户计时开发者指南](https://developers.google.cn/analytics/devguides/collection/analyticsjs/user-timings?hl=zh-cn#sampling_considerations)。

## 客户端库/SDK 相关速率限制

每个客户端库都应实现速率限制机制，确保您不会一次性发送过多的匹配。此机制基于[令牌桶算法](http://en.wikipedia.org/wiki/Token_bucket)，允许您向 Google Analytics（分析）发送瞬时激增的匹配，同时避免客户端过快发送数据。

每个跟踪器可以同时发送的请求数都有一个最高限制。跟踪器还会持续计算已经发送的并发匹配数。每当系统发送一次匹配到 Google Analytics（分析），计数就会减一。当计数为 0 时，即表示已达到最高限制，不能再发送新请求。稍等片刻后，计数会重新回到原始限制，允许系统再次发送数据。

以下列表说明了每个库会如何处理速率限制。如果达到这些限制，系统就不会发送匹配到 Google Analytics（分析）服务器，相应的数据也无法处理到报告中。这些限制也适用于 [Analytics 360](https://www.google.com/analytics/360-suite/analytics/?hl=zh-cn) 版。

### ga.js：

每个 ga.js 跟踪器对象从 10 次匹配开始，并以每秒 1 次匹配的速度获得补充。仅适用于事件类型匹配。

### analytics.js：

每个 analytics.js 跟踪器对象从 20 次匹配开始，并以每秒 2 次匹配的速度获得补充。适用于除电子商务（商品或交易）之外的所有匹配。

### Android SDK

对于设备上的每个跟踪器实例，每个应用实例从 60 次匹配开始，以每 2 秒 1 次匹配的速度获得补充。适用于除电子商务（商品或交易）之外的所有匹配。

### iOS SDK

每个媒体资源从 60 次匹配开始，以每 2 秒 1 次匹配的速度获得补充。适用于除电子商务（商品或交易）之外的所有匹配。

Except as otherwise noted, the content of this page is licensed under the [Creative Commons Attribution 3.0 License](http://creativecommons.org/licenses/by/3.0/), and code samples are licensed under the [Apache 2.0 License](http://www.apache.org/licenses/LICENSE-2.0). For details, see our [Site Policies](https://developers.google.cn/terms/site-policies?hl=zh-cn). Java is a registered trademark of Oracle and/or its affiliates.

上次更新日期：二月 13, 2017