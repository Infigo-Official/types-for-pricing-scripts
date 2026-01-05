# Types for Pricing Script

Type definitions for the Infigo Pricing Script scripting interface.

![Version](https://img.shields.io/badge/version-1.0.3-blue)
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

### 1. Create a TypeScript Configuration

Create `tsconfig.json` in your project:

```json
{
  "compilerOptions": {
    "target": "ES5",
    "lib": ["ES6"],
    "module": "CommonJS",
    "strict": true,
    "esModuleInterop": true
  },
  "include": ["src/**/*"]
}
```

### 2. Write Your First Pricing Script

Create `src/pricing-script.ts`:

```typescript
// Basic pricing script example
function calculatePrice(): number {
    // Start with the base price
    let price = Item.Price;

    // Apply tier pricing if available
    if (Item.PricingTiers.length > 0) {
        const tier = HelperMethods.FindTier(Item.Quantity, Item.PricingTiers);
        if (tier) {
            price = tier.Price;
        }
    }

    // Add attribute adjustments
    price += HelperMethods.GetAttributePriceAdjustment(Item.Quantity);

    // Log the final price
    console(`Final price: $${price.toFixed(2)}`);

    return price;
}

// Return the calculated price
return calculatePrice();
```

### 3. Get IntelliSense

Your IDE will now provide:
- Autocomplete for `Item`, `Session`, `CheckoutItem`, `Configuration`, `HelperMethods`
- Type information on hover
- Parameter hints for methods
- Documentation from JSDoc comments

## API Reference

### Global Objects

| Object | Description |
|--------|-------------|
| `Item` | The main product item being priced with all its properties and methods |
| `Session` | Session-level data including cart items and customer information |
| `CheckoutItem` | Checkout context with shipping addresses and customer details |
| `Configuration` | Script configuration and parameters |
| `HelperMethods` | Utility functions for pricing calculations |

### Output Functions

| Function | Description |
|----------|-------------|
| `debug(message)` | Debug messages (admin testing only) |
| `alert(message)` | Information messages shown to users |
| `warning(message)` | Warning messages shown to users |
| `error(message)` | Error messages shown to users |
| `console(message)` | Console logging for debugging |

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
| `getFileInfo(attributeId, readContent?)` | `FileInfo` | Get information about uploaded files |
| `getAttributeValue(attributeName)` | `string` | Get attribute value by name |
| `setAttributeValue(attributeName, value)` | `void` | Set attribute value |
| `getGlobalFileContent(filename)` | `string[]` | Load global configuration files |
| `getGlobalFileCsvContent(filename)` | `string[][]` | Load CSV data from global files |

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

```typescript
// Simple price calculation with attribute adjustments
function calculatePrice(): number {
    let price = Item.Price;
    price += HelperMethods.GetAttributePriceAdjustment(Item.Quantity);
    return price;
}

return calculatePrice();
```

### Tier-Based Pricing

```typescript
// Quantity-based tier pricing
function calculatePrice(): number {
    const tier = HelperMethods.FindTier(
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

```typescript
// Different prices for different customer roles
function calculatePrice(): number {
    let price = Item.Price;

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

```typescript
// Look up prices from a CSV file
function calculatePrice(): number {
    const csvData = Item.getGlobalFileCsvContent("pricing-matrix.csv");

    if (!csvData || csvData.length === 0) {
        warning("Pricing matrix not found, using default price");
        return Item.Price;
    }

    // Find matching row based on attributes
    const size = Item.getAttributeValue("Size");
    const material = Item.getAttributeValue("Material");

    for (let i = 1; i < csvData.length; i++) {
        const row = csvData[i];
        if (row[0] === size && row[1] === material) {
            return parseFloat(row[2]); // Price column
        }
    }

    return Item.Price;
}

return calculatePrice();
```

### File-Based Pricing

```typescript
// Price based on uploaded file characteristics
function calculatePrice(): number {
    let price = Item.Price;

    const fileInfo = Item.getFileInfo("artwork", true);

    if (fileInfo.Error) {
        return price;
    }

    // Add per-page fee for PDFs
    if (fileInfo.MimeType === "application/pdf") {
        price += fileInfo.NumberOfPages * 0.25;
        console(`Added $${(fileInfo.NumberOfPages * 0.25).toFixed(2)} for ${fileInfo.NumberOfPages} pages`);
    }

    // Add size-based fee
    const sizeMB = fileInfo.Size / (1024 * 1024);
    if (sizeMB > 5) {
        price += (sizeMB - 5) * 1.00; // $1 per MB over 5MB
    }

    return price;
}

return calculatePrice();
```

## Project Structure

```
types-for-pricing-script/
├── v1/                           # Version 1 type definitions
│   ├── OrderItem/
│   │   ├── Item.d.ts            # Main Item interface
│   │   ├── Attribute.d.ts       # Attribute definitions
│   │   ├── Tier.d.ts            # Pricing tier definitions
│   │   └── Version.d.ts         # Version/job management
│   ├── File/
│   │   └── FileInfo.d.ts        # File information interface
│   ├── Configuration/
│   │   └── Configuration.d.ts   # Script configuration
│   ├── Output/
│   │   └── Output.d.ts          # Output functions
│   ├── Helpers/
│   │   └── Helpers.d.ts         # Helper methods
│   ├── SessionItem/
│   │   └── Session.d.ts         # Session interface
│   ├── CheckoutItem/
│   │   └── CheckoutItem.d.ts    # Checkout interface
│   └── index.d.ts               # Main entry point
├── docs/                         # Documentation site
├── package.json
├── README.md
└── QUICKSTART.md
```

## Development

### Building Documentation

```bash
# Generate TypeDoc documentation
npm run docs

# Serve documentation locally
npm start
```

### Running Examples

```bash
cd examples
npm install
npm run build
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

```typescript
// Always return a number
return calculatePrice();
```

### IntelliSense Not Working
1. Ensure the package is installed: `npm i -D @infigo-official/types-for-pricing-script`
2. Restart your IDE
3. Check that `tsconfig.json` is configured correctly

### Type Errors
The types are read-only where appropriate. Use the provided methods to modify values:

```typescript
// Wrong - Item.Price is read-only for assignment
// Item.Price = 100;

// Correct - return your calculated price
return 100;

// Correct - use setAttributeValue for attributes
Item.setAttributeValue("custom_field", "value");
```

## Changelog

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
