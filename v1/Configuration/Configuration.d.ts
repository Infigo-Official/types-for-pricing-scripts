/**
 * This module provides access to configuration settings in pricing scripts.
 * The Configuration object gives the script the configuration data set up
 * alongside the script, so the same script can be reused with different settings.
 * 
 * @module Configuration
 */

/**
 * Interface representing the configuration object.
 *
 * @category Global Objects
 */
interface Configuration {
    /**
     * Retrieves the configuration of the running script.
     * The returned object is the JSON set up as the script's configuration;
     * it is null when the script has no configuration.
     * @returns The script configuration object, or null.
     *
     * @example
     * var config = Configuration.ScriptConfig() || {};
     * var markupPercentage = config.markupPercentage || 20;
     */
    ScriptConfig: () => any;
}

/**
 * Global Configuration object available in pricing scripts.
 * This constant provides access to the configuration interface,
 * allowing scripts to retrieve their configuration settings.
 * 
 * @example
 * var scriptConfig = Configuration.ScriptConfig() || {};
 * var markupPercentage = scriptConfig.markupPercentage || 20;
 * console("Using markup percentage: " + markupPercentage + "%");
 */
declare const Configuration: Configuration;
