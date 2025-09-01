/**
 * This module provides access to configuration settings in pricing scripts.
 * The Configuration object allows scripts to access and utilize various
 * configuration parameters that control script behavior including:
 * - Script-specific configuration settings
 * - Environment variables and parameters
 * - Custom configuration data
 * - System-wide settings
 * 
 * @module System / Configuration
 */

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
 * Global Configuration object available in pricing scripts.
 * This constant provides access to the configuration interface,
 * allowing scripts to retrieve configuration settings and parameters.
 * 
 * @example
 * var scriptConfig = Configuration.ScriptConfig;
 * var customSetting = scriptConfig.customParameter;
 */
declare const Configuration: ConfigurationInterface; 