/**
 * CSV parsing options
 */
declare interface CsvOptions {
    /**
     * Delimiter character (default: ",")
     */
    delimiterChar?: string;

    /**
     * Quote character (default: '"')
     */
    quoteChar?: string;

    /**
     * Whether to disable number conversion (default: false)
     */
    disableNumberConverstion?: boolean;
}

/**
 * CSV replacer function for stringify
 */
declare type CsvReplacer = (row: number, col: number, value: any) => any;

/**
 * CSV stringify options
 */
declare interface CsvStringifyOptions {
    /**
     * Delimiter character (default: ",")
     */
    delimiterChar?: string;

    /**
     * Quote character (default: '"')
     */
    quoteChar?: string;

    /**
     * Replacer function for custom value transformation
     */
    replacer?: CsvReplacer;
}

/**
 * CSV helper methods
 */
declare interface CsvHelper {
    /**
     * Parse CSV string into array of arrays
     * @param csv - CSV string to parse
     * @param options - Parsing options
     * @param disableNumberConversion - Whether to disable number conversion
     * @returns Array of arrays representing the CSV data
     */
    parse(csv: string, options?: CsvOptions, disableNumberConversion?: boolean): any[][];

    /**
     * Convert array of arrays to CSV string
     * @param table - Array of arrays to convert
     * @param options - Stringify options
     * @returns CSV string
     */
    stringify(table: any[][], options?: CsvStringifyOptions): string;
}

/**
 * Helper methods available in pricing scripts
 */
declare interface HelperMethods {
    /**
     * Find the appropriate tier based on quantity and customer roles
     * @param quantity - The quantity to find tier for
     * @param tiers - Array of tier objects
     * @param roles - Array of customer role system names
     * @returns Tier object or null if no tier found
     */
    FindTier(quantity: number, tiers: Tier[], roles?: string[]): Tier | null;

    /**
     * Get attribute price adjustments including tier price adjustments
     * @param quantity - The quantity to get adjustments for
     * @param roles - Array of customer role system names
     * @returns Total price adjustment
     */
    GetAttributePriceAdjustment(quantity: number, roles?: string[]): number;

    /**
     * Interpolate price based on quantity and tiers
     * @param quantity - The quantity to interpolate price for
     * @param tiers - Array of tier objects
     * @returns Interpolated price
     */
    InterpolatePrice(quantity: number, tiers: Tier[]): number;

    /**
     * Log all properties of an object to console
     * @param data - Object to log
     */
    LogObject(data: any): void;

    /**
     * Check if an array contains a specific value
     * @param array - Array to check
     * @param value - Value to search for
     * @returns Whether the value is found
     */
    Contains(array: any[], value: any): boolean;

    /**
     * Check if an item is an object
     * @param item - Item to check
     * @returns Whether the item is an object
     */
    IsObject(item: any): boolean;

    /**
     * Check if an item is an array
     * @param item - Item to check
     * @returns Whether the item is an array
     */
    IsArray(item: any): boolean;

    /**
     * Merge source object into target object
     * @param target - Target object to merge into
     * @param source - Source object to merge from
     */
    MergeObject(target: any, source: any): void;

    /**
     * CSV parsing and stringifying utilities
     */
    CSV: CsvHelper;
}

/**
 * Global HelperMethods object
 */
declare const HelperMethods: HelperMethods; 