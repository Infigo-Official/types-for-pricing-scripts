# Pricing Script Interface Documentation

Documentation for the entire Pricing Script engine. Type declarations can be found in the [NPM package](https://www.npmjs.com/package/@infigo-official/types-for-pricing-script) and can be used for your TypeScript and JavaScript projects to get full IntelliSense support.

## Pricing Script Components

### Item Management

The item management system provides access to all product-related data and functionality needed for pricing calculations. This includes the main product item, its attributes, pricing tiers, and versioning information.

- **Item**: The main object representing the product variant being priced, containing all product information, attributes, pricing data, and methods for file handling and attribute management.
- **Attribute**: Represents product attributes with their values, price adjustments, weight adjustments, and dimensional adjustments.
- **AttributeValue**: Individual values within attributes, including tier-based pricing adjustments that can vary based on quantity or customer roles.
- **Tier**: Quantity-based pricing tiers with customer role support, allowing different pricing for different customer types.
- **Version**: Job versioning information including quantities and custom names, useful for tracking pricing changes across job iterations.

### File Handling

The file handling system provides comprehensive information about uploaded files, allowing scripts to make pricing decisions based on file characteristics.

- **FileInfo**: Comprehensive file information including MIME type, size, page count, dimensions, and content for various file types.
- **PageSize**: Page dimension information for multi-page documents, useful for calculating costs based on document complexity.

### System Configuration

The system configuration provides access to script settings, parameters, and output functions that control behavior and functionality.

- **Configuration**: Provides access to script configuration settings and parameters that control the behavior of the pricing script.
- **Output Functions**: Allow scripts to communicate with users and provide feedback about pricing calculations and decisions.

### Helper Methods

Helper methods provide utility functions for common pricing calculations and data manipulation tasks, making it easier to write complex pricing logic.

- **HelperMethods**: Utility functions for common pricing calculations and data manipulation:
  - **FindTier**: Find appropriate pricing tier based on quantity and customer roles
  - **GetAttributePriceAdjustment**: Calculate attribute price adjustments including tier-based adjustments
  - **InterpolatePrice**: Interpolate prices between tier boundaries for smooth pricing transitions
  - **CSV**: Parse and stringify CSV data with configurable options for data-driven pricing
  - **LogObject**: Log object properties for debugging complex pricing scenarios
  - **Contains**: Check if arrays contain specific values for conditional logic
  - **IsObject/IsArray**: Type checking utilities for robust script development
  - **MergeObject**: Deep merge objects with conflict resolution for combining pricing data



## Scripting Principles

### Object Access and Data Flow

When working with pricing script objects, all data is read-only and accessed through the provided interfaces. The script receives the current state of the pricing context and returns the calculated price or pricing adjustments.

Updates to the pricing system are handled through the return value of the script, which can include price modifications, attribute adjustments, and other pricing-related changes.

### Events and Triggers

Pricing scripts are triggered by various events in the pricing system:
- Product selection or configuration changes
- Attribute value modifications
- Quantity updates
- File uploads or modifications

The script can react to these events by recalculating prices, adjusting attributes, or providing user feedback.

### Data Persistence

Pricing scripts can store and retrieve data in various ways:
- Temporary data during the current pricing session
- Persistent data associated with the current job
- Configuration data that affects pricing behavior
- Cached calculations for performance optimization

## Supported File Types

### Media Files

The pricing script system supports various file types for file-based pricing calculations:

- **PDF**: Supports page count, dimensions, and content analysis for document-based pricing
- **JPEG**: Image files with size and dimension information
- **PNG**: Image files with transparency support and size information
- **GIF**: Animated or static images with size and frame count data
- **BMP**: Basic bitmap images with size information
- **TIFF**: High-quality images with size and compression data

### Document Properties

For document-based pricing, the system provides access to:
- Page count and dimensions
- File size and compression information
- Content type and format details
- Metadata and properties

## Pricing Calculation Methods

### Basic Pricing

Simple pricing calculations can be performed using basic arithmetic operations on the Item.Price property and attribute adjustments.

### Tier-Based Pricing

Complex pricing models can be implemented using the tier system, which supports:
- Quantity-based discounts
- Customer role-specific pricing
- Interpolation between tier boundaries
- Minimum and maximum quantity constraints

### Attribute-Based Pricing

Dynamic pricing can be calculated based on selected attributes:
- Price adjustments for each selected option
- Weight modifications for shipping calculations
- Dimensional changes for packaging costs
- Conditional pricing based on attribute combinations

### File-Based Pricing

File characteristics can influence pricing decisions:
- Size-based pricing for storage or processing costs
- Page count pricing for printing or processing
- Format-specific pricing for different file types
- Complexity-based pricing for processing requirements

## Error Handling and Validation

### Input Validation

Pricing scripts should validate their inputs and handle edge cases:
- Check for required data availability
- Validate numeric values and ranges
- Handle missing or invalid attributes
- Provide meaningful error messages

### Error Recovery

Robust pricing scripts should include error recovery mechanisms:
- Fallback pricing when calculations fail
- Default values for missing data
- Graceful degradation of functionality
- User-friendly error reporting 