/**
 * This module provides global functions available in pricing scripts that are not tied to a specific object:
 * - Parsing CSV text into a 2D array
 * - Returning script-calculated tier prices for the product page tier price table
 *
 * @module Functions
 */

/**
 * Parse a CSV string into a 2D array of rows and columns.
 * Every row is returned, including the first one, so a header row appears as row 0.
 * Numeric values are converted to numbers unless `disableNumberConversion` is true.
 * Returns null when the text cannot be parsed.
 *
 * Use this for CSV text the script already holds (for example from an attribute value or a file's content).
 * To read a CSV file from Global Data, use {@link Item.getGlobalFileCsvContent} instead.
 *
 * @category Global Functions
 * @param csv - The CSV text to parse
 * @param hasHeaders - Currently ignored; the first row is always returned as data
 * @param delimiter - Field delimiter; only the first character is used (default: ",")
 * @param quote - Quote character; only the first character is used (default: '"')
 * @param disableNumberConversion - When true, every value is returned as a string (default: false)
 * @returns 2D array of rows and columns, or null if the CSV could not be parsed
 *
 * @example
 * var rows = parseCsv("Size,Price\nA4,1.50\nA3,2.75", true, ",", "\"", false);
 * if (rows) {
 *     // skip the header row
 *     for (var i = 1; i < rows.length; i++) {
 *         if (rows[i][0] == Item.getAttributeValue("Size")) {
 *             return Number(rows[i][1]) * Item.Quantity;
 *         }
 *     }
 * }
 *
 * @example
 * // Semicolon-separated values, keeping codes such as "007" as strings
 * var codes = parseCsv("Code;Name\n007;Gold", true, ";", "\"", true);
 */
declare function parseCsv(csv: string, hasHeaders?: boolean, delimiter?: string, quote?: string, disableNumberConversion?: boolean): (string | number)[][] | null;

/**
 * Set the price for a quantity in the product page tier price table.
 * Call it once per quantity break; each call adds one tier.
 *
 * Tier prices from the script are only used when the catalog setting
 * "Enable dynamic tier price updates" is on and the product uses a pricing script.
 * The script is then run in tier price mode (`Item.IsTierPriceMode` is true) and the calls made in that run
 * replace the product's stored tier prices in the table. If the script sets no tier prices,
 * the stored tier prices are shown instead.
 *
 * @category Global Functions
 * @param quantity - The quantity the tier starts at
 * @param price - The unit price for that quantity
 *
 * @example
 * if (Item.IsTierPriceMode) {
 *     var surcharge = Item.getAttributeValue("Finish") == "Gloss" ? 0.10 : 0;
 *     for (var i = 0; i < Item.PricingTiers.length; i++) {
 *         var tier = Item.PricingTiers[i];
 *         setTierPrice(tier.Quantity, tier.Price + surcharge);
 *     }
 * }
 */
declare function setTierPrice(quantity: number, price: number): void;
