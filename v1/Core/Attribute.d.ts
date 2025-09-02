/**
 * This module provides access to attribute management functionality in pricing scripts.
 * Attributes represent configurable options for products that can affect pricing, weight, and dimensions.
 * The attribute system provides a flexible way to handle complex product configurations including:
 * - Product options and variants
 * - Price adjustments based on selections
 * - Weight and dimensional modifications
 * - Tier-based pricing adjustments
 * - Required vs optional attributes
 * 
 * @module Item / Attribute
 */

/**
 * Represents an individual value within an attribute.
 * Attribute values define the specific options available for a product attribute,
 * including their pricing implications and physical adjustments.
 * 
 * Each attribute value can have its own price, weight, and dimensional adjustments,
 * allowing for precise control over how product options affect the final pricing.
 */
declare interface AttributeValue {
    /**
     * The display value of the attribute option as shown to customers.
     * This is the human-readable text that appears in the user interface
     * for this specific attribute option.
     * 
     * @example
     * var selectedColor = attr.Value; // "Red", "Blue", "Green", etc.
     */
    Value: string;

    /**
     * The unique identifier for this attribute value.
     * This ID is used internally for tracking and processing attribute selections
     * and should not be displayed to end users.
     * 
     * @example
     * var valueId = attr.Id; // "color_red_001", "size_large_002", etc.
     */
    Id: string;

    /**
     * The price adjustment amount for this attribute value.
     * This value is added to or subtracted from the base product price
     * when this attribute value is selected.
     * 
     * @example
     * var finalPrice = Item.Price + attr.PriceAdjustment;
     */
    PriceAdjustment: number;

    /**
     * The weight adjustment amount for this attribute value.
     * This value is added to or subtracted from the base product weight
     * when this attribute value is selected, affecting shipping calculations.
     * 
     * @example
     * var adjustedWeight = Item.Weight + attr.WeightAdjustment;
     */
    WeightAdjustment: number;

    /**
     * The length adjustment amount for this attribute value.
     * This value modifies the product's length dimension when this
     * attribute value is selected, affecting packaging calculations.
     * 
     * @example
     * var adjustedLength = Item.Length + attr.LengthAdjustment;
     */
    LengthAdjustment: number;

    /**
     * The width adjustment amount for this attribute value.
     * This value modifies the product's width dimension when this
     * attribute value is selected, affecting packaging calculations.
     * 
     * @example
     * var adjustedWidth = Item.Width + attr.WidthAdjustment;
     */
    WidthAdjustment: number;

    /**
     * The height adjustment amount for this attribute value.
     * This value modifies the product's height dimension when this
     * attribute value is selected, affecting packaging calculations.
     * 
     * @example
     * var adjustedHeight = Item.Height + attr.HeightAdjustment;
     */
    HeightAdjustment: number;

    /**
     * Indicates whether the price adjustment should be applied as a percentage
     * rather than a fixed amount. When true, the PriceAdjustment value is
     * treated as a percentage of the base price.
     * 
     * @example
     * if (attr.PriceAdjustmentIsPercentage) {
     *     var adjustment = Item.Price * (attr.PriceAdjustment / 100);
     * } else {
     *     var adjustment = attr.PriceAdjustment;
     * }
     */
    PriceAdjustmentIsPercentage: boolean;

    /**
     * Indicates whether tier-based price adjustments should be used for this attribute value.
     * When true, the system will use the TierPriceAdjustments array instead of
     * the standard PriceAdjustment for quantity-based pricing.
     * 
     * @example
     * if (attr.UseTierPriceAdjustment) {
     *     var tierAdjustment = HelperMethods.FindTier(Item.Quantity, attr.TierPriceAdjustments);
     * }
     */
    UseTierPriceAdjustment: boolean;

    /**
     * Array of tier-based price adjustments for this attribute value.
     * Each tier defines a quantity threshold and corresponding price adjustment,
     * allowing for quantity-based pricing variations for this specific attribute option.
     * 
     * @example
     * var tierAdjustment = HelperMethods.FindTier(Item.Quantity, attr.TierPriceAdjustments);
     * if (tierAdjustment) {
     *     var finalPrice = Item.Price + tierAdjustment.Price;
     * }
     */
    TierPriceAdjustments: Tier[];
}

