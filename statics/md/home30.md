# Cookie 和用户识别

为让 Google Analytics（分析）能够确定两个不同匹配是否属于同一用户，必须将与特定用户关联的唯一标识和每个匹配一同发送。

analytics.js 库通过 [Client-ID](https://developers.google.cn/analytics/devguides/collection/analyticsjs/field-reference?hl=zh-cn#clientId) 字段来完成此任务，Client-ID 是随机生成的独一无二的字符串，生成后的 ID 存储在浏览器的 Cookie 中，这样即可在用户和其访问过的相同网站之间建立关联。

默认情况下，analytics.js 使用一个名为 `_ga` 的第一方 Cookie 来存储该 Client-ID，但该 Cookie 的名称、网域和有效期均可自定义。analytics.js 创建的其他 Cookie 包括 `_gid`、`AMP_TOKEN` 和 `_gac_`。这些 Cookie 存储用户的其他随机生成 ID 和广告系列信息。

analytics.js 能够借助 Cookie 跨浏览器会话识别用户，但无法跨浏览器或跨设备识别不同浏览器或设备上的用户。如果您的网站拥有自己的身份验证系统，则除了 Client ID 之外您还可以使用 [User ID 功能](https://support.google.com/analytics/answer/3123662?hl=zh-cn)，从而更准确地在用户用于访问您网站的所有设备上跨设备识别用户。

本指南介绍如何自定义 Cookie 设置和如何设置 User ID 字段，以便更准确地跨会话跟踪用户。

**注意**：您可以参考 [Cookie 用法](https://developers.google.cn/analytics/devguides/collection/analyticsjs/cookie-usage?hl=zh-cn)指南，详细了解 analytics.js 如何使用 Cookie。

## 配置 Cookie 字段的设置

下表显示了 analytics.js 使用的默认 Cookie 字段值：

| 字段名称                                     | 值类型  | 默认值                                      |
| ---------------------------------------- | ---- | ---------------------------------------- |
| [`cookieName`](https://developers.google.cn/analytics/devguides/collection/analyticsjs/field-reference?hl=zh-cn#cookieName) | 文字   | `_ga`                                    |
| [`cookieDomain`](https://developers.google.cn/analytics/devguides/collection/analyticsjs/field-reference?hl=zh-cn#cookieNamecookieDomain) | 文字   | 以下 JavaScript 表达式的结果：`document.location.hostname` |
| [`cookieExpires`](https://developers.google.cn/analytics/devguides/collection/analyticsjs/field-reference?hl=zh-cn#cookieExpires) | 整数   | `63072000`（两年，以秒为单位）                     |

要修改以上任何值，可以在传递给 [`create`](https://developers.google.cn/analytics/devguides/collection/analyticsjs/command-queue-reference?hl=zh-cn#create) 命令的 `fieldObject` 中指定。例如：

```
ga('create', 'UA-XXXXX-Y', {
  'cookieName': 'gaCookie',
  'cookieDomain': 'blog.example.co.uk',
  'cookieExpires': 60 * 60 * 24 * 28  // Time in seconds.
});

```

由于经常需要设置的 Cookie 字段是 `cookieDomain`，为方便起见 `create` 命令接受 `cookieDomain`字段作为可选的第三个参数：

```
ga('create', 'UA-XXXXX-Y', 'blog.example.co.uk');

```

**注意**：`cookieDomain` 必须是当前网域的上级，否则便无法设置 Cookie。例如，如果您的网域是 `one.two.three.root.com`，您应配置 Cookie 在 `root.com` 而非 `someotherdomain.com` 上设置。设置不正确的 Cookie 网域将导致系统不会发送任何匹配到 Google Analytics（分析）。

### 自动 Cookie 网域配置

推荐的 JavaScript 跟踪代码段为 [`cookieDomain`](https://developers.google.cn/analytics/devguides/collection/analyticsjs/field-reference?hl=zh-cn#cookieDomain) 字段设置了字符串 `'auto'`：

```
ga('create', 'UA-XXXXX-Y', 'auto');

```

将 `cookieDomain` 指定为 `'auto'` 会启用自动 Cookie 网域配置，它指示 analytics.js 自动确定要使用的最佳 Cookie 网域。

自动 Cookie 网域配置会在可能的最高级网域上设置 `_ga` Cookie。例如，如果您的网址为 `blog.example.co.uk`，analytics.js 就会将 Cookie 设置到 `.example.co.uk` 网域上。此外，如果 analytics.js 检测到您在本地运行服务器（例如 `localhost`），则会自动将 `cookieDomain` 设为 `'none'`。

在使用自动 Cookie 网域配置的情况下，无需任何额外配置即可在所有子网域上跟踪您的用户。

### Cookie 有效期

每次当匹配发送至 Google Analytics（分析）时，Cookie 过期时间都会更新为当前时间加上 `cookieExpires` 字段的值。这意味着，如果您使用默认的 `cookieExpires` 时间（两年），而用户每个月都会访问您的网站，那么他们的 Cookie 永远都不会过期。

如果您将 `cookieExpires` 时间设为 `0`（零）秒，Cookie 将变成[基于会话的 Cookie](http://en.wikipedia.org/wiki/HTTP_cookie#Session_cookie)，并在当前浏览器会话结束后马上过期：

## 从 Cookie 中获取 Client ID

您不应该直接访问 analytics.js 设置的 Cookie，因为 Cookie 格式以后可能会变更。开发者应该采用的方式是使用 [`readyCallback`](https://developers.google.cn/analytics/devguides/collection/analyticsjs/command-queue-reference?hl=zh-cn#readyCallback) 等待 analytics.js 加载完成，然后获取存储在跟踪器上的 `clientId` 值。

```
ga(function(tracker) {
  var clientId = tracker.get('clientId');
});
```

## 停用 Cookie

在某些情况下，您可能希望使用自己的存储机制（例如 [`localStorage`](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage) 或 [Service Worker](http://www.html5rocks.com/en/tutorials/service-worker/introduction/)）来跨会话存储 Client ID，而不是使用 Cookie。为此，您可以将 [`storage`](https://developers.google.cn/analytics/devguides/collection/analyticsjs/field-reference?hl=zh-cn#storage) 字段设置为 `'none'` 来禁止 analytics.js 设置 Cookie。

```
ga('create', 'UA-XXXXX-Y', {
  'storage': 'none'
});
```

如果您以自己的方式存储 `clientId` 字段，则需要确保在创建跟踪器时对 `cliendId` 字段进行设置。

```
ga('create', 'UA-XXXXX-Y', {
  'storage': 'none',
  'clientId': '76c24efd-ec42-492a-92df-c62cfd4540a3'
});
```

要停用 `_gac_` Cookie，请在 `create` 命令中将 `storeGac` 字段设置为 `false`。

```
ga('create', 'UA-XXXXX-Y', {
  storeGac: false,
});

```

### 使用 localStorage 来存储 Client ID

以下代码示例显示了如何修改 JavaScript 跟踪代码段以便使用 `localStorage`（而非 Cookie）来存储 Client ID：

```
var GA_LOCAL_STORAGE_KEY = 'ga:clientId';

if (window.localStorage) {
  ga('create', 'UA-XXXXX-Y', {
    'storage': 'none',
    'clientId': localStorage.getItem(GA_LOCAL_STORAGE_KEY)
  });
  ga(function(tracker) {
    localStorage.setItem(GA_LOCAL_STORAGE_KEY, tracker.get('clientId'));
  });
}
else {
  ga('create', 'UA-XXXXX-Y', 'auto');
}

ga('send', 'pageview');

```

**注意**：与 Cookie 不同，`localStorage` 受[同源政策](https://en.wikipedia.org/wiki/Same-origin_policy)的制约。如果您网站的各部分属于不同的子域，或某些网页使用 `http` 而另一些网页使用 `https`，则不能使用 `localStorage` 在这些网页之间跟踪用户。由于这个原因，Cookie 仍然是推荐的 Client ID 存储方式。

## User ID

借助 User ID，您可以使用一个代表用户的固定不变、独一无二的非个人身份 ID 字符串来跨设备分析会话组。要了解为何应实现 User ID，请查看[使用 User ID 功能的优势](https://support.google.com/analytics/answer/3123663?hl=zh-cn)。

要通过 analytics.js 实现 User ID，请按以下步骤操作：

1. 提供您自己用于代表每个登录用户的字符串 ID，该 ID 必须具备唯一性，持久化存储，且不可用于识别个人身份。此 ID 通常由身份验证系统提供。
2. 在跟踪器上设置 User ID：

```
ga('create', 'UA-XXXXX-Y', 'auto', {
  userId: USER_ID
});
ga('send', 'pageview');
```

**重要提示！**`USER_ID` 值应是一个独一无二的永久性非个人身份字符串，在所有设备上代表对应的用户或已登录帐户。

### 页面加载后处理身份验证

如果创建初始网页加载后处理用户登录的[单页应用](https://developers.google.cn/analytics/devguides/collection/analyticsjs/single-page-applications?hl=zh-cn)或其他动态网站，在创建时不能执行在跟踪器上设置 User ID 值的过程。

在这种情况下，您可以使用 [`set`](https://developers.google.cn/analytics/devguides/collection/analyticsjs/command-queue-reference?hl=zh-cn#set) 命令在获得该值时在跟踪器上进行设置。

```
// Creates the tracker and sends a pageview as normal
// since the `userId` value is not yet known.
ga('create', 'UA-XXXXX-Y', 'auto');
ga('send', 'pageview');

// At a later time, once the `userId` value is known,
// sets the value on the tracker.
ga('set', 'userId', USER_ID);
```

如果使用此方法，在设置 `userId` 字段前发送的匹配不会包含 User ID 值。然而，利用[会话统一](https://support.google.com/analytics/answer/4574780?hl=zh-cn)这一过程，Google Analytics（分析）可以在处理过程中将这些匹配与正确的用户关联。

Except as otherwise noted, the content of this page is licensed under the [Creative Commons Attribution 3.0 License](http://creativecommons.org/licenses/by/3.0/), and code samples are licensed under the [Apache 2.0 License](http://www.apache.org/licenses/LICENSE-2.0). For details, see our [Site Policies](https://developers.google.cn/terms/site-policies?hl=zh-cn). Java is a registered trademark of Oracle and/or its affiliates.

上次更新日期：九月 7, 2017