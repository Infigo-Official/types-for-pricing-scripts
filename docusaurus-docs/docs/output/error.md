---
id: error
title: error()
sidebar_label: error()
---

# error()

Display an error message indicating a calculation problem.

```javascript
error(message)
```

**Parameters:**
- `message` (string) - The error message to display

---

## Usage

```javascript
error("Unable to calculate price");
error("Invalid configuration");
error("Missing required data: " + fieldName);
```

---

## When to Use

- **Calculation failures**: Report when pricing cannot be determined
- **Invalid data**: Alert about missing or corrupt data
- **Configuration errors**: Indicate setup problems

---

## Example

```javascript
function calculatePrice() {
    try {
        // Validate required data
        if (!Item.Price || Item.Price <= 0) {
            error("Invalid base price configured");
            return 0;
        }

        if (!Item.Quantity || Item.Quantity <= 0) {
            error("Invalid quantity");
            return Item.Price;
        }

        // Load required CSV
        var fileInfo = Item.getGlobalFileContent("prices.csv");
        if (fileInfo.Error || !fileInfo.Content || fileInfo.Content.length < 2) {
            error("Pricing data not found - please contact support");
            return Item.Price;
        }

        var csv = HelperMethods.CSV.parse(fileInfo.Content.join("\n"));

        // Calculate price
        var price = Item.Price;

        var size = Item.getAttributeValue("Size");
        if (!size) {
            error("Size selection required");
            return Item.Price;
        }

        // Look up price
        var found = false;
        for (var i = 1; i < csv.length; i++) {
            if (csv[i][0] === size) {
                price = parseFloat(csv[i][1]);
                found = true;
                break;
            }
        }

        if (!found) {
            error("Price not configured for size: " + size);
            return Item.Price;
        }

        return price;

    } catch (err) {
        error("Calculation failed: " + err);
        return Item.Price;
    }
}

return calculatePrice();
```

:::danger
Error messages indicate serious problems. Always provide a fallback price when showing an error.
:::
