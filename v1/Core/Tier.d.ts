/**
 * This module provides access to tier-based pricing functionality in pricing scripts.
 * The tier system supports sophisticated quantity-based pricing models that can
 * account for quantity discounts and customer-specific pricing including:
 * - Quantity-based pricing tiers
 * - Customer role-specific pricing
 * - Volume discount calculations
 * - Tier boundary management
 * 
 * @module Item / Tier
 */

/**
 * Represents a pricing tier for quantity-based pricing.
 * Pricing tiers define quantity thresholds and corresponding prices,
 * allowing for volume discounts and quantity-based pricing variations.
 * 
 * Each tier specifies a minimum quantity threshold and the price that
 * applies when the order quantity meets or exceeds that threshold.
 * Tiers can also be restricted to specific customer roles for
 * role-based pricing strategies.
 */
declare interface Tier {
    /**
     * The quantity threshold for this tier.
     * This value represents the minimum quantity required to qualify
     * for this pricing tier. When the order quantity meets or exceeds
     * this threshold, the tier's price is applied.
     * 
     * @example
     * if (Item.Quantity >= tier.Quantity) {
     *     return tier.Price; // Use tier pricing
     * }
     */
    Quantity: number;

    /**
     * The price for this tier.
     * This value represents the unit price that applies when the order
     * quantity meets or exceeds the tier's quantity threshold.
     * 
     * @example
     * var tier = HelperMethods.FindTier(Item.Quantity, Item.PricingTiers);
     * if (tier) {
     *     return tier.Price * Item.Quantity;
     * }
     */
    Price: number;

    /**
     * The customer role system name that this tier applies to.
     * This value is empty when the tier applies to all customer roles.
     * When specified, the tier only applies to customers with the
     * specified role, allowing for role-based pricing strategies.
     * 
     * @example
     * if (tier.CustomerRole === "" || Customer.CustomerRoles.includes(tier.CustomerRole)) {
     *     return tier.Price; // Tier applies to this customer
     * }
     */
    CustomerRole: string;
} 