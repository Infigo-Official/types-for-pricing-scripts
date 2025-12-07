---
id: department-discounts
title: Department-Based Discounts
sidebar_label: Department Discounts
sidebar_position: 8
---

# Department-Based Discounts

This pattern applies different pricing or discounts based on the customer's department. This is commonly used in B2B environments where different departments have negotiated rates or budget allowances.

---

## Use Case

Organizations often have multiple departments with different pricing arrangements:
- Marketing department gets a 15% discount
- Sales team has a 10% discount
- Finance department pays standard rates
- Corporate accounts get wholesale pricing

---

## Basic Department Discount

```javascript
function calculatePrice() {
    var price = Item.Price;
    var department = Item.Department;

    debug("Customer department: " + department);

    // Define department discounts
    var discounts = {
        "Marketing": 0.15,    // 15% off
        "Sales": 0.10,        // 10% off
        "HR": 0.05,           // 5% off
        "Executive": 0.20     // 20% off
    };

    // Apply discount if department matches
    if (department && discounts[department]) {
        var discountRate = discounts[department];
        var discountAmount = price * discountRate;
        price = price - discountAmount;

        alert("Department discount: " + (discountRate * 100) + "% off");
        debug("Discount applied: $" + discountAmount.toFixed(2));
    }

    return price;
}

return calculatePrice();
```

---

## Combined with CSV Pricing

Load department-specific pricing from a CSV file:

```javascript
function calculatePrice() {
    var department = Item.Department || "Default";
    var sku = Item.ActualSku;

    debug("Department: " + department);
    debug("SKU: " + sku);

    // Build CSV filename based on department
    var csvFilename = "pricing-" + department.toLowerCase().replace(/\s+/g, "-") + ".csv";

    // Try department-specific CSV, fall back to default
    var fileInfo = Item.getGlobalFileContent(csvFilename);

    if (fileInfo.Error || !fileInfo.Content || fileInfo.Content.length < 2) {
        debug("Department CSV not found, using default");
        fileInfo = Item.getGlobalFileContent("pricing-default.csv");
    }

    if (fileInfo.Error || !fileInfo.Content) {
        warning("Price list unavailable");
        return Item.Price;
    }

    // Parse CSV and find price
    var price = findPriceInCsv(fileInfo.Content, sku, Item.Quantity);

    if (price === null) {
        debug("SKU not found in CSV");
        return Item.Price;
    }

    return price;
}

function findPriceInCsv(content, sku, quantity) {
    // Skip header row
    for (var i = 1; i < content.length; i++) {
        var row = content[i].split(",");
        if (row.length >= 3) {
            var csvSku = row[0].trim();
            var minQty = parseInt(row[1]) || 0;
            var csvPrice = parseFloat(row[2]) || 0;

            if (csvSku === sku && quantity >= minQty) {
                return csvPrice;
            }
        }
    }
    return null;
}

return calculatePrice();
```

---

## Department with Customer Roles

Combine department-based pricing with customer role discounts:

```javascript
function calculatePrice() {
    var price = Item.Price;

    // Apply tier pricing first
    var tier = HelperMethods.FindTier(
        Item.Quantity,
        Item.PricingTiers,
        Item.CustomerRoles
    );

    if (tier) {
        price = tier.Price;
        debug("Tier price applied: " + price);
    }

    // Then apply department discount
    var department = Item.Department;
    var departmentDiscount = getDepartmentDiscount(department);

    if (departmentDiscount > 0) {
        price = price * (1 - departmentDiscount);
        alert("Department discount applied: " + (departmentDiscount * 100) + "%");
    }

    // Add attribute adjustments
    price = price + HelperMethods.GetAttributePriceAdjustment(
        Item.Quantity,
        Item.CustomerRoles
    );

    return price;
}

function getDepartmentDiscount(department) {
    if (!department) return 0;

    var discounts = {
        "Marketing": 0.15,
        "Sales": 0.10,
        "IT": 0.08,
        "HR": 0.05
    };

    return discounts[department] || 0;
}

return calculatePrice();
```

---

## Setup Costs with Department Override

Some departments may have setup costs waived:

```javascript
function calculatePrice() {
    var config = {
        setupCost: 50.00,
        setupFreeForDepartments: ["Executive", "VIP Clients"],
        pricePerUnit: 2.50
    };

    var department = Item.Department;
    var quantity = Item.Quantity;

    // Calculate base price
    var price = quantity * config.pricePerUnit;

    // Add setup cost (unless exempt)
    var isSetupFree = false;
    for (var i = 0; i < config.setupFreeForDepartments.length; i++) {
        if (department === config.setupFreeForDepartments[i]) {
            isSetupFree = true;
            break;
        }
    }

    if (isSetupFree) {
        alert("Setup cost waived for " + department);
        debug("Setup cost waived");
    } else {
        price = price + config.setupCost;
        debug("Setup cost added: $" + config.setupCost);
    }

    return price;
}

return calculatePrice();
```

---

## Complete Example

This example combines department discounts with tiered pricing and setup costs:

```javascript
function calculatePrice() {
    // Configuration
    var config = {
        setupCost: 75.00,
        minimumOrder: 25.00,
        departments: {
            "Marketing": { discount: 0.20, freeSetup: true },
            "Sales": { discount: 0.15, freeSetup: false },
            "IT": { discount: 0.10, freeSetup: true },
            "Finance": { discount: 0.05, freeSetup: false },
            "Executive": { discount: 0.25, freeSetup: true }
        }
    };

    debug("=== Department Pricing ===");
    debug("Department: " + Item.Department);
    debug("Customer roles: " + Item.CustomerRoles.join(", "));

    // Start with tier price
    var price = Item.Price;
    var tier = HelperMethods.FindTier(
        Item.Quantity,
        Item.PricingTiers,
        Item.CustomerRoles
    );

    if (tier) {
        price = tier.Price;
        debug("Tier price: $" + price);
    }

    // Multiply by quantity
    var subtotal = price * Item.Quantity;

    // Apply department discount
    var deptConfig = config.departments[Item.Department];
    if (deptConfig) {
        var discount = subtotal * deptConfig.discount;
        subtotal = subtotal - discount;
        alert(Item.Department + " discount: " + (deptConfig.discount * 100) + "% off");
        debug("Department discount: -$" + discount.toFixed(2));
    }

    // Add setup cost
    var finalPrice = subtotal;
    if (deptConfig && deptConfig.freeSetup) {
        debug("Setup cost waived");
    } else {
        finalPrice = subtotal + config.setupCost;
        debug("Setup cost: +$" + config.setupCost);
    }

    // Apply minimum order
    if (finalPrice < config.minimumOrder) {
        finalPrice = config.minimumOrder;
        alert("Minimum order of $" + config.minimumOrder + " applied");
    }

    debug("Final price: $" + finalPrice.toFixed(2));

    // Return per-unit price
    return finalPrice / Item.Quantity;
}

return calculatePrice();
```

---

## Key Points

- Access department via `Item.Department`
- Use configuration objects for maintainability
- Combine with `Item.CustomerRoles` for layered discounts
- Consider setup cost waivers for specific departments
- Department-specific CSV files allow complex pricing rules
- Always provide fallback pricing when department is not found