/**
 * Represents a product attribute with its configuration and available values.
 * Attributes define the configurable options for a product, such as color, size,
 * material, or any other product variant that affects pricing or specifications.
 * 
 * Each attribute contains a collection of possible values and defines how
 * those values affect the product's pricing, weight, and dimensions.
 */
declare interface Attribute {
    /**
     * The unique key or name identifier for this attribute.
     * This is used internally to identify the attribute and should be
     * consistent across different product configurations.
     * 
     * @example
     * var attrKey = attr.Key; // "color", "size", "material", etc.
     */
    Key: string;

    /**
     * The display text shown to customers when selecting this attribute.
     * This is the human-readable label that appears in the user interface
     * to describe what this attribute represents.
     * 
     * @example
     * var prompt = attr.Prompt; // "Select Color", "Choose Size", etc.
     */
    Prompt: string;

    /**
     * Indicates whether this attribute must be selected before the product
     * can be added to the cart. Required attributes typically represent
     * essential product specifications.
     * 
     * @example
     * if (attr.IsRequired && !attr.Value) {
     *     error("Please select a " + attr.Prompt);
     * }
     */
    IsRequired: boolean;

    /**
     * The currently selected value for this attribute.
     * This represents the customer's choice for this attribute option.
     * Empty string indicates no selection has been made.
     * 
     * @example
     * var selectedValue = attr.Value; // "Red", "Large", "Premium", etc.
     */
    Value: string;

    /**
     * The price adjustment amount for the currently selected attribute value.
     * This value is calculated based on the selected AttributeValue and
     * represents the total price impact of this attribute selection.
     * 
     * @example
     * var totalPrice = Item.Price + attr.PriceAdjustment;
     */
    PriceAdjustment: number;

    /**
     * The weight adjustment amount for the currently selected attribute value.
     * This value represents the total weight impact of this attribute selection,
     * affecting shipping and handling calculations.
     * 
     * @example
     * var totalWeight = Item.Weight + attr.WeightAdjustment;
     */
    WeightAdjustment: number;

    /**
     * Indicates whether the price adjustment should be applied as a percentage
     * rather than a fixed amount. When true, the PriceAdjustment value is
     * treated as a percentage of the base price.
     * 
     * @example
     * if (attr.PriceAdjustmentIsPercentage) {
     *     var adjustment = Item.Price * (attr.PriceAdjustment / 100);
     * } else {
     *     var adjustment = attr.PriceAdjustment;
     * }
     */
    PriceAdjustmentIsPercentage: boolean;

    /**
     * The type or category of this attribute.
     * This defines the kind of attribute (e.g., "color", "size", "material")
     * and may affect how the attribute is displayed or processed.
     * 
     * @example
     * if (attr.Type === "color") {
     *     // Handle color-specific logic
     * }
     */
    Type: string;

    /**
     * The unique numeric identifier for this attribute.
     * This ID is used internally for database operations and system processing.
     * 
     * @example
     * var attrId = attr.Id; // 1, 2, 3, etc.
     */
    Id: number;

    /**
     * Array of all possible values available for this attribute.
     * Each value represents a selectable option with its own pricing
     * and adjustment implications.
     * 
     * @example
     * for (var i = 0; i < attr.Values.length; i++) {
     *     var option = attr.Values[i];
     *     console.log(option.Value + ": $" + option.PriceAdjustment);
     * }
     */
    Values: AttributeValue[];

    /**
     * The length adjustment amount for the currently selected attribute value.
     * This value represents the total length impact of this attribute selection,
     * affecting packaging and dimensional calculations.
     * 
     * @example
     * var totalLength = Item.Length + attr.LengthAdjustment;
     */
    LengthAdjustment: number;

    /**
     * The width adjustment amount for the currently selected attribute value.
     * This value represents the total width impact of this attribute selection,
     * affecting packaging and dimensional calculations.
     * 
     * @example
     * var totalWidth = Item.Width + attr.WidthAdjustment;
     */
    WidthAdjustment: number;

    /**
     * The height adjustment amount for the currently selected attribute value.
     * This value represents the total height impact of this attribute selection,
     * affecting packaging and dimensional calculations.
     * 
     * @example
     * var totalHeight = Item.Height + attr.HeightAdjustment;
     */
    HeightAdjustment: number;
} 