/**
 * This module provides access to version management functionality in pricing scripts.
 * The version system supports job versioning information including quantities
 * and custom names, useful for tracking pricing changes across job iterations including:
 * - Individual version information
 * - Version collection management
 * - Quantity tracking across versions
 * - Version status and metadata
 * 
 * @module Item / Version
 */

/**
 * Represents individual version item information.
 * Each version item contains details about a specific version of a job,
 * including its unique identifier, custom name, and quantity information.
 * 
 * Version items are used to track different iterations or variations
 * of the same job, allowing for complex pricing scenarios where
 * multiple versions of a product are being ordered simultaneously.
 */
declare interface ItemVersion {
    /**
     * The job ID for this version.
     * This unique identifier links this version to a specific job
     * in the system, allowing for tracking and management of
     * individual version instances.
     * 
     * @example
     * var versionJobId = version.JobId;
     * console.log("Processing version with job ID: " + versionJobId);
     */
    JobId: string;

    /**
     * The custom name for this version.
     * This human-readable identifier allows users to distinguish
     * between different versions of the same job, such as
     * "Draft Version", "Final Version", or "Client Approved".
     * 
     * @example
     * var versionName = version.CustomName;
     * if (versionName.includes("Final")) {
     *     return Item.Price * 1.1; // 10% markup for final versions
     * }
     */
    CustomName: string;

    /**
     * The quantity for this version.
     * This value represents how many units of this specific version
     * are being ordered, allowing for version-specific quantity
     * calculations and pricing adjustments.
     * 
     * @example
     * var versionQuantity = version.Quantity;
     * var versionTotal = Item.Price * versionQuantity;
     */
    Quantity: number;
}

/**
 * Represents version data containing comprehensive version information.
 * This interface provides access to version collection management,
 * version status tracking, and aggregate quantity calculations
 * across all versions of a job.
 * 
 * Version data is essential for complex pricing scenarios where
 * multiple versions of a product are being processed together,
 * allowing for bulk pricing and version-specific adjustments.
 */
declare interface VersionData {
    /**
     * Collection of version items.
     * This array contains all individual version items associated
     * with the current job, providing access to detailed information
     * about each version including quantities and custom names.
     * 
     * @example
     * var totalPrice = 0;
     * for (var i = 0; i < versionData.Versions.length; i++) {
     *     var version = versionData.Versions[i];
     *     totalPrice += Item.Price * version.Quantity;
     * }
     * return totalPrice;
     */
    Versions: ItemVersion[];

    /**
     * Indicates whether this is a version of a job.
     * This boolean flag determines if the current job is part of
     * a versioned workflow, affecting how pricing calculations
     * and business logic should be applied.
     * 
     * @example
     * if (versionData.IsVersion) {
     *     // Apply version-specific pricing logic
     *     return calculateVersionPricing(versionData);
     * }
     */
    IsVersion: boolean;

    /**
     * The number of versions in the collection.
     * This value provides a quick count of how many versions
     * are associated with the current job, useful for bulk
     * pricing calculations and version management.
     * 
     * @example
     * if (versionData.NumberOfVersions > 1) {
     *     return Item.Price * 0.95; // 5% discount for multiple versions
     * }
     */
    NumberOfVersions: number;

    /**
     * The sum of all quantities across all versions.
     * This value represents the total quantity being ordered
     * across all versions of the job, useful for bulk pricing
     * and quantity-based discount calculations.
     * 
     * @example
     * var totalQuantity = versionData.VersionsSumQuantity;
     * var tier = HelperMethods.FindTier(totalQuantity, Item.PricingTiers);
     * if (tier) {
     *     return tier.Price * totalQuantity;
     * }
     */
    VersionsSumQuantity: number;
}