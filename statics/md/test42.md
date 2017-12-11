# 增强型电子商务

本指南将介绍如何使用 analytics.js 收集增强型电子商务数据。

## 概览

analytics.js 的增强型电子商务插件可让您衡量用户在其购物历程中与电子商务网站上各种产品的互动，包括产品展示、产品点击、查看产品详情、将产品添加到购物车、开始结帐流程、交易以及退款。

### 电子商务插件 (ecommerce.js) 的迁移与兼容性

**重要提示**：在同一媒体资源上，增强型电子商务插件不应与[电子商务 (ecommerce.js)](https://developers.google.cn/analytics/devguides/collection/analyticsjs/ecommerce?hl=zh-cn) 插件一起使用。

如果您之前已实现了电子商务跟踪，现在想要开始使用增强型电子商务跟踪，则有两种选择：

#### 使用新的媒体资源

您可以为新创建的媒体资源添加额外的跟踪器，并为该媒体资源启用增强型电子商务并添加相应代码。请参阅[使用多个跟踪对象](https://developers.google.cn/analytics/devguides/collection/analyticsjs/creating-trackers?hl=zh-cn#working_with_multiple_trackers)，详细了解如何从一个网页向多个媒体资源发送数据。

#### 迁移现有媒体资源

要从[电子商务插件](https://developers.google.cn/analytics/devguides/collection/analyticsjs/ecommerce?hl=zh-cn)迁移到增强型电子商务插件，analytics.js 用户需要移除现有的代码引用，并用增强型电子商务代码取而代之。

如果您现在使用的是 [ga.js](https://developers.google.cn/analytics/devguides/collection/gajs/gaTrackingEcommerce?hl=zh-cn)，则需要先[迁移到 analytics.js](https://developers.google.cn/analytics/devguides/collection/upgrade/reference/gajs-analyticsjs?hl=zh-cn)，然后才能使用增强型电子商务插件。

之前使用 [ecommerce.js](https://developers.google.cn/analytics/devguides/collection/analyticsjs/ecommerce?hl=zh-cn) 插件收集的交易和商品数据不会受迁移的影响，可以继续在对应的媒体资源和配置文件中查看。

## 增强型电子商务数据的类型和操作

您可以使用 analytics.js 发送多种电子商务数据：**展示数据**、**产品数据**、**促销数据**、**操作数据**。

### 展示数据

表示被查看的产品的相关信息。此类数据封装为 `impressionFieldObject` 对象，其中包含以下值：

| 键          | 值类型      | 是否必须提供  | 说明                                       |
| ---------- | -------- | ------- | ---------------------------------------- |
| `id`       | text     | **是\*** | 产品 ID 或 SKU（例如 P67890）。***此字段与 name 字段必须至少设置一个。** |
| `name`     | text     | **是\*** | 产品名称（例如 Android T 恤）。***此字段与 id 字段必须至少设置一个。** |
| `list`     | text     | 否       | 产品所在的列表或集合（例如搜索结果）                       |
| `brand`    | text     | 否       | 与产品关联的品牌（例如 Google）。                     |
| `category` | text     | 否       | 产品所属的类别（例如服装）。可以使用 `/` 作为分隔符来指定最多 5 个层级（例如服装/男装/T 恤）。 |
| `variant`  | text     | 否       | 产品的细分款式（例如黑色）。                           |
| `position` | integer  | 否       | 产品在列表或集合中的位置（例如 2）。                      |
| `price`    | currency | 否       | 产品的价格（例如 29.20）。                         |

### 产品数据

产品数据表示被查看（或添加到购物车等操作）的具体产品。此类数据封装为 `productFieldObject`对象，其中包含以下值：

| 键          | 值类型      | 是否必须提供  | 说明                                       |
| ---------- | -------- | ------- | ---------------------------------------- |
| `id`       | text     | **是\*** | 产品 ID 或 SKU（例如 P67890）。***此字段与 name 字段必须至少设置一个。** |
| `name`     | text     | **是\*** | 产品名称（例如 Android T 恤）。***此字段与 id 字段必须至少设置一个。** |
| `brand`    | text     | 否       | 与产品关联的品牌（例如 Google）。                     |
| `category` | text     | 否       | 产品所属的类别（例如服装）。可以使用 `/` 作为分隔符来指定最多 5 个层级（例如服装/男装/T 恤）。 |
| `variant`  | text     | 否       | 产品的细分款式（例如黑色）。                           |
| `price`    | currency | 否       | 产品的价格（例如 29.20）。                         |
| `quantity` | integer  | 否       | 产品的数量（例如 2）。                             |
| `coupon`   | text     | 否       | 与产品关联的优惠券代码（例如 SUMMER_SALE13）            |
| `position` | integer  | 否       | 产品在列表或集合中的位置（例如 2）。                      |

### 促销数据

表示被查看的促销信息的相关数据。此类数据封装为 `promoFieldObject` 对象，其中包含以下值：

| 键          | 值类型  | 是否必须提供  | 说明                                       |
| ---------- | ---- | ------- | ---------------------------------------- |
| `id`       | text | **是\*** | 促销活动的 ID（例如 PROMO_1234）。***此字段与 name 字段必须至少设置一个。** |
| `name`     | text | **是\*** | 促销活动的名称（例如夏季促销）。***此字段与 id 字段必须至少设置一个。** |
| `creative` | text | 否       | 与促销活动关联的广告素材（例如 summer_banner2）。         |
| `position` | text | 否       | 广告素材的位置（例如 banner_slot_1）。               |

### 操作数据

表示发生的电子商务相关操作的信息。此类数据封装为 `actionFieldObject` 对象，其中包含以下值：

| 键             | 值类型      | 是否必须提供  | 说明                                       |
| ------------- | -------- | ------- | ---------------------------------------- |
| `id`          | text     | **是\*** | 交易 ID（例如 T1234）。***如果操作类型是 purchase 或 refund，则必须提供此值。** |
| `affiliation` | text     | 否       | 发生此交易的商店或关联商户（例如 Google Store）。          |
| `revenue`     | currency | 否       | 与当次交易关联的总收入或总计金额（例如 11.99）。此值可能包含运费、税费或其他要计入 revenue 的总收入调整值。 **注意**：如果不设置 revenue 的值，系统将自动根据同一匹配中所有产品的产品数量和价格字段来计算此值。 |
| `tax`         | currency | 否       | 交易对应的总税费。                                |
| `shipping`    | currency | 否       | 交易对应的运费。                                 |
| `coupon`      | text     | 否       | 在交易中使用的优惠券。                              |
| `list`        | text     | 否       | 关联产品所属的列表。可选参数。                          |
| `step`        | integer  | 否       | 表示结帐流程中某个步骤的数字。对于 `checkout` 操作，可自由选择是否提供此值。 |
| `option`      | text     | 否       | `checkout` 和 `checkout_option` 操作的附加字段，用于描述结帐页面上的选项信息，例如所选的付款方式。 |

### 产品和促销操作

“操作”指定了您发送到 Google Analytics（分析）的产品和促销数据应当如何解读。

| 操作                | 说明                         |
| ----------------- | -------------------------- |
| `click`           | 对某个产品的点击，或是对一个或多个产品的链接的点击。 |
| `detail`          | 查看产品详情。                    |
| `add`             | 将一个或多个产品添加到购物车。            |
| `remove`          | 从购物车中移除一个或多个产品。            |
| `checkout`        | 开始一个或多个产品的结帐流程。            |
| `checkout_option` | 发送某个结帐步骤的选项值。              |
| `purchase`        | 购买一个或多个产品。                 |
| `refund`          | 为一个或多个产品退款。                |
| `promo_click`     | 对内部促销信息的点击。                |

## 具体实现

以下部分将介绍如何实现增强型电子商务插件，以使用 analytics.js 库衡量网站上的电子商务活动。

### 加载电子商务插件

为缩小 analytics.js 库的体积，增强型电子商务跟踪代码不在默认库中提供，而是以一个插件模块的形式提供。在使用该模块前，必须先加载它。

要加载增强型电子商务插件，请使用以下命令：

```
ga('require', 'ec');
```

此命令的执行时间必须是在您创建跟踪器对象**之后**，使用与增强型电子商务相关的任何具体功能**之前**。

#### 发送增强型电子商务数据

插件加载之后，一系列增强型电子商务跟踪专用的新命令将会添加到默认跟踪器中，您将可以开始发送电子商务数据。

- [衡量电子商务活动](https://developers.google.cn/analytics/devguides/collection/analyticsjs/enhanced-ecommerce?hl=zh-cn#measuring-actvities)
- [衡量交易](https://developers.google.cn/analytics/devguides/collection/analyticsjs/enhanced-ecommerce?hl=zh-cn#measuring-transactions)
- [衡量退款](https://developers.google.cn/analytics/devguides/collection/analyticsjs/enhanced-ecommerce?hl=zh-cn#measuring-refunds)
- [衡量结帐流程](https://developers.google.cn/analytics/devguides/collection/analyticsjs/enhanced-ecommerce?hl=zh-cn#measuring-checkout)
- [衡量内部促销](https://developers.google.cn/analytics/devguides/collection/analyticsjs/enhanced-ecommerce?hl=zh-cn#measuring-promos)

**注意**：电子商务数据只能与现有的匹配一起发送，例如 `pageview` 或 `event`。如果您使用电子商务命令但不发送任何匹配，或是发送匹配的时间早于电子商务命令，则电子商务数据将不会发送。

### 衡量电子商务活动

典型的增强型电子商务实现方案将会衡量产品展示以及以下任意操作：

- 对产品链接的点击。
- 查看产品详情。
- 内部促销信息的展示和点击。
- 向购物车中添加产品或从中移除产品。
- 开始产品结帐流程。
- 购买和退款。

#### 衡量展示

使用 `ec:addImpression` 命令来衡量产品展示，并将产品详情添加到 [`impressionFieldObject`](https://developers.google.cn/analytics/devguides/collection/analyticsjs/enhanced-ecommerce?hl=zh-cn#impression-data) 对象中。

例如，以下代码衡量某个产品在搜索结果列表中的展示：

```
ga('ec:addImpression', {            // Provide product details in an impressionFieldObject.
  'id': 'P12345',                   // Product ID (string).
  'name': 'Android Warhol T-Shirt', // Product name (string).
  'category': 'Apparel/T-Shirts',   // Product category (string).
  'brand': 'Google',                // Product brand (string).
  'variant': 'Black',               // Product variant (string).
  'list': 'Search Results',         // Product list (string).
  'position': 1,                    // Product position (number).
  'dimension1': 'Member'            // Custom dimension (string).
});
```

`impressionFieldObject` 对象必须有 `name` 或 `id` 值。其他所有值都非必需，可以不用设置。

#### 衡量操作

使用 `ec:addProduct` 命令来衡量操作（通过 [`productFieldObject`](https://developers.google.cn/analytics/devguides/collection/analyticsjs/enhanced-ecommerce?hl=zh-cn#product-data) 对象来添加产品详情），并使用 `ec:setAction` 命令来指定所执行的[操作](https://developers.google.cn/analytics/devguides/collection/analyticsjs/enhanced-ecommerce?hl=zh-cn#action-types)。

例如，以下代码衡量对搜索结果列表中的产品链接的点击：

```
ga('ec:addProduct', {               // Provide product details in a productFieldObject.
  'id': 'P12345',                   // Product ID (string).
  'name': 'Android Warhol T-Shirt', // Product name (string).
  'category': 'Apparel',            // Product category (string).
  'brand': 'Google',                // Product brand (string).
  'variant': 'Black',               // Product variant (string).
  'position': 1,                    // Product position (number).
  'dimension1': 'Member'            // Custom dimension (string).
});

ga('ec:setAction', 'click', {       // click action.
  'list': 'Search Results'          // Product list (string).
});
```

`productFieldObject` 对象必须有 `name` 或 `id` 值。其他所有值都非必需，可以不用设置。

#### 合并展示和操作数据

既有产品展示又有操作时，可以将两者合并到同一次匹配中进行衡量。

下例显示了如何衡量一次在相关产品部分中的展示以及一次产品详情查看：

```
// The impression from a Related Products section.
ga('ec:addImpression', {            // Provide product details in an impressionFieldObject.
  'id': 'P12345',                   // Product ID (string).
  'name': 'Android Warhol T-Shirt', // Product name (string).
  'category': 'Apparel/T-Shirts',   // Product category (string).
  'brand': 'Google',                // Product brand (string).
  'variant': 'Black',               // Product variant (string).
  'list': 'Related Products',       // Product list (string).
  'position': 1                     // Product position (number).
});

// The product being viewed.
ga('ec:addProduct', {                 // Provide product details in an productFieldObject.
  'id': 'P67890',                     // Product ID (string).
  'name': 'YouTube Organic T-Shirt',  // Product name (string).
  'category': 'Apparel/T-Shirts',     // Product category (string).
  'brand': 'YouTube',                 // Product brand (string).
  'variant': 'gray',                  // Product variant (string).
  'position': 2                       // Product position (number).
});

ga('ec:setAction', 'detail');       // Detail action.
```

### 衡量交易

使用 `ec:setAction` 命令来衡量交易，并将[操作类型](https://developers.google.cn/analytics/devguides/collection/analyticsjs/enhanced-ecommerce?hl=zh-cn#action-types)设为 `purchase`。总收入、税费、运费等交易级详情在 [`actionFieldObject`](https://developers.google.cn/analytics/devguides/collection/analyticsjs/enhanced-ecommerce?hl=zh-cn#action-data) 对象中提供：

```
ga('ec:addProduct', {               // Provide product details in an productFieldObject.
  'id': 'P12345',                   // Product ID (string).
  'name': 'Android Warhol T-Shirt', // Product name (string).
  'category': 'Apparel',            // Product category (string).
  'brand': 'Google',                // Product brand (string).
  'variant': 'black',               // Product variant (string).
  'price': '29.20',                 // Product price (currency).
  'coupon': 'APPARELSALE',          // Product coupon (string).
  'quantity': 1                     // Product quantity (number).
});

ga('ec:setAction', 'purchase', {          // Transaction details are provided in an actionFieldObject.
  'id': 'T12345',                         // (Required) Transaction id (string).
  'affiliation': 'Google Store - Online', // Affiliation (string).
  'revenue': '37.39',                     // Revenue (currency).
  'tax': '2.85',                          // Tax (currency).
  'shipping': '5.34',                     // Shipping (currency).
  'coupon': 'SUMMER2013'                  // Transaction coupon (string).
});
```

如果操作类型是 `purchase` 或 `refund`，则 `actionFieldObject` 对象必须有 `id` 值。其他所有值都非必需，可以不用设置。

### 衡量退款

要为整个交易退款，请设置 `refund` 操作并提供交易 ID：

```
// Refund an entire transaction.
ga('ec:setAction', 'refund', {
  'id': 'T12345'    // Transaction ID is only required field for full refund.
});
```

如果未找到相符的交易，则 `refund` 匹配将不会得到处理。

要衡量部分退款，请设置 `refund` 操作并指定要退款的交易 ID、产品 ID和产品数量：

```
// Refund a single product.
ga('ec:addProduct', {
  'id': 'P12345',       // Product ID is required for partial refund.
  'quantity': 1         // Quantity is required for partial refund.
});

ga('ec:setAction', 'refund', {
  'id': 'T12345',       // Transaction ID is required for partial refund.
});
```

**重要提示**：交易的退款必须在 Google Analytics（分析）中最初报告的交易日期后的 **6 个月**内完成。交易必须是以新的增强型电子商务格式发送。如果您使用过滤器修改交易 ID，请使用未过滤的原始交易 ID 发送退款。

#### 为退款使用非互动事件

如果您需要使用事件来发送退款数据，但该事件不属于通常衡量的网站上行为（即并非由用户发起），则建议您发送[非互动事件](https://developers.google.cn/analytics/devguides/collection/analyticsjs/field-reference?hl=zh-cn#nonInteraction)。这可让跳出率、网站停留时间等指标免受该事件的影响。例如：

```
ga('send', 'event', 'Ecommerce', 'Refund', {'nonInteraction': 1});
```

您只可以衡量启用了增强型电子商务的数据视图（配置文件）中的退款，不能衡量传统[电子商务](https://developers.google.cn/analytics/devguides/collection/analyticsjs/ecommerce?hl=zh-cn)中的退款。

### 衡量结帐流程

为衡量结帐流程中的每个步骤，您需要：

1. 添加跟踪代码，以衡量结帐流程中的每一步。
2. 如果适用，添加跟踪代码以衡量结帐选项。
3. （可选）设置直观易懂的步骤名称以用于结帐渠道报告，方法是在网络界面的管理部分中配置**电子商务设置**。

#### 1. 衡量结帐步骤

对于结帐流程中的每一步，您都需要实现相应的跟踪代码，以便向 Google Analytics（分析）发送数据。

##### `Step` 字段

对于要衡量的每一个结帐步骤，您都应加入 `step` 值。此值用于将结帐操作映射到您在**电子商务设置**中为每个步骤配置的标签。

**注意**：如果您的结帐流程只有一步，或是您没有在**电子商务设置**中配置结帐渠道，则可以不设置 `step`字段。

##### `Option` 字段

在衡量某个结帐步骤时，如果您有关于此步骤的更多信息，则可以为 `checkout` 操作设置 `option` 字段来捕获此信息，例如用户的默认付款方式（如“Visa”）。

##### 衡量某个结帐步骤

要衡量某个结帐步骤，请为每个产品使用 `ec:addProduct`，并使用 `ec:setAction` 来指示操作类型是结帐操作。如果适用，还可以为 `ec:setAction` 附加一个 [`actionFieldObject`](https://developers.google.cn/analytics/devguides/collection/analyticsjs/enhanced-ecommerce?hl=zh-cn#action-data) 对象，以说明该结帐步骤的 `step` 和 `option`。

下例显示了如何衡量结帐流程的第一步（一个产品，拥有关于付款方式的额外信息）：

```
ga('ec:addProduct', {               // Provide product details in an productFieldObject.
  'id': 'P12345',                   // Product ID (string).
  'name': 'Android Warhol T-Shirt', // Product name (string).
  'category': 'Apparel',            // Product category (string).
  'brand': 'Google',                // Product brand (string).
  'variant': 'black',               // Product variant (string).
  'price': '29.20',                 // Product price (currency).
  'quantity': 1                     // Product quantity (number).
});

// Add the step number and additional info about the checkout to the action.
ga('ec:setAction','checkout', {
    'step': 1,
    'option': 'Visa'
});
```

#### 2. 衡量结帐选项

结帐选项可让您衡量关于结帐状态的额外信息。有时您在初始网页浏览发生时衡量了某个结帐步骤，但在用户设置了选项之后，关于此步骤有了新的额外信息，在这种情况下，结帐选项就可以派上用场。例如，用户选择了送货方式。

要衡量结帐选项，请使用 `ec:setAction` 指定 `checkout_option` 操作类型，并加入步骤序号和选项说明信息。

**注意**：您不应设置任何产品或展示数据。

您很可能希望在用户点击进入结帐流程中的下一步时衡量此操作。例如：

```
// (On "Next" button click)
ga('ec:setAction', 'checkout_option', {'step': 2, 'option': 'FedEx'});

ga('send', 'event', 'Checkout', 'Option', {
    hitCallback: function() {
      // advance to next page
});
```

#### 3. 结帐渠道配置

您可以为结帐流程中的每一步指定一个描述性的名称，以在报告中使用。要配置此类名称，请转到 Google Analytics（分析）网络界面的**管理**部分，选择相应数据视图（配置文件），然后点击**电子商务设置**。请按照相应电子商务设置说明，为要跟踪的每个结帐步骤设置标签。

**注意**：如果您不配置结帐步骤名称，它们将会显示为“第 1 步”、“第 2 步”、“第 3 步”等等。

![Google Analytics（分析）网络界面“管理”部分中的“电子商务设置”。开启了电子商务功能，为 4 个结帐渠道步骤指定了标签：1. 检查购物车，2. 填写付款信息，3. 确认订单详情，4. 收据](https://developers.google.cn/analytics/images/devguides/collection/analyticsjs/enhanced-ecommerce-settings.png?hl=zh-cn)**图 1**：电子商务设置 - 结帐渠道

### 衡量内部促销

增强型电子商务插件支持对内部促销信息的展示次数和点击次数进行衡量，例如对网站另一版块中的促销活动进行宣传的横幅。

#### 促销信息展示

内部促销信息的展示一般在网页加载时衡量，并使用 `ec:addPromo` 命令与初始网页浏览一起发送。例如：

```
ga('ec:addPromo', {               // Promo details provided in a promoFieldObject.
  'id': 'PROMO_1234',             // Promotion ID. Required (string).
  'name': 'Summer Sale',          // Promotion name (string).
  'creative': 'summer_banner2',   // Creative (string).
  'position': 'banner_slot1'      // Position  (string).
});
```

**重要提示**：虽然可以为促销信息展示设置操作，但该操作不能是 `promo_click`。如果您要衡量 `promo_click` 操作，应在衡量促销信息展示之后，在单独的匹配中衡量该操作。

#### 促销信息点击

内部促销信息的点击可以通过设置 `promo_click` 操作来衡量。例如：

```
// Identify the promotion that was clicked.
ga('ec:addPromo', {
  'id': 'PROMO_1234',
  'name': 'Summer Sale',
  'creative': 'summer_banner2',
  'position': 'banner_slot1'
});

// Send the promo_click action with an event.
ga('ec:setAction', 'promo_click');
ga('send', 'event', 'Internal Promotions', 'click', 'Summer Sale');
```

**重要提示**：您不应随促销信息点击操作发送产品数据。如果需要发送产品数据，应在单独的匹配中发送。

例如，要衡量产品详情页面上的一次展示和一次促销信息点击，您需要随初始网页浏览发送产品和展示数据，然后在单独的事件中发送推广信息点击数据：

```
// 1. Send product and impression data with pageview.

ga('ec:addProduct', {
  'id': 'P12345',                   // Product ID (string).
  'name': 'Android Warhol T-Shirt', // Product name (string).
  'category': 'Apparel',            // Product category (string).
  'brand': 'Google',                // Product brand (string).
  'variant': 'Black',               // Product variant (string).
  'position': 1,                    // Product position (number).
});

// The impression from the Related Products section.
ga('ec:addImpression', {
  'id': 'P12345',                   // Product ID (string).
  'name': 'Android Warhol T-Shirt', // Product name (string).
  'category': 'Apparel/T-Shirts',   // Product category (string).
  'brand': 'Google',                // Product brand (string).
  'variant': 'Black',               // Product variant (string).
  'list': 'Related Products',       // Product list (string).
  'position': 1,                    // Product position (number).
});

ga('ec:setAction', 'detail');       // Detail action.

ga('send', 'pageview');             // Send the product data with initial pageview.

// 2. Send the promo click data when the promo click occurs.

// Call this function when promo click occurs.
function onPromoClick() {
  ga('ec:addPromo', {
    'id': 'PROMO_1234',
    'name': 'Summer Sale',
    'creative': 'summer_banner2',
    'position': 'banner_slot1'
  });

  // Send the promo_click action with an event.
  ga('ec:setAction', 'promo_click');
  ga('send', 'event', 'Internal Promotions', 'click', 'Summer Sale');
}
```

[`promoFieldObject`](https://developers.google.cn/analytics/devguides/collection/analyticsjs/enhanced-ecommerce?hl=zh-cn#promo-data) 对象必须有 `name` 或 `id` 值。其他所有值都非必需，可以不用设置。

## 完整示例

以下代码段显示了如何使用增强型电子商务插件来衡量一个产品从初次展示到交易的完整电子商务生命周期。

### 衡量产品展示

在此例中，用户在搜索结果列表中第一次看到某个产品。为衡量此次产品展示，请使用 `ec:addImpression` 命令，并在 `impressionFieldObject` 对象中提供产品详情：

```
ga('create', 'UA-XXXXX-Y');
ga('require', 'ec');

ga('ec:addImpression', {
  'id': 'P12345',                   // Product details are provided in an impressionFieldObject.
  'name': 'Android Warhol T-Shirt',
  'category': 'Apparel/T-Shirts',
  'brand': 'Google',
  'variant': 'black',
  'list': 'Search Results',
  'position': 1                     // 'position' indicates the product position in the list.
});

ga('ec:addImpression', {
  'id': 'P67890',
  'name': 'YouTube Organic T-Shirt',
  'category': 'Apparel/T-Shirts',
  'brand': 'YouTube',
  'variant': 'gray',
  'list': 'Search Results',
  'position': 2
});

ga('send', 'pageview');              // Send product impressions with initial pageview.
```

### 衡量产品点击

接下来，用户点击了列表中的该产品以查看其详情，表现出了对该产品的兴趣。

为衡量此次产品点击，请使用 `ec:addProduct` 和 `ec:setAction` 命令：

```
// Called when a link to a product is clicked.
function onProductClick() {
  ga('ec:addProduct', {
    'id': 'P12345',
    'name': 'Android Warhol T-Shirt',
    'category': 'Apparel',
    'brand': 'Google',
    'variant': 'black',
    'position': 1
  });
  ga('ec:setAction', 'click', {list: 'Search Results'});

  // Send click with an event, then send user to product page.
  ga('send', 'event', 'UX', 'click', 'Results', {
    hitCallback: function() {
      document.location = '/product_details?id=P12345';
    }
  });
}
```

产品链接可按以下方式实现：

```
<a href="/next-page.html"
   onclick="onProductClick(); return !ga.loaded;">Android Warhol T-Shirt</a>
```

### 衡量产品详情查看

点击列表中的产品后，用户查看了产品详情页面。

为衡量此次产品详情查看操作，请使用 `ec:addProduct` 和 `ec:setAction` 命令来指定 `detail` 操作：

```
ga('create', 'UA-XXXXX-Y');
ga('require', 'ec');

ga('ec:addProduct', {
  'id': 'P12345',
  'name': 'Android Warhol T-Shirt',
  'category': 'Apparel',
  'brand': 'Google',
  'variant': 'black'
});

ga('ec:setAction', 'detail');

ga('send', 'pageview');       // Send product details view with the initial pageview.
```

### 衡量购物车商品添加或移除

用户将商品添加到购物车中，表现出了购买意愿。

为衡量向购物车中添加产品或将产品从中移除的操作，请使用 `ec:addProduct` 命令并将操作类型设置为 `add` 或 `remove`：

```
// Called when a product is added to a shopping cart.
function addToCart(product) {
  ga('ec:addProduct', {
    'id': product.id,
    'name': product.name,
    'category': product.category,
    'brand': product.brand,
    'variant': product.variant,
    'price': product.price,
    'quantity': product.qty
  });
  ga('ec:setAction', 'add');
  ga('send', 'event', 'UX', 'click', 'add to cart');     // Send data using an event.
}
```

### 衡量结帐流程

现在用户已准备好开始结帐流程，在此例中结帐流程将由 2 步组成，每一步都有自己的页面：

1. 添加付款明细 (payment.html)。
2. 添加送货明细 (shipping.html)。

如果适用，请确保您已在网络界面“管理”部分的**电子商务设置**下恰当[配置结帐渠道](https://developers.google.cn/analytics/devguides/collection/analyticsjs/enhanced-ecommerce?hl=zh-cn#checkout-funnel)。例如：

![Google Analytics（分析）网络界面“管理”部分中的“电子商务设置”。开启了电子商务功能，为 2 个结帐渠道步骤指定了标签：1. 付款明细，2. 送货明细](https://developers.google.cn/analytics/images/devguides/collection/analyticsjs/enhanced-ecommerce-settings-checkout.png?hl=zh-cn)**图 2**：电子商务设置 - 结帐渠道

#### 第 1 步 - 付款

为衡量结帐流程的第一步，请为购物车中的每个产品使用 `ec:addProduct` 命令，并使用 `ec:setAction` 将操作类型设为 `checkout`。`ec:setAction` 可以附加一个 `actionFieldObject` 对象，以便说明结帐步骤序号并通过 `option` 字段提供此用户的默认付款方式等额外信息：

```
ga('create', 'UA-XXXXX-Y');
ga('require', 'ec');

/**
 * Called when the user begins the checkout process.
 * @param {Array} cart An array representing the user's shopping cart.
 */
function checkout(cart) {
  for(var i = 0; i < cart.length; i++) {
    var product = cart[i];
    ga('ec:addProduct', {
      'id': product.id,
      'name': product.name,
      'category': product.category,
      'brand': product.brand,
      'variant':  product.variant,
      'price': product.price,
      'quantity': product.qty
    });
  }
}

// In the case of checkout actions, an additional actionFieldObject can
// specify a checkout step and option.
ga('ec:setAction','checkout', {
    'step': 1,            // A value of 1 indicates this action is first checkout step.
    'option': 'Visa'      // Used to specify additional info about a checkout stage, e.g. payment method.
});
ga('send', 'pageview');   // Pageview for payment.html
```

#### 第 2 步 - 送货

为衡量结帐流程的第二步，请为购物车中的每个产品使用 `ec:addProduct` 命令，并使用 `ec:setAction` 将操作类型设为 checkout。在此例中，我们在发送初始网页浏览时并没有掌握送货方式这一额外信息，因此将使用 `ec:setAction` 命令来指定 `checkout_option` 操作，以便处理这一额外信息。

```
Measure checkout step 2:
ga('create', 'UA-XXXXX-Y');
ga('require', 'ec');

/**
 * Called when the user begins the checkout process.
 * @param {Array} cart An array representing the user's shopping cart.
 */
function checkout(cart) {
  for(var i = 0; i < cart.length; i++) {
    var product = cart[i];
    ga('ec:addProduct', {
      'id': product.id,
      'name': product.name,
      'category': product.category,
      'brand': product.brand,
      'variant':  product.variant,
      'price': product.price,
      'quantity': product.qty
    });
  }
}

ga('ec:setAction','checkout', {'step': 2});
ga('send', 'pageview');     // Pageview for shipping.html

// Called when user has completed shipping options.
function onShippingComplete(stepNumber, shippingOption) {
  ga('ec:setAction', 'checkout_option', {
    'step': stepNumber,
    'option': shippingOption
  });

  ga('send', 'event', 'Checkout', 'Option', {
     hitCallback: function() {
       // Advance to next page.
     }
  });
}
```

表单可按以下方式实现：

```
<a href="/next-page.html"
   onclick="onShippingComplete(2, 'FedEx'); return !ga.loaded;">Continue</a>
```

### 衡量交易

最后，用户完成了结帐流程，并提交了其购买订单。

为衡量一个或多个产品的销售，请使用 `ec:addProduct` 添加每个产品，然后使用 `ec:setAction` 指定 `purchase` 操作。总收入、税费等交易级信息可以通过 `actionFieldObject` 对象指定。例如：

```
ga('create', 'UA-XXXXX-Y');
ga('require', 'ec');

ga('ec:addProduct', {
  'id': 'P12345',
  'name': 'Android Warhol T-Shirt',
  'category': 'Apparel',
  'brand': 'Google',
  'variant': 'black',
  'price': '29.20',
  'quantity': 1
});

// Transaction level information is provided via an actionFieldObject.
ga('ec:setAction', 'purchase', {
  'id': 'T12345',
  'affiliation': 'Google Store - Online',
  'revenue': '37.39',
  'tax': '2.85',
  'shipping': '5.34',
  'coupon': 'SUMMER2013'    // User added a coupon at checkout.
});

ga('send', 'pageview');     // Send transaction data with initial pageview.
```

### 指定局部货币

默认情况下，您可以通过 Google Analytics（分析）的管理网络界面为所有交易和商品配置一种通用的全局货币。系统默认会为所有商品和交易使用全局货币。对于使用多种货币进行交易的网站，电子商务插件允许您为某次交易指定局部货币。

局部货币必须按 `ISO 4217` 标准指定。如需支持的完整转换货币列表，请参阅[货币代码参考](https://developers.google.cn/analytics/devguides/platform/features/currencies?hl=zh-cn)文档。

局部货币使用 `currencyCode` 跟踪器属性来指定。例如，此跟踪器将以欧元发送货币金额值：

```
ga('create', 'UA-XXXXX-Y');
ga('require', 'ec');

ga('set', 'currencyCode', 'EUR'); // Set tracker currency to Euros.

ga('ec:addProduct', {
  'id': 'P12345',
  'name': 'Android Warhol T-Shirt',
  'category': 'Apparel',
  'brand': 'Google',
  'variant': 'black',
  'price': '21.89',
  'quantity': 1
});

ga('ec:setAction', 'purchase', {
  id: 'T12345',
  affiliation: 'Google Store - Online',
  revenue: '28.03',
  tax: '2.14',
  shipping: '4.00',
  coupon: 'SUMMER2013'
});

ga('send', 'pageview');
```

要详细了解 Google Analytics（分析）中的货币转换机制，请参阅电子商务功能参考中的[多种货币](https://developers.google.cn/analytics/devguides/platform/features/ecommerce?hl=zh-cn#specifying-currencies)部分。

## 相关资源

- [Google Analytics（分析）帮助中的“增强型电子商务”页面](https://support.google.com/analytics/answer/6166254?hl=zh-cn)
- [增强型电子商务演示](https://ga-dev-tools.appspot.com/enhanced-ecommerce/?hl=zh-cn)

Except as otherwise noted, the content of this page is licensed under the [Creative Commons Attribution 3.0 License](http://creativecommons.org/licenses/by/3.0/), and code samples are licensed under the [Apache 2.0 License](http://www.apache.org/licenses/LICENSE-2.0). For details, see our [Site Policies](https://developers.google.cn/terms/site-policies?hl=zh-cn). Java is a registered trademark of Oracle and/or its affiliates.

上次更新日期：二月 13, 2017