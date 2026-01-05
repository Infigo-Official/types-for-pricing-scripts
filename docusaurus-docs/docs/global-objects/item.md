---
id: item
title: Item
sidebar_label: Item
sidebar_position: 1
---

# Item

The `Item` object represents the product variant being priced. It contains all product information, attributes, pricing data, and methods for file handling and attribute management.

---

## Pricing Properties

| Property | Type | Description |
|----------|------|-------------|
| `Price` | `number` | The standard product variant price in the base currency. Base price before any adjustments. |
| `OldPrice` | `number` | Previous price for comparison or discount display |
| `UnitPrice` | `number` | Calculated unit price. For product scripts: variant price. For checkout attribute scripts: price per unit including discounts. |
| `FinalPrice` | `number` | Final calculated price including all discounts and adjustments. For products: variant price × quantity. For checkout attributes: total after all rules. |
| `ProductCost` | `number` | The actual cost to produce or acquire the product. Used for margin calculations. |
| `SpecialPrice` | `number \| null` | Promotional price if active, null otherwise |
| `SpecialPriceStartDate` | `Date \| null` | Start date for special pricing period |
| `SpecialPriceEndDate` | `Date \| null` | End date for special pricing period |
| `AdditionalShippingCharge` | `number` | Extra shipping fee specific to this item |

---

## Product Information

| Property | Type | Description |
|----------|------|-------------|
| `ProductName` | `string` | Product display name shown to customers |
| `Sku` | `string` | Stock Keeping Unit - unique product identifier |
| `ActualSku` | `string` | SKU based on current attribute combination |
| `Categories` | `string[]` | Array of category names this product belongs to |
| `Tags` | `string[]` | Array of tag names associated with this product |
| `Quantity` | `number` | Order quantity for this item |
| `PackQuantity` | `number` | Quantity divided by OrderPackQuantity (number of packs) |
| `QuantitySelectorMode` | `number` | How quantity selection is handled (1=units, 2=packs) |

---

## Dimensions & Weight

| Property | Type | Description |
|----------|------|-------------|
| `Weight` | `number` | Item weight in configured unit (grams or ounces) |
| `CanSetWeight` | `boolean` | Whether weight can be modified for this item |
| `Width` | `number` | Item width in configured unit (inches or cm) |
| `Height` | `number` | Item height in configured unit (inches or cm) |
| `Length` | `number` | Item length in configured unit (inches or cm) |

---

## Customer Information

| Property | Type | Description |
|----------|------|-------------|
| `Email` | `string` | Customer email address |
| `CustomerRoles` | `string[]` | Array of customer role system names |
| `Department` | `string` | Customer's department name |
| `DiscountCode` | `string` | Currently applied discount code value |

---

## Batch & Pages

| Property | Type | Description |
|----------|------|-------------|
| `IsBatch` | `boolean` | Whether this is a batch job |
| `NumberOfPages` | `number` | Number of pages (-1 if not valid) |
| `NumberOfRecords` | `number` | Number of records (-1 if not valid) |
| `PricePerRecord` | `number` | Price per record (-1 if not valid) |

---

## Attributes & Tiers

