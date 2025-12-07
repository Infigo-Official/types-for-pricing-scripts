---
id: csv-lookup
title: CSV-Based Pricing
sidebar_label: CSV Lookup
sidebar_position: 4
---

# CSV-Based Pricing Pattern

Load pricing data from CSV files for complex pricing matrices.

---

## Basic CSV Lookup

```javascript
function calculatePrice() {
    var fileInfo = Item.getGlobalFileContent("pricing-matrix.csv");

    if (fileInfo.Error || !fileInfo.Content || fileInfo.Content.length < 2) {
        warning("Pricing matrix not found");
        return Item.Price;
    }

    var csv = HelperMethods.CSV.parse(fileInfo.Content.join("\n"));

    var size = Item.getAttributeValue("Size");
    var material = Item.getAttributeValue("Material");

    // Skip header row (index 0)
    for (var i = 1; i < csv.length; i++) {
        if (csv[i][0] === size && csv[i][1] === material) {
            return parseFloat(csv[i][2]);
        }
    }

    // Fallback if no match
    return Item.Price;
}

return calculatePrice();
```

---

## CSV Structure Example

**pricing-matrix.csv:**
```csv
Size,Material,Price
Small,Paper,10.00
Small,Vinyl,15.00
Medium,Paper,15.00
Medium,Vinyl,22.50
Large,Paper,25.00
Large,Vinyl,37.50
```

---

## With Header Mapping

More flexible lookup using headers:

```javascript
function calculatePrice() {
    var fileInfo = Item.getGlobalFileContent("prices.csv");

    if (fileInfo.Error || !fileInfo.Content || fileInfo.Content.length < 2) {
        return Item.Price;
    }

    var csv = HelperMethods.CSV.parse(fileInfo.Content.join("\n"));

    // Get header indices
    var headers = csv[0];
    var sizeCol = -1;
    var materialCol = -1;
    var priceCol = -1;

    for (var h = 0; h < headers.length; h++) {
        if (headers[h] === "Size") sizeCol = h;
        if (headers[h] === "Material") materialCol = h;
        if (headers[h] === "Price") priceCol = h;
    }

    if (sizeCol === -1 || materialCol === -1 || priceCol === -1) {
        error("Invalid CSV structure");
        return Item.Price;
    }

    var size = Item.getAttributeValue("Size");
    var material = Item.getAttributeValue("Material");

    for (var i = 1; i < csv.length; i++) {
        if (csv[i][sizeCol] === size && csv[i][materialCol] === material) {
            return parseFloat(csv[i][priceCol]);
        }
    }

    return Item.Price;
}

return calculatePrice();
```

---

## Multi-Dimensional Lookup

Look up price based on multiple attributes:

```javascript
function calculatePrice() {
    var fileInfo = Item.getGlobalFileContent("complex-pricing.csv");

    if (fileInfo.Error || !fileInfo.Content || fileInfo.Content.length < 2) {
        return Item.Price;
    }

    var csv = HelperMethods.CSV.parse(fileInfo.Content.join("\n"));

    // Get attribute values
    var size = Item.getAttributeValue("Size");
    var material = Item.getAttributeValue("Material");
    var finish = Item.getAttributeValue("Finish");
    var quantity = Item.Quantity;

    // Find matching row
    for (var i = 1; i < csv.length; i++) {
        var row = csv[i];
        var csvSize = row[0];
        var csvMaterial = row[1];
        var csvFinish = row[2];
        var minQty = parseInt(row[3]);
        var maxQty = parseInt(row[4]);
        var price = row[5];

        if (csvSize === size &&
            csvMaterial === material &&
            csvFinish === finish &&
            quantity >= minQty &&
            quantity <= maxQty) {

            debug("Found price: $" + price + " for " + size + "/" + material + "/" + finish);
            return parseFloat(price);
        }
    }

    warning("No matching price found in matrix");
    return Item.Price;
}

return calculatePrice();
```

---

## Role-Based CSV Pricing

Different price columns per role:

```javascript
function calculatePrice() {
    var fileInfo = Item.getGlobalFileContent("role-pricing.csv");

    if (fileInfo.Error || !fileInfo.Content || fileInfo.Content.length < 2) {
        return Item.Price;
    }

    var csv = HelperMethods.CSV.parse(fileInfo.Content.join("\n"));
    var headers = csv[0];

    // Find column indices
    var productCol = -1;
    for (var h = 0; h < headers.length; h++) {
        if (headers[h] === "Product") productCol = h;
    }

    // Determine which price column to use
    var priceColName = "Retail";
    if (HelperMethods.Contains(Item.CustomerRoles, "Wholesale")) {
        priceColName = "Wholesale";
    } else if (HelperMethods.Contains(Item.CustomerRoles, "VIP")) {
        priceColName = "VIP";
    }

    var priceCol = -1;
    for (var p = 0; p < headers.length; p++) {
        if (headers[p] === priceColName) priceCol = p;
    }

    if (priceCol === -1) {
        error("Price column " + priceColName + " not found");
        return Item.Price;
    }

    // Find product
    for (var i = 1; i < csv.length; i++) {
        if (csv[i][productCol] === Item.Sku) {
            var price = parseFloat(csv[i][priceCol]);
            debug(priceColName + " price for " + Item.Sku + ": $" + price);
            return price;
        }
    }

    return Item.Price;
}

return calculatePrice();
```

