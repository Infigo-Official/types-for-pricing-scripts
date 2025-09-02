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
 * @module Item
 */

/**
 * The main item object available in pricing scripts.
 * Represents the product variant being priced and provides access to all
 * product information, attributes, pricing data, and methods for file handling
 * and attribute management.
 * 
 * This object is the primary interface for accessing product data and performing
 * pricing calculations in pricing scripts.
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
     * var shippingCost = calculateShippingByWeight(Item.Weight);
     */
    Weight: number;

    /**
     * Indicates whether the weight can be set or modified for this item.
     * Some products may have fixed weights that cannot be changed,
     * while others allow weight adjustments based on attributes or custom settings.
     * 
     * @example
     * if (Item.CanSetWeight) {
     *     // Allow weight adjustments in the UI
     * }
     */
    CanSetWeight: boolean;

    /**
     * The Stock Keeping Unit (SKU) of the product variant.
     * This is the unique identifier for the product variant and is used
     * for inventory management and order processing.
     * 
     * @example
     * var productIdentifier = Item.Sku;
     */
    Sku: string;

    /**
     * The actual SKU based on the current attribute combination.
     * If no attributes are selected, this will be the same as the product SKU.
     * This value reflects the specific configuration of the product being priced.
     * 
     * @example
     * var configuredSku = Item.ActualSku;
     */
    ActualSku: string;

    /**
     * The width of the item in the configured dimension unit (typically inches or centimeters).
     * This value is used for packaging calculations and dimensional pricing.
     * 
     * @example
     * var packagingCost = calculatePackagingCost(Item.Width, Item.Height, Item.Length);
     */
    Width: number;

    /**
     * The height of the item in the configured dimension unit (typically inches or centimeters).
     * This value is used for packaging calculations and dimensional pricing.
     * 
     * @example
     * var packagingCost = calculatePackagingCost(Item.Width, Item.Height, Item.Length);
     */
    Height: number;

    /**
     * The length of the item in the configured dimension unit (typically inches or centimeters).
     * This value is used for packaging calculations and dimensional pricing.
     * 
     * @example
     * var packagingCost = calculatePackagingCost(Item.Width, Item.Height, Item.Length);
     */
    Length: number;

    /**
     * The name of the product as displayed to customers.
     * This is the human-readable product name used in the user interface
     * and order confirmations.
     * 
     * @example
     * var displayName = Item.ProductName;
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
     */
    IsBatch: boolean;

    /**
     * Number of pages (-1 if not valid)
     */
    NumberOfPages: number;

    /**
     * Number of records (-1 if not valid)
     */
    NumberOfRecords: number;

    /**
     * Array of pricing tiers with Price, Quantity, and CustomerRole
     */
    PricingTiers: Tier[];

    /**
     * Array of batch tiers (same as PricingTiers but for batch tier table)
     */
    BatchTiers: Tier[];

    /**
     * Price per record (-1 if not valid)
     */
    PricePerRecord: number;

    /**
     * Array of attributes with Key, Value, IsRequired, Prompt, PriceAdjustment, etc.
     */
    Attributes: Attribute[];

    /**
     * User email
     */
    Email: string;

    /**
     * Array of customer role system names
     */
    CustomerRoles: string[];

    /**
     * Department name of user
     */
    Department: string;

    /**
     * Array of other order items using the same custom pricing script
     */
    OtherOrderItems: Item[];

    /**
     * Alias of OtherOrderItems
     */
    CartItems: Item[];

    /**
     * Index of this item in the other order item array (0 if not in array)
     */
    OrderItemIndex: number;

    /**
     * Index of this item in the other order item array (-1 if not in array)
     */
    CartItemIndex: number;

    /**
     * Whether this item is in the other order item array
     */
    IsInOtherOrderItems: boolean;

    /**
     * Value of the currently used discount code
     */
    DiscountCode: string;

    /**
     * Array of versions with JobId, CustomName, and Quantity
     */
    Versions: ItemVersion[];

    /**
     * Number of versions
     */
    NumberOfVersions: number;

    /**
     * Whether this is a version of a job
     */
    IsVersion: boolean;

    /**
     * Sum of all quantities of all versions
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
     */
    getGlobalFileContent(filename: string): FileInfo;
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
 *     debug("Attribute: " + attr.Key + " = " + attr.Value);
 * }
 * 
 * // Get file information
 * var fileInfo = Item.getFileInfo("fileAttributeId", true);
 * if (fileInfo.NumberOfPages > 0) {
 *     debug("File has " + fileInfo.NumberOfPages + " pages");
 * }
 * 
 * // Access customer information
 * if (Item.CustomerRoles.indexOf("VIP") >= 0) {
 *     // Apply VIP pricing logic
 * }
 * 
 * // Work with pricing tiers
 * var tier = HelperMethods.FindTier(Item.Quantity, Item.PricingTiers, Item.CustomerRoles);
 * if (tier) {
 *     debug("Using tier: " + tier.Quantity + " @ $" + tier.Price);
 * }
 * 
 * // Calculate final price
 * var finalPrice = Item.Price;
 * finalPrice += HelperMethods.GetAttributePriceAdjustment(Item.Quantity, Item.CustomerRoles);
 * return finalPrice;
 */
declare const Item: Item; 