| Property | Type | Description |
|----------|------|-------------|
| `Attributes` | [`Attribute[]`](#attribute-properties) | Array of product attributes |
| `PricingTiers` | [`Tier[]`](#tier-properties) | Quantity-based pricing tiers |
| `BatchTiers` | [`Tier[]`](#tier-properties) | Batch pricing tiers (same structure as PricingTiers) |

---

## Cart & Order Items

| Property | Type | Description |
|----------|------|-------------|
| `OtherOrderItems` | `Item[]` | Array of other items using the same pricing script |
| `CartItems` | `Item[]` | Alias of OtherOrderItems |
| `OrderItemIndex` | `number` | Index of this item in order array (0 if not in array) |
| `CartItemIndex` | `number` | Index of this item in cart array (-1 if not in array) |
| `IsInOtherOrderItems` | `boolean` | Whether this item is in the other order items array |

---

## Versions

| Property | Type | Description |
|----------|------|-------------|
| `Versions` | [`ItemVersion[]`](#itemversion-properties) | Array of job versions |
| `NumberOfVersions` | `number` | Count of versions |
| `IsVersion` | `boolean` | Whether this is a version of a job |
| `VersionsSumQuantity` | `number` | Sum of all quantities across all versions |

---

## Methods

### getFileInfo()

Get information about an uploaded file.

```javascript
getFileInfo(attributeId, readContent)
```

**Parameters:**
- `attributeId` (string) - ID of the file upload attribute
- `readContent` (boolean) - Whether to read file content

**Returns:** [`FileInfo`](#fileinfo-properties)

**Example:**
```javascript
var file = Item.getFileInfo("artwork", true);
if (!file.Error && file.Size > 0) {
    debug("File type: " + file.MimeType);
    debug("Pages: " + file.NumberOfPages);
}
```

---

### getAttributeValue()

Shortcut method to retrieve an attribute value by name.

```javascript
getAttributeValue(attributeName)
```

**Parameters:**
- `attributeName` (string) - Name of the attribute

**Returns:** `string` - The selected attribute value

**Example:**
```javascript
var size = Item.getAttributeValue("Size");
var color = Item.getAttributeValue("Color");
debug("Selected: " + size + ", " + color);
```

---

### setAttributeValue()

Set an attribute value permanently.

```javascript
setAttributeValue(attributeName, value)
```

**Parameters:**
- `attributeName` (string) - Name of the attribute
- `value` (string) - Value to set

**Example:**
```javascript
// Auto-select shipping based on quantity
if (Item.Quantity > 1000) {
    Item.setAttributeValue("Shipping", "Freight");
}
```

---

### getGlobalFileContent()

Get file information for a configurable file from Global Data.

```javascript
getGlobalFileContent(filename)
```

**Parameters:**
- `filename` (string) - Name of the file in Global Data

**Returns:** [`FileInfo`](#fileinfo-properties)

**Example:**
```javascript
var fileInfo = Item.getGlobalFileContent("pricing-rules.csv");
if (!fileInfo.Error && fileInfo.Content) {
    for (var i = 0; i < fileInfo.Content.length; i++) {
        debug(fileInfo.Content[i]);
    }
}
```

---

### getGlobalFileCsvContent()

Get CSV file content directly as a 2D array from Global Data. This is the preferred method for loading CSV files.

```javascript
getGlobalFileCsvContent(filename)
```

**Parameters:**
- `filename` (string) - Name of the CSV file in Global Data

**Returns:** `string[][] | null` - 2D array of CSV content, or null if file doesn't exist

**Example:**
```javascript
var csvData = Item.getGlobalFileCsvContent("pricing.csv");
if (csvData && csvData.length > 1) {
    var headers = csvData[0];
    debug("Columns: " + headers.join(", "));

    // Process data rows (skip header)
    for (var i = 1; i < csvData.length; i++) {
        var row = csvData[i];
        debug("Row " + i + ": " + row.join(", "));
    }
}
```

---

## Type Definitions

### Attribute Properties

Each item in the `Attributes` array contains:

| Property | Type | Description |
|----------|------|-------------|
| `Key` | `string` | Unique key/name identifier for this attribute |
| `Prompt` | `string` | Display text shown to customers |
| `IsRequired` | `boolean` | Whether attribute must be selected |
| `Value` | `string` | Currently selected value |
| `Type` | `string` | Type/category of attribute |
| `Id` | `number` | Unique numeric identifier |
| `Values` | [`AttributeValue[]`](#attributevalue-properties) | Available values for this attribute |
| `PriceAdjustment` | `number` | Price adjustment for selected value |
| `PriceAdjustmentIsPercentage` | `boolean` | Whether adjustment is percentage-based |
| `WeightAdjustment` | `number` | Weight adjustment for selected value |
| `LengthAdjustment` | `number` | Length adjustment for selected value |
| `WidthAdjustment` | `number` | Width adjustment for selected value |
| `HeightAdjustment` | `number` | Height adjustment for selected value |

---

### AttributeValue Properties

Each item in an attribute's `Values` array contains:

| Property | Type | Description |
|----------|------|-------------|
| `Value` | `string` | Display value shown to customers |
| `Id` | `string` | Unique identifier for this value |
| `PriceAdjustment` | `number` | Price adjustment amount |
| `PriceAdjustmentIsPercentage` | `boolean` | Whether adjustment is percentage-based |
| `WeightAdjustment` | `number` | Weight adjustment amount |
| `LengthAdjustment` | `number` | Length adjustment amount |
| `WidthAdjustment` | `number` | Width adjustment amount |
| `HeightAdjustment` | `number` | Height adjustment amount |
| `UseTierPriceAdjustment` | `boolean` | Whether to use tier-based adjustments |
| `TierPriceAdjustments` | [`Tier[]`](#tier-properties) | Tier-based price adjustments |

---

### Tier Properties

Each item in the `PricingTiers` or `BatchTiers` array contains:

| Property | Type | Description |
|----------|------|-------------|
| `Quantity` | `number` | Minimum quantity threshold for this tier |
| `Price` | `number` | Unit price at this tier |
| `CustomerRole` | `string` | Customer role this tier applies to (empty = all roles) |

---

### FileInfo Properties

The `getFileInfo()` method returns an object with:

| Property | Type | Description |
|----------|------|-------------|
| `MimeType` | `string` | File MIME type (e.g., `"application/pdf"`) |
| `Size` | `number` | File size in bytes |
| `NumberOfPages` | `number` | Page count for PDFs (within 10MB limit) |
| `Dimensions` | [`PageSize[]`](#pagesize-properties) | Array of page dimensions |
| `NumberOfRecords` | `number` | Line count for text/CSV files |
| `Content` | `string[]` | Array of lines (if readContent=true, max 50KB) |
| `Error` | `string` | Error message (empty if successful) |

---

### PageSize Properties

Each item in the `Dimensions` array contains:

| Property | Type | Description |
|----------|------|-------------|
| `Width` | `number` | Page width in points |
| `Height` | `number` | Page height in points |

---

### ItemVersion Properties

Each item in the `Versions` array contains:

| Property | Type | Description |
|----------|------|-------------|
| `JobId` | `string` | Unique job identifier for this version |
| `CustomName` | `string` | Human-readable version name |
| `Quantity` | `number` | Quantity for this specific version |

---

## Complete Example

```javascript
function calculatePrice() {
    var price = Item.Price;

    // Check for special pricing
    var now = new Date();
    if (Item.SpecialPrice && Item.SpecialPriceStartDate && Item.SpecialPriceEndDate) {
        if (now >= Item.SpecialPriceStartDate && now <= Item.SpecialPriceEndDate) {
            price = Item.SpecialPrice;
            debug("Special price applied: " + price);
        }
    }

    // Get attribute values
    var size = Item.getAttributeValue("Size");
    var material = Item.getAttributeValue("Material");
    debug("Size: " + size + ", Material: " + material);

    // Check file upload
    var file = Item.getFileInfo("artwork", false);
    if (!file.Error && file.NumberOfPages > 10) {
        var extraPages = file.NumberOfPages - 10;
        price = price + (extraPages * 0.50);
        debug("Added " + extraPages + " extra page fees");
    }

    // Apply tier pricing
    var tier = HelperMethods.FindTier(Item.Quantity, Item.PricingTiers, Item.CustomerRoles);
    if (tier) {
        price = tier.Price;
        debug("Tier price applied: " + price);
    }

    // Add attribute adjustments
    var adjustment = HelperMethods.GetAttributePriceAdjustment(Item.Quantity, Item.CustomerRoles);
    price = price + adjustment;

    // Category-based markup
    if (Item.Categories.indexOf("Premium") >= 0) {
        price = price * 1.1;
        debug("Premium category markup applied");
    }

    // VIP customer discount
    if (Item.CustomerRoles.indexOf("VIP") >= 0) {
        price = price * 0.9;
        alert("VIP discount: 10% off");
    }

    return price;
}

return calculatePrice();
```
