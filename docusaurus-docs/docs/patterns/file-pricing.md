---
id: file-pricing
title: File-Based Pricing
sidebar_label: File Pricing
sidebar_position: 5
---

# File-Based Pricing Pattern

Price products based on uploaded file properties like page count, dimensions, and file size.

---

## Basic Page Count Pricing

```javascript
function calculatePrice() {
    var price = Item.Price;
    var file = Item.getFileInfo("artwork", true);

    if (file.Error || file.Size === 0) {
        return price; // No file uploaded
    }

    // Per-page fee for PDFs
    if (file.MimeType === "application/pdf" && file.NumberOfPages > 0) {
        var perPageFee = 0.25;
        price = price + (file.NumberOfPages * perPageFee);
        debug("Added " + file.NumberOfPages + " pages @ $" + perPageFee + " each");
    }

    return price;
}

return calculatePrice();
```

---

## File Size Pricing

Charge based on file size:

```javascript
function calculatePrice() {
    var price = Item.Price;
    var file = Item.getFileInfo("upload", false);

    if (file.Error || file.Size === 0) {
        return price;
    }

    var sizeMB = file.Size / (1024 * 1024);

    // Free up to 5MB
    if (sizeMB > 5) {
        var extraMB = sizeMB - 5;
        var surcharge = extraMB * 0.50;
        price = price + surcharge;
        alert("Large file surcharge: $" + surcharge.toFixed(2));
    }

    debug("File size: " + sizeMB.toFixed(2) + " MB");

    return price;
}

return calculatePrice();
```

---

## Image Dimension Pricing

Price based on print dimensions:

```javascript
function calculatePrice() {
    var price = Item.Price;
    var file = Item.getFileInfo("image", true);

    if (file.Error || !file.Dimensions || file.Dimensions.length === 0) {
        return price;
    }

    // Get first page dimensions
    var dims = file.Dimensions[0];

    // Calculate area in square inches (72 points = 1 inch)
    var widthInches = dims.Width / 72;
    var heightInches = dims.Height / 72;
    var areaSquareInches = widthInches * heightInches;

    // Price per square inch
    var pricePerSqIn = 0.05;
    price = areaSquareInches * pricePerSqIn;

    debug("Dimensions: " + widthInches.toFixed(1) + '" x ' + heightInches.toFixed(1) + '"');
    debug("Area: " + areaSquareInches.toFixed(1) + " sq in");

    // Minimum price
    price = Math.max(price, 5.00);

    return price;
}

return calculatePrice();
```

---

## Multi-Page Document Pricing

Complex pricing for multi-page documents:

```javascript
function calculatePrice() {
    var price = Item.Price;
    var file = Item.getFileInfo("document", true);

    if (file.Error || file.MimeType !== "application/pdf") {
        return price;
    }

    var pageCount = file.NumberOfPages || 0;

    if (pageCount === 0) {
        warning("Could not determine page count");
        return price;
    }

    // Tiered per-page pricing
    var perPageCost = 0;
    if (pageCount <= 10) {
        perPageCost = pageCount * 1.00;
    } else if (pageCount <= 50) {
        perPageCost = 10 * 1.00 + (pageCount - 10) * 0.75;
    } else if (pageCount <= 100) {
        perPageCost = 10 * 1.00 + 40 * 0.75 + (pageCount - 50) * 0.50;
    } else {
        perPageCost = 10 * 1.00 + 40 * 0.75 + 50 * 0.50 + (pageCount - 100) * 0.25;
    }

    price = price + perPageCost;

    alert(pageCount + " pages: $" + perPageCost.toFixed(2));

    return price;
}

return calculatePrice();
```

---

## Page Size-Based Pricing

Price based on individual page dimensions:

