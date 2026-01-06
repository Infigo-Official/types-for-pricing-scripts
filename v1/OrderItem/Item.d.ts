/**
 * This module provides access to the main item object in pricing scripts.
 * The Item interface represents the product variant being priced and contains all
 * the essential information needed for pricing calculations including:
 * - Product pricing information (base price, special prices, costs)
 * - Product details (SKU, name, categories, dimensions)
 * - Quantity and packaging information
 * - Attribute management and pricing adjustments
 * - File handling capabilities
 * - Tier-based pricing support
 * 
 * @module OrderItem
 */

/**
 * The main item object available in pricing scripts.
 * Represents the product variant being priced and provides access to all
 * product information, attributes, pricing data, and methods for file handling
 * and attribute management.
 *
 * This object is the primary interface for accessing product data and performing
 * pricing calculations in pricing scripts.
 *
 * @category Global Objects
 */
declare interface Item {
    /**
     * The standard product variant price in the base currency.
     * This is the base price before any attribute adjustments, tier pricing,
     * or special pricing is applied.
     * 
     * @example
     * var basePrice = Item.Price;
     * var adjustedPrice = basePrice * 1.2; // 20% markup
     */
    Price: number;

    /**
     * The old price from the product variant, typically used for displaying
     * price comparisons or discounts. This value represents the previous
     * price before any recent price changes.
     * 
     * @example
     * if (Item.OldPrice > Item.Price) {
     *     var discount = Item.OldPrice - Item.Price;
     *     return "Save $" + discount.toFixed(2);
     * }
     */
    OldPrice: number;

    /**
     * The calculated unit price for this item. If the pricing script is attached to a product,
     * this will be the product variant price. If the pricing script is attached to a checkout attribute,
     * this will be the price per individual unit including discounts and all the adjustments.
     * 
     * @example
     * var unitPrice = Item.UnitPrice;
     * var totalForQuantity = unitPrice * Item.Quantity;
     */
    UnitPrice: number;

    /**
     * The final calculated price for this item, including all discounts and adjustments.
     * If the pricing script is attached to a product,
     * this will be the product variant price multiplied by the quantity.
     * If the pricing script is attached to a checkout attribute,
     * it represents the total price for the entire quantity of this item
     * after all pricing rules have been applied.
     * 
     * @example
     * var finalTotal = Item.FinalPrice;
     * console("Final price for " + Item.Quantity + " units: $" + finalTotal);
     */
    FinalPrice: number;

    /**
     * The product cost, representing the actual cost to produce or acquire
     * the product. This value is used for margin calculations and profit analysis.
     * 
     * @example
     * var margin = Item.Price - Item.ProductCost;
     * var marginPercentage = (margin / Item.Price) * 100;
     */
    ProductCost: number;

    /**
     * The special price for the product variant, if applicable.
     * This value is null if no special pricing is currently active.
     * Special pricing typically overrides the standard price for promotional periods.
     * 
     * @example
     * var finalPrice = Item.SpecialPrice || Item.Price;
     */
    SpecialPrice: number | null;

    /**
     * The start date for special pricing, if applicable.
     * This value is null if no special pricing is currently active.
     * Used to determine if special pricing should be applied based on current date.
     * 
     * @example
     * var now = new Date();
     * if (Item.SpecialPriceStartDate && now >= Item.SpecialPriceStartDate) {
     *     return Item.SpecialPrice;
     * }
     */
    SpecialPriceStartDate: Date | null;

    /**
     * The end date for special pricing, if applicable.
     * This value is null if no special pricing is currently active.
     * Used to determine if special pricing should be applied based on current date.
     * 
     * @example
     * var now = new Date();
     * if (Item.SpecialPriceEndDate && now <= Item.SpecialPriceEndDate) {
     *     return Item.SpecialPrice;
     * }
     */
    SpecialPriceEndDate: Date | null;

    /**
     * Additional shipping charge for this specific product variant.
     * This value is added to the base shipping cost and represents
     * any extra shipping fees specific to this item.
     * 
     * @example
     * var totalShipping = baseShippingCost + Item.AdditionalShippingCharge;
     */
    AdditionalShippingCharge: number;

    /**
     * The weight of the item in the configured weight unit (typically grams or ounces).
     * This value is used for shipping calculations and weight-based pricing.
     *
     * @example
     * // Calculate shipping cost based on weight
     * var weightInKg = Item.Weight / 1000;
     * var shippingRate = 2.50; // $2.50 per kg
     * var shippingCost = weightInKg * shippingRate;
     * debug("Item weight: " + Item.Weight + "g, Shipping: $" + shippingCost);
     */
    Weight: number;

