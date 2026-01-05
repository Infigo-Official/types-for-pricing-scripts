---
id: console
title: console()
sidebar_label: console()
---

# console()

Log a message to the browser's developer console.

```javascript
console(message)
```

**Parameters:**
- `message` (string) - The message to log to the console

---

## Usage

```javascript
console("Price calculation started");
console("Result: " + price);
console(JSON.stringify(Item.Attributes));
```

---

## When to Use

- **Development**: Debug in the browser's developer tools
- **Inspection**: Examine complex objects
- **Tracing**: Follow execution flow

---

## Example

```javascript
function calculatePrice() {
    console("=== calculatePrice() called ===");
    console("Item: " + JSON.stringify({
        name: Item.ProductName,
        sku: Item.Sku,
        price: Item.Price,
        quantity: Item.Quantity
    }));

    var price = Item.Price;

    // Log tier lookup
    var tier = HelperMethods.FindTier(Item.Quantity, Item.PricingTiers);
    console("Tier lookup result: " + JSON.stringify(tier));

    if (tier) {
        price = tier.Price;
    }

    // Log attributes
    var attrLog = [];
    for (var i = 0; i < Item.Attributes.length; i++) {
        var a = Item.Attributes[i];
        attrLog.push({name: a.Key, value: a.Value});
    }
    console("Attributes: " + JSON.stringify(attrLog));

    var adjustment = HelperMethods.GetAttributePriceAdjustment(Item.Quantity);
    console("Attribute adjustment: " + adjustment);
    price = price + adjustment;

    console("Final price: " + price);
    console("=== calculatePrice() complete ===");

    return price;
}

return calculatePrice();
```

:::tip
Console messages appear in the browser's developer console (F12). This is useful for debugging during development but not visible to regular users.
:::

---

## Viewing Console Output

1. Open the browser's developer tools (F12 or Ctrl+Shift+I)
2. Navigate to the "Console" tab
3. Run the pricing script
4. View the logged messages
