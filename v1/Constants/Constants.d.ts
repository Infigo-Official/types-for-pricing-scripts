/**
 * This module provides the constants available in pricing scripts.
 * - Message areas, which choose where output messages are shown
 *
 * @module Constants
 */

/**
 * Where a message from {@link debug}, {@link alert}, {@link warning}, {@link error} or {@link console} is shown.
 * Pass one of these values as the second argument of a message function.
 * Without it, the message is shown everywhere ({@link MessageAreas.All}).
 *
 * @category Types
 */
declare interface MessageAreas {
    /** Show the message everywhere. This is the default. */
    readonly All: "all";

    /** Show the message on the product details page only. */
    readonly ProductDetails: "productdetails";

    /** Show the message on the page shown after the editor only. */
    readonly PostEditor: "posteditor";

    /** Show the message in the basket only. */
    readonly Basket: "basket";

    /** Show the message in the admin script Test panel only. */
    readonly AdminArea: "admin";

    /** Show the message on the product details page and after the editor. */
    readonly ProductDetailsAndPostEditor: "productdetailsandposteditor";
}

/**
 * One of the {@link MessageAreas} values.
 *
 * @category Types
 */
declare type MessageArea = MessageAreas[keyof MessageAreas];

/**
 * The constants object available in pricing scripts.
 *
 * @category Global Objects
 */
declare interface Constants {
    /**
     * Where output messages are shown.
     *
     * @example
     * alert("Free delivery on orders over 100 items", Constants.MessageArea.Basket);
     */
    readonly MessageArea: MessageAreas;
}

/**
 * Global Constants object available in pricing scripts.
 *
 * @example
 * if (Item.Quantity < 50) {
 *     warning("Order 50 or more for a 10% discount", Constants.MessageArea.ProductDetails);
 * }
 * debug("Calculated in the Test panel only", Constants.MessageArea.AdminArea);
 */
declare const Constants: Constants;