    /**
     * Indicates whether the weight can be set or modified for this item.
     * Some products may have fixed weights that cannot be changed,
     * while others allow weight adjustments based on attributes or custom settings.
     *
     * @example
     * if (Item.CanSetWeight && Item.Weight > 5000) {
     *     debug("Heavy item detected - weight: " + Item.Weight + "g");
     *     // Apply heavy item surcharge
     *     return Item.Price + 10.00;
     * }
     */
    CanSetWeight: boolean;

    /**
     * The Stock Keeping Unit (SKU) of the product variant.
     * This is the unique identifier for the product variant and is used
     * for inventory management and order processing.
     *
     * @example
     * // Apply SKU-specific pricing rules
     * if (Item.Sku.startsWith("PREMIUM-")) {
     *     debug("Premium product: " + Item.Sku);
     *     return Item.Price * 1.10; // 10% premium markup
     * }
     */
    Sku: string;

    /**
     * The actual SKU based on the current attribute combination.
     * If no attributes are selected, this will be the same as the product SKU.
     * This value reflects the specific configuration of the product being priced.
     *
     * @example
     * // Log the configured SKU for debugging
     * debug("Base SKU: " + Item.Sku);
     * debug("Configured SKU: " + Item.ActualSku);
     * if (Item.ActualSku !== Item.Sku) {
     *     debug("Product has attribute variations");
     * }
     */
    ActualSku: string;

    /**
     * The width of the item in the configured dimension unit (typically inches or centimeters).
     * This value is used for packaging calculations and dimensional pricing.
     *
     * @example
     * // Calculate area-based pricing
     * var area = Item.Width * Item.Height;
     * var pricePerSquareUnit = 0.05;
     * var areaCost = area * pricePerSquareUnit;
     * debug("Area: " + area + " sq units, Cost: $" + areaCost);
     */
    Width: number;

    /**
     * The height of the item in the configured dimension unit (typically inches or centimeters).
     * This value is used for packaging calculations and dimensional pricing.
     *
     * @example
     * // Check if item is oversized
     * if (Item.Height > 48) {
     *     debug("Oversized item - adding handling fee");
     *     return Item.Price + 25.00;
     * }
     */
    Height: number;

    /**
     * The length of the item in the configured dimension unit (typically inches or centimeters).
     * This value is used for packaging calculations and dimensional pricing.
     *
     * @example
     * // Calculate volume for shipping
     * var volume = Item.Width * Item.Height * Item.Length;
     * var volumetricWeight = volume / 5000; // Standard divisor
     * debug("Volumetric weight: " + volumetricWeight);
     */
    Length: number;

    /**
     * The name of the product as displayed to customers.
     * This is the human-readable product name used in the user interface
     * and order confirmations.
     *
     * @example
     * debug("Processing order for: " + Item.ProductName);
     * // Check for special product names
     * if (Item.ProductName.indexOf("Rush") >= 0) {
     *     debug("Rush order product detected");
     *     return Item.Price * 1.50; // 50% rush fee
     * }
     */
    ProductName: string;

    /**
     * Array of category names that this product belongs to.
     * Categories are used for product organization, filtering, and
     * category-specific pricing rules.
     * 
     * @example
     * if (Item.Categories.includes("Premium")) {
     *     return Item.Price * 1.1; // 10% premium markup
     * }
     */
    Categories: string[];

    /**
     * Array of tag names associated with this product.
     * Tags are used for product classification, search optimization,
     * and tag-based pricing rules.
     * 
     * @example
     * if (Item.Tags.includes("Featured")) {
     *     return Item.Price * 1.05; // 5% featured product markup
     * }
     */
    Tags: string[];

    /**
     * The order quantity for this item.
     * This represents how many units of this product variant are being ordered.
     * Used for quantity-based pricing and tier calculations.
     * 
     * @example
     * var tier = HelperMethods.FindTier(Item.Quantity, Item.PricingTiers);
     */
    Quantity: number;

    /**
     * The pack quantity, calculated as the order quantity divided by the product variant's
     * OrderPackQuantity. This represents how many packs are being ordered.
     * 
     * @example
     * var packPrice = Item.Price * Item.PackQuantity;
     */
    PackQuantity: number;

    /**
     * The quantity selector mode for this product.
     * This determines how quantity selection is handled in the user interface
     * and affects pricing calculations.
     * 
     * @example
     * switch (Item.QuantitySelectorMode) {
     *     case 1: // Individual units
     *         return Item.Price * Item.Quantity;
     *     case 2: // Packs
     *         return Item.Price * Item.PackQuantity;
     * }
     */
    QuantitySelectorMode: number;

    /**
     * Whether this is a batch job
     *
     * @example
     * if (Item.IsBatch) {
     *     debug("Processing batch job with " + Item.NumberOfRecords + " records");
     *     var batchSetupFee = 25.00;
     *     return Item.Price + batchSetupFee;
     * }
     */
    IsBatch: boolean;

