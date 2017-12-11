# 电子商务跟踪

本指南将介绍如何使用 analytics.js 收集电子商务数据。

## 概览

通过电子商务跟踪，您可以衡量网站产生的交易次数和收入。在典型的电子商务网站上，当用户在浏览器中点击“购买”按钮时，用户的购买信息就会发送给执行交易的网络服务器。如果成功，服务器会将用户重定向至提供交易详情和购买收据的“谢谢”页面或收据页面。您可以使用 analytics.js 库将“谢谢”页面中的电子商务数据发送到 Google Analytics（分析）。

**重要提示**：电子商务插件不应与[增强型电子商务 (ec.js)](https://developers.google.cn/analytics/devguides/collection/analyticsjs/enhanced-ecommerce?hl=zh-cn) 插件一起使用。

您可以使用 analytics.js 发送两种类型的电子商务数据：**交易**数据和**商品**数据。

### 交易数据

交易是指发生在您网站上的完整交易，包括以下值：

| 键             | 值类型      | 必填    | 说明                                       |
| ------------- | -------- | ----- | ---------------------------------------- |
| `id`          | text     | **是** | 交易 ID（例如 1234）。                          |
| `affiliation` | text     | 否     | 发生此交易的商店或联属机构（例如 Acme Clothing）。         |
| `revenue`     | currency | 否     | 与当次交易关联的总收入或总计金额（例如 11.99）。此值包含运费、税费或其他要计入 revenue 的总收入调整值。 |
| `shipping`    | currency | 否     | 指定交易的总运费（例如 5）。                          |
| `tax`         | currency | 否     | 指定交易的税款总额（例如 1.29）。                      |

### 商品数据

商品指购物车里的单款产品，包括以下值：

| 键          | 值类型      | 必填    | 说明                                       |
| ---------- | -------- | ----- | ---------------------------------------- |
| `id`       | text     | **是** | 交易 ID。此 ID 将商品与其所属的交易关联在一起（例如 1234）。     |
| `name`     | text     | **是** | 商品名称（例如粉色绒毛小兔）。                          |
| `sku`      | text     | 否     | 指定 SKU 或商品代码（例如 SKU47）。                  |
| `category` | text     | 否     | 商品所属类别（例如聚会玩具）。                          |
| `price`    | currency | 否     | 每件商品的单价（例如 11.99）。                       |
| `quantity` | integer  | 否     | 在交易中购买的商品数量。如果传递到此字段的是非整数值（例如 1.5），将舍入为最接近的整数值。 |

## 实现

您通常应在用户完成结帐过程后马上实现电子商务跟踪。这通常发生在“谢谢”页面上。在获得电子商务数据并准备好发送给 Google Analytics（分析）后，您应完成以下几个步骤：

- [加载电子商务插件](https://developers.google.cn/analytics/devguides/collection/analyticsjs/ecommerce?hl=zh-cn#loadit)
- [添加交易](https://developers.google.cn/analytics/devguides/collection/analyticsjs/ecommerce?hl=zh-cn#addTrans)
- [添加商品](https://developers.google.cn/analytics/devguides/collection/analyticsjs/ecommerce?hl=zh-cn#addItem)
- [发送数据](https://developers.google.cn/analytics/devguides/collection/analyticsjs/ecommerce?hl=zh-cn#sendingData)
- [清除数据](https://developers.google.cn/analytics/devguides/collection/analyticsjs/ecommerce?hl=zh-cn#clearingData)

### 加载电子商务插件

为减小 analytics.js 库的规模，增强型电子商务跟踪不在默认库中提供，而是以需要在使用前加载的插件模块的形式提供。

要加载电子商务插件，请使用以下命令：

```
ga('require', 'ecommerce');
```

此命令必须是在您创建跟踪器对象**之后**，使用任何电子商务相关的具体功能**之前**执行。

加载后，系统将向默认跟踪器添加几个电子商务跟踪专用的新命令。

### 添加交易

插件加载后就会创建透明的购物车对象。您可以将交易和商品数据添加到购物车，并在完全配置后一次性发送全部数据。

您可以使用 `ecommerce:addTransaction` 命令向购物车添加交易数据：

```
ga('ecommerce:addTransaction', {
  'id': '1234',                     // Transaction ID. Required.
  'affiliation': 'Acme Clothing',   // Affiliation or store name.
  'revenue': '11.99',               // Grand Total.
  'shipping': '5',                  // Shipping.
  'tax': '1.29'                     // Tax.
});
```

### 添加商品

下一步，要向购物车添加商品，您可以使用 `ecommerce:addItem` 命令：

```
ga('ecommerce:addItem', {
  'id': '1234',                     // Transaction ID. Required.
  'name': 'Fluffy Pink Bunnies',    // Product name. Required.
  'sku': 'DD23444',                 // SKU/code.
  'category': 'Party Toys',         // Category or variation.
  'price': '11.99',                 // Unit price.
  'quantity': '1'                   // Quantity.
});
```

### 发送数据

最后，在购物车中配置所有电子商务数据后，您可以使用 `ecommerce:send` 命令向 Google Analytics（分析）发送数据：

```
ga('ecommerce:send');
```

此命令将仔细检查购物车中的每笔交易和每件商品，并将相应的数据发送给 Google Analytics（分析）。完成后，系统将清空购物车并准备发送新交易的数据。如果发出的是之前的 `ecommerce:send`命令，系统只会发送新的交易和商品数据。

**请注意**：虽然大部分的实现方式都会同时发送交易和商品数据，但您也可以只发送交易数据而不发送商品数据，或者只发送商品数据而不发送交易数据。如果您发送商品匹配而不发送交易信息，系统将自动发送只有 ID 的交易匹配。

### 清除数据

如果需要手动清除购物车中的所有交易和商品，可使用以下命令：

```
ga('ecommerce:clear');
```

### 指定局部货币

默认情况下，您可以通过 Google Analytics（分析）的管理网络界面为所有交易和商品配置一种通用的全局货币。系统默认会为所有商品和交易使用全局货币。使用多种货币开展交易的网站可通过电子商务插件指定交易和个别产品的局部货币。

局部货币必须按 `ISO 4217` 标准指定。如需支持的完整转换货币列表，请参阅[货币代码参考](https://developers.google.cn/analytics/devguides/platform/features/currencies?hl=zh-cn)文档。

要设置特定交易及其所有商品的局部货币，您只需为交易指定该货币即可：

```
ga('ecommerce:addTransaction', {
  'id': '1234',
  'affiliation': 'Acme Clothing',
  'revenue': '11.99',
  'shipping': '5',
  'tax': '1.29',
  'currency': 'EUR'  // local currency code.
});
```

最后，您还可以按商品指定货币：

```
  ga('ecommerce:addItem', {
    'id': '1234',
    'name': 'Fluffy Pink Bunnies',
    'sku': 'DD23444',
    'category': 'Party Toys',
    'price': '11.99',
    'quantity': '1',
    'currency': 'GBP' // local currency code.
  });
```

要详细了解 Google Analytics（分析）中的货币转换机制，请参阅电子商务功能参考中的[多种货币](https://developers.google.cn/analytics/devguides/platform/features/ecommerce?hl=zh-cn#specifying-currencies)部分。

### 多跟踪器支持

如果您在页面上实现了多个（有名称的）跟踪器，您也可以使用电子商务插件。插件的工作方式与默认跟踪器完全相同，唯一的区别在于格式：`trackerName.pluginName:method`。例如，假设您创建了名为 `myTracker` 的跟踪器：

```
ga('create', 'UA-XXXXX-Y', 'auto', {'name': 'myTracker'});
```

然后，您应使用以下命令为该已命名的跟踪器加载电子商务插件：

```
ga('myTracker.require', 'ecommerce');
```

要发送交易，您可以创建交易对象并按如下所示将其传递给已命名的跟踪器：

```
var transaction = {
  'id': '1234',                    // Transaction ID.
  'affiliation': 'Acme Clothing',  // Affiliation or store name.
  'revenue': '11.99',              // Grand Total.
  'shipping': '5' ,                // Shipping.
  'tax': '1.29'                    // Tax.
};

ga('myTracker.ecommerce:addTransaction', transaction);
```

通过使用此语法，交易对象可用在多个跟踪器上。

最后，您应按如下方式发送交易数据：

```
ga('myTracker.ecommerce:send');
```

## 示例

大多数电子商务网站在服务器上执行交易，但 analytics.js 库是从浏览器发送数据到 Google Analytics（分析）。因此，为了正确发送电子商务数据到 Google Analytics（分析），服务器与客户端之间必须进行一定的协作。

大部分电子商务网站都使用服务器端模板引擎呈现“谢谢”页面。在这种情况下，您应向服务器端模板添加电子商务跟踪代码，并使用服务器逻辑来以动态方式将电子商务数据值写入最终页面。以下是在 PHP 中的代码示例。

在 PHP 中，您通常应使用某种形式来呈现电子商务数据。在以下示例中，数据存储在关联数组内：

```
<?php
// Transaction Data
$trans = array('id'=>'1234', 'affiliation'=>'Acme Clothing',
               'revenue'=>'11.99', 'shipping'=>'5', 'tax'=>'1.29');

// List of Items Purchased.
$items = array(
  array('sku'=>'SDFSDF', 'name'=>'Shoes', 'category'=>'Footwear', 'price'=>'100', 'quantity'=>'1'),
  array('sku'=>'123DSW', 'name'=>'Sandles', 'category'=>'Footwear', 'price'=>'87', 'quantity'=>'1'),
  array('sku'=>'UHDF93', 'name'=>'Socks', 'category'=>'Footwear', 'price'=>'5.99', 'quantity'=>'2')
);
?>
```

第一步，编写相应的逻辑以将电子商务数据转换为 analytics.js 要求的 JavaScript 字符串：

```
<?php
// Function to return the JavaScript representation of a TransactionData object.
function getTransactionJs(&$trans) {
  return <<<HTML
ga('ecommerce:addTransaction', {
  'id': '{$trans['id']}',
  'affiliation': '{$trans['affiliation']}',
  'revenue': '{$trans['revenue']}',
  'shipping': '{$trans['shipping']}',
  'tax': '{$trans['tax']}'
});
HTML;
}

// Function to return the JavaScript representation of an ItemData object.
function getItemJs(&$transId, &$item) {
  return <<<HTML
ga('ecommerce:addItem', {
  'id': '$transId',
  'name': '{$item['name']}',
  'sku': '{$item['sku']}',
  'category': '{$item['category']}',
  'price': '{$item['price']}',
  'quantity': '{$item['quantity']}'
});
HTML;
}
?>
```

然后，在 `` 代码内添加额外的 PHP 逻辑，以动态方式输出交易和商品数据：

```
<!-- Begin HTML -->
<script>
ga('require', 'ecommerce');

<?php
echo getTransactionJs($trans);

foreach ($items as &$item) {
  echo getItemJs($trans['id'], $item);
}
?>

ga('ecommerce:send');
</script>
```

在 PHP 脚本完成执行后，analytics.js 所需的交易和商品数据将输出至页面。一旦页面上的 JavaScript 在浏览器中运行，所有的电子商务数据都将发送至 Google Analytics（分析）。

## 货币类型

默认货币类型可通过管理界面配置。当您使用 analytics.js 发送货币值时，该值代表的是总货币值。

货币整数和小数部分之间可使用小数点作为分隔符。值最多可精确到小数点后 6 位。下面列举了一个可在货币字段中使用的有效值：

```
1000.000001

```

货币值发送到 Google Analytics（分析）后，首位数字、字符 `-` 号或 `.`（小数点）之前的所有文字都将被移除。因此：

```
$-55.00

```

将变为：

```
-55.00

```

Except as otherwise noted, the content of this page is licensed under the [Creative Commons Attribution 3.0 License](http://creativecommons.org/licenses/by/3.0/), and code samples are licensed under the [Apache 2.0 License](http://www.apache.org/licenses/LICENSE-2.0). For details, see our [Site Policies](https://developers.google.cn/terms/site-policies?hl=zh-cn). Java is a registered trademark of Oracle and/or its affiliates.

上次更新日期：九月 29, 2016