**role-pricing.csv:**
```csv
Product,Retail,VIP,Wholesale
SKU-001,29.99,25.99,19.99
SKU-002,49.99,44.99,34.99
SKU-003,99.99,89.99,69.99
```

---

## Quantity Tier CSV

```javascript
function calculatePrice() {
    var fileInfo = Item.getGlobalFileContent("quantity-tiers.csv");

    if (fileInfo.Error || !fileInfo.Content || fileInfo.Content.length < 2) {
        return Item.Price;
    }

    var csv = HelperMethods.CSV.parse(fileInfo.Content.join("\n"));

    var sku = Item.Sku;
    var quantity = Item.Quantity;

    // Find all tiers for this product
    var productTiers = [];
    for (var i = 1; i < csv.length; i++) {
        if (csv[i][0] === sku) {
            productTiers.push(csv[i]);
        }
    }

    if (productTiers.length === 0) {
        return Item.Price;
    }

    // Find applicable tier
    var price = Item.Price;
    for (var t = 0; t < productTiers.length; t++) {
        var tier = productTiers[t];
        var minQty = parseInt(tier[1]);
        var tierPrice = parseFloat(tier[2]);

        if (quantity >= minQty) {
            price = tierPrice;
        }
    }

    return price;
}

return calculatePrice();
```

**quantity-tiers.csv:**
```csv
SKU,MinQuantity,Price
SKU-001,1,10.00
SKU-001,10,9.00
SKU-001,50,8.00
SKU-001,100,7.00
```

---

## Dynamic CSV Filename

Build the CSV filename based on selected attributes:

```javascript
function calculatePrice() {
    // Get attribute values for CSV lookup
    var material = Item.getAttributeValue("Material") || "standard";
    var finish = Item.getAttributeValue("Finish") || "matte";

    // Build dynamic filename
    var filename = "pricing-" + material.toLowerCase() + "-" + finish.toLowerCase() + ".csv";
    debug("Loading: " + filename);

    var fileInfo = Item.getGlobalFileContent(filename);

    // Fallback to default if specific CSV not found
    if (fileInfo.Error || !fileInfo.Content) {
        debug("Specific CSV not found, using default");
        fileInfo = Item.getGlobalFileContent("pricing-default.csv");
    }

    if (fileInfo.Error || !fileInfo.Content) {
        warning("Pricing data unavailable");
        return Item.Price;
    }

    // Parse and look up price
    var csv = HelperMethods.CSV.parse(fileInfo.Content.join("\n"));
    var sku = Item.ActualSku;

    for (var i = 1; i < csv.length; i++) {
        if (csv[i][0] === sku) {
            return parseFloat(csv[i][1]);
        }
    }

    return Item.Price;
}

return calculatePrice();
```

---

## CSV with Setup Costs

Include setup costs from CSV that are divided by quantity:

```javascript
function calculatePrice() {
    var fileInfo = Item.getGlobalFileContent("pricing-with-setup.csv");

    if (fileInfo.Error || !fileInfo.Content || fileInfo.Content.length < 2) {
        return Item.Price;
    }

    var csv = HelperMethods.CSV.parse(fileInfo.Content.join("\n"));

    // CSV format: SKU,MinQty,UnitPrice,SetupCost
    var sku = Item.ActualSku;
    var quantity = Item.Quantity;

    var matchedRow = null;
    for (var i = 1; i < csv.length; i++) {
        var row = csv[i];
        if (row[0] === sku && quantity >= parseInt(row[1])) {
            matchedRow = row;
        }
    }

    if (!matchedRow) {
        return Item.Price;
    }

    var unitPrice = parseFloat(matchedRow[2]);
    var setupCost = parseFloat(matchedRow[3]) || 0;

    // Setup cost is divided by quantity
    var pricePerUnit = unitPrice + (setupCost / quantity);

    debug("Unit price: $" + unitPrice);
    debug("Setup cost: $" + setupCost + " / " + quantity + " = $" + (setupCost / quantity).toFixed(4));
    debug("Final per-unit: $" + pricePerUnit.toFixed(4));

    return pricePerUnit;
}

return calculatePrice();
```

---

## Error Handling

```javascript
function calculatePrice() {
    try {
        var fileInfo = Item.getGlobalFileContent("prices.csv");

        if (fileInfo.Error) {
            error("Failed to load pricing CSV: " + fileInfo.Error);
            return Item.Price;
        }

        if (!fileInfo.Content || fileInfo.Content.length < 2) {
            warning("Pricing CSV is empty");
            return Item.Price;
        }

        var csv = HelperMethods.CSV.parse(fileInfo.Content.join("\n"));

        var size = Item.getAttributeValue("Size");
        if (!size) {
            warning("Size not selected");
            return Item.Price;
        }

        for (var i = 1; i < csv.length; i++) {
            if (csv[i][0] === size) {
                var price = parseFloat(csv[i][1]);
                if (isNaN(price)) {
                    error("Invalid price in CSV row " + i);
                    continue;
                }
                return price;
            }
        }

        warning("No price found for size: " + size);
        return Item.Price;

    } catch (err) {
        error("CSV lookup error: " + err);
        return Item.Price;
    }
}

return calculatePrice();
```
