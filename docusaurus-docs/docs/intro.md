---
id: intro
title: Pricing Script Documentation
sidebar_label: Introduction
slug: /
sidebar_position: 1
---

# Pricing Script API Documentation

Welcome to the official documentation for the **Infigo Pricing Script** engine. This guide provides comprehensive information about creating custom pricing scripts for the Infigo platform.

## What are Pricing Scripts?

Pricing scripts allow you to implement custom pricing logic for your products. They run during price calculation and can:

- Apply quantity-based tier pricing
- Add customer role discounts
- Calculate prices based on product attributes
- Implement complex pricing rules from CSV files
- Charge based on uploaded file properties

## Installation

```bash
npm install -D @infigo-official/types-for-pricing-script
```

This package provides TypeScript type definitions that give you:

- **IntelliSense** - Autocomplete for all global objects and methods
- **Type checking** - Catch errors before runtime
- **Documentation** - Inline documentation in your IDE

## Quick Example

:::info ES5 Syntax Required
Pricing scripts run in an ES5 environment. Use `var` instead of `let`/`const`, and avoid arrow functions.
:::

```javascript
function calculatePrice() {
    var price = Item.Price;

    // Apply tier pricing
    var tier = HelperMethods.FindTier(Item.Quantity, Item.PricingTiers);
    if (tier) {
        price = tier.Price;
    }

    // Add attribute adjustments
    price = price + HelperMethods.GetAttributePriceAdjustment(Item.Quantity);

    return price;
}

return calculatePrice();
```

## Where to Use Pricing Scripts

Pricing scripts can be attached to two different contexts:

### Product Variants

1. In **Admin > Pricing Scripts**, create a new pricing script
2. Attach the pricing script to a **Product Variant** of a Product
3. On the landing page of the product or in the basket, the script will be applied
4. The script returns the **final price** for the product

### Checkout Attributes

You can also attach pricing scripts to **checkout attributes** for dynamic adjustments at the checkout stage. This enables flexible pricing for options like delivery methods, service levels, gift wrapping, and more.

1. Navigate to **Admin > Checkout Attributes**
2. Select the checkout attribute you want to configure
3. Attach a pricing script to the attribute
4. The script returns a **price adjustment** (positive or negative) that modifies the basket total

**Key Differences:**
- **Product Variant scripts** return the final product price
- **Checkout Attribute scripts** return an adjustment to the base price

## Global Objects

Your pricing script has access to these global objects:

| Object | Description |
|--------|-------------|
| [`Item`](/global-objects/item) | The main product being priced |
| [`Session`](/global-objects/session) | Session-level data and cart items |
| [`CheckoutItem`](/global-objects/checkout) | Checkout context and shipping |
| [`Configuration`](/global-objects/configuration) | Script configuration |
| [`HelperMethods`](/global-objects/helper-methods) | Utility functions |

## Output Functions

Communicate with users through these functions:

| Function | Description |
|----------|-------------|
| [`debug()`](/output/debug) | Debug output (admin only) |
| [`alert()`](/output/alert) | Information message |
| [`warning()`](/output/warning) | Warning message |
| [`error()`](/output/error) | Error message |
| [`console()`](/output/console) | Browser console logging |

