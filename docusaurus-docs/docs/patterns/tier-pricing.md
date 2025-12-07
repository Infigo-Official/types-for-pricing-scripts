---
id: tier-pricing
title: Tier-Based Pricing
sidebar_label: Tier Pricing
sidebar_position: 2
---

# Tier-Based Pricing Pattern

Quantity-based pricing tiers allow different prices at different quantity levels.

---

## Basic Tier Pricing

```javascript
function calculatePrice() {
    var tier = HelperMethods.FindTier(Item.Quantity, Item.PricingTiers);

    var basePrice = tier ? tier.Price : Item.Price;

    return basePrice + HelperMethods.GetAttributePriceAdjustment(Item.Quantity);
}

return calculatePrice();
```

---

## With Customer Roles

Different tiers for different customer types:

```javascript
function calculatePrice() {
    var tier = HelperMethods.FindTier(
        Item.Quantity,
        Item.PricingTiers,
        Item.CustomerRoles  // Pass customer roles for role-specific tiers
    );

    var price = tier ? tier.Price : Item.Price;

    // Add attribute adjustments
    price = price + HelperMethods.GetAttributePriceAdjustment(Item.Quantity);

    if (tier) {
        debug("Using tier: " + tier.Quantity + "+ at $" + tier.Price);
    }

    return price;
}

return calculatePrice();
```

---

## Interpolated Pricing

Smooth pricing between tier boundaries instead of sudden jumps:

```javascript
function calculatePrice() {
    // InterpolatePrice provides smooth pricing between tiers
    var price = HelperMethods.InterpolatePrice(
        Item.Quantity,
        Item.PricingTiers,
        Item.CustomerRoles
    );

    price = price + HelperMethods.GetAttributePriceAdjustment(Item.Quantity);

    return price;
}

return calculatePrice();
```

---

## Custom Tier Logic

Define your own tier structure:

```javascript
function calculatePrice() {
    var price = Item.Price;

    // Custom tier structure
    var customTiers = [
        { minQty: 1, maxQty: 9, discount: 0 },
        { minQty: 10, maxQty: 49, discount: 0.10 },
        { minQty: 50, maxQty: 99, discount: 0.15 },
        { minQty: 100, maxQty: 499, discount: 0.20 },
        { minQty: 500, maxQty: 999999, discount: 0.30 }
    ];

    // Find matching tier
    var tier = null;
    for (var i = 0; i < customTiers.length; i++) {
        var t = customTiers[i];
        if (Item.Quantity >= t.minQty && Item.Quantity <= t.maxQty) {
            tier = t;
            break;
        }
    }

    if (tier && tier.discount > 0) {
        price = price * (1 - tier.discount);
        alert("Volume discount: " + (tier.discount * 100) + "% off");
    }

    return price;
}

return calculatePrice();
```

---

## Tier with Setup Fee

Waive setup fee at higher quantities:

```javascript
function calculatePrice() {
    var price = Item.Price;
    var setupFee = 50.00;

    // Find tier
    var tier = HelperMethods.FindTier(Item.Quantity, Item.PricingTiers);
    if (tier) {
        price = tier.Price;
    }

    // Waive setup fee for large orders
    if (Item.Quantity < 100) {
        price = price + setupFee;
        alert("Setup fee: $" + setupFee + " (waived at 100+ units)");
    } else {
        alert("Setup fee waived for bulk order!");
    }

    price = price + HelperMethods.GetAttributePriceAdjustment(Item.Quantity);

    return price;
}

return calculatePrice();
```

---

## Per-Unit vs Total Price Tiers

```javascript
function calculatePrice() {
    var tier = HelperMethods.FindTier(Item.Quantity, Item.PricingTiers);

    // Tier.Price is typically per-unit
    var unitPrice = tier ? tier.Price : Item.Price;

    // For total price tiers, don't multiply
    // return unitPrice;

    // For per-unit price tiers
    var totalPrice = unitPrice * Item.Quantity;

    // Add attribute adjustments
    totalPrice = totalPrice + HelperMethods.GetAttributePriceAdjustment(Item.Quantity);

    debug("Unit: $" + unitPrice + ", Qty: " + Item.Quantity + ", Total: $" + totalPrice);

    return totalPrice;
}

return calculatePrice();
```

---

## Display Tier Savings

Show customers how much they're saving:

```javascript
function calculatePrice() {
    var basePrice = Item.Price;
    var tier = HelperMethods.FindTier(Item.Quantity, Item.PricingTiers);

    var price = tier ? tier.Price : basePrice;

    // Calculate and display savings
    if (tier && tier.Price < basePrice) {
        var savings = (basePrice - tier.Price) * Item.Quantity;
        var percentOff = Math.round((1 - tier.Price / basePrice) * 100);
        alert("You save $" + savings.toFixed(2) + " (" + percentOff + "% off)!");
    }

    price = price + HelperMethods.GetAttributePriceAdjustment(Item.Quantity);

    return price;
}

return calculatePrice();
```
