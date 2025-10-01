/**
 * This module provides utility functions for common pricing calculations and data manipulation tasks.
 * Helper methods make it easier to write complex pricing logic by providing pre-built functionality
 * for common operations including:
 * - Tier-based pricing calculations
 * - Attribute price adjustments
 * - Price interpolation between tiers
 * - CSV data parsing and manipulation
 * - Object manipulation and debugging utilities
 * 
 * @module Helper / HelperMethods
 */

/**
 * CSV parsing options for configuring CSV parsing behavior
 */
declare interface CsvOptions {
    /**
     * Delimiter character used to separate fields in CSV (default: ",")
     */
    delimiterChar?: string;

    /**
     * Quote character used to enclose fields containing delimiters (default: '"')
     */
    quoteChar?: string;

    /**
     * Whether to disable automatic number conversion (default: false)
     * When true, all values remain as strings
     */
    disableNumberConverstion?: boolean;
}

/**
 * CSV replacer function type for custom value transformation during stringify operations
 * @param row - Row index (0-based)
 * @param col - Column index (0-based)
 * @param value - Current value to transform
 * @returns Transformed value
 */
declare type CsvReplacer = (row: number, col: number, value: any) => any;

/**
 * CSV stringify options for configuring CSV output format
 */
declare interface CsvStringifyOptions {
    /**
     * Delimiter character used to separate fields in output CSV (default: ",")
     */
    delimiterChar?: string;

    /**
     * Quote character used to enclose fields containing delimiters (default: '"')
     */
    quoteChar?: string;

    /**
     * Replacer function for custom value transformation during stringify
     */
    replacer?: CsvReplacer;
}

/**
 * CSV helper methods for parsing and stringifying CSV data
 * Provides utilities for working with CSV files and data in pricing scripts
 */
declare interface CsvHelper {
    /**
     * Parse CSV string into array of arrays
     * Converts CSV text data into a structured format for processing in pricing scripts
     * 
     * @param csv - CSV string to parse
     * @param options - Parsing options to configure delimiter, quote character, etc.
     * @param disableNumberConversion - Whether to disable automatic number conversion
     * @returns Array of arrays representing the CSV data, where each inner array is a row
     * 
     * @example
     * var csvData = HelperMethods.CSV.parse("1,Product A,10.99\n2,Product B,15.50");
     * // Result: [["1", "Product A", "10.99"], ["2", "Product B", "15.50"]]
     */
    parse(csv: string, options?: CsvOptions, disableNumberConversion?: boolean): any[][];

    /**
     * Convert array of arrays to CSV string
     * Converts structured data back to CSV format for output or file generation
     * 
     * @param table - Array of arrays to convert, where each inner array is a row
     * @param options - Stringify options to configure output format
     * @returns CSV string representation of the data
     * 
     * @example
     * var data = [["1", "Product A", "10.99"], ["2", "Product B", "15.50"]];
     * var csvString = HelperMethods.CSV.stringify(data);
     * // Result: "1,Product A,10.99\n2,Product B,15.50"
     */
    stringify(table: any[][], options?: CsvStringifyOptions): string;
}

/**
 * Helper methods available in pricing scripts for common calculations and data manipulation
 * These utilities extend the capabilities of pricing scripts and help create more flexible
 * and maintainable pricing logic.
 */
declare interface HelperMethods {
    /**
     * Find appropriate pricing tier based on quantity and customer roles
     * Searches through tier arrays to find the best matching tier for the given quantity
     * and customer roles, supporting both regular pricing tiers and batch tiers
     * 
     * @param quantity - The quantity which you would like the price to be worked out based on
     * @param tiers - An array of object literals [{Quantity: n, Price: n, CustomerRole?: string}]
     * @param roles - Array of string that contains customer roles, falls back to Customer.Roles if not supplied
     * @returns Tier object or null if no matching tier found
     * 
     * @example
     * var tiers = [{Quantity: 1, Price: 5}, {Quantity: 50, Price: 17}, {Quantity: 250, Price: 60}];
     * var tier = HelperMethods.FindTier(100, tiers, ["SuperAdmin", "Admin"]);
     * // Returns the tier with Quantity: 50, Price: 17
     */
    FindTier(quantity: number, tiers: Tier[], roles?: string[]): Tier | null;

    /**
     * Get attribute price adjustments including tier-based adjustments
     * Calculates the total price adjustment for all selected attributes, taking into account
     * tier-based pricing adjustments that can vary based on quantity or customer roles
     * 
     * @param quantity - The quantity which you would like the price to be worked out based on
     * @param roles - Array of string that contains customer roles, falls back to Customer.Roles if not supplied
     * @returns Total price adjustment including all attribute and tier adjustments
     * 
     * @example
     * var attributeAdjustment = HelperMethods.GetAttributePriceAdjustment(43, ["SuperAdmin", "Admin"]);
     * // Returns the total price adjustment for quantity 43 with specified customer roles
     */
    GetAttributePriceAdjustment(quantity: number, roles?: string[]): number;

