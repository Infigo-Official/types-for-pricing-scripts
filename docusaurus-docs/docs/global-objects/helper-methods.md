---
id: helper-methods
title: HelperMethods
sidebar_label: HelperMethods
sidebar_position: 5
---

# HelperMethods

The `HelperMethods` object provides utility functions for common pricing calculations and data manipulation tasks. These helpers simplify complex pricing logic with pre-built functionality.

---

## Tier Methods

### FindTier()

Find the appropriate pricing tier based on quantity and customer roles.

```javascript
FindTier(quantity, tiers, roles)
```

**Parameters:**
- `quantity` (number) - The quantity to find the tier for
- `tiers` ([`Tier[]`](./item#tier-properties)) - Array of tier objects
- `roles` (string[], optional) - Customer roles, falls back to Item.CustomerRoles if not supplied

**Returns:** [`Tier`](./item#tier-properties) | `null` - The matching tier or null if no match

**Example:**
```javascript
var tiers = [
    {Quantity: 1, Price: 5},
    {Quantity: 50, Price: 4},
    {Quantity: 250, Price: 3},
    {Quantity: 500, Price: 2.50}
];

var tier = HelperMethods.FindTier(100, tiers, Item.CustomerRoles);
if (tier) {
    debug("Using tier: Qty " + tier.Quantity + " @ $" + tier.Price);
    return tier.Price * Item.Quantity;
}
```

---

### InterpolatePrice()

Interpolate prices between tier boundaries for smooth pricing transitions instead of step-based pricing.

```javascript
InterpolatePrice(quantity, tiers)
```

**Parameters:**
- `quantity` (number) - The quantity to interpolate for
- `tiers` ([`Tier[]`](./item#tier-properties)) - Array of tier objects for interpolation

**Returns:** `number` - Interpolated price based on quantity position within tiers

**Example:**
```javascript
var interpolationTiers = [
    {Quantity: 1, Price: 5},
    {Quantity: 50, Price: 17},
    {Quantity: 250, Price: 60},
    {Quantity: 500, Price: 100},
    {Quantity: 1000, Price: 200}
];

// For quantity 75, returns a price between $17 and $60
var smoothPrice = HelperMethods.InterpolatePrice(Item.Quantity, interpolationTiers);
return smoothPrice;
```

---

### GetAttributePriceAdjustment()

Calculate the total price adjustment for all selected attributes, including tier-based adjustments.

```javascript
GetAttributePriceAdjustment(quantity, roles)
```

**Parameters:**
- `quantity` (number) - The quantity for tier-based calculations
- `roles` (string[], optional) - Customer roles, falls back to Item.CustomerRoles if not supplied

**Returns:** `number` - Total price adjustment from all attributes

**Example:**
```javascript
var basePrice = Item.Price;
var adjustment = HelperMethods.GetAttributePriceAdjustment(Item.Quantity, Item.CustomerRoles);

debug("Base price: $" + basePrice);
debug("Attribute adjustment: $" + adjustment);

return basePrice + adjustment;
```

---

## Array & Object Utilities

### Contains()

Check if an array contains a specific value.

```javascript
Contains(array, value)
```

**Parameters:**
- `array` (any[]) - Array to search
- `value` (any) - Value to find

**Returns:** `boolean` - Whether the value exists in the array

**Example:**
```javascript
if (HelperMethods.Contains(Item.CustomerRoles, "VIP")) {
    debug("VIP customer detected");
    return Item.Price * 0.85; // 15% VIP discount
}

if (HelperMethods.Contains(Item.Categories, "Clearance")) {
    return Item.Price * 0.50; // 50% clearance discount
}
```

---

### IsObject()

Check if an item is a plain object (not null, not array, not primitive).

```javascript
IsObject(item)
```

**Parameters:**
- `item` (any) - Item to check

**Returns:** `boolean` - Whether the item is an object

**Example:**
```javascript
var config = Configuration.ScriptConfig;

if (HelperMethods.IsObject(config)) {
    var markup = config.markup || 1.2;
    return Item.Price * markup;
}
```

---

### IsArray()

Check if an item is an array.

```javascript
IsArray(item)
```

**Parameters:**
- `item` (any) - Item to check

**Returns:** `boolean` - Whether the item is an array

**Example:**
```javascript
if (HelperMethods.IsArray(Item.Attributes)) {
    debug("Found " + Item.Attributes.length + " attributes");

    for (var i = 0; i < Item.Attributes.length; i++) {
        var attr = Item.Attributes[i];
        debug("Attribute: " + attr.Key + " = " + attr.Value);
    }
}
```

---

### MergeObject()

Deep merge source object properties into target object.

```javascript
MergeObject(target, source)
```

**Parameters:**
- `target` (object) - Target object to merge into
- `source` (object) - Source object to merge from

**Example:**
```javascript
var baseConfig = {
    markup: 20,
    shipping: 5,
    discounts: {
        vip: 10,
        bulk: 5
    }
};

var overrideConfig = {
    markup: 25,
    discounts: {
        vip: 15
    }
};

HelperMethods.MergeObject(baseConfig, overrideConfig);
// baseConfig now: {markup: 25, shipping: 5, discounts: {vip: 15, bulk: 5}}

return Item.Price * (1 + baseConfig.markup / 100);
```

---

### LogObject()

Log all properties of an object for debugging.

```javascript
LogObject(data)
```

**Parameters:**
- `data` (any) - Object to log

**Example:**
```javascript
// Debug the entire Item object
HelperMethods.LogObject(Item);

// Debug specific attribute
var attr = Item.Attributes[0];
if (attr) {
    HelperMethods.LogObject(attr);
}
```

---

## CSV Utilities

The `HelperMethods.CSV` object provides methods for parsing and stringifying CSV data.

### CSV.parse()

Parse a CSV string into an array of arrays.

```javascript
CSV.parse(csv, options, disableNumberConversion)
```

**Parameters:**
- `csv` (string) - CSV string to parse
- `options` ([CsvOptions](#csvoptions), optional) - Parsing options
- `disableNumberConversion` (boolean, optional) - Keep all values as strings

**Returns:** `any[][]` - Array of arrays (rows of columns)

**Example:**
```javascript
var csvString = "Product,Price,Quantity\nWidget A,10.99,100\nWidget B,15.50,50";

var data = HelperMethods.CSV.parse(csvString);
// Result: [["Product","Price","Quantity"],["Widget A",10.99,100],["Widget B",15.50,50]]

// Skip header row and process data
for (var i = 1; i < data.length; i++) {
    var row = data[i];
    debug("Product: " + row[0] + ", Price: $" + row[1]);
}
```

**With Options:**
```javascript
var tsvString = "Name\tPrice\tSKU\nItem A\t10.99\tSKU001";

var options = {
    delimiterChar: "\t",
    quoteChar: '"'
};

var data = HelperMethods.CSV.parse(tsvString, options);
```

---

### CSV.stringify()

Convert an array of arrays to a CSV string.

```javascript
CSV.stringify(table, options)
```

**Parameters:**
- `table` (any[][]) - Array of arrays to convert
- `options` ([CsvStringifyOptions](#csvstringifyoptions), optional) - Output options

**Returns:** `string` - CSV formatted string

**Example:**
```javascript
var data = [
    ["Product", "Price", "SKU"],
    ["Widget A", 10.99, "SKU001"],
    ["Widget B", 15.50, "SKU002"]
];

var csvOutput = HelperMethods.CSV.stringify(data);
// Result: "Product,Price,SKU\nWidget A,10.99,SKU001\nWidget B,15.50,SKU002"
```

**With Replacer:**
```javascript
var options = {
    delimiterChar: ",",
    replacer: function(row, col, value) {
        // Format prices in column 1
        if (col === 1 && typeof value === "number") {
            return "$" + value.toFixed(2);
        }
        return value;
    }
};

var formatted = HelperMethods.CSV.stringify(data, options);
```

---

## Type Definitions

### CsvOptions

Options for CSV parsing:

| Property | Type | Description |
|----------|------|-------------|
| `delimiterChar` | `string` | Field delimiter (default: `","`) |
| `quoteChar` | `string` | Quote character for enclosed fields (default: `'"'`) |
| `disableNumberConverstion` | `boolean` | Keep all values as strings (default: `false`) |

---

### CsvStringifyOptions

Options for CSV output:

| Property | Type | Description |
|----------|------|-------------|
| `delimiterChar` | `string` | Field delimiter (default: `","`) |
| `quoteChar` | `string` | Quote character (default: `'"'`) |
| `replacer` | `function` | Custom value transformer `function(row, col, value)` |

---

## Complete Example

```javascript
function calculatePrice() {
    var price = Item.Price;

    // Find tier pricing
    var tier = HelperMethods.FindTier(Item.Quantity, Item.PricingTiers, Item.CustomerRoles);
    if (tier) {
        price = tier.Price;
        debug("Tier price: $" + price);
    }

    // Add attribute adjustments
    var adjustment = HelperMethods.GetAttributePriceAdjustment(Item.Quantity, Item.CustomerRoles);
    price = price + adjustment;
    debug("After adjustments: $" + price);

    // VIP discount
    if (HelperMethods.Contains(Item.CustomerRoles, "VIP")) {
        price = price * 0.9;
        alert("VIP discount: 10% off");
    }

    // Load pricing matrix from CSV
    var fileInfo = Item.getGlobalFileContent("price-matrix.csv");
    if (!fileInfo.Error && fileInfo.Content) {
        var csvData = HelperMethods.CSV.parse(fileInfo.Content.join("\n"));

        var size = Item.getAttributeValue("Size");

        // Find matching row
        for (var i = 1; i < csvData.length; i++) {
            if (csvData[i][0] === size) {
                var matrixPrice = csvData[i][1];
                debug("Matrix price for " + size + ": $" + matrixPrice);
                price = price + matrixPrice;
                break;
            }
        }
    }

    // Log for debugging
    HelperMethods.LogObject({
        finalPrice: price,
        quantity: Item.Quantity,
        tier: tier
    });

    return price;
}

return calculatePrice();
```
