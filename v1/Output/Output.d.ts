/**
 * This module provides access to output and messaging functionality in pricing scripts.
 * The output functions allow scripts to communicate with users and provide feedback
 * about pricing calculations and decisions including:
 * - Debug messages for development and troubleshooting
 * - Alert messages for important information
 * - Warning messages for potential issues
 * - Error messages for calculation failures
 * - Console logging for debugging purposes
 * 
 * @module Output
 */

/**
 * Output a debug message to the user interface.
 * Debug messages are typically used during development and troubleshooting
 * to provide detailed information about script execution and calculations.
 *
 * @category Output Functions
 * @param message - The debug message to display to the user
 * @param location - Where to show the message, one of {@link Constants.MessageArea}; shown everywhere when omitted
 *
 * @example
 * debug("Calculating price for item: " + Item.ProductName);
 * debug("Base price: $" + Item.Price + ", Quantity: " + Item.Quantity);
 *
 * @example
 * debug("Tier lookup took the fallback path", Constants.MessageArea.AdminArea);
 */
declare function debug(message: any, location?: string): void;

/**
 * Output an alert message to the user interface.
 * Alert messages are used to display important information that requires
 * user attention, such as pricing changes or special offers.
 *
 * @category Output Functions
 * @param message - The alert message to display to the user
 * @param location - Where to show the message, one of {@link Constants.MessageArea}; shown everywhere when omitted
 *
 * @example
 * alert("Special pricing applied: 20% discount for bulk orders");
 * alert("Price updated based on selected attributes");
 *
 * @example
 * alert("Bulk discount applied", Constants.MessageArea.Basket);
 */
declare function alert(message: any, location?: string): void;

/**
 * Output a warning message to the user interface.
 * Warning messages are used to notify users about potential issues
 * or important considerations that may affect their pricing.
 *
 * @category Output Functions
 * @param message - The warning message to display to the user
 * @param location - Where to show the message, one of {@link Constants.MessageArea}; shown everywhere when omitted
 *
 * @example
 * warning("Large file detected - processing may take longer");
 * warning("Some attributes may affect shipping costs");
 *
 * @example
 * warning("Order 50 or more for a 10% discount", Constants.MessageArea.ProductDetails);
 */
declare function warning(message: any, location?: string): void;

/**
 * Output an error message to the user interface.
 * Error messages are used to inform users about calculation failures
 * or other issues that prevent normal pricing execution.
 *
 * @category Output Functions
 * @param message - The error message to display to the user
 * @param location - Where to show the message, one of {@link Constants.MessageArea}; shown everywhere when omitted
 *
 * @example
 * error("Unable to calculate price - missing required attributes");
 * error("File processing failed - please check file format");
 *
 * @example
 * error("Please upload a PDF file", Constants.MessageArea.ProductDetailsAndPostEditor);
 */
declare function error(message: any, location?: string): void;

/**
 * Output a message to the browser console/logs.
 * Console messages are used for debugging purposes and are typically
 * only visible to developers in the browser's developer tools.
 *
 * @category Output Functions
 * @param message - The message to log to the console
 * @param location - Where to show the message, one of {@link Constants.MessageArea}; shown everywhere when omitted
 *
 * @example
 * console("Script execution started");
 * console("Final calculated price: $" + finalPrice);
 */
declare function console(message: any, location?: string): void;
