/**
 * Individual version item information
 */
declare interface ItemVersion {
    /**
     * Job ID for this version
     */
    JobId: string;

    /**
     * Custom name for this version
     */
    CustomName: string;

    /**
     * Quantity for this version
     */
    Quantity: number;
}

/**
 * Version data object containing version information
 */
declare interface VersionData {
    /**
     * Collection of version items
     */
    Versions: ItemVersion[];

    /**
     * Whether this is a version of a job
     */
    IsVersion: boolean;

    /**
     * Number of versions
     */
    NumberOfVersions: number;

    /**
     * Sum of all quantities of all versions
     */
    VersionsSumQuantity: number;
}