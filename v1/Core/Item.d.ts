/**
 * Main item object available in pricing scripts
 * Represents the product variant being priced
 */
declare interface Item {
    /**
     * Standard product variant price
     */
    Price: number;

    /**
     * Old price from product variant
     */
    OldPrice: number;

    /**
     * Product cost
     */
    ProductCost: number;

    /**
     * Special price (nullable)
     */
    SpecialPrice: number | null;

    /**
     * Special price start date (nullable)
     */
    SpecialPriceStartDate: Date | null;

    /**
     * Special price end date (nullable)
     */
    SpecialPriceEndDate: Date | null;

    /**
     * Additional shipping charge
     */
    AdditionalShippingCharge: number;

    /**
     * Weight of the item
     */
    Weight: number;

    /**
     * Whether the weight can be set for this item
     */
    CanSetWeight: boolean;

    /**
     * Product SKU
     */
    Sku: string;

    /**
     * Actual SKU from attributes combination (if no attributes, product SKU is used)
     */
    ActualSku: string;

    /**
     * Width of the item
     */
    Width: number;

    /**
     * Height of the item
     */
    Height: number;

    /**
     * Length of the item
     */
    Length: number;

    /**
     * Name of the product
     */
    ProductName: string;

    /**
     * Array of category names
     */
    Categories: string[];

    /**
     * Order quantity
     */
    Quantity: number;

    /**
     * Pack quantity (quantity / product variant OrderPackQuantity)
     */
    PackQuantity: number;

    /**
     * Quantity selector mode
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
 * Global Item object
 */
declare const Item: Item; 