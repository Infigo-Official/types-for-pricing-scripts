/**
 * Pricing tier object for quantity-based pricing
 */
declare interface Tier {
    /**
     * Quantity threshold for this tier
     */
    Quantity: number;

    /**
     * Price for this tier
     */
    Price: number;

    /**
     * Customer role system name (empty when not relevant)
     */
    CustomerRole: string;
} 