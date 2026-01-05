---
id: cart-aggregation
title: Cart Aggregation Pricing
sidebar_label: Cart Aggregation
sidebar_position: 6
---

# Cart Aggregation Pricing

This pattern calculates tier pricing based on the total quantity across all cart items using the same pricing script. This is useful when you want to offer volume discounts based on the combined order quantity.

---

## Use Case

When customers order the same product with different configurations (e.g., different colors or sizes), you may want to calculate the tier price based on the total quantity rather than each item individually.

**Example:** A customer orders:
- 50 business cards (Blue)
- 30 business cards (Red)
- 20 business cards (Green)

With cart aggregation, the tier price is calculated based on 100 total cards, giving better volume pricing.

---

## Using OtherOrderItems

The `Item.OtherOrderItems` array (also available as `Item.CartItems`) contains all other items in the cart that use the same pricing script.

```javascript
function calculatePrice() {
    var basePrice = Item.Price;
    var quantity = Item.Quantity;

    // Calculate total quantity across all cart items
    var totalQuantity = quantity;

    for (var i = 0; i < Item.OtherOrderItems.length; i++) {
        totalQuantity = totalQuantity + Item.OtherOrderItems[i].Quantity;
    }

    debug("Item quantity: " + quantity);
    debug("Total cart quantity: " + totalQuantity);

    // Find tier based on total quantity
    var tier = HelperMethods.FindTier(totalQuantity, Item.PricingTiers);

    if (tier) {
        debug("Tier price applied: " + tier.Price);
        return tier.Price;
    }

    return basePrice;
}

return calculatePrice();
```

---

## Tracking Cart Position

Use `Item.OrderItemIndex` and `Item.CartItemIndex` to track the item's position in the cart:

| Property | Description |
|----------|-------------|
| `OrderItemIndex` | Index in the order array (0 if not in array) |
| `CartItemIndex` | Index in the cart array (-1 if not in array) |
| `IsInOtherOrderItems` | Whether this item appears in another item's OtherOrderItems |

```javascript
function calculatePrice() {
    debug("Order item index: " + Item.OrderItemIndex);
    debug("Cart item index: " + Item.CartItemIndex);
    debug("Is in other order items: " + Item.IsInOtherOrderItems);

    // Your pricing logic...
    return Item.Price;
}

return calculatePrice();
```

---

## SKU-Based Aggregation

Sometimes you only want to aggregate quantities for items with matching SKUs:

```javascript
function calculatePrice() {
    var basePrice = Item.Price;
    var currentSku = Item.ActualSku;
    var totalQuantity = Item.Quantity;

    // Sum quantities for matching SKUs only
    for (var i = 0; i < Item.OtherOrderItems.length; i++) {
        var otherItem = Item.OtherOrderItems[i];
        if (otherItem.ActualSku === currentSku) {
            totalQuantity = totalQuantity + otherItem.Quantity;
        }
    }

    debug("SKU: " + currentSku);
    debug("Total quantity for SKU: " + totalQuantity);

    // Find tier for aggregated quantity
    var tier = HelperMethods.FindTier(totalQuantity, Item.PricingTiers);

    if (tier) {
        return tier.Price;
    }

    return basePrice;
}

return calculatePrice();
```

---

## Complete Example with Customer Roles

This example combines cart aggregation with customer role-based tier pricing:

```javascript
function calculatePrice() {
    var price = Item.Price;

    // Calculate total quantity across cart
    var totalQuantity = Item.Quantity;
    for (var i = 0; i < Item.OtherOrderItems.length; i++) {
        totalQuantity = totalQuantity + Item.OtherOrderItems[i].Quantity;
    }

    debug("=== Cart Aggregation ===");
    debug("Current item quantity: " + Item.Quantity);
    debug("Other items count: " + Item.OtherOrderItems.length);
    debug("Total aggregated quantity: " + totalQuantity);

    // Find tier with customer role support
    var tier = HelperMethods.FindTier(
        totalQuantity,
        Item.PricingTiers,
        Item.CustomerRoles
    );

    if (tier) {
        price = tier.Price;
        debug("Applied tier price: " + price);

        if (tier.CustomerRole) {
            debug("Tier customer role: " + tier.CustomerRole);
        }
    }

    // Add attribute adjustments
    var adjustment = HelperMethods.GetAttributePriceAdjustment(
        totalQuantity,
        Item.CustomerRoles
    );
    price = price + adjustment;

    debug("Final price: " + price);

    return price;
}

return calculatePrice();
```

---

## Key Points

- `OtherOrderItems` only includes items using the **same pricing script**
- Use `ActualSku` for SKU-specific aggregation
- Always use `HelperMethods.FindTier()` for tier lookups
- Pass `Item.CustomerRoles` for role-based tier pricing
- Debug logging helps verify aggregation is working correctly
