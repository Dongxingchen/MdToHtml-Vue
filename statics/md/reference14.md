# JavaScript 跟踪代码段参考

本文对推荐的 JavaScript 跟踪代码段和备用异步跟踪代码段中包含的代码进行详细说明。

本文中的信息仅面向教学用途，因为通常都应该以最精简的形式使用跟踪代码段，以便将用户受到的性能影响降至最低。

## JavaScript 跟踪代码段

以下两部分分别显示了精简版和非精简版的 JavaScript 跟踪代码段。

### 精简版

```
<!-- Google Analytics -->
<script>
(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

ga('create', 'UA-XXXXX-Y', 'auto');
ga('send', 'pageview');
</script>
<!-- End Google Analytics -->
```

### 非精简版

```
<!-- Google Analytics -->
<script>
/**
 * Creates a temporary global ga object and loads analytics.js.
 * Parameters o, a, and m are all used internally. They could have been
 * declared using 'var', instead they are declared as parameters to save
 * 4 bytes ('var ').
 *
 * @param {Window}        i The global context object.
 * @param {HTMLDocument}  s The DOM document object.
 * @param {string}        o Must be 'script'.
 * @param {string}        g Protocol relative URL of the analytics.js script.
 * @param {string}        r Global name of analytics object. Defaults to 'ga'.
 * @param {HTMLElement}   a Async script tag.
 * @param {HTMLElement}   m First script tag in document.
 */
(function(i, s, o, g, r, a, m){
  i['GoogleAnalyticsObject'] = r; // Acts as a pointer to support renaming.

  // Creates an initial ga() function.
  // The queued commands will be executed once analytics.js loads.
  i[r] = i[r] || function() {
    (i[r].q = i[r].q || []).push(arguments)
  },

  // Sets the time (as an integer) this tag was executed.
  // Used for timing hits.
  i[r].l = 1 * new Date();

  // Insert the script tag asynchronously.
  // Inserts above current tag to prevent blocking in addition to using the
  // async attribute.
  a = s.createElement(o),
  m = s.getElementsByTagName(o)[0];
  a.async = 1;
  a.src = g;
  m.parentNode.insertBefore(a, m)
})(window, document, 'script', '//www.google-analytics.com/analytics.js', 'ga');

// Creates a default tracker with automatic cookie domain configuration.
ga('create', 'UA-XXXXX-Y', 'auto');

// Sends a pageview hit from the tracker just created.
ga('send', 'pageview');
</script>
<!-- End Google Analytics -->
```

## 备用异步跟踪代码段

以下两部分分别显示了精简版和非精简版的备用异步跟踪代码段。要详细了解哪种代码段适合您，请参阅[将 analytics.js 添加到网站中](https://developers.google.cn/analytics/devguides/collection/analyticsjs?hl=zh-cn)。

### 精简版

```
<!-- Google Analytics -->
<script>
window.ga=window.ga||function(){(ga.q=ga.q||[]).push(arguments)};ga.l=+new Date;
ga('create', 'UA-XXXXX-Y', 'auto');
ga('send', 'pageview');
</script>
<script async src='https://www.google-analytics.com/analytics.js'></script>
<!-- End Google Analytics -->
```

### 非精简版

```
<!-- Google Analytics -->
<script>
// Creates an initial ga() function.
// The queued commands will be executed once analytics.js loads.
window.ga = window.ga || function() {
  (ga.q = ga.q || []).push(arguments)
};

// Sets the time (as an integer) this tag was executed.
// Used for timing hits.
ga.l = +new Date;

// Creates a default tracker with automatic cookie domain configuration.
ga('create', 'UA-XXXXX-Y', 'auto');

// Sends a pageview hit from the tracker just created.
ga('send', 'pageview');
</script>

<!-- Sets the `async` attribute to load the script asynchronously. -->
<script async src='//www.google-analytics.com/analytics.js'></script>
<!-- End Google Analytics -->
```

Except as otherwise noted, the content of this page is licensed under the [Creative Commons Attribution 3.0 License](http://creativecommons.org/licenses/by/3.0/), and code samples are licensed under the [Apache 2.0 License](http://www.apache.org/licenses/LICENSE-2.0). For details, see our [Site Policies](https://developers.google.cn/terms/site-policies?hl=zh-cn). Java is a registered trademark of Oracle and/or its affiliates.

上次更新日期：九月 29, 2016