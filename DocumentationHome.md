# Pricing Script Interface Documentation

Documentation for the entire Pricing Script engine. Type declarations can be found in the [NPM package](https://www.npmjs.com/package/@infigo-official/types-for-pricingscript) and can be used for your TypeScript and JavaScript projects to get full IntelliSense support.

## Pricing Script Components

### Core Objects

- **Item**: The main object representing the product variant being priced, containing all product information, attributes, pricing data, and methods for file handling and attribute management.
- **Configuration**: Provides access to script configuration settings and parameters.
- **Customer**: Contains customer information including email, roles, department, and discount codes.

### Attribute Management

- **Attribute**: Represents product attributes with their values, price adjustments, weight adjustments, and dimensional adjustments.
- **AttributeValue**: Individual values within attributes, including tier-based pricing adjustments.

### File Handling

- **FileInfo**: Comprehensive file information including MIME type, size, page count, dimensions, and content for various file types.
- **PageSize**: Page dimension information for multi-page documents.

### Pricing and Tiers

- **Tier**: Quantity-based pricing tiers with customer role support.
- **Version**: Job versioning information including quantities and custom names.

### Helper Methods

- **HelperMethods**: Utility functions for common pricing calculations and data manipulation:
  - **FindTier**: Find appropriate pricing tier based on quantity and customer roles
  - **GetAttributePriceAdjustment**: Calculate attribute price adjustments including tier-based adjustments
  - **InterpolatePrice**: Interpolate prices between tier boundaries
  - **CSV**: Parse and stringify CSV data with configurable options
  - **LogObject**: Log object properties for debugging
  - **Contains**: Check if arrays contain specific values
  - **IsObject/IsArray**: Type checking utilities
  - **MergeObject**: Deep merge objects with conflict resolution

### Output Functions

- **debug()**: Output debug messages to the user interface
- **alert()**: Display alert messages to the user
- **warning()**: Show warning messages
- **error()**: Display error messages
- **console()**: Log messages to browser console

### Constants

- **Constants.MessageArea**: Predefined message area constants for script output targeting.

## Usage Examples

### Basic Pricing Script

```javascript
// Simple price calculation
var basePrice = Item.Price * 1.5;
return basePrice;
```

### Attribute-Based Pricing

```javascript
// Add price adjustments for each selected attribute
var finalPrice = Item.Price;
for(var i = 0; i < Item.Attributes.length; ++i) {
    var attr = Item.Attributes[i];
    if(attr.Value) {
        finalPrice += attr.PriceAdjustment;
    }
}
return finalPrice;
```

### Tier-Based Pricing

```javascript
// Use helper method to find appropriate tier
var tier = HelperMethods.FindTier(Item.Quantity, Item.PricingTiers, Item.CustomerRoles);
if(tier) {
    return tier.Price;
}
return Item.Price;
```

### File-Based Pricing

```javascript
// Get file information and adjust price based on file size
var fileInfo = Item.getFileInfo("document", false);
if(fileInfo.Size > 1024 * 1024) { // > 1MB
    return Item.Price * 1.2; // 20% markup for large files
}
return Item.Price;
```

### CSV Data Processing

```javascript
// Parse CSV data and use it for pricing
var csvData = HelperMethods.CSV.parse(csvContent);
var rowCount = csvData.length;
return Item.Price + (rowCount * 0.01); // Add 1 cent per row
```

## Key Features

- **Type Safety**: Full TypeScript support with comprehensive type definitions
- **IntelliSense**: Complete autocomplete and parameter hints in modern IDEs
- **Documentation**: Detailed JSDoc comments for all properties and methods
- **Compatibility**: Works with both TypeScript and JavaScript projects
- **Extensibility**: Easy to extend with custom type definitions

## Installation

```bash
# Install as development dependency (recommended for development)
npm install --save-dev @infigo-official/types-for-pricingscript

# Install as production dependency (if building applications)
npm install @infigo-official/types-for-pricingscript
```

## Getting Started

1. Install the package in your project
2. Import the types in your TypeScript files
3. Start writing pricing scripts with full IntelliSense support
4. Use the helper methods for common pricing calculations
5. Leverage the comprehensive attribute and file handling capabilities

## Support

For issues, questions, or contributions, please visit our [GitHub repository](https://github.com/Infigo-Official/types-for-pricingscript). 