    /**
     * Number of pages (-1 if not valid)
     *
     * @example
     * if (Item.NumberOfPages > 0) {
     *     var perPageCost = 0.10;
     *     var pageCost = Item.NumberOfPages * perPageCost;
     *     debug("Document has " + Item.NumberOfPages + " pages, adding $" + pageCost);
     *     return Item.Price + pageCost;
     * }
     */
    NumberOfPages: number;

    /**
     * Number of records (-1 if not valid)
     *
     * @example
     * if (Item.NumberOfRecords > 0) {
     *     var perRecordCost = 0.05;
     *     var recordCost = Item.NumberOfRecords * perRecordCost;
     *     debug("Batch has " + Item.NumberOfRecords + " records");
     *     return Item.Price + recordCost;
     * }
     */
    NumberOfRecords: number;

    /**
     * Array of pricing tiers with Price, Quantity, and CustomerRole
     *
     * @example
     * // Find the best tier for the current quantity
     * var tier = HelperMethods.FindTier(Item.Quantity, Item.PricingTiers, Item.CustomerRoles);
     * if (tier) {
     *     debug("Using tier: " + tier.Quantity + " @ $" + tier.Price);
     *     return tier.Price * Item.Quantity;
     * }
     */
    PricingTiers: Tier[];

    /**
     * Array of batch tiers (same as PricingTiers but for batch tier table)
     *
     * @example
     * if (Item.IsBatch && Item.BatchTiers.length > 0) {
     *     var batchTier = HelperMethods.FindTier(Item.NumberOfRecords, Item.BatchTiers);
     *     if (batchTier) {
     *         debug("Batch tier price: $" + batchTier.Price);
     *     }
     * }
     */
    BatchTiers: Tier[];

    /**
     * Price per record (-1 if not valid)
     *
     * @example
     * if (Item.PricePerRecord > 0 && Item.NumberOfRecords > 0) {
     *     var recordTotal = Item.PricePerRecord * Item.NumberOfRecords;
     *     debug("Record pricing: " + Item.NumberOfRecords + " x $" + Item.PricePerRecord);
     *     return recordTotal;
     * }
     */
    PricePerRecord: number;

    /**
     * Array of attributes with Key, Value, IsRequired, Prompt, PriceAdjustment, etc.
     *
     * @example
     * // Loop through all attributes and apply price adjustments
     * var totalAdjustment = 0;
     * for (var i = 0; i < Item.Attributes.length; i++) {
     *     var attr = Item.Attributes[i];
     *     debug("Attribute: " + attr.Key + " = " + attr.Value);
     *     totalAdjustment += attr.PriceAdjustment || 0;
     * }
     * return Item.Price + totalAdjustment;
     */
    Attributes: Attribute[];

    /**
     * User email
     *
     * @example
     * // Apply corporate discount for company emails
     * if (Item.Email.endsWith("@mycompany.com")) {
     *     debug("Corporate customer: " + Item.Email);
     *     return Item.Price * 0.85; // 15% corporate discount
     * }
     */
    Email: string;

    /**
     * Array of customer role system names
     *
     * @example
     * // Check for wholesale pricing
     * if (Item.CustomerRoles.indexOf("Wholesale") >= 0) {
     *     debug("Wholesale customer detected");
     *     return Item.Price * 0.70; // 30% wholesale discount
     * } else if (Item.CustomerRoles.indexOf("VIP") >= 0) {
     *     return Item.Price * 0.90; // 10% VIP discount
     * }
     */
    CustomerRoles: string[];

    /**
     * Department name of user
     *
     * @example
     * // Apply department-specific pricing
     * if (Item.Department === "Marketing") {
     *     debug("Marketing department order");
     *     return Item.Price * 0.80; // 20% marketing discount
     * } else if (Item.Department === "Sales") {
     *     return Item.Price * 0.75; // 25% sales discount
     * }
     */
    Department: string;

    /**
     * Array of other order items using the same custom pricing script
     *
     * @example
     * // Calculate total quantity across all cart items for volume discount
     * var totalQty = Item.Quantity;
     * for (var i = 0; i < Item.OtherOrderItems.length; i++) {
     *     totalQty += Item.OtherOrderItems[i].Quantity;
     * }
     * debug("Total quantity in cart: " + totalQty);
     */
    OtherOrderItems: Item[];

    /**
     * Alias of OtherOrderItems
     *
     * @example
     * // Apply cart-wide discount if total exceeds threshold
     * var cartTotal = 0;
     * for (var i = 0; i < Item.CartItems.length; i++) {
     *     cartTotal += Item.CartItems[i].Price * Item.CartItems[i].Quantity;
     * }
     * if (cartTotal > 500) {
     *     debug("Cart total $" + cartTotal + " - applying 10% discount");
     *     return Item.Price * 0.90;
     * }
     */
    CartItems: Item[];

