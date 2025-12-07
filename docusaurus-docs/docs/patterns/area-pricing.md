---
id: area-pricing
title: Area-Based Pricing
sidebar_label: Area Pricing
sidebar_position: 7
---

# Area-Based Pricing

This pattern calculates pricing based on product dimensions such as square meters, square feet, or other area-based measurements. It also demonstrates how to set item weight dynamically.

---

## Use Case

Products like signage, banners, flooring, or printed materials are often priced by area. This pattern:
- Extracts width and height from attributes
- Calculates the total area
- Applies per-unit pricing (e.g., price per square meter)
- Optionally sets the weight for shipping calculations

---

## Basic Area Calculation

```javascript
function calculatePrice() {
    var price = Item.Price;

    // Get dimensions from attributes
    var widthStr = Item.getAttributeValue("Width");
    var heightStr = Item.getAttributeValue("Height");

    // Parse numeric values
    var width = parseFloat(widthStr) || 0;
    var height = parseFloat(heightStr) || 0;

    if (width <= 0 || height <= 0) {
        warning("Please enter valid dimensions");
        return price;
    }

    // Calculate area in square meters
    var areaSqm = (width * height) / 10000; // Convert from cm to sqm

    debug("Width: " + width + " cm");
    debug("Height: " + height + " cm");
    debug("Area: " + areaSqm + " sqm");

    // Price per square meter
    var pricePerSqm = 25.00;
    price = areaSqm * pricePerSqm * Item.Quantity;

    return price;
}

return calculatePrice();
```

---

## Setting Item Weight

Use `Item.Weight` to set the weight dynamically. Check `Item.CanSetWeight` to verify if weight modification is allowed:

```javascript
function calculatePrice() {
    var price = Item.Price;

    // Get dimensions
    var width = parseFloat(Item.getAttributeValue("Width")) || 0;
    var height = parseFloat(Item.getAttributeValue("Height")) || 0;

    // Calculate area in square meters
    var areaSqm = (width * height) / 10000;

    // Weight per square meter (e.g., 2.5 kg per sqm)
    var weightPerSqm = 2.5;
    var totalWeight = areaSqm * weightPerSqm * Item.Quantity;

    // Set weight if allowed
    if (Item.CanSetWeight) {
        Item.Weight = totalWeight;
        debug("Weight set to: " + totalWeight + " kg");
    }

    // Calculate price
    var pricePerSqm = 25.00;
    price = areaSqm * pricePerSqm * Item.Quantity;

    return price;
}

return calculatePrice();
```

---

## Complete Example with Material Pricing

This example uses a configuration object and different pricing based on material selection:

```javascript
function calculatePrice() {
    // Configuration
    var config = {
        materials: {
            "Standard Vinyl": { pricePerSqm: 25.00, weightPerSqm: 0.8 },
            "Premium Vinyl": { pricePerSqm: 35.00, weightPerSqm: 0.9 },
            "Canvas": { pricePerSqm: 45.00, weightPerSqm: 1.2 },
            "Mesh Banner": { pricePerSqm: 30.00, weightPerSqm: 0.6 }
        },
        minimumArea: 0.5,  // Minimum 0.5 sqm
        minimumPrice: 15.00
    };

    // Get dimensions (in cm)
    var width = parseFloat(Item.getAttributeValue("Width")) || 0;
    var height = parseFloat(Item.getAttributeValue("Height")) || 0;
    var material = Item.getAttributeValue("Material") || "Standard Vinyl";

    debug("=== Area Pricing ===");
    debug("Dimensions: " + width + " x " + height + " cm");
    debug("Material: " + material);

    // Validate dimensions
    if (width <= 0 || height <= 0) {
        error("Please enter valid dimensions");
        return Item.Price;
    }

    // Calculate area
    var areaSqm = (width * height) / 10000;

    // Apply minimum area
    if (areaSqm < config.minimumArea) {
        areaSqm = config.minimumArea;
        alert("Minimum area of " + config.minimumArea + " sqm applied");
    }

    debug("Area: " + areaSqm.toFixed(2) + " sqm");

    // Get material pricing
    var materialConfig = config.materials[material];
    if (!materialConfig) {
        warning("Unknown material, using default pricing");
        materialConfig = config.materials["Standard Vinyl"];
    }

    // Calculate weight
    var totalWeight = areaSqm * materialConfig.weightPerSqm * Item.Quantity;
    if (Item.CanSetWeight) {
        Item.Weight = totalWeight;
        debug("Weight: " + totalWeight.toFixed(2) + " kg");
    }

    // Calculate price
    var price = areaSqm * materialConfig.pricePerSqm * Item.Quantity;

    // Apply minimum price
    if (price < config.minimumPrice) {
        price = config.minimumPrice;
        alert("Minimum order price of $" + config.minimumPrice + " applied");
    }

    debug("Price per sqm: $" + materialConfig.pricePerSqm);
    debug("Total price: $" + price.toFixed(2));

    return price;
}

return calculatePrice();
```

---

## Linear Measurements

For products priced by length (e.g., rolls, ribbons):

```javascript
function calculatePrice() {
    // Get length in meters
    var lengthStr = Item.getAttributeValue("Length");
    var length = parseFloat(lengthStr) || 1;

    // Price per meter
    var pricePerMeter = 5.00;
    var price = length * pricePerMeter * Item.Quantity;

    debug("Length: " + length + " meters");
    debug("Price: $" + price.toFixed(2));

    return price;
}

return calculatePrice();
```

---

## Roll Calculations

For products sold on rolls with specific dimensions:

```javascript
function calculatePrice() {
    // Configuration
    var labelWidth = 50;   // mm
    var labelHeight = 25;  // mm
    var labelsPerRow = 2;
    var gapBetweenLabels = 3;  // mm
    var rollWidth = 110;   // mm

    var quantity = Item.Quantity;

    // Calculate labels per roll
    var labelWidthWithGap = labelWidth + gapBetweenLabels;
    var labelsPerMeter = Math.floor(1000 / (labelHeight + gapBetweenLabels));
    var labelsPerRollMeter = labelsPerMeter * labelsPerRow;

    // Calculate required roll length
    var rollLengthNeeded = quantity / labelsPerRollMeter;

    debug("Labels needed: " + quantity);
    debug("Labels per meter: " + labelsPerRollMeter);
    debug("Roll length needed: " + rollLengthNeeded.toFixed(2) + " meters");

    // Price per meter of roll
    var pricePerMeter = 2.50;
    var price = rollLengthNeeded * pricePerMeter;

    // Add setup cost
    var setupCost = 10.00;
    price = price + setupCost;

    return price;
}

return calculatePrice();
```

---

## Key Points

- Use `parseFloat()` to convert string attributes to numbers
- Check `Item.CanSetWeight` before setting `Item.Weight`
- Apply minimum area/price thresholds where appropriate
- Use configuration objects for maintainability
- Weight is in the configured unit (grams or kilograms)
- Dimensions are in the configured unit (cm or inches)
