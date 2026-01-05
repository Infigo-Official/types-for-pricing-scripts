---
id: alert
title: alert()
sidebar_label: alert()
---

# alert()

Display an informational message to the customer.

```javascript
alert(message)
```

**Parameters:**
- `message` (string) - The message to display to the customer

---

## Usage

```javascript
alert("Free shipping on orders over $50!");
alert("10% discount applied");
alert("You save $" + savings.toFixed(2) + "!");
```

---

## When to Use

- **Discounts**: Inform customers about applied discounts
- **Promotions**: Highlight active promotions
- **Information**: Provide helpful pricing information

---

## Example

```javascript
function calculatePrice() {
    var price = Item.Price;
    var messages = [];

    // Tier discount
    var tier = HelperMethods.FindTier(Item.Quantity, Item.PricingTiers);
    if (tier && tier.Price < Item.Price) {
        price = tier.Price;
        var savings = (Item.Price - tier.Price) * Item.Quantity;
        messages.push("Volume discount: Save $" + savings.toFixed(2));
    }

    // Role discount
    if (HelperMethods.Contains(Item.CustomerRoles, "VIP")) {
        price = price * 0.90;
        messages.push("VIP discount: 10% off");
    }

    // Free shipping notification
    if (price * Item.Quantity >= 100) {
        messages.push("Free shipping included!");
    }

    // Show combined message
    if (messages.length > 0) {
        alert(messages.join(" | "));
    }

    return price;
}

return calculatePrice();
```

:::info
Alert messages appear to customers in the UI. Use them to communicate positive information about discounts and benefits.
:::
