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

## Examples

### Basic Pricing

Simple pricing calculation based on quantity and base price:

```javascript
// Basic price calculation with markup
var basePrice = Item.Price;
var quantity = Item.Quantity;
var markup = 1.25; // 25% markup

var totalPrice = basePrice * quantity * markup;
debug("Base: $" + basePrice + " x " + quantity + " = $" + totalPrice);

return totalPrice;
```

Fixed price with quantity discounts:

```javascript
var unitPrice = 10.00;
var quantity = Item.Quantity;
var discount = 0;

// Apply quantity-based discounts
if (quantity >= 100) {
    discount = 0.20; // 20% off for 100+
} else if (quantity >= 50) {
    discount = 0.15; // 15% off for 50+
} else if (quantity >= 25) {
    discount = 0.10; // 10% off for 25+
}

var finalPrice = unitPrice * quantity * (1 - discount);
debug("Quantity: " + quantity + ", Discount: " + (discount * 100) + "%");

return finalPrice;
```

### Tier Pricing

Using built-in tier pricing with HelperMethods:

```javascript
// Define pricing tiers
var tiers = [
    { Quantity: 1, Price: 5.00 },
    { Quantity: 50, Price: 4.00 },
    { Quantity: 100, Price: 3.50 },
    { Quantity: 250, Price: 3.00 },
    { Quantity: 500, Price: 2.50 },
    { Quantity: 1000, Price: 2.00 }
];

// Find the appropriate tier for the current quantity
var tier = HelperMethods.FindTier(Item.Quantity, tiers);

if (tier) {
    var totalPrice = tier.Price * Item.Quantity;
    debug("Tier price: $" + tier.Price + " for qty " + Item.Quantity);
    return totalPrice;
}

return Item.Price * Item.Quantity;
```

Interpolated pricing for smooth transitions:

```javascript
var tiers = [
    { Quantity: 1, Price: 10.00 },
    { Quantity: 100, Price: 8.00 },
    { Quantity: 500, Price: 6.00 },
    { Quantity: 1000, Price: 4.00 }
];

// Get interpolated price between tiers
var unitPrice = HelperMethods.InterpolatePrice(Item.Quantity, tiers);
var totalPrice = unitPrice * Item.Quantity;

debug("Interpolated unit price: $" + unitPrice.toFixed(2));
return totalPrice;
```

### Customer Roles Pricing

Apply different pricing based on customer roles:

```javascript
var basePrice = Item.Price * Item.Quantity;
var discount = 0;

// Check for VIP customers
if (HelperMethods.Contains(Item.CustomerRoles, "VIP")) {
    discount = 0.25; // 25% VIP discount
    debug("VIP customer - 25% discount applied");
}
// Check for wholesale customers
else if (HelperMethods.Contains(Item.CustomerRoles, "Wholesale")) {
    discount = 0.20; // 20% wholesale discount
    debug("Wholesale customer - 20% discount applied");
}
// Check for registered customers
else if (HelperMethods.Contains(Item.CustomerRoles, "Registered")) {
    discount = 0.05; // 5% member discount
    debug("Registered customer - 5% discount applied");
}

return basePrice * (1 - discount);
```

Role-based tier pricing:

```javascript
// Define tiers with customer role support
var tiers = [
    { Quantity: 1, Price: 10.00 },
    { Quantity: 50, Price: 8.00, CustomerRole: "Registered" },
    { Quantity: 50, Price: 7.00, CustomerRole: "Wholesale" },
    { Quantity: 50, Price: 6.00, CustomerRole: "VIP" },
    { Quantity: 100, Price: 6.00 },
    { Quantity: 100, Price: 5.00, CustomerRole: "Wholesale" },
    { Quantity: 100, Price: 4.00, CustomerRole: "VIP" }
];

// FindTier automatically considers customer roles
var tier = HelperMethods.FindTier(Item.Quantity, tiers, Item.CustomerRoles);

if (tier) {
    return tier.Price * Item.Quantity;
}

return Item.Price * Item.Quantity;
```

### CSV Lookup Pricing

Parse and use CSV data for pricing:

```javascript
// CSV pricing data (could come from Configuration.ScriptConfig)
var csvData = "Quantity,Price,Setup\n1,5.00,25.00\n50,4.50,20.00\n100,4.00,15.00\n500,3.50,10.00";

// Parse CSV into array
var rows = HelperMethods.CSV.parse(csvData);

// Skip header row, find matching tier
var quantity = Item.Quantity;
var unitPrice = 5.00;
var setupFee = 25.00;

for (var i = 1; i < rows.length; i++) {
    var row = rows[i];
    if (quantity >= row[0]) {
        unitPrice = row[1];
        setupFee = row[2];
    }
}

var totalPrice = (unitPrice * quantity) + setupFee;
debug("Unit: $" + unitPrice + ", Setup: $" + setupFee + ", Total: $" + totalPrice);

return totalPrice;
```

### File-Based Pricing

Calculate pricing based on uploaded file properties:

