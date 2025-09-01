/**
 * Attribute value object within an attribute
 */
declare interface AttributeValue {
    /**
     * Value of the attribute
     */
    Value: string;

    /**
     * ID of the attribute value
     */
    Id: string;

    /**
     * Price adjustment for this value
     */
    PriceAdjustment: number;

    /**
     * Weight adjustment for this value
     */
    WeightAdjustment: number;

    /**
     * Length adjustment for this value
     */
    LengthAdjustment: number;

    /**
     * Width adjustment for this value
     */
    WidthAdjustment: number;

    /**
     * Height adjustment for this value
     */
    HeightAdjustment: number;

    /**
     * Whether the price adjustment is a percentage
     */
    PriceAdjustmentIsPercentage: boolean;

    /**
     * Whether to use tier price adjustment
     */
    UseTierPriceAdjustment: boolean;

    /**
     * Array of tier price adjustments
     */
    TierPriceAdjustments: Tier[];
}

/**
 * Attribute object available in pricing scripts
 */
declare interface Attribute {
    /**
     * Key/name of the attribute
     */
    Key: string;

    /**
     * Prompt text for the attribute
     */
    Prompt: string;

    /**
     * Whether the attribute is required
     */
    IsRequired: boolean;

    /**
     * Current value of the attribute
     */
    Value: string;

    /**
     * Price adjustment for this attribute
     */
    PriceAdjustment: number;

    /**
     * Weight adjustment for this attribute
     */
    WeightAdjustment: number;

    /**
     * Whether the price adjustment is a percentage
     */
    PriceAdjustmentIsPercentage: boolean;

    /**
     * Type of the attribute
     */
    Type: string;

    /**
     * ID of the attribute
     */
    Id: number;

    /**
     * Array of possible values for this attribute
     */
    Values: AttributeValue[];

    /**
     * Length adjustment for this attribute
     */
    LengthAdjustment: number;

    /**
     * Width adjustment for this attribute
     */
    WidthAdjustment: number;

    /**
     * Height adjustment for this attribute
     */
    HeightAdjustment: number;
} 