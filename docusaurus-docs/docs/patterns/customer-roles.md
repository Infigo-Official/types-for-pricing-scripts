---
id: customer-roles
title: Customer Role Discounts
sidebar_label: Customer Roles
sidebar_position: 3
---

# Customer Role Discount Pattern

Apply different pricing based on customer roles like Wholesale, VIP, or custom roles.

---

## Basic Role Check

```javascript
function calculatePrice() {
    var price = Item.Price;

    if (HelperMethods.Contains(Item.CustomerRoles, "Wholesale")) {
        price = price * 0.80; // 20% wholesale discount
        alert("Wholesale discount: 20% off");
    }

    return price;
}

return calculatePrice();
```

---

## Multiple Role Discounts

Stack or choose best discount:

```javascript
function calculatePrice() {
    var price = Item.Price;
    var appliedDiscount = 0;

    // Wholesale: 20% off
    if (HelperMethods.Contains(Item.CustomerRoles, "Wholesale")) {
        appliedDiscount = Math.max(appliedDiscount, 0.20);
    }

    // VIP: 15% off
    if (HelperMethods.Contains(Item.CustomerRoles, "VIP")) {
        appliedDiscount = Math.max(appliedDiscount, 0.15);
    }

    // Partner: 25% off
    if (HelperMethods.Contains(Item.CustomerRoles, "Partner")) {
        appliedDiscount = Math.max(appliedDiscount, 0.25);
    }

    if (appliedDiscount > 0) {
        price = price * (1 - appliedDiscount);
        alert("Customer discount: " + (appliedDiscount * 100) + "% off");
    }

    return price;
}

return calculatePrice();
```

---

## Stacking Discounts

Allow discounts to stack:

```javascript
function calculatePrice() {
    var price = Item.Price;
    var totalDiscount = 0;

    // Base customer discount
    if (HelperMethods.Contains(Item.CustomerRoles, "Registered")) {
        totalDiscount = totalDiscount + 0.05; // 5% for registered users
    }

    // Loyalty discount
    if (HelperMethods.Contains(Item.CustomerRoles, "Loyal")) {
        totalDiscount = totalDiscount + 0.05; // Additional 5%
    }

    // Wholesale discount
    if (HelperMethods.Contains(Item.CustomerRoles, "Wholesale")) {
        totalDiscount = totalDiscount + 0.15; // Additional 15%
    }

    // Cap total discount at 30%
    totalDiscount = Math.min(totalDiscount, 0.30);

    if (totalDiscount > 0) {
        price = price * (1 - totalDiscount);
        alert("Your discount: " + Math.round(totalDiscount * 100) + "% off");
    }

    return price;
}

return calculatePrice();
```

---

## Role-Based Tier Pricing

Different price tiers per role:

```javascript
function calculatePrice() {
    // FindTier automatically considers customer roles
    var tier = HelperMethods.FindTier(
        Item.Quantity,
        Item.PricingTiers,
        Item.CustomerRoles
    );

    var price = tier ? tier.Price : Item.Price;

    // Additional role-based adjustments
    if (HelperMethods.Contains(Item.CustomerRoles, "Employee")) {
        price = price * 0.70; // 30% employee discount
        alert("Employee discount applied");
    }

    return price;
}

return calculatePrice();
```

---

## Department-Based Pricing

Use customer department for pricing:

```javascript
function calculatePrice() {
    var price = Item.Price;

    // Department-specific discounts
    var departmentDiscounts = {
        "Marketing": 0.10,
        "Sales": 0.15,
        "Executive": 0.20,
        "Operations": 0.05
    };

    var department = Item.Department;
    if (department && departmentDiscounts[department]) {
        var discount = departmentDiscounts[department];
        price = price * (1 - discount);
        debug(department + " department discount: " + (discount * 100) + "%");
    }

    return price;
}

return calculatePrice();
```

---

## Discount Code with Role

Combine discount codes with role pricing:

```javascript
function calculatePrice() {
    var price = Item.Price;
    var discountApplied = false;

    // Apply role discount first
    if (HelperMethods.Contains(Item.CustomerRoles, "Wholesale")) {
        price = price * 0.80;
        discountApplied = true;
    }

    // Check discount code (additional discount for valid codes)
    var discountCode = Item.DiscountCode;
    if (discountCode) {
        var validCodes = {
            "SAVE10": 0.10,
            "SUMMER20": 0.20,
            "VIP30": 0.30
        };

        if (validCodes[discountCode]) {
            // Stack on top of role discount
            price = price * (1 - validCodes[discountCode]);
            alert("Code " + discountCode + " applied!");
        } else {
            warning("Invalid discount code");
        }
    }

    return price;
}

return calculatePrice();
```

---

## Guest vs Registered Pricing

```javascript
function calculatePrice() {
    var price = Item.Price;

    // Check if user is logged in (has email)
    var isGuest = !Item.Email || Item.Email.length === 0;

    if (isGuest) {
        // Guest pricing (no discount)
        debug("Guest user - standard pricing");
    } else {
        // Registered user discount
        price = price * 0.95;
        alert("5% member discount applied");
    }

    return price;
}

return calculatePrice();
```

---

## Complete Example

```javascript
function calculatePrice() {
    try {
        var price = Item.Price;
        var roles = Item.CustomerRoles;
        var messages = [];

        // Find tier (role-aware)
        var tier = HelperMethods.FindTier(
            Item.Quantity,
            Item.PricingTiers,
            roles
        );

        if (tier) {
            price = tier.Price;
            messages.push("Tier price: $" + tier.Price);
        }

        // Role discounts (best one wins)
        var roleDiscount = 0;
        var roleName = "";

        if (HelperMethods.Contains(roles, "Partner")) {
            roleDiscount = 0.25;
            roleName = "Partner";
        } else if (HelperMethods.Contains(roles, "Wholesale")) {
            roleDiscount = 0.20;
            roleName = "Wholesale";
        } else if (HelperMethods.Contains(roles, "VIP")) {
            roleDiscount = 0.15;
            roleName = "VIP";
        }

        if (roleDiscount > 0) {
            price = price * (1 - roleDiscount);
            messages.push(roleName + ": " + (roleDiscount * 100) + "% off");
        }

        // Add attribute adjustments
        price = price + HelperMethods.GetAttributePriceAdjustment(Item.Quantity);

        // Show combined message
        if (messages.length > 0) {
            alert(messages.join(" | "));
        }

        return price;

    } catch (err) {
        error("Pricing error: " + err);
        return Item.Price;
    }
}

return calculatePrice();
```