```javascript
var basePrice = 0;
var files = Item.GetUploadedFiles();

if (files && files.length > 0) {
    for (var i = 0; i < files.length; i++) {
        var file = files[i];

        // Price per page for PDFs
        if (file.MimeType === "application/pdf") {
            var pageCount = file.PageCount || 1;
            var pricePerPage = 0.50;
            basePrice += pageCount * pricePerPage;
            debug("PDF: " + pageCount + " pages @ $" + pricePerPage + "/page");
        }
        // Price by file size for images
        else if (file.MimeType.indexOf("image/") === 0) {
            var sizeInMB = file.Size / (1024 * 1024);
            var pricePerMB = 2.00;
            basePrice += sizeInMB * pricePerMB;
            debug("Image: " + sizeInMB.toFixed(2) + "MB @ $" + pricePerMB + "/MB");
        }
    }
}

return basePrice * Item.Quantity;
```

### Cart/Session Aggregation

Apply discounts based on total cart value:

```javascript
// Calculate total cart value from session
var cartTotal = 0;
for (var i = 0; i < Session.CartItems.length; i++) {
    var cartItem = Session.CartItems[i];
    cartTotal += cartItem.Price * cartItem.Quantity;
}

// Apply cart-wide discount tiers
var cartDiscount = 0;
if (cartTotal >= 500) {
    cartDiscount = 0.15; // 15% off orders $500+
} else if (cartTotal >= 250) {
    cartDiscount = 0.10; // 10% off orders $250+
} else if (cartTotal >= 100) {
    cartDiscount = 0.05; // 5% off orders $100+
}

var itemPrice = Item.Price * Item.Quantity;
var discountedPrice = itemPrice * (1 - cartDiscount);

debug("Cart total: $" + cartTotal + ", Discount: " + (cartDiscount * 100) + "%");
return discountedPrice;
```

### Area-Based Pricing

Calculate pricing based on dimensions:

```javascript
// Get dimensions from item
var width = Item.Width || 0;
var height = Item.Height || 0;

// Calculate area in square inches
var areaInSqIn = width * height;

// Convert to square feet
var areaInSqFt = areaInSqIn / 144;

// Price per square foot with minimum
var pricePerSqFt = 2.50;
var minimumPrice = 10.00;

var calculatedPrice = areaInSqFt * pricePerSqFt * Item.Quantity;
var finalPrice = Math.max(calculatedPrice, minimumPrice);

debug("Area: " + areaInSqFt.toFixed(2) + " sq ft @ $" + pricePerSqFt + "/sq ft");
return finalPrice;
```

### Department Discounts

Apply pricing based on customer department (Session-level):

```javascript
var basePrice = Item.Price * Item.Quantity;
var departmentDiscount = 0;

// Check customer department
switch (Session.Department) {
    case "Marketing":
        departmentDiscount = 0.15;
        debug("Marketing department - 15% discount");
        break;
    case "Sales":
        departmentDiscount = 0.10;
        debug("Sales department - 10% discount");
        break;
    case "Education":
        departmentDiscount = 0.20;
        debug("Education department - 20% discount");
        break;
    default:
        debug("Standard pricing applied");
}

return basePrice * (1 - departmentDiscount);
```

### Attribute-Based Pricing

Calculate price adjustments from selected attributes:

```javascript
var basePrice = Item.Price;
var attributeAdjustment = 0;

// Get attribute adjustments with tier support
attributeAdjustment = HelperMethods.GetAttributePriceAdjustment(
    Item.Quantity,
    Item.CustomerRoles
);

// Calculate total
var totalPrice = (basePrice + attributeAdjustment) * Item.Quantity;

debug("Base: $" + basePrice + ", Attributes: $" + attributeAdjustment);
return totalPrice;
```

Manual attribute iteration:

```javascript
var basePrice = Item.Price;
var adjustments = 0;

// Iterate through all attributes
for (var i = 0; i < Item.Attributes.length; i++) {
    var attr = Item.Attributes[i];

    // Check if attribute has a selected value
    if (attr.SelectedValue) {
        adjustments += attr.SelectedValue.PriceAdjustment || 0;
        debug(attr.Name + ": " + attr.SelectedValue.Name +
              " (+$" + (attr.SelectedValue.PriceAdjustment || 0) + ")");
    }
}

return (basePrice + adjustments) * Item.Quantity;
```

### Checkout-Level Pricing

Apply pricing based on checkout/shipping information:

```javascript
var basePrice = Item.Price * Item.Quantity;
var shippingSurcharge = 0;

// Check shipping destination country
if (CheckoutItem.Address && CheckoutItem.Address.Country) {
    var countryCode = CheckoutItem.Address.Country.TwoLetterIsoCode;

    // International shipping surcharge
    if (countryCode !== "US") {
        shippingSurcharge = 15.00;
        debug("International shipping to " + countryCode + " - $15 surcharge");
    }

    // Remote area surcharge
    if (countryCode === "AK" || countryCode === "HI") {
        shippingSurcharge = 10.00;
        debug("Alaska/Hawaii shipping - $10 surcharge");
    }
}

// Business address discount
if (CheckoutItem.Address && CheckoutItem.Address.Company) {
    basePrice *= 0.95; // 5% B2B discount
    debug("Business address - 5% B2B discount applied");
}

return basePrice + shippingSurcharge;
```
