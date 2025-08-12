/**
 * Customer information available in pricing scripts
 */
declare interface Customer {
    /**
     * Customer email address
     */
    Email: string;

    /**
     * Array of customer role system names
     */
    CustomerRoles: string[];

    /**
     * Department name of the customer
     */
    Department: string;

    /**
     * Discount coupon code used by the customer
     */
    DiscountCouponCode: string;
}

/**
 * Global Customer object
 */
declare const Customer: Customer; 