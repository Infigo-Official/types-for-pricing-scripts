# Types for Pricing Script

Type definitions for the Infigo Pricing Script scripting interface.

![Version](https://img.shields.io/badge/version-1.0.9-blue)
![TypeScript](https://img.shields.io/badge/typescript-4.9.5-blue)
![License](https://img.shields.io/badge/license-MIT-green)
![npm](https://img.shields.io/npm/v/@infigo-official/types-for-pricing-script)

Full documentation is available [here](https://infigo-official.github.io/types-for-pricing-scripts/).

## Overview

**Types for Pricing Script** provides TypeScript type definitions for the Infigo Pricing Script engine. These definitions enable full IntelliSense support, type checking, and documentation within your IDE when developing pricing scripts.

## Features

- **Complete Type Definitions**: Full coverage of the Pricing Script API
- **IntelliSense Support**: Get autocomplete and inline documentation in your IDE
- **Type Safety**: Catch errors at development time before deploying scripts
- **Comprehensive Examples**: Real-world pricing script examples
- **Helper Methods**: Built-in utilities for common pricing calculations

## Installation

```bash
# Initialize a new project (if needed)
npm init -y

# Install as dev dependency (recommended)
npm i -D @infigo-official/types-for-pricing-script

# Or install as regular dependency
npm i @infigo-official/types-for-pricing-script
```

## Quick Start

Pricing scripts run on an ES5 JavaScript engine, so write them as plain ES5 JavaScript (`var`, `function`, `indexOf`; no `let`/`const`, arrow functions, template literals, `includes` or `startsWith`). The setup below type-checks your JavaScript against these definitions, and the file can be pasted into the admin script editor unchanged.

### 1. Create a TypeScript Configuration

Create `tsconfig.json` in your project:

```json
{
  "compilerOptions": {
    "target": "ES5",
    "lib": ["ES5"],
    "allowJs": true,
    "checkJs": true,
    "noEmit": true,
    "strict": true,
    "types": ["@infigo-official/types-for-pricing-script"]
  },
  "include": ["src/**/*"]
}
```

`"lib": ["ES5"]` makes the editor flag methods the pricing engine does not support, such as `Array.prototype.includes`.

### 2. Write Your First Pricing Script

Create `src/pricing-script.js`:

```javascript
// Basic pricing script example
function calculatePrice() {
    // Start with the base price
    var price = Item.Price;

    // Apply tier pricing if available
    var tier = HelperMethods.FindTier(Item.Quantity, Item.PricingTiers);
    if (tier) {
        price = tier.Price;
    }

    // Add attribute adjustments
    price += HelperMethods.GetAttributePriceAdjustment(Item.Quantity);

    // Log the final price
    console("Final price: $" + price.toFixed(2));

    return price;
}

// Pricing scripts return the price from the top level, which TypeScript does not allow,
// so the next line silences that one check.
// @ts-ignore
return calculatePrice();
```

### 3. Get IntelliSense

Your IDE will now provide:
- Autocomplete for `Item`, `Session`, `CheckoutItem`, `Configuration`, `Constants`, `HelperMethods`
- Type information on hover
- Parameter hints for methods
- Documentation from JSDoc comments
- Errors for calls that do not exist at runtime, and for missing null checks (for example on `Item.getFileInfo()`)

## API Reference

### Global Objects

| Object | Description |
|--------|-------------|
| `Item` | The main product item being priced with all its properties and methods |
| `Session` | Session-level data including cart items and customer information |
| `CheckoutItem` | Checkout context with shipping addresses and customer details |
| `Configuration` | Script configuration via `Configuration.ScriptConfig()` |
| `Constants` | Constants such as `Constants.MessageArea` |
| `HelperMethods` | Utility functions for pricing calculations |

### Output Functions

| Function | Description |
|----------|-------------|
| `debug(message, location?)` | Debug messages (admin testing only) |
| `alert(message, location?)` | Information messages shown to users |
| `warning(message, location?)` | Warning messages shown to users |
| `error(message, location?)` | Error messages shown to users |
| `console(message, location?)` | Console logging for debugging |

The optional `location` chooses where the message is shown. Use a `Constants.MessageArea` value: `All` (default), `ProductDetails`, `PostEditor`, `Basket`, `AdminArea` or `ProductDetailsAndPostEditor`.

```javascript
alert("Bulk discount applied", Constants.MessageArea.Basket);
```

### Global Functions

| Function | Returns | Description |
|----------|---------|-------------|
| `parseCsv(csv, hasHeaders?, delimiter?, quote?, disableNumberConversion?)` | `(string \| number)[][] \| null` | Parse CSV text into a 2D array |
| `setTierPrice(quantity, price)` | `void` | Set a tier price for the product page tier table (dynamic tier prices) |

### Item Properties

<details>
<summary><strong>Click to expand full Item properties list</strong></summary>

#### Pricing Properties
| Property | Type | Description |
|----------|------|-------------|
| `Price` | `number` | Base product variant price |
| `OldPrice` | `number` | Previous price for comparison |
| `UnitPrice` | `number` | Calculated unit price |
| `FinalPrice` | `number` | Final calculated price |
| `ProductCost` | `number` | Production/acquisition cost |
| `SpecialPrice` | `number` | Promotional price |
| `AdditionalShippingCharge` | `number` | Shipping surcharge |

#### Product Information
| Property | Type | Description |
|----------|------|-------------|
| `ProductName` | `string` | Display name |
| `ProductId` | `number` | Product ID |
| `ProductGroupName` | `string \| null` | Product group name |
| `Specifications` | `Specification[]` | Specification attributes (Key, Value, DefaultValue) |
| `Sku` | `string` | Product SKU |
| `ActualSku` | `string` | SKU including combinations |
| `Categories` | `string[]` | Product categories |
| `Tags` | `string[]` | Product tags |
| `Weight`, `Width`, `Height`, `Length` | `number` | Physical dimensions |

#### Quantity & Packaging
| Property | Type | Description |
|----------|------|-------------|
| `Quantity` | `number` | Order quantity |
| `PackQuantity` | `number` | Pack-based quantity |
| `IsBatch` | `boolean` | Batch job indicator |
| `NumberOfPages` | `number` | Pages in document |
| `NumberOfRecords` | `number` | Records count |
| `JobId` | `string \| null` | ID of the job behind the item |
| `CanSetJobProperties` | `boolean` | Whether the item has a job whose properties can be set |

#### Script Context
| Property | Type | Description |
|----------|------|-------------|
| `ScriptContext` | `"Product" \| "CheckoutAttribute" \| "LandingPageWithTierPrices"` | Mode the script is running in |
| `IsTierPriceMode` | `boolean` | Script is building the product page tier price table |

#### Pricing Tiers
| Property | Type | Description |
|----------|------|-------------|
| `PricingTiers` | `Tier[]` | Standard pricing tiers |
| `BatchTiers` | `Tier[]` | Batch pricing tiers |
| `PricePerRecord` | `number` | Per-record pricing |

#### Customer Information
| Property | Type | Description |
|----------|------|-------------|
| `Email` | `string` | Customer email |
| `CustomerRoles` | `string[]` | Customer role assignments |
| `Department` | `string` | Customer department |
| `DiscountCode` | `string` | Applied discount code |

#### Attributes
| Property | Type | Description |
|----------|------|-------------|
| `Attributes` | `Attribute[]` | Product attributes with values |

</details>

### Item Methods

| Method | Returns | Description |
|--------|---------|-------------|
| `getFileInfo(attributeId, readContent, getTextFileContent?)` | `FileInfo \| null` | Get information about uploaded files |
| `getAttributeValue(attributeName)` | `string` | Get attribute value by name |
| `setAttributeValue(attributeName, value)` | `void` | Set attribute value |
| `getGlobalFileContent(filename)` | `FileInfo` | Load global configuration files |
| `getGlobalFileCsvContent(filename)` | `string[][]` | Load CSV data from global files |
| `getRowsFromLookup(filename, columnNames, columnValues)` | `string[][] \| null` | Indexed lookup of matching rows in a global CSV file |
| `ToJson(obj)` | `string` | Serialize a value to JSON for logging |

### Session Properties

| Property | Type | Description |
|----------|------|-------------|
| `ScriptContext` | `"Product" \| "CheckoutAttribute" \| "LandingPageWithTierPrices"` | Mode the script is running in |
| `IsTierPriceMode` | `boolean` | Script is building the product page tier price table |

### Session Methods

| Method | Returns | Description |
|--------|---------|-------------|
| `getCheckoutAttributeValue(attributeName)` | `string` | Get checkout attribute value by name |
| `setCheckoutAttributeValue(attributeName, value)` | `void` | Set checkout attribute value on the customer |
| `ToJson(obj)` | `string` | Serialize a value to JSON for logging |

### Helper Methods

| Method | Description |
|--------|-------------|
| `FindTier(quantity, tiers, roles?)` | Find appropriate pricing tier |
| `GetAttributePriceAdjustment(quantity, roles?)` | Calculate total attribute adjustments |
| `InterpolatePrice(quantity, tiers)` | Interpolate prices between tiers |
| `CSV.parse(csv, options?)` | Parse CSV string to 2D array |
| `CSV.stringify(data, options?)` | Convert 2D array to CSV string |
| `LogObject(data)` | Log object properties for debugging |
| `Contains(array, value)` | Check if array contains value |
| `IsObject(item)` / `IsArray(item)` | Type checking utilities |
| `MergeObject(target, source)` | Deep merge objects |

## Examples

### Basic Pricing

The examples below are full scripts. In an editor, put `// @ts-ignore` above the final `return` as shown in Quick Start.

```javascript
// Simple price calculation with attribute adjustments
function calculatePrice() {
    var price = Item.Price;
    price += HelperMethods.GetAttributePriceAdjustment(Item.Quantity);
    return price;
}

return calculatePrice();
```

### Tier-Based Pricing

```javascript
// Quantity-based tier pricing
function calculatePrice() {
    var tier = HelperMethods.FindTier(
        Item.Quantity,
        Item.PricingTiers,
        Item.CustomerRoles
    );

    if (tier) {
        return tier.Price + HelperMethods.GetAttributePriceAdjustment(Item.Quantity);
    }

    return Item.Price;
}

return calculatePrice();
```

### Customer Role Pricing

```javascript
// Different prices for different customer roles
function calculatePrice() {
    var price = Item.Price;

    // Check for wholesale customer
    if (HelperMethods.Contains(Item.CustomerRoles, "Wholesale")) {
        price *= 0.80; // 20% wholesale discount
        alert("Wholesale discount applied: 20% off");
    }

    // Check for VIP customer
    if (HelperMethods.Contains(Item.CustomerRoles, "VIP")) {
        price *= 0.90; // Additional 10% VIP discount
        alert("VIP discount applied: 10% off");
    }

    return price;
}

return calculatePrice();
```

### CSV-Based Pricing

```javascript
// Look up prices from a CSV file
function calculatePrice() {
    var csvData = Item.getGlobalFileCsvContent("pricing-matrix.csv");

    if (!csvData || csvData.length === 0) {
        warning("Pricing matrix not found, using default price");
        return Item.Price;
    }

    // Find matching row based on attributes
    var size = Item.getAttributeValue("Size");
    var material = Item.getAttributeValue("Material");

    for (var i = 1; i < csvData.length; i++) {
        var row = csvData[i];
        if (row[0] === size && row[1] === material) {
            return parseFloat(row[2]); // Price column
        }
    }

    return Item.Price;
}

return calculatePrice();
```

### File-Based Pricing

```javascript
// Price based on uploaded file characteristics
function calculatePrice() {
    var price = Item.Price;

    for (var i = 0; i < Item.Attributes.length; i++) {
        var attr = Item.Attributes[i];
        if (attr.Type !== "FileUpload") {
            continue;
        }

        // getFileInfo is keyed by the attribute ID and returns null when nothing was uploaded
        var fileInfo = Item.getFileInfo(String(attr.Id), false);
        if (!fileInfo || fileInfo.Error) {
            continue;
        }

        // Add per-page fee for PDFs
        if (fileInfo.MimeType === "application/pdf") {
            price += fileInfo.NumberOfPages * 0.25;
            console("Added $" + (fileInfo.NumberOfPages * 0.25).toFixed(2) + " for " + fileInfo.NumberOfPages + " pages");
        }

        // Add size-based fee
        var sizeMB = fileInfo.Size / (1024 * 1024);
        if (sizeMB > 5) {
            price += (sizeMB - 5) * 1.00; // $1 per MB over 5MB
        }
    }

    return price;
}

return calculatePrice();
```

### Messages in a Specific Area

```javascript
// Show the note only in the basket, and a debug line only in the admin area
alert("Bulk discount applied", Constants.MessageArea.Basket);
debug(Item.ToJson(Item.Specifications), Constants.MessageArea.AdminArea);

return Item.Price;
```

## Project Structure

```
types-for-pricing-script/
├── v1/                           # Version 1 type definitions
│   ├── OrderItem/
│   │   ├── Item.d.ts            # Main Item interface
│   │   ├── Attribute.d.ts       # Attribute definitions
│   │   ├── Tier.d.ts            # Pricing tier definitions
│   │   ├── Version.d.ts         # Version/job management
│   │   └── Specification.d.ts   # Product specification attributes
│   ├── File/
│   │   └── FileInfo.d.ts        # File information interface
│   ├── Configuration/
│   │   └── Configuration.d.ts   # Script configuration
│   ├── Constants/
│   │   └── Constants.d.ts       # Constants.MessageArea
│   ├── Output/
│   │   └── Output.d.ts          # Output functions
│   ├── Helpers/
│   │   └── Helpers.d.ts         # Helper methods
│   ├── Functions/
│   │   └── Functions.d.ts       # Global functions (parseCsv, setTierPrice)
│   ├── SessionItem/
│   │   └── Session.d.ts         # Session interface
│   ├── CheckoutItem/
│   │   └── CheckoutItem.d.ts    # Checkout interface
│   └── index.d.ts               # Main entry point
├── docs/                         # Documentation site
├── DocumentationHome.md          # Documentation site home page
├── package.json
└── README.md
```

## Development

### Building Documentation

```bash
# Generate TypeDoc documentation
npm run docs

# Serve documentation locally
npm start
```

## Supported File Types

The FileInfo interface supports these file types:

| Type | Properties Available |
|------|---------------------|
| PDF | Size, NumberOfPages, Dimensions, Content |
| JPEG/PNG/GIF/BMP/TIFF | Size, Dimensions |
| Text/CSV | Size, NumberOfRecords, Content |

**Note**: File content is only available for files under 50KB. Page count is limited to PDFs under 10MB.

## Troubleshooting

### Script Not Returning Value
Ensure your script returns a number. If an exception occurs, the system falls back to the normal price.

```javascript
// Always return a number
return calculatePrice();
```

### IntelliSense Not Working
1. Ensure the package is installed: `npm i -D @infigo-official/types-for-pricing-script`
2. Check that `tsconfig.json` lists the package under `compilerOptions.types` (see Quick Start)
3. Restart your IDE

### "A 'return' statement can only be used within a function body"
Pricing scripts return the price from the top level. Put `// @ts-ignore` on the line above that `return`.

### Type Errors
The types are read-only where appropriate. Use the provided methods to modify values:

```javascript
// Wrong - Item.Price is read-only for assignment
// Item.Price = 100;

// Correct - return your calculated price
return 100;

// Correct - use setAttributeValue for attributes
Item.setAttributeValue("custom_field", "value");
```

## Changelog

### v1.0.9
- Added Item `ProductId`, `ProductGroupName`, `JobId`, `CanSetJobProperties`, `Specifications`, `getRowsFromLookup`, `ToJson` and the three-argument `getFileInfo`
- Added Session `ScriptContext`, `IsTierPriceMode` and `ToJson`
- Added `Constants.MessageArea` and the optional `location` argument of the output functions
- Added global `setTierPrice` and `parseCsv`, and Session `getCheckoutAttributeValue` / `setCheckoutAttributeValue` (first npm release containing them)
- Removed `Configuration.Parameters()` and the `ConfigurationInterface` type, which do not exist at runtime
- `Item.getFileInfo()` now returns `FileInfo | null`, matching the runtime; with `strictNullChecks`, add a null check before reading its properties
- Output functions now accept any value as the message, not only strings
- Fixed the File-Based Pricing example to use `Item.getFileInfo()`

### v1.0.3
- Updated documentation
- Added more examples

### v1.0.2
- Added CSV helper methods
- Improved type definitions

### v1.0.1
- Initial release
- Core type definitions

## License

MIT

## Contributing

This package is maintained by the Infigo development team.

For issues or questions, please visit:
- [GitHub Issues](https://github.com/Infigo-Official/types-for-pricing-scripts/issues)
- [Documentation](https://infigo-official.github.io/types-for-pricing-script/)

---

**Built for the Infigo Platform**
