---
id: session
title: Session
sidebar_label: Session
sidebar_position: 2
---

# Session

The `Session` object provides access to session-level data including cart items and customer information at the session level.

:::info
Note: The Session object may have limited availability depending on your platform configuration. Always check for null/undefined before accessing properties.
:::

---

## Properties

| Property | Type | Description |
|----------|------|-------------|
| `CartItems` | `Item[]` | Array of shopping cart items in the current session |
| `OtherOrderItems` | `Item[]` | Alias for CartItems - array of other order items in the session |
| `Email` | `string` | Customer email address for the current session |
| `CustomerRoles` | `string[]` | Array of customer role system names for the current session |
| `Department` | `string` | Department name of the customer for the current session |

---

## Use Cases

### Cart-Based Discounts

Apply discounts based on cart total:

```javascript
function calculatePrice() {
    var price = Item.Price;

    // Calculate cart total
    var cartTotal = 0;
    if (Session && Session.CartItems) {
        for (var i = 0; i < Session.CartItems.length; i++) {
            var cartItem = Session.CartItems[i];
            cartTotal = cartTotal + (cartItem.Price * cartItem.Quantity);
        }
    }

    // Apply discount for large orders
    if (cartTotal > 500) {
        price = price * 0.95; // 5% discount
        alert("Order over $500 - 5% discount applied!");
    }

    return price;
}

return calculatePrice();
```

---

### Bundle Pricing

Check if related products are in cart:

```javascript
function calculatePrice() {
    var price = Item.Price;

    // Check for bundle items
    var hasRelatedProduct = false;
    if (Session && Session.CartItems) {
        for (var i = 0; i < Session.CartItems.length; i++) {
            if (Session.CartItems[i].Sku === "RELATED-SKU") {
                hasRelatedProduct = true;
                break;
            }
        }
    }

    if (hasRelatedProduct) {
        price = price * 0.85; // 15% bundle discount
        alert("Bundle discount applied!");
    }

    return price;
}

return calculatePrice();
```

---

### Customer-Specific Pricing

Use customer information for pricing:

```javascript
function calculatePrice() {
    var price = Item.Price;

    if (Session && Session.CustomerRoles) {
        // VIP customer discount
        if (Session.CustomerRoles.indexOf("VIP") >= 0) {
            price = price * 0.90;
            alert("VIP discount: 10% off");
        }

        // Log customer info for debugging
        debug("Customer: " + Session.Email);
        debug("Roles: " + Session.CustomerRoles.join(", "));
    }

    return price;
}

return calculatePrice();
```

---

### Department-Based Pricing

Apply discounts based on customer department:

```javascript
function calculatePrice() {
    var price = Item.Price;

    if (Session && Session.Department) {
        if (Session.Department === "Education") {
            price = price * 0.85; // 15% educational discount
            alert("Educational discount applied!");
        } else if (Session.Department === "Marketing") {
            price = price * 0.90; // 10% marketing discount
            debug("Marketing department discount applied");
        }
    }

    return price;
}

return calculatePrice();
```

---

### Quantity Across Cart

Calculate total quantity of same product across all cart items:

```javascript
function calculatePrice() {
    var totalQuantity = Item.Quantity;

    // Sum quantity of this product across cart
    if (Session && Session.CartItems) {
        for (var i = 0; i < Session.CartItems.length; i++) {
            var cartItem = Session.CartItems[i];
            if (cartItem.Sku === Item.Sku && cartItem !== Item) {
                totalQuantity = totalQuantity + cartItem.Quantity;
            }
        }
    }

    debug("Total quantity in cart: " + totalQuantity);

    // Use total quantity for tier lookup
    var tier = HelperMethods.FindTier(totalQuantity, Item.PricingTiers);

    if (tier) {
        return tier.Price;
    }

    return Item.Price;
}

return calculatePrice();
```

---

### Cart Item Count Discount

Apply discount based on number of items in cart:

```javascript
function calculatePrice() {
    var price = Item.Price;

    var itemCount = 0;
    if (Session && Session.CartItems) {
        itemCount = Session.CartItems.length;
    }

    // Discount tiers based on item count
    if (itemCount >= 10) {
        price = price * 0.90; // 10% off for 10+ items
        alert("Multi-item discount: 10% off");
    } else if (itemCount >= 5) {
        price = price * 0.95; // 5% off for 5+ items
        alert("Multi-item discount: 5% off");
    }

    return price;
}

return calculatePrice();
```

---

### Cross-Session Cart Value

Calculate total cart value for volume-based pricing:

```javascript
function calculatePrice() {
    var price = Item.Price;

    // Calculate total cart value
    var cartValue = 0;
    if (Session && Session.CartItems) {
        for (var i = 0; i < Session.CartItems.length; i++) {
            var item = Session.CartItems[i];
            cartValue = cartValue + (item.Price * item.Quantity);
        }
    }

    debug("Total cart value: $" + cartValue);

    // Volume-based discount tiers
    if (cartValue >= 1000) {
        price = price * 0.85; // 15% off
        alert("Volume discount: 15% off for orders over $1000");
    } else if (cartValue >= 500) {
        price = price * 0.92; // 8% off
        alert("Volume discount: 8% off for orders over $500");
    }

    return price;
}

return calculatePrice();
```

---

## Safe Access Pattern

Always check for Session availability:

```javascript
function calculatePrice() {
    var price = Item.Price;

    // Safe Session access
    if (!Session) {
        debug("Session not available");
        return price;
    }

    // Safe CartItems access
    var cartItems = Session.CartItems || [];
    debug("Cart items: " + cartItems.length);

    // Safe CustomerRoles access
    var roles = Session.CustomerRoles || [];
    debug("Customer roles: " + roles.join(", "));

    // Safe Email access
    var email = Session.Email || "";
    debug("Customer email: " + email);

    // Safe Department access
    var department = Session.Department || "";
    debug("Department: " + department);

    // Your pricing logic here...

    return price;
}

return calculatePrice();
```
