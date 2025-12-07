---
id: basic-pricing
title: Basic Pricing
sidebar_label: Basic Pricing
sidebar_position: 1
---

# Basic Pricing Pattern

The simplest pricing pattern uses the base price with attribute adjustments.

---

## Simple Price Calculation

```javascript
function calculatePrice() {
    var price = Item.Price;

    // Add attribute adjustments
    price = price + HelperMethods.GetAttributePriceAdjustment(Item.Quantity);

    return price;
}

return calculatePrice();
```

---

## With Quantity Multiplier

```javascript
function calculatePrice() {
    // Unit price times quantity
    var price = Item.Price * Item.Quantity;

    // Add attribute adjustments
    price = price + HelperMethods.GetAttributePriceAdjustment(Item.Quantity);

    return price;
}

return calculatePrice();
```

---

## With Minimum Price

```javascript
function calculatePrice() {
    var price = Item.Price;

    price = price + HelperMethods.GetAttributePriceAdjustment(Item.Quantity);

    // Ensure minimum price
    var minimumPrice = 5.00;
    if (price < minimumPrice) {
        price = minimumPrice;
        debug("Applied minimum price: $" + minimumPrice);
    }

    return price;
}

return calculatePrice();
```

---

## With Setup Fee

```javascript
function calculatePrice() {
    var setupFee = 25.00;
    var price = Item.Price;

    // Add one-time setup fee
    price = price + setupFee;

    // Add per-unit attribute adjustments
    price = price + HelperMethods.GetAttributePriceAdjustment(Item.Quantity);

    alert("Includes $" + setupFee + " setup fee");

    return price;
}

return calculatePrice();
```

---

## With Rounding

```javascript
function calculatePrice() {
    var price = Item.Price;

    price = price + HelperMethods.GetAttributePriceAdjustment(Item.Quantity);

    // Round to 2 decimal places
    price = Math.round(price * 100) / 100;

    // Or round up to nearest dollar
    // price = Math.ceil(price);

    return price;
}

return calculatePrice();
```

---

## Using Configuration Objects

Keep settings organized at the top of your script:

```javascript
// Configuration - easy to update
var config = {
    setupCost: 25.00,
    minimumPrice: 5.00,
    minimumQuantity: 10,
    rushFeePercent: 0.25,
    pricePerUnit: 2.50
};

function calculatePrice() {
    var quantity = Item.Quantity;

    // Enforce minimum quantity
    if (quantity < config.minimumQuantity) {
        warning("Minimum order quantity is " + config.minimumQuantity);
        quantity = config.minimumQuantity;
    }

    // Calculate base price
    var price = quantity * config.pricePerUnit;

    // Add setup cost (divided by quantity for per-unit price)
    price = price + (config.setupCost / quantity);

    // Check for rush order attribute
    var isRush = Item.getAttributeValue("Rush Order") === "Yes";
    if (isRush) {
        price = price * (1 + config.rushFeePercent);
        alert("Rush fee: " + (config.rushFeePercent * 100) + "% added");
    }

    // Apply minimum
    price = Math.max(price, config.minimumPrice);

    return price;
}

return calculatePrice();
```

---

## Complete Example with Error Handling

```javascript
function calculatePrice() {
    try {
        var price = Item.Price;

        // Validate base price
        if (!price || price <= 0) {
            warning("Invalid base price, using default");
            price = 10.00;
        }

        // Add attribute adjustments
        var adjustment = HelperMethods.GetAttributePriceAdjustment(Item.Quantity);
        price = price + adjustment;

        // Apply minimum
        var minPrice = 1.00;
        price = Math.max(price, minPrice);

        // Round to cents
        price = Math.round(price * 100) / 100;

        // Validate final price
        if (isNaN(price) || price < 0) {
            error("Invalid calculated price");
            return Item.Price;
        }

        debug("Final price: $" + price);
        return price;

    } catch (err) {
        error("Calculation error: " + err);
        return Item.Price;
    }
}

return calculatePrice();
```
