/**
 * This module provides access to checkout-specific functionality in pricing scripts.
 * The CheckoutItem object represents checkout-level data and provides access to
 * comprehensive checkout information including:
 * - Customer checkout information
 * - Shipping address details
 * - Geographic information (country, state/province)
 * - Checkout properties and mode
 * - All items being checked out
 * 
 * @module CheckoutItem
 */

/**
 * Represents customer information during checkout.
 * Provides access to customer details that are relevant during the checkout process
 * including personal information, roles, and organizational details.
 */
declare interface CheckoutCustomer {
    /**
     * Customer's first name.
     * 
     * @example
     * console("Customer first name: " + CheckoutItem.Customer.FirstName);
     */
    FirstName: string;

    /**
     * Customer's last name.
     * 
     * @example
     * console("Customer last name: " + CheckoutItem.Customer.LastName);
     */
    LastName: string;

    /**
     * Customer's email address.
     * 
     * @example
     * console("Customer email: " + CheckoutItem.Customer.Email);
     * if (CheckoutItem.Customer.Email.endsWith(".edu")) {
     *     console("Educational customer - apply academic pricing");
     * }
     */
    Email: string;

    /**
     * Array of customer role system names.
     * Contains all roles assigned to the customer for role-based pricing logic.
     * 
     * @example
     * console("Customer roles: " + CheckoutItem.Customer.Roles.join(", "));
     * if (CheckoutItem.Customer.Roles.includes("VIP")) {
     *     console("VIP customer checkout");
     * }
     */
    Roles: string[];

    /**
     * Department name of the customer.
     * Represents the organizational department the customer belongs to.
     * 
     * @example
     * if (CheckoutItem.Customer.DepartmentName === "Procurement") {
     *     console("Procurement department checkout - apply bulk pricing");
     * }
     */
    DepartmentName: string;
}

/**
 * Represents country information during checkout.
 * Provides access to country details for geographic-based pricing and shipping calculations.
 */
declare interface CheckoutCountry {
    /**
     * Full country name.
     * 
     * @example
     * console("Shipping to country: " + CheckoutItem.CountryFrom.Name);
     */
    Name: string;

    /**
     * Two-letter ISO country code.
     * 
     * @example
     * if (CheckoutItem.CountryFrom.TwoLetterIsoCode === "US") {
     *     console("Domestic US shipping");
     * }
     */
    TwoLetterIsoCode: string;

    /**
     * Three-letter ISO country code.
     * 
     * @example
     * console("Country code: " + CheckoutItem.CountryFrom.ThreeLetterIsoCode);
     */
    ThreeLetterIsoCode: string;

    /**
     * Numeric ISO country code.
     * 
     * @example
     * console("Numeric country code: " + CheckoutItem.CountryFrom.NumericIsoCode);
     */
    NumericIsoCode: number;
}

/**
 * Represents state/province information during checkout.
 * Provides access to state or province details for regional pricing and shipping.
 */
declare interface CheckoutStateProvince {
    /**
     * Full state or province name.
     * 
     * @example
     * console("Shipping to state: " + CheckoutItem.StateProvince.Name);
     */
    Name: string;

    /**
     * State or province abbreviation.
     * 
     * @example
     * if (CheckoutItem.StateProvince.Abbreviation === "CA") {
     *     console("California shipping - apply CA tax");
     * }
     */
    Abbreviation: string;
}

/**
 * Represents shipping address information during checkout.
 * Provides comprehensive access to the shipping address details.
 */
declare interface CheckoutAddress {
    /**
     * First name on the shipping address.
     */
    FirstName: string;

    /**
     * Last name on the shipping address.
     */
    LastName: string;

    /**
     * Email address on the shipping address.
     */
    Email: string;

    /**
     * Company name on the shipping address.
     * 
     * @example
     * if (CheckoutItem.Address.Company) {
     *     console("Business address - company: " + CheckoutItem.Address.Company);
     * }
     */
    Company: string;

    /**
     * City name on the shipping address.
     * 
     * @example
     * console("Shipping to city: " + CheckoutItem.Address.City);
     */
    City: string;

    /**
     * Primary address line.
     */
    Address1: string;

    /**
     * Secondary address line (apartment, suite, etc.).
     */
    Address2: string;

    /**
     * ZIP or postal code.
     * 
     * @example
     * console("Shipping ZIP: " + CheckoutItem.Address.ZipPostalCode);
     */
    ZipPostalCode: string;

    /**
     * Phone number on the shipping address.
     */
    PhoneNumber: string;

    /**
     * Fax number on the shipping address.
     */
    FaxNumber: string;

    /**
     * Country information for the shipping address.
     */
    Country: CheckoutCountry;

    /**
     * State/province information for the shipping address.
     */
    StateProvince: CheckoutStateProvince;
}

/**
 * The checkout item object available in checkout pricing scripts.
 * Represents comprehensive checkout information including all items being purchased,
 * customer details, shipping information, and checkout context.
 *
 * This object provides complete checkout context for pricing calculations that
 * need to consider shipping, customer information, and multi-item scenarios.
 *
 * @category Global Objects
 */
