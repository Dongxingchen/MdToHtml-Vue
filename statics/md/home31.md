# 跨网域跟踪

本指南将说明如何使用 analytics.js 来跨网域跟踪用户。

**警告**：正确实现跨网域跟踪是一个既复杂又易出错的过程。本指南介绍了相关的概念，但是强烈建议您使用官方[链接器插件](https://developers.google.cn/analytics/devguides/collection/analyticsjs/linker?hl=zh-cn)，而不要尝试自行实现跨网域跟踪。

## 概览

analytics.js 库使用唯一的[客户端 ID](https://developers.google.cn/analytics/devguides/collection/analyticsjs/field-reference?hl=zh-cn#clientId) 来确定用户属于新用户还是回访用户。如果已经向同一媒体资源发送了包含相符的客户端 ID 的匹配数据，则该用户将被视为回访用户。

默认情况下，客户端 ID 保存在浏览器的 Cookie 中，也就是说，只能通过同一网域中的网页访问客户端 ID。如果您拥有多个网域并希望将它们视为同一个媒体资源，则需要设法在您希望跟踪的所有网域间共享客户端 ID。

## 在网域间共享客户端 ID

要在网域间共享客户端 ID，可将其作为查询参数附加到从当前网域（来源网域）指向所要跟踪的目标网域的网址后面。当用户在来源网域上点击链接或提交表单，并导航到目标网域时，目标网页上的代码可通过读取网址中的客户端 ID 来访问该 ID。

### 在来源网域上获取客户端 ID

要在来源网域上获取客户端 ID，您可以使用 [`get`](https://developers.google.cn/analytics/devguides/collection/analyticsjs/tracker-object-reference?hl=zh-cn#get) 方法：

```
ga(function(tracker) {
  var clientId = tracker.get('clientId');
});

```

在来源网域上获取客户端 ID 后，就可以将其添加到指向目标网域的链接中。

```
<a href="https://destination.com/?clientId=XXXXXX">destination.com</a>

```

### 在目标网域上设置客户端 ID

您可以通过在 [`create`](https://developers.google.cn/analytics/devguides/collection/analyticsjs/command-queue-reference?hl=zh-cn#create) 命令中指定客户端 ID 字段，告知目标网域上的跟踪器对象所需使用的客户端 ID：

```
ga('create', 'UA-XXXXX-Y', 'auto', {
  'clientId': getClientIdFromUrl()
});

```

如果目标网域上已有客户端 ID，该方法会将其覆盖。

### 检测网址共享

在网址中传递客户端 ID 可能存在以下问题：多个用户在共享网址时，某个用户共享的网址中可能包含属于其他用户的客户端 ID。

避免出现该问题的办法之一是在客户端 ID 后面附加一个时间戳。这样，您便可以知道网址最初是何时创建的，如果创建时间过去很久了，则应将该客户端 ID 视为无效。除时间戳外，您还可以附加用户代理字符串或其他针对特定浏览器或设备的元数据。在目标网域上，如果元数据不相符，您便可得知该客户端 ID 来自于其他用户。

## 忽略自我引荐

每当网页的[文档引荐来源网址](https://developers.google.cn/analytics/devguides/collection/analyticsjs/field-reference?hl=zh-cn#referrer)的来源主机名与媒体资源[引荐排除](https://support.google.com/analytics/answer/2795830?hl=zh-cn)列表中的任何条目都不匹配时，系统就会创建新的引荐广告系列。

默认情况下，引荐排除列表只包含您在媒体资源最初创建时提供的网域。为避免在用户跨网域导航时生成新的引荐广告系列，您必须在引荐排除列表中为您要跟踪的每个网域添加一个条目。

## iframe

上述方法需要使用在 analytics.js 载入后运行的 JavaScript 代码。由于 `` 元素一般在 analytics.js 载入之前就已存在于网页中，因此通常无法在 iframe 的来源参数中将客户端 ID 附加到网址后面。

要解决该问题，您可以配置 iframe 内的网页，使其延迟创建跟踪器，直至收到来自父网页的客户端 ID。在父网页上，对页面进行配置，使其使用 [postMessage](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/postMessage) 将客户端 ID 发送给 iframe 页面。

以下是 `source.com` 上的父网页代码示例：

```
<iframe id="destination-frame" src="https://destination.com"></iframe>

<script>
ga('create', 'UA-XXXXX-Y', 'auto');
ga(function(tracker) {
  // Gets the client ID of the default tracker.
  var clientId = tracker.get('clientId');

  // Gets a reference to the window object of the destionation iframe.
  var frameWindow = document.getElementById('destination-frame').contentWindow;

  // Sends the client ID to the window inside the destination frame.
  frameWindow.postMessage(clientId, 'https://destination.com');
});
</script>

```

以下是可在 `destination.com` 上托管的 iframe 中接收消息的代码：

```
window.addEventListener('message', function(event) {
  // Ignores messages from untrusted domains.
  if (event.origin != 'https://destination.com') return;

  ga('create', 'UA-XXXXX-Y', 'auto', {
    clientId: event.data
  });
});

```

有可能 analytics.js 在父网页上无法载入，从而导致 iframe 中的页面永远都收不到客户端 ID。如何处理这种情况取决于客户端 ID 相符的重要程度。

如果您只是希望在知道客户端 ID 相同时捕获数据，那么使用上述代码就够了。如果您希望在框架中的页面上捕获数据，而不管是否收到来自父网页的客户端 ID，则必须添加回退机制。

以下代码会在 iframe 中的页面上使用超时来处理父网页速度慢或无法发送客户端 ID 的情况：

```
// Stores whether or not the tracker has been created.
var trackerCreated = false;

function createTracker(opt_clientId) {
  if (!trackerCreated) {
    var fields = {};
    if (opt_clientId) {
      fields.clientId = opt_clientId;
    }

    ga('create', 'UA-XXXXX-Y', 'auto', fields);
    trackerCreated = true;
  }
}

window.addEventListener('message', function(event) {
  // Ignores messages from untrusted domains.
  if (event.origin != 'https://destination.com') return;

  // Creates the tracker with the data from the parent page.
  createTracker(event.data);
});

// Waits for three seconds to receive the client ID from the parent page.
// If that doesn't happen, it creates the tracker as normal.
setTimeout(createTracker, 3000);

```

Except as otherwise noted, the content of this page is licensed under the [Creative Commons Attribution 3.0 License](http://creativecommons.org/licenses/by/3.0/), and code samples are licensed under the [Apache 2.0 License](http://www.apache.org/licenses/LICENSE-2.0). For details, see our [Site Policies](https://developers.google.cn/terms/site-policies?hl=zh-cn). Java is a registered trademark of Oracle and/or its affiliates.

上次更新日期：二月 13, 2017