    /**
     * Index of this item in the other order item array (0 if not in array)
     *
     * @example
     * // Apply setup fee only to first item
     * if (Item.OrderItemIndex === 0) {
     *     debug("First item - adding setup fee");
     *     return Item.Price + 15.00;
     * }
     */
    OrderItemIndex: number;

    /**
     * Index of this item in the other order item array (-1 if not in array)
     *
     * @example
     * if (Item.CartItemIndex >= 0) {
     *     debug("This is cart item #" + (Item.CartItemIndex + 1));
     * }
     */
    CartItemIndex: number;

    /**
     * Whether this item is in the other order item array
     *
     * @example
     * if (Item.IsInOtherOrderItems) {
     *     debug("Item is part of multi-item order");
     *     // Consider other items for bundle pricing
     * }
     */
    IsInOtherOrderItems: boolean;

    /**
     * Value of the currently used discount code
     *
     * @example
     * // Apply special discount for specific codes
     * if (Item.DiscountCode === "SUMMER20") {
     *     debug("Summer sale discount applied");
     *     return Item.Price * 0.80; // 20% off
     * } else if (Item.DiscountCode === "VIP50") {
     *     return Item.Price * 0.50; // 50% off
     * }
     */
    DiscountCode: string;

    /**
     * Array of versions with JobId, CustomName, and Quantity
     *
     * @example
     * // Calculate pricing across all versions
     * if (Item.Versions.length > 0) {
     *     debug("Job has " + Item.Versions.length + " versions");
     *     for (var i = 0; i < Item.Versions.length; i++) {
     *         var ver = Item.Versions[i];
     *         debug("Version: " + ver.CustomName + ", Qty: " + ver.Quantity);
     *     }
     * }
     */
    Versions: ItemVersion[];

    /**
     * Number of versions
     *
     * @example
     * if (Item.NumberOfVersions > 1) {
     *     debug("Multi-version job with " + Item.NumberOfVersions + " versions");
     *     // Apply version discount
     *     return Item.Price * 0.95; // 5% multi-version discount
     * }
     */
    NumberOfVersions: number;

    /**
     * Whether this is a version of a job
     *
     * @example
     * if (Item.IsVersion) {
     *     debug("This item is a version of an existing job");
     *     // Use version-specific pricing logic
     * }
     */
    IsVersion: boolean;

    /**
     * Sum of all quantities of all versions
     *
     * @example
     * // Use total version quantity for tier pricing
     * if (Item.VersionsSumQuantity > 0) {
     *     var tier = HelperMethods.FindTier(Item.VersionsSumQuantity, Item.PricingTiers);
     *     if (tier) {
     *         debug("Using combined version quantity: " + Item.VersionsSumQuantity);
     *         return tier.Price;
     *     }
     * }
     */
    VersionsSumQuantity: number;

    /**
     * Get file information for attached files
     * @param attributeId - ID of the attribute
     * @param readContent - Whether to read file content
     * @returns FileInfo object
     */
    getFileInfo(attributeId: string, readContent: boolean): FileInfo;

    /**
     * Shortcut method to retrieve an attribute value by name
     * @param attribute - Name of the attribute
     * @returns Attribute value
     */
    getAttributeValue(attribute: string): string;

    /**
     * Set the attribute value permanently to the given value
     * @param attribute - Name of the attribute
     * @param value - Value to set
     */
    setAttributeValue(attribute: string, value: string): void;

    /**
     * Get file information for a specific configurable file from Global Data
     * @param filename - Name of the file
     * @returns FileInfo object
     * 
     * @example
     * // Method 1: Using getGlobalFileContent (current approach)
     * var fileInfo = Item.getGlobalFileContent("test.csv");
     * if (fileInfo && fileInfo.CsvContent) {
     *     console("CSV file loaded successfully with " + fileInfo.CsvContent.length + " rows");
     *     var headers = fileInfo.CsvContent[0]; // First row contains headers
     *     
     *     // Process CSV data from FileInfo object
     *     for (var i = 1; i < fileInfo.CsvContent.length; i++) {
     *         var row = fileInfo.CsvContent[i];
     *         // Access data by column index
     *         var firstColumn = row[0];
     *         var secondColumn = row[1];
     *     }
     * }
     * 
     * @example
     * // For non-CSV files, access raw content
     * var textFile = Item.getGlobalFileContent("config.txt");
     * if (textFile && textFile.Content) {
     *     console("File content: " + textFile.Content);
     * }
     */
    getGlobalFileContent(filename: string): FileInfo;

