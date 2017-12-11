# 编写插件

插件是用于增强 analytics.js 的功能以帮助解决问题和衡量用户交互情况的脚本。本指南介绍编写您自己的 analytics.js 插件的流程。要了解如何在您自己的实现中使用 analytics.js 插件，请参阅[使用插件](https://developers.google.cn/analytics/devguides/collection/analyticsjs/using-plugins?hl=zh-cn)。

## 定义插件

插件是通过 [`provide`](https://developers.google.cn/analytics/devguides/collection/analyticsjs/command-queue-reference?hl=zh-cn#provide) 命令定义的，调用该命令时必须将插件名作为第一个参数，插件的构造函数跟随其后。当运行 `provide`命令时，该命令会注册要随 `ga()` 命令队列一道[使用](https://developers.google.cn/analytics/devguides/collection/analyticsjs/using-plugins?hl=zh-cn)的插件。

### 插件构造函数

下面是一个最简单的 analytics.js 插件示例：

```
// Defines the plugin constructor.
function MyPlugin() {
  console.log('myplugin has been required...');
}

// Registers the plugin for use.
ga('provide', 'myplugin', MyPlugin);

```

即使在全局 `ga` 对象被重命名的情况下，插件也必须正常工作，因此，在您编写供第三方使用的插件时，应该添加检查代码来判断 `GoogleAnalyticsObject` 变量是否已被设置为 `'ga'` 以外的字符串。下面的 `providePlugin` 函数就是这么做的：

```
// Provides a plugin name and constructor function to analytics.js. This
// function works even if the site has customized the ga global identifier.
function providePlugin(pluginName, pluginConstructor) {
  var ga = window[window['GoogleAnalyticsObject'] || 'ga'];
  if (typeof ga == 'function') {
    ga('provide', pluginName, pluginConstructor);
  }
}

```

### 配置插件实例

当 `ga()` 命令队列执行 [`require`](https://developers.google.cn/analytics/devguides/collection/analyticsjs/command-queue-reference?hl=zh-cn#require) 命令时，会在 provide 插件的构造函数上使用 `new` 运算符，生成一个新的对象实例。构造函数的第一个参数是跟踪器对象，第二个参数是要传递给 `require` 命令的配置选项。

请考虑以下添加到 JavaScript 跟踪代码段的 `require` 命令：

```
ga('create', 'UA-XXXXX-Y', 'auto');
ga('require', 'localHitSender', {path: '/log', debug: true});
ga('send', 'pageview');

```

以及 `localHitSender` 代码：

```
function LocalHitSender(tracker, config) {
  this.path = config.path;
  this.debug = config.debug;
  if (this.debug) {
    console.log('localHitSender enabled for path: ' + this.path);
    console.log('on tracker: ' + tracker.get('name'));
  }
}

providePlugin('localHitSender', LocalHitSender);

```

当 `require` 命令运行时，将在控制台日志中记录以下内容（请注意，默认跟踪器的名称为“t0”）：

```
// localHitSender enabled for path: /log
// on tracker: t0

```

### 定义插件方法

插件可以公开其自有的方法，这些方法将可以使用 `ga` 命令队列语法来调用：

```
ga('[trackerName.]pluginName:methodName', ...args);

```

其中 `trackerName` 是可选的，`methodName` 则对应于插件的构造函数原型上的函数名。如果 `methodName` 在该插件中不存在，或该插件不存在，则会出现错误。

示例插件方法调用：

```
// Execute the 'doStuff' method using the 'myplugin' plugin.
ga('create', 'UA-XXXXX-Y', 'auto');
ga('require', 'myplugin');
ga('myplugin:doStuff');

// Execute the 'setEnabled' method of the 'hitCopy' plugin on tracker 't3'.
ga('create', 'UA-XXXXX-Y', 'auto', {name: 't3'});
ga('t3.require', 'hitcopy');
ga('t3.hitcopy:setEnabled', false);

```

示例插件方法定义：

```
// myplugin constructor.
var MyPlugin = function(tracker) {
};

// myplugin:doStuff method definition.
MyPlugin.prototype.doStuff = function() {
  alert('doStuff method called!');
};

// hitcopy plugin.
var HitCopy = function(tracker) {
};

// hitcopy:setEnabled method definition.
HitCopy.prototype.setEnabled = function(isEnabled) {
  this.isEnabled = isEnabled;
}:

```

## 加载插件

插件通常是从单独的 JavaScript 文件中加载，或与您的主应用代码捆绑在一起。

```
<script async src="myplugin.js"></script>

```

插件不一定需要现有定义才能调用。因为 analytics.js 是异步加载的，插件也通常是异步加载的，`ga()` 命令队列就是专为处理这种情况而设计的。

如果命令队列收到一条调用尚未提供的插件的 `require` 命令，就会暂停执行队列中的其他命令，直到该插件可用为止。

以下代码说明，`ga('require', 'myplugin')` 命令实际是在三秒钟后触发 `ga('provide', 'myplugin', ...)` 命令时才会执行。

```
ga('require', 'myplugin');

function MyPlugin() {
  console.log('myplugin has been required...');
}

// Waits 3 second after running the `require`
// command before running the `provide` command.
setTimeout(function() {
  ga('provide', 'myplugin', MyPlugin);
}, 3000);

```

**重要提示！**虽然 `require` 和 `provide` 命令的顺序并不重要，但不能在 JavaScript 跟踪代码段运行之前调用这两个命令，因为它们都会引用 `ga` 全局命令队列函数。

## 示例

下例中的插件用于捕获网页网址中的自定义广告系列值并将其传递到跟踪器。此插件演示了如何定义和注册插件脚本，传递插件配置参数，以及定义和调用插件方法。

```
// campaign-loader.js

function providePlugin(pluginName, pluginConstructor) {
  var ga = window[window['GoogleAnalyticsObject'] || 'ga'];
  if (typeof ga == 'function') {
    ga('provide', pluginName, pluginConstructor);
  }
}

/**
 * Constructor for the campaignLoader plugin.
 */
var CampaignLoader = function(tracker, config) {
  this.tracker = tracker;
  this.nameParam = config.nameParam || 'name';
  this.sourceParam = config.sourceParam || 'source';
  this.mediumParam = config.mediumParam || 'medium';
  this.isDebug = config.debug;
};

/**
 * Loads campaign fields from the URL and updates the tracker.
 */
CampaignLoader.prototype.loadCampaignFields = function() {
  this.debugMessage('Loading custom campaign parameters');

  var nameValue = getUrlParam(this.nameParam);
  if (nameValue) {
    this.tracker.set('campaignName', nameValue);
    this.debugMessage('Loaded campaign name: ' + nameValue);
  }

  var sourceValue = getUrlParam(this.sourceParam);
  if (sourceValue) {
    this.tracker.set('campaignSource', sourceValue);
    this.debugMessage('Loaded campaign source: ' + sourceValue);
  }

  var mediumValue = getUrlParam(this.mediumParam);
  if (mediumValue) {
    this.tracker.set('campaignMedium', mediumValue);
    this.debugMessage('Loaded campaign medium: ' + mediumValue);
  }
};

/**
 * Enables / disables debug output.
 */
CampaignLoader.prototype.setDebug = function(enabled) {
  this.isDebug = enabled;
};

/**
 * Displays a debug message in the console, if debugging is enabled.
 */
CampaignLoader.prototype.debugMessage = function(message) {
  if (!this.isDebug) return;
  if (console) console.debug(message);
};

/**
 * Utility function to extract a URL parameter value.
 */
function getUrlParam(param) {
  var match = document.location.search.match('(?:\\?|&)' + param + '=([^&#]*)');
  return (match && match.length == 2) ? decodeURIComponent(match[1]) : '';
}

// Register the plugin.
providePlugin('campaignLoader', CampaignLoader);

```

可以按照以下方式将上述代码添加到 HTML 页面中：

```
<script>
(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','//www.google-analytics.com/analytics.js','ga');

ga('create', 'UA-XXXXX-Y', 'auto');
ga('require', 'campaignLoader', {
  debug: true,
  nameParam: 'cname',
  sourceParam: 'csrc',
  mediumParam: 'cmed'
});
ga('campaignLoader:loadCampaignFields');

ga('send', 'pageview');
</script>

<!--Note: plugin scripts must be included after the tracking snippet. -->
<script async src="campaign-loader.js"></script>

```

### Autotrack 插件

[autotrack](https://github.com/googleanalytics/autotrack) 库是 Github 上的开源库，包含了几个有助于跟踪普通用户互动的 analytics.js 插件。请参阅 autotrack 源代码，以更好地了解插件的工作方式。

- [`eventTracker`](https://github.com/googleanalytics/autotrack/blob/master/lib/plugins/event-tracker.js)
- [`mediaQueryTracker`](https://github.com/googleanalytics/autotrack/blob/master/lib/plugins/media-query-tracker.js)
- [`outboundFormTracker`](https://github.com/googleanalytics/autotrack/blob/master/lib/plugins/outbound-form-tracker.js)
- [`outboundLinkTracker`](https://github.com/googleanalytics/autotrack/blob/master/lib/plugins/outbound-link-tracker.js)
- [`socialTracker`](https://github.com/googleanalytics/autotrack/blob/master/lib/plugins/social-tracker.js)
- [`urlChangeTracker`](https://github.com/googleanalytics/autotrack/blob/master/lib/plugins/url-change-tracker.js)

Except as otherwise noted, the content of this page is licensed under the [Creative Commons Attribution 3.0 License](http://creativecommons.org/licenses/by/3.0/), and code samples are licensed under the [Apache 2.0 License](http://www.apache.org/licenses/LICENSE-2.0). For details, see our [Site Policies](https://developers.google.cn/terms/site-policies?hl=zh-cn). Java is a registered trademark of Oracle and/or its affiliates.

上次更新日期：九月 29, 2016