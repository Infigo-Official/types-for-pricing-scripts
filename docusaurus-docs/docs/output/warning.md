---
id: warning
title: warning()
sidebar_label: warning()
---

# warning()

Display a warning message to the customer.

```javascript
warning(message)
```

**Parameters:**
- `message` (string) - The warning message to display

---

## Usage

```javascript
warning("Limited stock available");
warning("This selection may extend delivery time");
warning("Maximum quantity is 1000 units");
```

---

## When to Use

- **Limitations**: Alert about quantity limits or constraints
- **Availability**: Warn about stock or delivery issues
- **Conditions**: Inform about special conditions

---

## Example

```javascript
function calculatePrice() {
    var price = Item.Price;

    // Quantity limits
    if (Item.Quantity > 500) {
        warning("Orders over 500 units require approval");
    }

    // Stock warning
    if (Item.Quantity > 100) {
        warning("Large orders may take 5-7 business days");
    }

    // Attribute combination warning
    var size = Item.getAttributeValue("Size");
    var material = Item.getAttributeValue("Material");

    if (size === "Large" && material === "Premium") {
        warning("Premium Large items ship separately");
    }

    // File size warning
    var file = Item.getFileInfo("artwork", false);
    if (file.Size > 10 * 1024 * 1024) {
        warning("Large files may take longer to process");
    }

    return price;
}

return calculatePrice();
```

:::warning
Warning messages should inform customers about important limitations or conditions without blocking the order.
:::