    /**
     * Get CSV file content as a 2D array from Global Data
     * @param filename - Name of the CSV file
     * @returns 2D array representing CSV content, or null if file doesn't exist
     * 
     * @example
     * // Basic CSV loading and processing
     * var csvData = Item.getGlobalFileCsvContent("test.csv");
     * if (csvData) {
     *     console("CSV data loaded directly as array with " + csvData.length + " rows");
     *     
     *     // Extract column names from first row
     *     function getColumnNames(csvTable) {
     *         if (csvTable && csvTable.length > 0) {
     *             return csvTable[0]; // Returns array of column names
     *         }
     *         return [];
     *     }
     *     
     *     var columnNames = getColumnNames(csvData);
     *     console("Available columns: " + columnNames.join(", "));
     *     
     *     // Process data rows (skip header row)
     *     for (var i = 1; i < csvData.length; i++) {
     *         var row = csvData[i];
     *         // Access data by column index
     *         var firstColumn = row[0];
     *         var secondColumn = row[1];
     *     }
     * } else {
     *     console("CSV file not found or empty");
     * }
     * 
     * @example
     * // Method 2: Using getGlobalFileCsvContent (preferred for CSV files)
     * var csvData = Item.getGlobalFileCsvContent("test.csv");
     * if (csvData) {
     *     console("Direct CSV access with " + csvData.length + " rows");
     *     // csvData is already a 2D array, no need to access .CsvContent property
     * }
     */
    getGlobalFileCsvContent(filename: string): string[][] | null;
}

