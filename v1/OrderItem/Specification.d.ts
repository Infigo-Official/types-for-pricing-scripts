/**
 * Product specification attributes for pricing scripts.
 * Specification attributes are the descriptive product properties set up under
 * the product's specification attributes (for example paper weight or finish),
 * as opposed to the attributes a customer chooses when ordering.
 */

/**
 * A specification attribute of the product being priced.
 *
 * @category Types
 */
declare interface Specification {
    /**
     * The name of the specification attribute.
     *
     * @example
     * var name = spec.Key; // "Paper Weight"
     */
    Key: string;

    /**
     * The value, translated into the customer's language.
     * Use it for display; compare against {@link Specification.DefaultValue} in pricing logic.
     *
     * @example
     * debug(spec.Key + ": " + spec.Value);
     */
    Value: string;

    /**
     * The value as entered in the admin, without translation.
     *
     * @example
     * if (spec.DefaultValue === "350gsm") {
     *     // heavy stock
     * }
     */
    DefaultValue: string;
}