```javascript
function calculatePrice() {
    var price = 0;
    var file = Item.getFileInfo("pdf", true);

    if (file.Error || !file.Dimensions || file.Dimensions.length === 0) {
        return Item.Price;
    }

    // Price each page based on size
    for (var i = 0; i < file.Dimensions.length; i++) {
        var page = file.Dimensions[i];
        var widthIn = page.Width / 72;  // Points to inches
        var heightIn = page.Height / 72;

        var pagePrice = 0;

        // Standard sizes
        if (widthIn <= 8.5 && heightIn <= 11) {
            pagePrice = 0.50; // Letter
        } else if (widthIn <= 11 && heightIn <= 17) {
            pagePrice = 1.00; // Tabloid
        } else if (widthIn <= 24 && heightIn <= 36) {
            pagePrice = 5.00; // Large format
        } else {
            pagePrice = 10.00; // Oversized
        }

        price = price + pagePrice;
        debug("Page " + (i + 1) + ": " + widthIn.toFixed(1) + '" x ' + heightIn.toFixed(1) + '" = $' + pagePrice);
    }

    return price;
}

return calculatePrice();
```

---

## File Type-Based Pricing

Different pricing for different file types:

```javascript
function calculatePrice() {
    var price = Item.Price;
    var file = Item.getFileInfo("file", true);

    if (file.Error || file.Size === 0) {
        return price;
    }

    // Pricing by file type
    var typePricing = {
        "application/pdf": 2.00,
        "image/jpeg": 1.00,
        "image/png": 1.50,
        "image/tiff": 3.00,
        "application/postscript": 5.00
    };

    var typePrice = typePricing[file.MimeType] || 1.00;
    price = price + typePrice;

    debug("File type: " + file.MimeType + ", Fee: $" + typePrice);

    return price;
}

return calculatePrice();
```

---

## CSV Content Pricing

Price based on records in uploaded CSV:

```javascript
function calculatePrice() {
    var price = Item.Price;
    var file = Item.getFileInfo("data", true);

    if (file.Error || file.Size === 0) {
        return price;
    }

    // Check for CSV/text file
    if (file.MimeType.indexOf("text") === -1 && file.MimeType.indexOf("csv") === -1) {
        warning("Please upload a CSV file");
        return price;
    }

    var recordCount = file.NumberOfRecords || 0;

    if (recordCount > 0) {
        // Per-record pricing
        var perRecord = 0.10;
        var recordFee = recordCount * perRecord;
        price = price + recordFee;

        alert("Processing " + recordCount + " records: $" + recordFee.toFixed(2));
    }

    return price;
}

return calculatePrice();
```

---

## Complete File Pricing Example

```javascript
function calculatePrice() {
    try {
        var price = Item.Price;
        var file = Item.getFileInfo("artwork", true);

        // No file uploaded
        if (file.Error || file.Size === 0) {
            debug("No file uploaded");
            return price;
        }

        debug("File: " + file.MimeType + ", " + file.Size + " bytes");

        // Page count fee (PDFs only)
        if (file.MimeType === "application/pdf") {
            var pages = file.NumberOfPages || 1;
            if (pages > 1) {
                var extraPages = pages - 1;
                price = price + (extraPages * 0.50);
                debug("Extra pages: " + extraPages + " @ $0.50");
            }
        }

        // Large file fee
        var sizeMB = file.Size / (1024 * 1024);
        if (sizeMB > 10) {
            var largeFee = 5.00;
            price = price + largeFee;
            warning("Large file fee: $" + largeFee);
        }

        // Dimension-based pricing for images
        if (file.MimeType && file.MimeType.indexOf("image/") === 0 && file.Dimensions && file.Dimensions.length > 0) {
            var dims = file.Dimensions[0];
            var sqInches = (dims.Width / 72) * (dims.Height / 72);
            if (sqInches > 100) {
                var sizeFee = Math.ceil((sqInches - 100) / 50) * 2.00;
                price = price + sizeFee;
                debug("Large image fee: $" + sizeFee);
            }
        }

        return price;

    } catch (err) {
        error("File pricing error: " + err);
        return Item.Price;
    }
}

return calculatePrice();
```

---

## Supported File Types

| Type | Available Properties |
|------|---------------------|
| JPEG, PNG, GIF, BMP, TIFF | Size, Dimensions (width/height) |
| PDF | Size, NumberOfPages, Dimensions (per page) |
| Text, CSV | Size, NumberOfRecords, Content (< 50KB) |

:::note
- File content is only available for text files under 50KB
- Page count is only available for PDFs under 10MB
- Dimensions are in points (72 points = 1 inch)
:::
