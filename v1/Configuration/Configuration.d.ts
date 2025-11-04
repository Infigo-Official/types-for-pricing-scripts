/**
 * This module provides access to configuration settings in pricing scripts.
 * The Configuration object allows scripts to access and utilize various
 * configuration parameters that control script behavior including:
 * - Script-specific configuration settings
 * - Environment variables and parameters
 * - Custom configuration data
 * - System-wide settings
 * 
 * @module Configuration
 */

/**
 * Interface representing the configuration object.
 */
interface Configuration {
    /**
     * Retrieves the script configuration.
     * @returns The script configuration object.
     */
    ScriptConfig: () => any;

    /**
     * Retrieves the parameters configuration.
     * @returns `null` as parameters are not yet supported.
     */
    Parameters: () => any | null;
}

/**
 * Provides access to script configuration settings and parameters.
 * This interface allows pricing scripts to retrieve configuration data
 * that controls their behavior and functionality.
 * 
 * Configuration settings can include script-specific parameters,
 * environment variables, and custom configuration data that affects
 * how the pricing script operates.
 */
declare interface ConfigurationInterface {
    /**
     * The script configuration object containing all configuration settings.
     * This object holds various configuration parameters that can be used
     * to customize script behavior and access external configuration data.
     * 
     * The structure of this object depends on the specific configuration
     * settings defined for the pricing script.
     * 
     * @example
     * var config = Configuration.ScriptConfig;
     * var markupPercentage = config.markupPercentage || 20;
     * var baseShippingCost = config.baseShippingCost || 5.99;
     */
    ScriptConfig: any;
}

/**
 * Represents a Configuration interface.
 */

/**
 * Global Configuration object available in pricing scripts.
 * This constant provides access to the configuration interface,
 * allowing scripts to retrieve configuration settings and parameters.
 * 
 * @example
 * var scriptConfig = Configuration.ScriptConfig();
 * console("Script configuration loaded: " + JSON.stringify(scriptConfig));
 * 
 * var markupPercentage = scriptConfig.markupPercentage || 20;
 * console("Using markup percentage: " + markupPercentage + "%");
 * 
 * var parameters = Configuration.Parameters();
 * console("Parameters available: " + JSON.stringify(parameters));
 */
declare const Configuration: Configuration;


