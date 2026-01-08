/**
 * This module provides access to session-based functionality in pricing scripts.
 * The Session object represents session-level data and provides access to customer
 * information and shopping cart items at the session level including:
 * - Customer session information
 * - Shopping cart items across the session
 * - Session-level customer data access
 * 
 * @module SessionItem
 */

/**
 * The session object available in pricing scripts.
 * Represents session-level data and provides access to customer information
 * and shopping cart items that are available during the current session.
 *
 * This object provides session-wide context for pricing calculations that
 * may need to consider multiple items or customer session data.
 *
 * @category Global Objects
 */
declare interface Session {
    /**
     * Array of shopping cart items in the current session.
     * Contains all active shopping cart items for the current customer session.
     * Each item provides full access to product information, attributes, and pricing data.
     * 
     * @example
     * console("Session has " + Session.CartItems.length + " items");
     * for (var i = 0; i < Session.CartItems.length; i++) {
     *     var item = Session.CartItems[i];
     *     console("Item: " + item.ProductName + " - $" + item.Price);
     * }
     */
    CartItems: Item[];

    /**
     * Alias for CartItems - array of other order items in the session.
     * Provides the same functionality as CartItems for backward compatibility.
     * 
     * @example
     * var totalSessionValue = 0;
     * for (var i = 0; i < Session.OtherOrderItems.length; i++) {
     *     totalSessionValue += Session.OtherOrderItems[i].Price * Session.OtherOrderItems[i].Quantity;
     * }
     * console("Total session cart value: $" + totalSessionValue);
     */
    OtherOrderItems: Item[];

    /**
     * Customer email address for the current session.
     * Provides access to the customer's email address associated with the session.
     * 
     * @example
     * console("Session customer email: " + Session.Email);
     * if (Session.Email.endsWith(".edu")) {
     *     console("Educational customer detected");
     * }
     */
    Email: string;

    /**
     * Array of customer role system names for the current session.
     * Contains all roles assigned to the customer in the current session.
     * Used for role-based pricing and access control.
     * 
     * @example
     * console("Customer roles: " + Session.CustomerRoles.join(", "));
     * if (Session.CustomerRoles.includes("VIP")) {
     *     console("VIP customer - apply special pricing");
     * }
     */
    CustomerRoles: string[];

    /**
     * Department name of the customer for the current session.
     * Represents the department or organizational unit the customer belongs to.
     * Used for department-specific pricing and business logic.
     * 
     * @example
     * console("Customer department: " + Session.Department);
     * if (Session.Department === "Education") {
     *     console("Educational department - apply academic discount");
     * }
     */
    Department: string;
}

/**
 * Global Session object available in pricing scripts.
 * This constant provides access to session-level data and functionality,
 * allowing scripts to access customer session information and shopping cart data
 * across the entire session context.
 * 
 * The Session object is particularly useful for pricing scripts that need to:
 * - Consider multiple items in the cart for volume discounts
 * - Apply session-level customer information
 * - Implement cross-item pricing logic
 * - Access customer roles and department information
 * 
 * @example
 * // Check if customer has multiple items for volume pricing
 * if (Session.CartItems.length > 1) {
 *     console("Multiple items in cart - check for volume discounts");
 *     var cartTotal = 0;
 *     for (var i = 0; i < Session.CartItems.length; i++) {
 *         cartTotal += Session.CartItems[i].Price * Session.CartItems[i].Quantity;
 *     }
 *     
 *     if (cartTotal > 500) {
 *         console("Cart total over $500 - apply volume discount");
 *     }
 * }
 * 
 * // Apply role-based session pricing
 * if (Session.CustomerRoles.includes("Wholesale")) {
 *     console("Wholesale customer session - apply wholesale pricing");
 * }
 * 
 * // Department-specific session logic
 * if (Session.Department === "Marketing") {
 *     console("Marketing department session - apply marketing discounts");
 * }
 * 
 * // Customer email-based logic
 * if (Session.Email.includes("@company.com")) {
 *     console("Internal company customer - apply employee pricing");
 * }
 */
declare const Session: Session;
