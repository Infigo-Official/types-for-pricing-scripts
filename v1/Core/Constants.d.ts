/**
 * Message area constants for script output
 */
declare interface MessageAreaConstants {
    /**
     * All areas
     */
    All: "all";

    /**
     * Product details area
     */
    ProductDetails: "productdetails";

    /**
     * Post editor area
     */
    PostEditor: "posteditor";

    /**
     * Basket area
     */
    Basket: "basket";

    /**
     * Admin area
     */
    AdminArea: "admin";

    /**
     * Product details and post editor areas
     */
    ProductDetailsAndPostEditor: "productdetailsandposteditor";
}

/**
 * Constants available in pricing scripts
 */
declare interface Constants {
    /**
     * Message area constants for script output
     */
    MessageArea: MessageAreaConstants;
}

/**
 * Global Constants object
 */
declare const Constants: Constants; 