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
 * Session is only defined when the script runs for a customer. The admin product
 * Test button runs without one, so guard product scripts that use it:
 *
 * @example
 * if (typeof Session != "undefined") {
 *     debug("Session context: " + Session.ScriptContext);
 * }
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
     * if (/\.edu$/i.test(Session.Email)) {
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
     * if (HelperMethods.Contains(Session.CustomerRoles, "VIP")) {
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
     * if (Session.Department == "Education") {
     *     console("Educational department - apply academic discount");
     * }
     */
    Department: string;

    /**
     * Cost code of the customer's department for the current session.
     * Empty when the customer has no department, or the department has no cost code set.
     * Used for cost-centre-based session pricing and business logic.
     *
     * @example
     * console("Customer department cost code: " + Session.DepartmentCostCode);
     * if (Session.DepartmentCostCode == "CC-100") {
     *     console("Cost centre CC-100 - apply centre-specific pricing");
     * }
     */
    DepartmentCostCode: string;

    /**
     * Value of the discount code currently applied in the session.
     * Reflects the discount coupon code entered by the customer, if any.
     * Used to apply code-specific pricing or promotions at the session level.
     *
     * @example
     * if (Session.DiscountCode == "SUMMER20") {
     *     console("Summer discount code applied in session");
     * }
     */
    DiscountCode: string;

    /**
     * The mode the script is running in: "Product", "CheckoutAttribute" or "LandingPageWithTierPrices".
     *
     * @example
     * if (Session.ScriptContext == "CheckoutAttribute") {
     *     debug("Pricing a checkout attribute");
     * }
     */
    ScriptContext: "Product" | "CheckoutAttribute" | "LandingPageWithTierPrices";

    /**
     * True when the script is run to build the product page tier price table
     * (ScriptContext is "LandingPageWithTierPrices").
     * Setting checkout attribute values is ignored in this mode.
     *
     * @example
     * if (!Session.IsTierPriceMode) {
     *     Session.setCheckoutAttributeValue("Delivery Type", "Pallet");
     * }
     */
    IsTierPriceMode: boolean;

    /**
     * Serialize a value to an indented JSON string.
     * Returns "null" for null, and a JSON object with an `error` property if serialization fails.
     *
     * **Known issue:** inside pricing scripts this currently fails for every value and returns
     * `{"error": "Serialization failed: ... ReflectionPermission ..."}`, because the script sandbox
     * blocks the serializer. Until that is fixed, log values with {@link HelperMethods.LogObject}
     * or string concatenation instead.
     * @param obj - The value to serialize
     * @returns JSON text
     *
     * @example
     * // Works today: log the value directly
     * console("Discount code: " + Session.DiscountCode);
     */
    ToJson(obj: any): string;

    /**
     * Get the current value of a checkout attribute for the session customer.
     * The attribute is matched by name, ignoring case.
     * For attributes with predefined values (drop-down, radio buttons, checkboxes) the value names are returned,
     * comma-separated when several are selected.
     * Returns an empty string when the attribute does not exist or has no value.
     * @param attribute - Name of the checkout attribute
     * @returns The stored value, or an empty string
     *
     * @example
     * var deliveryType = Session.getCheckoutAttributeValue("Delivery Type");
     * if (deliveryType == "Express") {
     *     console("Express delivery selected - apply surcharge");
     * }
     */
    getCheckoutAttributeValue(attribute: string): string;

    /**
     * Set a checkout attribute value for the session customer. The value is saved on the customer
     * and carried into the order, the same as if the customer had entered it at checkout.
     * The attribute is matched by name, ignoring case.
     *
     * The value must suit the attribute type:
     * - Drop-down, radio buttons, checkboxes: the name of one of the attribute's predefined values.
     *   For checkboxes the value is added to the existing selection.
     * - Date picker: a date, preferably in ISO format (`yyyy-MM-dd`).
     * - Number: a number using `.` as the decimal separator.
     * - Informational attributes cannot hold a value.
     *
     * If the attribute does not exist or the value is invalid, an error message is reported and nothing is saved.
     * Setting the value it already holds does nothing.
     * The call is ignored while tier prices are being calculated.
     * @param attribute - Name of the checkout attribute
     * @param value - Value to set
     *
     * @example
     * if (HelperMethods.Contains(Session.CustomerRoles, "Wholesale")) {
     *     Session.setCheckoutAttributeValue("Delivery Type", "Pallet");
     * }
     *
     * @example
     * Session.setCheckoutAttributeValue("Required By", "2026-12-24");
     */
    setCheckoutAttributeValue(attribute: string, value: string): void;
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
 * if (HelperMethods.Contains(Session.CustomerRoles, "Wholesale")) {
 *     console("Wholesale customer session - apply wholesale pricing");
 * }
 * 
 * // Department-specific session logic
 * if (Session.Department == "Marketing") {
 *     console("Marketing department session - apply marketing discounts");
 * }
 * 
 * // Customer email-based logic
 * if (Session.Email.indexOf("@company.com") >= 0) {
 *     console("Internal company customer - apply employee pricing");
 * }
 */
declare const Session: Session;
