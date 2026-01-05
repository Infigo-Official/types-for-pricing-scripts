---
id: configuration
title: Configuration
sidebar_label: Configuration
sidebar_position: 4
---

# Configuration

The `Configuration` object provides access to script configuration settings and custom parameters defined in the admin panel.

---

## Methods

| Method | Returns | Description |
|--------|---------|-------------|
| `ScriptConfig()` | `any` | Retrieves the script configuration object containing all custom settings |
| `Parameters()` | `any \| null` | Retrieves the parameters configuration (returns `null` as parameters are not yet supported) |

---

## Usage

### ScriptConfig()

Access custom configuration settings defined for the pricing script.

```javascript
var config = Configuration.ScriptConfig();
```

**Example:**
```javascript
var config = Configuration.ScriptConfig();

// Access custom settings with defaults
var discountRate = config.discountRate || 0.10;
var minQuantity = config.minQuantityForDiscount || 100;

if (Item.Quantity >= minQuantity) {
    var price = Item.Price * (1 - discountRate);
    return price;
}
```

---

### Parameters()

Retrieve parameters configuration (not yet supported, returns null).

```javascript
var params = Configuration.Parameters();
// Currently returns null
```

---

## Use Cases

### Configurable Discounts

Make discount rates configurable without code changes:

```javascript
function calculatePrice() {
    var price = Item.Price;
    var config = Configuration.ScriptConfig();

    // Configurable volume discount
    var volumeDiscount = config.volumeDiscount || 0.15;
    var volumeThreshold = config.volumeThreshold || 500;

    if (Item.Quantity >= volumeThreshold) {
        price = price * (1 - volumeDiscount);
        alert("Volume discount: " + (volumeDiscount * 100) + "% off");
    }

    return price;
}

return calculatePrice();
```

---

### Environment-Specific Settings

Different behavior based on configuration:

```javascript
function calculatePrice() {
    var price = Item.Price;
    var config = Configuration.ScriptConfig();

    // Check if promotions are enabled
    if (config.promotionsEnabled) {
        var promoDiscount = config.promoDiscount || 0.20;
        price = price * (1 - promoDiscount);
        alert(config.promoMessage || "Special promotion applied!");
    }

    // Minimum price floor
    var minPrice = config.minimumPrice || 1.00;
    if (price < minPrice) {
        price = minPrice;
    }

    return price;
}

return calculatePrice();
```

---

### Feature Flags

Enable/disable features via configuration:

```javascript
function calculatePrice() {
    var price = Item.Price;
    var config = Configuration.ScriptConfig();

    // Feature: Tier pricing
    if (config.enableTierPricing !== false) {
        var tier = HelperMethods.FindTier(Item.Quantity, Item.PricingTiers);
        if (tier) {
            price = tier.Price;
        }
    }

    // Feature: Attribute adjustments
    if (config.enableAttributePricing !== false) {
        price = price + HelperMethods.GetAttributePriceAdjustment(Item.Quantity);
    }

    // Feature: Customer role discounts
    if (config.enableRoleDiscounts) {
        if (Item.CustomerRoles.indexOf("Wholesale") >= 0) {
            var wholesaleDiscount = config.wholesaleDiscount || 0.20;
            price = price * (1 - wholesaleDiscount);
        }
    }

    return price;
}

return calculatePrice();
```

---

### Dynamic Pricing Rules

Load pricing rules from configuration:

```javascript
function calculatePrice() {
    var price = Item.Price;
    var config = Configuration.ScriptConfig();

    // Dynamic multipliers by category
    var categoryMultipliers = config.categoryMultipliers || {};

    for (var i = 0; i < Item.Categories.length; i++) {
        var category = Item.Categories[i];
        if (categoryMultipliers[category]) {
            price = price * categoryMultipliers[category];
            debug("Applied " + category + " multiplier: " + categoryMultipliers[category]);
        }
    }

    return price;
}

return calculatePrice();
```

---

### Markup Configuration

Configure markup percentages by customer role:

```javascript
function calculatePrice() {
    var price = Item.Price;
    var config = Configuration.ScriptConfig();

    // Default markup
    var markup = config.defaultMarkup || 1.0;

    // Role-specific markups
    var roleMarkups = config.roleMarkups || {};

    for (var i = 0; i < Item.CustomerRoles.length; i++) {
        var role = Item.CustomerRoles[i];
        if (roleMarkups[role] !== undefined) {
            markup = roleMarkups[role];
            debug("Using markup for " + role + ": " + markup);
            break;
        }
    }

    return price * markup;
}

return calculatePrice();
```

---

## Configuration Structure Example

Here's an example of what a configuration object might contain:

```json
{
  "enableTierPricing": true,
  "enableAttributePricing": true,
  "enableRoleDiscounts": true,
  "volumeThreshold": 500,
  "volumeDiscount": 0.15,
  "wholesaleDiscount": 0.20,
  "minimumPrice": 1.00,
  "defaultMarkup": 1.0,
  "promotionsEnabled": false,
  "promoDiscount": 0.25,
  "promoMessage": "Summer Sale: 25% off!",
  "categoryMultipliers": {
    "Premium": 1.25,
    "Clearance": 0.75,
    "Standard": 1.0
  },
  "roleMarkups": {
    "Wholesale": 0.85,
    "Retail": 1.0,
    "VIP": 0.90
  }
}
```

---

## Best Practices

1. **Always provide defaults** - Use `|| defaultValue` to handle missing config
2. **Validate configuration** - Check that config values are within expected ranges
3. **Log config values** - Use `debug()` to log which config values are being used
4. **Document expected format** - Keep a reference of expected configuration structure

```javascript
function calculatePrice() {
    var config = Configuration.ScriptConfig() || {};

    // Validate and log configuration
    var discount = config.discount;
    if (typeof discount !== "number" || discount < 0 || discount > 1) {
        warning("Invalid discount config, using default");
        discount = 0.10;
    }

    debug("Using discount: " + (discount * 100) + "%");

    return Item.Price * (1 - discount);
}

return calculatePrice();
```