/**
 * Global Item object available in pricing scripts
 * This constant provides access to all item-related data and functionality,
 * allowing scripts to retrieve product information, pricing data, attributes,
 * and perform various operations on the current item being priced.
 * 
 * The Item object contains comprehensive information about the product variant
 * including pricing details, attributes, customer information, file attachments,
 * and methods for data manipulation and file handling.
 * 
 * @example
 * // Access basic product information
 * var productName = Item.ProductName;
 * var basePrice = Item.Price;
 * var quantity = Item.Quantity;
 * 
 * // Work with attributes
 * for (var i = 0; i < Item.Attributes.length; i++) {
 *     var attr = Item.Attributes[i];
 *     console("Attribute: " + attr.Key + " = " + attr.Value);
 * }
 * 
 * // Get file information
 * var fileInfo = Item.getFileInfo("fileAttributeId", true);
 * if (fileInfo.NumberOfPages > 0) {
 *     console("File has " + fileInfo.NumberOfPages + " pages");
 * }
 * 
 * // Access customer information
 * if (Item.CustomerRoles.indexOf("Registered") >= 0) {
 *     // Apply Registered pricing logic
 * }
 * 
 * // Work with pricing tiers
 * var tier = HelperMethods.FindTier(Item.Quantity, Item.PricingTiers, Item.CustomerRoles);
 * if (tier) {
 *     console("Using tier: " + tier.Quantity + " @ $" + tier.Price);
 * }
 * 
 * // Calculate final price
 * var finalPrice = Item.Price;
 * finalPrice += HelperMethods.GetAttributePriceAdjustment(Item.Quantity, Item.CustomerRoles);
 * 
 * // Advanced pricing calculations with special conditions
 * try {
 *     var finalPrice = Item.Price;
 *     
 *     // Apply quantity-based discounts
 *     if (Item.Quantity >= 100) {
 *         finalPrice *= 0.9; // 10% bulk discount
 *         console("Applied bulk discount: 10%");
 *     }
 *     
 *     // Check for special customer pricing
 *     if (Item.CustomerRoles.indexOf("Wholesale") >= 0) {
 *         finalPrice *= 0.85; // 15% wholesale discount
 *         console("Applied wholesale pricing");
 *     }
 *
 *     // Apply attribute-based adjustments
 *     var colorAttr = Item.getAttributeValue("Color");
 *     if (colorAttr === "Premium Gold") {
 *         finalPrice += 25.00; // Premium color surcharge
 *         console("Added premium color surcharge: $25.00");
 *     }
 *     
 *     // File processing fees based on page count
 *     if (Item.NumberOfPages > 0) {
 *         var processingFee = Item.NumberOfPages * 0.50;
 *         finalPrice += processingFee;
 *         console("Added processing fee: $" + processingFee + " for " + Item.NumberOfPages + " pages");
 *     }
 *     
 *     // Setup cost for batch jobs
 *     if (Item.IsBatch && Item.Quantity > 1) {
 *         finalPrice += 15.00; // One-time setup fee
 *         console("Added batch setup fee: $15.00");
 *     }
 *     
 * } catch (error) {
 *     alert("Error in pricing calculation: " + error.message);
 *     finalPrice = Item.Price; // Fallback to base price
 * }
 * 
 * @example
 * // Working with product versions and configurations
 * if (Item.Versions && Item.Versions.length > 0) {
 *     for (var v = 0; v < Item.Versions.length; v++) {
 *         var version = Item.Versions[v];
 *         console("Version " + (v + 1) + ": " + version.Data.length + " data entries");
 *         
 *         // Process version-specific data
 *         for (var d = 0; d < version.Data.length; d++) {
 *             var data = version.Data[d];
 *             console("  Data entry: " + data.Key + " = " + data.Value);
 *         }
 *     }
 * }
 *
 *
 * @example
 * // CSV-based pricing with attribute matching
 * function getCsvBasedPrice() {
 *     var csvData = Item.getGlobalFileCsvContent("pricing.csv");
 *     if (!csvData || csvData.length < 2) {
 *         console("CSV file not found or empty");
 *         return Item.Price;
 *     }
 *     
 *     var headers = csvData[0];
 *     var priceColumnIndex = -1;
 *     
 *     // Find price column
 *     for (var h = 0; h < headers.length; h++) {
 *         if (headers[h] === "Price") {
 *             priceColumnIndex = h;
 *             break;
 *         }
 *     }
 *     
 *     if (priceColumnIndex === -1) {
 *         console("Price column not found in CSV");
 *         return Item.Price;
 *     }
 *     
 *     // Find matching row
 *     for (var row = 1; row < csvData.length; row++) {
 *         var isMatch = true;
 *         
 *         for (var col = 0; col < headers.length; col++) {
 *             var columnName = headers[col];
 *             if (columnName !== "Price" && columnName !== "Setup") {
 *                 var csvValue = csvData[row][col];
 *                 var attrValue = Item.getAttributeValue(columnName);
 *                 
 *                 if (csvValue && csvValue !== attrValue) {
 *                     isMatch = false;
 *                     break;
 *                 }
 *             }
 *         }
 *         
 *         if (isMatch) {
 *             var price = parseFloat(csvData[row][priceColumnIndex]) || Item.Price;
 *             console("Found matching price: $" + price);
 *             return price;
 *         }
 *     }
 *     
 *     console("No matching row found, using default price");
 *     return Item.Price;
 * }
 * 
 * @example
 * // Setup cost calculation
 * function calculateWithSetupCost() {
 *     var basePrice = Item.Price;
 *     var setupCost = 50.00; // Example setup cost
 *     var quantity = Item.Quantity;
 *     
 *     // Distribute setup cost across quantity
 *     var setupCostPerUnit = setupCost / quantity;
 *     var finalPrice = basePrice + setupCostPerUnit;
 *     
 *     console("Base price: $" + basePrice);
 *     console("Setup cost: $" + setupCost + " ($" + setupCostPerUnit + " per unit)");
 *     console("Final price: $" + finalPrice);
 *     
 *     return finalPrice;
 * }
 * 
 * return finalPrice;
 * 
 * @example
 * // Comprehensive pricing script example showcasing most Item functionality
 * // This example demonstrates CSV-based pricing with attribute matching, 
 * // tier pricing, file processing, configuration, and output functions
 * function comprehensivePricingScript() {
 *     try {
 *         // 1. Configuration and Setup
 *         var config = Configuration.ScriptConfig();
 *         var defaultConfig = {
 *             filePath: "pricing.csv",
 *             priceColumnName: "Price",
 *             setupCostColumnName: "Setup",
 *             skuColumnName: "SKU",
 *             debugMode: false,
 *             baseFileName: "standup",
 *             separator: "-",
 *             splitMapping: ["Size", "Material"]
 *         };
 *         
 *         // Merge configuration using HelperMethods
 *         HelperMethods.MergeObject(defaultConfig, config);
 *         
 *         console("Starting comprehensive pricing calculation for: " + Item.ProductName);
 *         console("Item SKU: " + Item.Sku + ", Actual SKU: " + Item.ActualSku);
 *         console("Base Price: $" + Item.Price + ", Quantity: " + Item.Quantity);
 *         
 *         // 2. Customer and Role Information
 *         console("Customer: " + Item.Email);
 *         console("Department: " + Item.Department);
 *         console("Customer Roles: " + Item.CustomerRoles.join(", "));
 *         
 *         // Check for guest users
 *         if (Item.CustomerRoles.length === 1 && Item.CustomerRoles[0] === "Guests") {
 *             console("Guest user detected - returning zero price");
 *             return 0;
 *         }
 *         
 *         // 3. Product Information and Categories
 *         console("Product Categories: " + Item.Categories.join(", "));
 *         console("Product Tags: " + Item.Tags.join(", "));
 *         console("Dimensions: " + Item.Width + "x" + Item.Height + "x" + Item.Length);
 *         console("Weight: " + Item.Weight + " (Can set weight: " + Item.CanSetWeight + ")");
 *         
 *         // 4. Batch and Version Information
 *         if (Item.IsBatch) {
 *             console("Batch job with " + Item.NumberOfRecords + " records");
 *         }
 *         
 *         if (Item.Versions && Item.Versions.length > 0) {
 *             console("Product has " + Item.NumberOfVersions + " versions");
 *             console("Total versions quantity: " + Item.VersionsSumQuantity);
 *             
 *             for (var v = 0; v < Item.Versions.length; v++) {
 *                 var version = Item.Versions[v];
 *                 console("Version " + (v + 1) + ": JobId=" + version.JobId + 
 *                       ", Name=" + version.CustomName + ", Qty=" + version.Quantity);
 *             }
 *         }
 *         
 *         // 5. File Processing
 *         var finalPrice = Item.UnitPrice; // Start with calculated unit price
 *         
 *         // Check for file uploads and calculate processing fees
 *         if (Item.NumberOfPages > 0) {
 *             var processingFee = Item.NumberOfPages * 0.25;
 *             finalPrice += processingFee;
 *             console("Added file processing fee: $" + processingFee + " for " + Item.NumberOfPages + " pages");
 *         }
 *         
 *         // 6. CSV File Loading and Processing
 *         var csvFileName = defaultConfig.filePath;
 *         
 *         // Dynamic filename generation if no static path provided
 *         if (!csvFileName) {
 *             csvFileName = defaultConfig.baseFileName;
 *             for (var i = 0; i < defaultConfig.splitMapping.length; i++) {
 *                 var attrValue = Item.getAttributeValue(defaultConfig.splitMapping[i]);
 *                 if (attrValue) {
 *                     csvFileName += defaultConfig.separator + attrValue;
 *                 }
 *             }
 *             csvFileName += ".csv";
 *         }
 *         
 *         console("Loading CSV file: " + csvFileName);
 *         var csvData = Item.getGlobalFileCsvContent(csvFileName);
 *         
 *         if (csvData && csvData.length > 1) {
 *             console("CSV loaded successfully with " + csvData.length + " rows");
 *             
 *             // Find matching row based on attributes
 *             var headers = csvData[0];
 *             var priceColumnIndex = -1;
 *             var setupColumnIndex = -1;
 *             
 *             // Find column indices
 *             for (var h = 0; h < headers.length; h++) {
 *                 if (headers[h] === defaultConfig.priceColumnName) {
 *                     priceColumnIndex = h;
 *                 } else if (headers[h] === defaultConfig.setupCostColumnName) {
 *                     setupColumnIndex = h;
 *                 }
 *             }
 *             
 *             // Find matching row
 *             for (var row = 1; row < csvData.length; row++) {
 *                 var isMatch = true;
 *                 
 *                 // Check SKU match if SKU column exists
 *                 if (defaultConfig.skuColumnName) {
 *                     var skuColumnIndex = headers.indexOf(defaultConfig.skuColumnName);
 *                     if (skuColumnIndex >= 0) {
 *                         var csvSku = csvData[row][skuColumnIndex];
 *                         if (csvSku && csvSku !== Item.ActualSku) {
 *                             isMatch = false;
 *                             continue;
 *                         }
 *                     }
 *                 }
 *                 
 *                 // Check attribute matches
 *                 for (var col = 0; col < headers.length; col++) {
 *                     var columnName = headers[col];
 *                     if (columnName !== defaultConfig.priceColumnName && 
 *                         columnName !== defaultConfig.setupCostColumnName &&
 *                         columnName !== defaultConfig.skuColumnName) {
 *                         
 *                         var csvValue = csvData[row][col];
 *                         var attrValue = Item.getAttributeValue(columnName);
 *                         
 *                         if (csvValue && csvValue !== attrValue) {
 *                             isMatch = false;
 *                             break;
 *                         }
 *                     }
 *                 }
 *                 
 *                 if (isMatch && priceColumnIndex >= 0) {
 *                     var csvPrice = parseFloat(csvData[row][priceColumnIndex]);
 *                     if (!isNaN(csvPrice)) {
 *                         finalPrice = csvPrice;
 *                         console("Found matching CSV price: $" + csvPrice);
 *                         
 *                         // Add setup cost if applicable
 *                         if (setupColumnIndex >= 0) {
 *                             var setupCost = parseFloat(csvData[row][setupColumnIndex]);
 *                             if (!isNaN(setupCost) && setupCost > 0) {
 *                                 var setupCostPerUnit = setupCost / Item.Quantity;
 *                                 finalPrice += setupCostPerUnit;
 *                                 console("Added setup cost: $" + setupCost + " ($" + setupCostPerUnit + " per unit)");
 *                             }
 *                         }
 *                     }
 *                     break;
 *                 }
 *             }
 *         } else {
 *             console("CSV file not found or empty: " + csvFileName);
 *         }
 *         
 *         // 7. Attribute Processing and Price Adjustments
 *         console("Processing " + Item.Attributes.length + " attributes");
 *         var totalAttributeAdjustment = 0;
 *         
 *         for (var i = 0; i < Item.Attributes.length; i++) {
 *             var attr = Item.Attributes[i];
 *             console("Attribute: " + attr.Key + " = " + attr.Value + 
 *                   " (Required: " + attr.IsRequired + ", Adjustment: $" + attr.PriceAdjustment + ")");
 *             
 *             // Apply attribute price adjustments
 *             if (attr.PriceAdjustment && attr.PriceAdjustment !== 0) {
 *                 totalAttributeAdjustment += attr.PriceAdjustment;
 *             }
 *             
 *             // Special handling for premium attributes
 *             if (attr.Key === "Material" && attr.Value === "Premium") {
 *                 var premiumSurcharge = 15.00;
 *                 totalAttributeAdjustment += premiumSurcharge;
 *                 console("Applied premium material surcharge: $" + premiumSurcharge);
 *             }
 *         }
 *         
 *         finalPrice += totalAttributeAdjustment;
 *         console("Total attribute adjustments: $" + totalAttributeAdjustment);
 *         
 *         // 8. Tier Pricing with Cart Consolidation
 *         var totalQuantity = Item.Quantity;
 *         
 *         // Check other cart items for quantity consolidation
 *         if (Item.CartItems && Item.CartItems.length > 0) {
 *             console("Checking " + Item.CartItems.length + " cart items for consolidation");
 *             
 *             for (var c = 0; c < Item.CartItems.length; c++) {
 *                 var cartItem = Item.CartItems[c];
 *                 if (cartItem.ProductName === Item.ProductName && c !== Item.CartItemIndex) {
 *                     totalQuantity += cartItem.Quantity;
 *                     console("Added quantity from matching cart item: " + cartItem.Quantity);
 *                 }
 *             }
 *         }
 *         
 *         console("Total consolidated quantity: " + totalQuantity);
 *         
 *         // Apply tier pricing
 *         var tier = HelperMethods.FindTier(totalQuantity, Item.PricingTiers, Item.CustomerRoles);
 *         if (tier) {
 *             finalPrice = tier.Price + totalAttributeAdjustment;
 *             console("Applied tier pricing: " + tier.Quantity + " units @ $" + tier.Price);
 *         }
 *         
 *         // 9. Special Pricing and Discounts
 *         if (Item.SpecialPrice && Item.SpecialPriceStartDate && Item.SpecialPriceEndDate) {
 *             var now = new Date();
 *             if (now >= Item.SpecialPriceStartDate && now <= Item.SpecialPriceEndDate) {
 *                 finalPrice = Item.SpecialPrice + totalAttributeAdjustment;
 *                 console("Applied special pricing: $" + Item.SpecialPrice);
 *             }
 *         }
 *         
 *         // 10. Role-based Discounts
 *         if (Item.CustomerRoles.indexOf("Wholesale") >= 0) {
 *             finalPrice *= 0.85; // 15% wholesale discount
 *             console("Applied wholesale discount: 15%");
 *         } else if (Item.CustomerRoles.indexOf("Premium") >= 0) {
 *             finalPrice *= 0.90; // 10% premium customer discount
 *             console("Applied premium customer discount: 10%");
 *         }
 *         
 *         // 11. Category and Tag-based Adjustments
 *         if (Item.Categories.indexOf("Urgent") >= 0) {
 *             finalPrice *= 1.25; // 25% rush charge
 *             console("Applied rush charge for Urgent category: 25%");
 *         }
 *         
 *         if (Item.Tags.indexOf("Featured") >= 0) {
 *             finalPrice *= 1.05; // 5% featured product markup
 *             console("Applied featured product markup: 5%");
 *         }
 *         
 *         // 12. Minimum Price Validation
 *         var minimumPrice = Item.ProductCost * 1.1; // 10% margin minimum
 *         if (finalPrice < minimumPrice) {
 *             console("Price below minimum margin, adjusting to: $" + minimumPrice);
 *             finalPrice = minimumPrice;
 *         }
 *         
 *         // 13. Final Price Validation and Output
 *         if (finalPrice <= 0) {
 *             console("Invalid final price calculated: $" + finalPrice);
 *             return Item.Price; // Fallback to base price
 *         }
 *         
 *         // Round to 2 decimal places
 *         finalPrice = Math.round(finalPrice * 100) / 100;
 *         
 *         console("Final calculated price: $" + finalPrice);
 *         console("Price breakdown:");
 *         console("- Unit Price: $" + Item.UnitPrice);
 *         console("- Final Price: $" + Item.FinalPrice);
 *         console("- Calculated Price: $" + finalPrice);
 *         
 *         // Set any dynamic attribute values based on calculation
 *         Item.setAttributeValue("CalculatedPrice", finalPrice.toString());
 *         Item.setAttributeValue("PriceCalculationDate", new Date().toISOString());
 *         
 *         return finalPrice;
 *         
 *     } catch (error) {
 *         console("Error in comprehensive pricing script: " + error.message);
 *         console("Stack trace: " + error.stack);
 *         return Item.Price; // Fallback to base price
 *     }
 * }
 * 
 * // Execute the comprehensive pricing script
 * return comprehensivePricingScript();
 */
declare const Item: Item; 