    /**
     * Interpolate prices between tier boundaries for smooth pricing transitions
     * Calculates a price that falls between tier boundaries based on the specified quantity,
     * providing smooth pricing curves rather than step-based pricing
     * 
     * @param quantity - The quantity which you would like the price to be worked out based on
     * @param tiers - An array of object literals [{Quantity: n, Price: n}] for interpolation
     * @returns Interpolated price based on quantity position within the specified tiers
     * 
     * @example
     * var interpolationTiers = [
     *   {Quantity: 1, Price: 5}, {Quantity: 50, Price: 17}, 
     *   {Quantity: 250, Price: 60}, {Quantity: 500, Price: 100}, 
     *   {Quantity: 1000, Price: 200}
     * ];
     * var tierPrice = HelperMethods.InterpolatePrice(Item.Quantity, interpolationTiers);
     * // Returns interpolated price based on Item.Quantity position within tiers
     */
    InterpolatePrice(quantity: number, tiers: Tier[]): number;

    /**
     * Log object properties for debugging complex pricing scenarios
     * Outputs all properties of an object to the console for debugging purposes,
     * useful for examining complex data structures during script development
     * 
     * @param data - Object to log all properties from
     * 
     * @example
     * HelperMethods.LogObject(Item);
     * // Logs all Item properties to console for debugging
     */
    LogObject(data: any): void;

    /**
     * Check if arrays contain specific values for conditional logic
     * Utility function for checking array membership in conditional pricing logic
     * 
     * @param array - Array to check for the specified value
     * @param value - Value to search for in the array
     * @returns Whether the value is found in the array
     * 
     * @example
     * if (HelperMethods.Contains(Item.CustomerRoles, "VIP")) {
     *   // Apply VIP pricing logic
     * }
     */
    Contains(array: any[], value: any): boolean;

    /**
     * Type checking utility for robust script development
     * Determines if an item is a plain object (not null, not array, not primitive)
     * 
     * @param item - Item to check if it's an object
     * @returns Whether the item is an object
     * 
     * @example
     * if (HelperMethods.IsObject(config)) {
     *   // Process configuration object
     * }
     */
    IsObject(item: any): boolean;

    /**
     * Type checking utility for robust script development
     * Determines if an item is an array
     * 
     * @param item - Item to check if it's an array
     * @returns Whether the item is an array
     * 
     * @example
     * if (HelperMethods.IsArray(Item.Attributes)) {
     *   // Process attributes array
     * }
     */
    IsArray(item: any): boolean;

    /**
     * Deep merge objects with conflict resolution for combining pricing data
     * Merges source object properties into target object, handling nested objects
     * and providing a way to combine configuration data from multiple sources
     * 
     * @param target - Target object to merge properties into
     * @param source - Source object to merge properties from
     * 
     * @example
     * var baseConfig = {markup: 20, shipping: 5};
     * var overrideConfig = {markup: 25};
     * HelperMethods.MergeObject(baseConfig, overrideConfig);
     * // baseConfig now has {markup: 25, shipping: 5}
     */
    MergeObject(target: any, source: any): void;

    /**
     * CSV parsing and stringifying utilities for data-driven pricing
     * Provides comprehensive CSV handling capabilities for working with external data
     * files, configuration data, and bulk pricing information
     * 
     * @example
     * // Parse CSV file content
     * var csvContent = HelperMethods.CSV.parse(fileContent);
     * 
     * // Generate CSV output
     * var outputData = [["Product", "Price"], ["Item A", "10.99"]];
     * var csvOutput = HelperMethods.CSV.stringify(outputData);
     */
    CSV: CsvHelper;
}

/**
 * Global HelperMethods object available in pricing scripts
 * This constant provides access to all helper methods and utilities,
 * allowing scripts to use advanced functionality for complex pricing calculations
 * 
 * @example
 * // Use interpolation for tier-based pricing
 * var tierPrice = HelperMethods.InterpolatePrice(Item.Quantity, pricingTiers);
 * 
 * // Get attribute adjustments
 * var adjustments = HelperMethods.GetAttributePriceAdjustment(Item.Quantity, Item.CustomerRoles);
 * 
 * // Parse CSV data
 * var data = HelperMethods.CSV.parse(csvString);
 */
declare const HelperMethods: HelperMethods; 