declare interface CheckoutItem {
    /**
     * Array of all items being checked out.
     * Contains complete item information for all products in the checkout process.
     * 
     * @example
     * console("Checkout contains " + CheckoutItem.Items.length + " items");
     * var checkoutTotal = 0;
     * for (var i = 0; i < CheckoutItem.Items.length; i++) {
     *     var item = CheckoutItem.Items[i];
     *     checkoutTotal += item.Price * item.Quantity;
     *     console("Item " + (i + 1) + ": " + item.ProductName + " - $" + item.Price);
     * }
     * console("Checkout subtotal: $" + checkoutTotal);
     */
    Items: Item[];

    /**
     * Customer information for the checkout.
     * Provides access to customer details including name, email, roles, and department.
     * 
     * @example
     * var customer = CheckoutItem.Customer;
     * console("Checkout for: " + customer.FirstName + " " + customer.LastName);
     * console("Email: " + customer.Email);
     * console("Department: " + customer.DepartmentName);
     */
    Customer: CheckoutCustomer;

    /**
     * Origin country information for shipping calculations.
     * Represents the country from which items are being shipped.
     * 
     * @example
     * if (CheckoutItem.CountryFrom) {
     *     console("Shipping from: " + CheckoutItem.CountryFrom.Name);
     * }
     */
    CountryFrom: CheckoutCountry;

    /**
     * Origin ZIP/postal code for shipping calculations.
     * Represents the postal code from which items are being shipped.
     * 
     * @example
     * console("Origin ZIP: " + CheckoutItem.ZipPostalCodeFrom);
     */
    ZipPostalCodeFrom: string;

    /**
     * Additional properties for the checkout.
     * Contains key-value pairs of additional checkout-specific information.
     * 
     * @example
     * console("Checkout properties:");
     * for (var key in CheckoutItem.Properties) {
     *     console("  " + key + ": " + CheckoutItem.Properties[key]);
     * }
     */
    Properties: { [key: string]: string };

    /**
     * Checkout mode or type.
     * Indicates the type of checkout being performed (e.g., "standard", "express", etc.).
     * 
     * @example
     * console("Checkout mode: " + CheckoutItem.Mode);
     * if (CheckoutItem.Mode === "express") {
     *     console("Express checkout - apply expedited processing");
     * }
     */
    Mode: string;

    /**
     * State/province information for shipping destination.
     * Provides state or province details for the shipping destination.
     * 
     * @example
     * if (CheckoutItem.StateProvince) {
     *     console("Shipping to state: " + CheckoutItem.StateProvince.Name);
     *     console("State abbreviation: " + CheckoutItem.StateProvince.Abbreviation);
     * }
     */
    StateProvince: CheckoutStateProvince;

    /**
     * Complete shipping address information.
     * Provides comprehensive shipping address details including contact information.
     * 
     * @example
     * var address = CheckoutItem.Address;
     * if (address) {
     *     console("Shipping Address:");
     *     console("  " + address.FirstName + " " + address.LastName);
     *     if (address.Company) console("  " + address.Company);
     *     console("  " + address.Address1);
     *     if (address.Address2) console("  " + address.Address2);
     *     console("  " + address.City + ", " + address.StateProvince.Abbreviation + " " + address.ZipPostalCode);
     *     console("  " + address.Country.Name);
     * }
     */
    Address: CheckoutAddress;
}

/**
 * Global CheckoutItem object available in checkout pricing scripts.
 * This constant provides access to comprehensive checkout information,
 * allowing scripts to access customer details, shipping information,
 * and all items being processed during checkout.
 * 
 * The CheckoutItem object is essential for checkout-specific pricing scripts that need to:
 * - Calculate shipping costs based on destination
 * - Apply geographic-based pricing or taxes
 * - Consider multiple items for checkout-level discounts
 * - Access customer information for personalized pricing
 * - Implement address-based business logic
 * 
 * @example
 * // Geographic-based pricing
 * if (CheckoutItem.Address && CheckoutItem.Address.Country.TwoLetterIsoCode === "CA") {
 *     console("Canadian shipping - apply CAD pricing");
 * }
 * 
 * // Multi-item checkout discounts
 * if (CheckoutItem.Items.length >= 3) {
 *     console("Multi-item checkout - apply bundle discount");
 * }
 * 
 * // Customer role-based checkout pricing
 * if (CheckoutItem.Customer.Roles.includes("Premium")) {
 *     console("Premium customer checkout - free shipping");
 * }
 * 
 * // Business address detection
 * if (CheckoutItem.Address.Company) {
 *     console("Business checkout - apply B2B pricing");
 * }
 * 
 * // Express checkout handling
 * if (CheckoutItem.Mode === "express") {
 *     console("Express checkout - add expedited processing fee");
 * }
 * 
 * // State-specific tax calculation
 * if (CheckoutItem.StateProvince && CheckoutItem.StateProvince.Abbreviation === "NY") {
 *     console("New York delivery - apply NY state tax");
 * }
 */
declare const CheckoutItem: CheckoutItem;
