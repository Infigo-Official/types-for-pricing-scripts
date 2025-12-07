---
id: checkout
title: CheckoutItem
sidebar_label: CheckoutItem
sidebar_position: 3
---

# CheckoutItem

The `CheckoutItem` object provides checkout context including items being purchased, customer details, shipping information, and checkout properties. This is available during checkout pricing calculations.

:::warning
`CheckoutItem` may not be available during all pricing calculations. Always check for null/undefined before accessing nested properties. Shipping address is only set when customer reaches checkout.
:::

---

## Properties

| Property | Type | Description |
|----------|------|-------------|
| `Items` | `Item[]` | Array of all items being checked out |
| `Customer` | [`CheckoutCustomer`](#checkoutcustomer-properties) | Customer information for the checkout |
| `CountryFrom` | [`CheckoutCountry`](#checkoutcountry-properties) | Origin country information for shipping calculations |
| `ZipPostalCodeFrom` | `string` | Origin ZIP/postal code for shipping calculations |
| `Properties` | `object` | Additional key-value properties for the checkout |
| `Mode` | `string` | Checkout mode or type (e.g., "standard", "express") |
| `StateProvince` | [`CheckoutStateProvince`](#checkoutstateprovince-properties) | State/province information for shipping destination |
| `Address` | [`CheckoutAddress`](#checkoutaddress-properties) | Complete shipping address information |

---

## CheckoutCustomer Properties

| Property | Type | Description |
|----------|------|-------------|
| `FirstName` | `string` | Customer's first name |
| `LastName` | `string` | Customer's last name |
| `Email` | `string` | Customer's email address |
| `Roles` | `string[]` | Array of customer role system names |
| `DepartmentName` | `string` | Department name of the customer |

---

## CheckoutAddress Properties

| Property | Type | Description |
|----------|------|-------------|
| `FirstName` | `string` | First name on the shipping address |
| `LastName` | `string` | Last name on the shipping address |
| `Email` | `string` | Email address on the shipping address |
| `Company` | `string` | Company name on the shipping address |
| `City` | `string` | City name |
| `Address1` | `string` | Primary address line |
| `Address2` | `string` | Secondary address line (apartment, suite, etc.) |
| `ZipPostalCode` | `string` | ZIP or postal code |
| `PhoneNumber` | `string` | Phone number |
| `FaxNumber` | `string` | Fax number |
| `Country` | [`CheckoutCountry`](#checkoutcountry-properties) | Country information |
| `StateProvince` | [`CheckoutStateProvince`](#checkoutstateprovince-properties) | State/province information |

---

## CheckoutStateProvince Properties

| Property | Type | Description |
|----------|------|-------------|
| `Name` | `string` | Full state/province name |
| `Abbreviation` | `string` | State/province abbreviation (e.g., "CA", "NY") |

---

## CheckoutCountry Properties

| Property | Type | Description |
|----------|------|-------------|
| `Name` | `string` | Full country name |
| `TwoLetterIsoCode` | `string` | Two-letter ISO code (e.g., "US", "CA") |
| `ThreeLetterIsoCode` | `string` | Three-letter ISO code (e.g., "USA", "CAN") |
| `NumericIsoCode` | `number` | Numeric ISO country code |

---

## Use Cases

### Location-Based Pricing

Adjust price based on shipping location:

```javascript
function calculatePrice() {
    var price = Item.Price;

    // Safe access to country
    var country = "";
    if (CheckoutItem && CheckoutItem.Address && CheckoutItem.Address.Country) {
        country = CheckoutItem.Address.Country.Name;
    }

    if (country === "United States") {
        // Domestic pricing - no change
        price = price * 1.0;
    } else if (country === "Canada" || country === "Mexico") {
        // North America surcharge
        price = price * 1.10;
        alert("10% international surcharge applied");
    } else if (country !== "") {
        // International surcharge
        price = price * 1.25;
        alert("25% international surcharge applied");
    }

    return price;
}

return calculatePrice();
```

---

### State-Specific Pricing

Different pricing by state:

```javascript
function calculatePrice() {
    var price = Item.Price;

    // Safe access to state
    var state = "";
    if (CheckoutItem && CheckoutItem.StateProvince) {
        state = CheckoutItem.StateProvince.Abbreviation;
    }

    // California special pricing
    if (state === "CA") {
        price = price * 1.05; // CA environmental fee
        debug("CA environmental fee applied");
    }

    // Alaska/Hawaii shipping surcharge
    if (state === "AK" || state === "HI") {
        price = price + 15.00; // Remote shipping fee
        warning("Remote location shipping fee: $15.00");
    }

    return price;
}

return calculatePrice();
```

---

### Checkout Mode Adjustments

Adjust based on checkout mode:

```javascript
function calculatePrice() {
    var price = Item.Price;

    var mode = "";
    if (CheckoutItem && CheckoutItem.Mode) {
        mode = CheckoutItem.Mode;
    }

    if (mode === "express") {
        // Rush fee for express checkout
        price = price + 10.00;
        alert("Express processing fee: $10.00");
    }

    return price;
}

return calculatePrice();
```

---

### Customer Role at Checkout

Apply discounts based on customer roles:

```javascript
function calculatePrice() {
    var price = Item.Price;

    if (CheckoutItem && CheckoutItem.Customer && CheckoutItem.Customer.Roles) {
        var roles = CheckoutItem.Customer.Roles;

        if (roles.indexOf("VIP") >= 0) {
            price = price * 0.90; // 10% VIP discount
            alert("VIP checkout discount applied!");
        } else if (roles.indexOf("Wholesale") >= 0) {
            price = price * 0.85; // 15% wholesale discount
            debug("Wholesale pricing applied");
        }
    }

    return price;
}

return calculatePrice();
```

---

### Department-Based Checkout Pricing

Apply pricing based on customer department:

```javascript
function calculatePrice() {
    var price = Item.Price;

    if (CheckoutItem && CheckoutItem.Customer && CheckoutItem.Customer.DepartmentName) {
        var department = CheckoutItem.Customer.DepartmentName;

        if (department === "Procurement") {
            price = price * 0.88; // 12% bulk procurement discount
            alert("Procurement department discount applied");
        } else if (department === "Marketing") {
            price = price * 0.92; // 8% marketing discount
            debug("Marketing department pricing");
        }
    }

    return price;
}

return calculatePrice();
```

---

### Business vs Residential

Different pricing for business customers:

```javascript
function calculatePrice() {
    var price = Item.Price;

    var company = "";
    if (CheckoutItem && CheckoutItem.Address) {
        company = CheckoutItem.Address.Company || "";
    }

    if (company.length > 0) {
        // Business discount
        price = price * 0.92; // 8% business discount
        alert("Business customer discount: 8% off");
    }

    return price;
}

return calculatePrice();
```

---

### Regional Pricing Tiers

Different pricing regions:

```javascript
function calculatePrice() {
    var price = Item.Price;

    // Get country code
    var countryCode = "";
    if (CheckoutItem && CheckoutItem.Address && CheckoutItem.Address.Country) {
        countryCode = CheckoutItem.Address.Country.TwoLetterIsoCode;
    }

    // Regional pricing
    var euCountries = ["DE", "FR", "IT", "ES", "NL", "BE", "AT", "PL"];
    var asiaCountries = ["JP", "KR", "CN", "SG", "HK", "TW"];

    var isEU = false;
    for (var i = 0; i < euCountries.length; i++) {
        if (euCountries[i] === countryCode) {
            isEU = true;
            break;
        }
    }

    var isAsia = false;
    for (var j = 0; j < asiaCountries.length; j++) {
        if (asiaCountries[j] === countryCode) {
            isAsia = true;
            break;
        }
    }

    if (isEU) {
        price = price * 1.15; // EU pricing
        debug("EU regional pricing applied");
    } else if (isAsia) {
        price = price * 1.20; // Asia pricing
        debug("Asia regional pricing applied");
    }

    return price;
}

return calculatePrice();
```

---

### ZIP Code Based Pricing

Pricing based on delivery zone:

```javascript
function calculatePrice() {
    var price = Item.Price;

    var zipCode = "";
    if (CheckoutItem && CheckoutItem.Address) {
        zipCode = CheckoutItem.Address.ZipPostalCode || "";
    }

    if (zipCode.length >= 3) {
        var zipPrefix = zipCode.substring(0, 3);

        // Remote area surcharge (example zones)
        var remoteZones = ["995", "996", "997", "998", "999"]; // Alaska zones

        for (var i = 0; i < remoteZones.length; i++) {
            if (remoteZones[i] === zipPrefix) {
                price = price + 20.00;
                warning("Remote delivery surcharge: $20.00");
                break;
            }
        }
    }

    return price;
}

return calculatePrice();
```

---

### Multi-Item Checkout Discount

Apply discount based on checkout items count:

```javascript
function calculatePrice() {
    var price = Item.Price;

    if (CheckoutItem && CheckoutItem.Items) {
        var itemCount = CheckoutItem.Items.length;

        if (itemCount >= 5) {
            price = price * 0.90; // 10% multi-item discount
            alert("Multi-item checkout discount: 10% off");
        } else if (itemCount >= 3) {
            price = price * 0.95; // 5% multi-item discount
            debug("Multi-item discount applied");
        }
    }

    return price;
}

return calculatePrice();
```

---

### Using Checkout Properties

Access custom checkout properties:

```javascript
function calculatePrice() {
    var price = Item.Price;

    if (CheckoutItem && CheckoutItem.Properties) {
        // Check for custom property
        var promoCode = CheckoutItem.Properties["PromoCode"] || "";

        if (promoCode === "SUMMER20") {
            price = price * 0.80; // 20% summer discount
            alert("Summer promotion: 20% off!");
        }

        // Log all properties for debugging
        for (var key in CheckoutItem.Properties) {
            if (CheckoutItem.Properties.hasOwnProperty(key)) {
                debug("Checkout property: " + key + " = " + CheckoutItem.Properties[key]);
            }
        }
    }

    return price;
}

return calculatePrice();
```

---

## Safe Access Pattern

Always use defensive access patterns:

```javascript
function calculatePrice() {
    var price = Item.Price;

    // Check if CheckoutItem is available
    if (!CheckoutItem) {
        debug("CheckoutItem not available");
        return price;
    }

    // Safe address access
    var address = CheckoutItem.Address;
    if (!address) {
        debug("Shipping address not set");
        return price;
    }

    // Now safely access properties
    var country = (address.Country && address.Country.Name) || "Unknown";
    var state = (address.StateProvince && address.StateProvince.Abbreviation) || "";
    var city = address.City || "";
    var zip = address.ZipPostalCode || "";

    debug("Shipping to: " + city + ", " + state + " " + zip + ", " + country);

    // Safe customer access
    var customer = CheckoutItem.Customer;
    if (customer) {
        debug("Customer: " + customer.FirstName + " " + customer.LastName);
        debug("Email: " + customer.Email);
        debug("Department: " + customer.DepartmentName);
        debug("Roles: " + (customer.Roles || []).join(", "));
    }

    // Safe mode access
    var mode = CheckoutItem.Mode || "standard";
    debug("Checkout mode: " + mode);

    // Your pricing logic here...

    return price;
}

return calculatePrice();
```
