---
id: debug
title: debug()
sidebar_label: debug()
---

# debug()

Output debug information visible only to administrators.

```javascript
debug(message)
```

**Parameters:**
- `message` (string) - The debug message to display

---

## Usage

```javascript
debug("Starting price calculation");
debug("Base price: " + Item.Price);
debug("Quantity: " + Item.Quantity);
```

---

## When to Use

- **Development**: Test and verify your pricing logic
- **Troubleshooting**: Diagnose issues with specific orders
- **Verification**: Confirm calculations are working correctly

---

## Example

```javascript
function calculatePrice() {
    debug("=== Price Calculation Start ===");
    debug("Product: " + Item.ProductName);
    debug("SKU: " + Item.Sku);
    debug("Base Price: $" + Item.Price);
    debug("Quantity: " + Item.Quantity);

    var price = Item.Price;

    var tier = HelperMethods.FindTier(Item.Quantity, Item.PricingTiers);
    if (tier) {
        debug("Found tier: " + tier.Quantity + "+ @ $" + tier.Price);
        price = tier.Price;
    } else {
        debug("No tier found, using base price");
    }

    var adjustment = HelperMethods.GetAttributePriceAdjustment(Item.Quantity);
    debug("Attribute adjustment: $" + adjustment);
    price = price + adjustment;

    debug("Final Price: $" + price);
    debug("=== Price Calculation End ===");

    return price;
}

return calculatePrice();
```

:::tip
Debug messages are only visible to admin users in the test panel. They won't appear to customers.
:::
