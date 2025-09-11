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
 * @param message - The debug message to display to the user
 * 
 * @example
 * debug("Calculating price for item: " + Item.ProductName);
 * debug("Base price: $" + Item.Price + ", Quantity: " + Item.Quantity);
 */
declare function debug(message: string): void;

/**
 * Output an alert message to the user interface.
 * Alert messages are used to display important information that requires
 * user attention, such as pricing changes or special offers.
 * 
 * @param message - The alert message to display to the user
 * 
 * @example
 * alert("Special pricing applied: 20% discount for bulk orders");
 * alert("Price updated based on selected attributes");
 */
declare function alert(message: string): void;

/**
 * Output a warning message to the user interface.
 * Warning messages are used to notify users about potential issues
 * or important considerations that may affect their pricing.
 * 
 * @param message - The warning message to display to the user
 * 
 * @example
 * warning("Large file detected - processing may take longer");
 * warning("Some attributes may affect shipping costs");
 */
declare function warning(message: string): void;

/**
 * Output an error message to the user interface.
 * Error messages are used to inform users about calculation failures
 * or other issues that prevent normal pricing execution.
 * 
 * @param message - The error message to display to the user
 * 
 * @example
 * error("Unable to calculate price - missing required attributes");
 * error("File processing failed - please check file format");
 */
declare function error(message: string): void;

/**
 * Output a message to the browser console/logs.
 * Console messages are used for debugging purposes and are typically
 * only visible to developers in the browser's developer tools.
 * 
 * @param message - The message to log to the console
 * 
 * @example
 * console("Script execution started");
 * console("Final calculated price: $" + finalPrice);
 */
declare function console(message: string): void;
