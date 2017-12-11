# 向 Google Analytics（分析）发送数据

为向 Google Analytics（分析）发送[网页浏览](https://support.google.com/analytics/answer/6086080?hl=zh-cn)数据，[JavaScript 跟踪代码段](https://developers.google.cn/analytics/devguides/collection/analyticsjs/?hl=zh-cn#the_javascript_tracking_snippet)的最后一行在 `ga()` 命令队列中添加了一条 [`send`](https://developers.google.cn/analytics/devguides/collection/analyticsjs/command-queue-reference?hl=zh-cn#send) 命令：

```
ga('create', 'UA-XXXXX-Y', 'auto');
ga('send', 'pageview');
```

用于执行发送的对象是上一行代码中[调度创建](https://developers.google.cn/analytics/devguides/collection/analyticsjs/creating-trackers?hl=zh-cn)的跟踪器。所发送的数据是存储在该跟踪器上的数据。

本指南介绍向 Google Analytics（分析）发送数据的各种方式，并说明如何控制具体发送哪些数据。

## 匹配、匹配类型和 Measurement Protocol

我们将跟踪器向 Google Analytics（分析）发送数据称为发送[匹配](https://support.google.com/analytics/answer/6086082?hl=zh-cn)，每个匹配都必须具有匹配类型。JavaScript 跟踪代码段发送的匹配类型为 `pageview`；其他匹配类型包括 `screenview`、`event`、`transaction`、`item`、`social`、`exception` 和 `timing`。本指南概要介绍适用于所有匹配类型的基本概念和方法。您可以在左侧导航栏中的“跟踪常见用户互动”部分找到针对每种匹配类型的专题指南。**

“匹配”是一个 HTTP 请求，其中包含编码成查询字符串的字段/值对，并发往 [Measurement Protocol](https://developers.google.cn/analytics/devguides/collection/protocol/v1?hl=zh-cn)。

在加载使用了 analytics.js 的网页时，如果您已打开浏览器的开发者工具，就可以在网络标签中看到发送匹配的情况。为此只需查找发送到 `google-analytics.com/collect` 的请求。

## 发送哪些数据

在向 Measurement Protocol 发送匹配时，跟踪器发送当前存储的所有有效 [Measurement Protocol 参数](https://developers.google.cn/analytics/devguides/collection/protocol/v1/parameters?hl=zh-cn)字段。例如，会发送像 [`title`](https://developers.google.cn/analytics/devguides/collection/analyticsjs/field-reference?hl=zh-cn#title) 和 [`location`](https://developers.google.cn/analytics/devguides/collection/analyticsjs/field-reference?hl=zh-cn#location) 这样的字段，但不会发送 [`cookieDomain`](https://developers.google.cn/analytics/devguides/collection/analyticsjs/field-reference?hl=zh-cn#cookieDomain) 和 [`hitCallback`](https://developers.google.cn/analytics/devguides/collection/analyticsjs/field-reference?hl=zh-cn#hitCallback) 字段。

在有些情况下，您可能需要对当前匹配向 Google Analytics（分析）发送某些字段，对之后的匹配则不发送。例如，某个事件匹配的 [`eventAction`](https://developers.google.cn/analytics/devguides/collection/analyticsjs/field-reference?hl=zh-cn#eventAction) 和 [`eventLabel`](https://developers.google.cn/analytics/devguides/collection/analyticsjs/field-reference?hl=zh-cn#eventLabel) 字段仅与当前匹配相关。

要仅为当前匹配发送某些字段，您可以将这些字段作为 [`send`](https://developers.google.cn/analytics/devguides/collection/analyticsjs/ga-object-methods-reference?hl=zh-cn#send) 方法的参数来传递。要为之后的所有匹配发送字段数据，则应该使用 [`set`](https://developers.google.cn/analytics/devguides/collection/analyticsjs/command-queue-reference?hl=zh-cn#set) 方法来[更新跟踪器](https://developers.google.cn/analytics/devguides/collection/analyticsjs/accessing-trackers?hl=zh-cn)。

## send 方法

可以直接使用跟踪器对象本身来调用跟踪器的 `send` 方法，也可以通过向 `ga()` 命令队列添加 `send`命令来进行调用。由于大多数情况下您都没有跟踪器对象的引用，因此使用 `ga()` 命令队列是向 Google Analytics（分析）发送跟踪器数据的推荐方式。

### 使用 `ga()` 命令队列

用于向 `ga()` 命令队列添加 [`send`](https://developers.google.cn/analytics/devguides/collection/analyticsjs/command-queue-reference?hl=zh-cn#send) 命令的签名如下所示：

```
ga('[trackerName.]send', [hitType], [...fields], [fieldsObject]);

```

如上所述，通过 `hitType`、`...fields` 和 `fieldsObject` 参数指定的值仅对当前匹配发送。这些值不会存储在跟踪器对象中，也不会通过随后的匹配发送。

如果使用 `send` 命令传递的字段在跟踪器对象上已经设有值，则使用命令中传递的值而不是跟踪器上存储的值。

调用 `send` 命令时必须指定 [hitType](https://developers.google.cn/analytics/devguides/collection/analyticsjs/field-reference?hl=zh-cn#hitType)，是否需要其他参数取决于所指定的类型。请参阅左侧导航栏中关于“跟踪常见的用户互动”的专题指南，了解详细信息。**

使用 `send` 命令的最简单方式是使用 `fieldsObject` 参数传递所有字段，此方式适用于所有匹配类型。例如：

```
ga('send', {
  hitType: 'event',
  eventCategory: 'Video',
  eventAction: 'play',
  eventLabel: 'cats.mp4'
});

```

为方便起见，对于特定匹配类型允许直接以参数形式向 `send` 命令传递常用字段。例如，可将上述用于“event”匹配类型的 `send` 命令改写为：

```
ga('send', 'event', 'Video', 'play', 'cats.mp4');

```

要了解针对各种匹配类型分别可将哪些字段作为参数传递的完整列表，请参阅 [send 命令参考](https://developers.google.cn/analytics/devguides/collection/analyticsjs/command-queue-reference?hl=zh-cn#send)的“参数”部分。

### 使用已命名的跟踪器

如果您要使用已命名跟踪器而不是默认跟踪器，可以在命令字符串中传递跟踪器名称。

以下 `send` 命令将在名为 myTracker 的跟踪器上调用：

```
ga('myTracker.send', 'event', 'Video', 'play', 'cats.mp4');

```

### 通过跟踪器对象本身进行调用

如果引用了跟踪器对象，就可以直接调用该跟踪器的 [`send`](https://developers.google.cn/analytics/devguides/collection/analyticsjs/tracker-object-reference?hl=zh-cn#send) 方法：

```
ga(function(tracker) {
  tracker.send('event', 'Video', 'play', 'cats.mp4');
});

```

## 在匹配发送完成时获得通知

在某些情况下，您需要在匹配已发送到 Google Analytics（分析）时获得通知，这样才能立即采取后续措施。当您需要记录导致用户离开当前页面的特定互动时，这种需要很常见。许多浏览器会在网页开始卸载时立即停止执行 JavaScript，这意味着您用于发送匹配的 analytics.js 命令可能没有机会执行。

例如，您要向 Google Analytics 发送事件以记录用户点击了表单的提交按钮。但在大多数情况下，点击提交按钮会立即开始加载下一个页面，不会再执行任何 `ga('send', ...)` 命令。

解决方法是拦截该事件以阻止页面卸载。然后按通常方式向 Google Analytics（分析）发送匹配，发送完成后，立即以程序化方式重新提交表单。

### hitCallback

要在匹配发送完成时获得通知，您需要设置 [`hitCallback`](https://developers.google.cn/analytics/devguides/collection/analyticsjs/field-reference?hl=zh-cn#hitCallback) 字段。`hitCallback` 是一个函数，当匹配发送成功时该函数会立即得到调用。

以下示例说明如何取消表单的默认提交操作、向 Google Analytics（分析）发送匹配以及使用 `hitCallback` 函数重新提交该表单：

```
// Gets a reference to the form element, assuming
// it contains the id attribute "signup-form".
var form = document.getElementById('signup-form');

// Adds a listener for the "submit" event.
form.addEventListener('submit', function(event) {

  // Prevents the browser from submitting the form
  // and thus unloading the current page.
  event.preventDefault();

  // Sends the event to Google Analytics and
  // resubmits the form once the hit is done.
  ga('send', 'event', 'Signup Form', 'submit', {
    hitCallback: function() {
      form.submit();
    }
  });
});

```

### 处理超时情况

以上示例所介绍的方法虽然行之有效，但存在一个严重问题。如果（无论是由于何种原因）无法加载 analytics.js 库，则 `hitCallback` 函数将永远无法运行。如果 `hitCallback` 函数无法运行，用户将永远无法提交表单。

当您在 `hitCallback` 函数中添加重要的网站功能时，应该**一律**使用超时函数来处理 analytics.js 库无法加载的情况。

下例更新了上述代码以使用超时处理。如果 `hitCallback` 在用户点击提交按钮一秒钟之后还未运行，则立即重新提交该表单。

```
// Gets a reference to the form element, assuming
// it contains the id attribute "signup-form".
var form = document.getElementById('signup-form');

// Adds a listener for the "submit" event.
form.addEventListener('submit', function(event) {

  // Prevents the browser from submitting the form
  // and thus unloading the current page.
  event.preventDefault();

  // Creates a timeout to call `submitForm` after one second.
  setTimeout(submitForm, 1000);

  // Keeps track of whether or not the form has been submitted.
  // This prevents the form from being submitted twice in cases
  // where `hitCallback` fires normally.
  var formSubmitted = false;

  function submitForm() {
    if (!formSubmitted) {
      formSubmitted = true;
      form.submit();
    }
  }

  // Sends the event to Google Analytics and
  // resubmits the form once the hit is done.
  ga('send', 'event', 'Signup Form', 'submit', {
    hitCallback: submitForm
  });
});
```

如果您在整个网站中多处使用了上述处理模式，则创建一个辅助函数来处理超时更为方便。

以下辅助函数以一个函数作为输入，并返回一个新函数。如果所返回的函数在超时时限以内（默认的超时时限为一秒）得到调用，该函数将清除超时事件并调用输入的函数。如果所返回的函数在超时时限以内未得到调用，则无条件调用输入的函数。

```
function createFunctionWithTimeout(callback, opt_timeout) {
  var called = false;
  function fn() {
    if (!called) {
      called = true;
      callback();
    }
  }
  setTimeout(fn, opt_timeout || 1000);
  return fn;
}

```

通过这种方式，您可以使用超时处理轻松封装所有 `hitCallback` 函数，即使在您的匹配发送失败或 analytics.js 库根本未载入的情况下也可以确保您的网站正常工作。

```
// Gets a reference to the form element, assuming
// it contains the id attribute "signup-form".
var form = document.getElementById('signup-form');

// Adds a listener for the "submit" event.
form.addEventListener('submit', function(event) {

  // Prevents the browser from submitting the form
  // and thus unloading the current page.
  event.preventDefault();

  // Sends the event to Google Analytics and
  // resubmits the form once the hit is done.
  ga('send', 'event', 'Signup Form', 'submit', {
    hitCallback: createFunctionWithTimeout(function() {
      form.submit();
    })
  });
});
```

## 指定不同的传输机制

默认情况下，analytics.js 会选择 HTTP 方法和传输机制以优化匹配的发送。使用这种机制时有三种选项，分别为：`'image'`（使用 `Image` 对象）、`'xhr'`（使用 `XMLHttpRequest` 对象）或 `'beacon'`（使用新的 [`navigator.sendBeacon`](https://developer.mozilla.org/en-US/docs/Web/API/Navigator/sendBeacon) 方法）。

前两种方法都具有上一部分所描述的问题（如果遇到网页卸载的情况匹配往往无法发送）。相比之下，`navigator.sendBeacon` 方法则是为解决此问题而创建的全新 HTML 功能。

如果您的浏览器支持 `navigator.sendBeacon`，您就可以将 `'beacon'` 指定为 `transport` 机制，而且无需为设置匹配回调函数而操心。

以下代码在支持此功能的浏览器中将传输机制设置为 `'beacon'`。

```
ga('create', 'UA-XXXXX-Y', 'auto');

// Updates the tracker to use `navigator.sendBeacon` if available.
ga('set', 'transport', 'beacon');

```

目前，仅当在传输机制设置为 `'beacon'` 的情况下，analytics.js 才使用 `navigator.sendBeacon`。但是将来 analytics.js 很可能会在支持此功能的浏览器中改用 `'beacon'` 作为默认机制。

## 后续步骤

衡量某些类型的用户互动有时需要完成复杂的实现。不过，在许多情况下这些实现已开发完成并作为 analytics.js 插件供您使用。下一篇指南将介绍如何通过 `ga()` 命令队列[使用 analytics.js 插件](https://developers.google.cn/analytics/devguides/collection/analyticsjs/using-plugins?hl=zh-cn)。

Except as otherwise noted, the content of this page is licensed under the [Creative Commons Attribution 3.0 License](http://creativecommons.org/licenses/by/3.0/), and code samples are licensed under the [Apache 2.0 License](http://www.apache.org/licenses/LICENSE-2.0). For details, see our [Site Policies](https://developers.google.cn/terms/site-policies?hl=zh-cn). Java is a registered trademark of Oracle and/or its affiliates.

上次更新日期：二月 13, 2017