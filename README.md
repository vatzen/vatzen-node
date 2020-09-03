# VatZen NPM Module

Your NodeJS helper in the world of VAT Compliance [https://vatzen.com](https://vatzen.com)

## Installation

```
npm install vatzen
```

or

```
yarn add vatzen
```

# Documentaion

For more extensive documentation, please visit our official docs at [https://documentation.vatzen.com](https://documentation.vatzen.com)

## General

Once you obtained your API key from [VatZen Dashboard](https://dashboard.vatzen.com), you can start using the module. To get started quickly, simply import the module and pass the API Key. After initialization, you can already start calling enpoints:

```typescript
import VatZen from 'vatzen';

const vatzenClient = new VatZen({ apiKey: 'YOUR_API_KEY' });

vatzenClient.rates
    .getByCountryCode('DE')
    .then(germanyVatRates => {
      console.log(germanyVatRates);
    })
    .catch((e: ErrorEntity) => {
      console.log('Something went wrong: ', e.errors.message);
    });
```

VatZen NPM module is TS-first and have a complete type-coverege, which is supported out-of-the-box.

### General TypeScript Entities

```typescript
// Available VAT Categories
enum VatCategory {
  'audiobook' = 'audiobook',
  'broadcasting' = 'broadcasting',
  'ebook' = 'ebook',
  'eperiodical' = 'eperiodical',
  'eservice' = 'eservice',
  'telecommunication' = 'telecommunication',
}

// Interface which describes country
interface CountryEntity {
  code: string;
  name: string;
  local_name: string;
  member_state: boolean;
}

// Pagination information
interface PaginationEntity {
  total: number;
  has_more: boolean;
}

// Available error types
enum ErrorTypes {
  missing_api_key = 'missing_api_key',
  invalid_api_key = 'invalid_api_key',
  usage_limit_reached = 'usage_limit_reached',
  invalid_input = 'invalid_input',
  invalid_ip_address = 'invalid_ip_address',
  could_not_resolve_ip = 'could_not_resolve_ip',
  invalid_country_code = 'invalid_country_code',
  invalid_amount = 'invalid_amount',
}

// Error returned fomr the server
export interface ErrorEntity {
  statusCode: number;
  success: false;
  error: {
    code: number;
    type: ErrorTypes;
    message: string;
  };
}
```

## Rates

Before using the endpoint, you can familiarize yourself with our [Rates endpoint documentation](https://documentation.vatzen.com/api/vat-rates).

All the rates function are available inside `VatZen` objec inside `rates` parameter. For example `vatzen.rates.find`.

### Rate TypeScript Entity

```typescript
interface RateEntity {
  standart_rate: number;
  currency: string;
  country: CountryEntity;
  categories: {
    [categoryName in VatCategory]: number | undefined;
  };
}
```

### All Rates

In order to obtain all the rates, you can use `rates.getAll()` function, which accepts optional `options` object with the following (also optional) keys:

| key           | type      | description                                     |
|---------------|-----------|-------------------------------------------------|
| `limit`       | `number`  | Limit for pagination                            |
| `page`        | `number`  | Page number, starting from 1                    |
| `memberState` | `boolean` | Response will be filtered by member states only |

`getAll` usage example:

```typescript
try {
  const allRates = await vatzen.rates.getAll({ memberState: true }).rates;
  console.log('Rates': allRates);
} catch (e: ErrorEntity) {
  // getAll will throw an error if something went wrong
}
```

Returns:

```typescript
interface GetAllRatesResponse {
  pagination: PaginationEntity;
  rates: RateEntity[];
}
```

### Rate by Country Code

If you want to obtain the rate by known ISO Country Code, you can use `rates.getByCountryCode` function, which accepts country code string as a parameter. For example:

```typescript
try {
  const deVatRates = await vatzen.rates.getByCountryCode('DE');
  console.log('Germany VAT Rates': deVatRates);
} catch (e: ErrorEntity) {
  // getByCountryCode will throw an error if something went wrong
}
```

Returns `RateEntity`.

### Find Rate

You can use VatZen to lookup country rate using different parameters, such as country name, country code or ip address. In order to do that, you can use `rates.find` function, which accepts options object with the wollowing properties:

| key           | type      | description                                                          |
|---------------|-----------|----------------------------------------------------------------------|
| `countryCode` | `string`  | 2 characters ISO country code                                        |
| `countryName` | `string`  | Country name, for example `Germany`                                  |
| `ipAddress`   | `string`  | IP Address of your client which will be used to identify the country |
| `useClientIp` | `boolean` | If set to true, VatZen will extract ip address from the request      |

Example for using this function:

```typescript
try {
  const deVatRates = await vatzen.rates.find({ countryName: 'Germany' });
  console.log('Germany VAT Rates': deVatRates);
} catch (e: ErrorEntity) {
  // find will throw an error if something went wrong
}
```

Returns `RateEntity`.

## VAT Number Validation

Before using the endpoint, you can familiarize yourself with our [Validations endpoint documentation](https://documentation.vatzen.com/api/validate-vat-number).

All the rates function are available inside `VatZen` objec inside `validations` parameter. For example `vatzen.validations.validate`.

### Validation TypeScript Entity

```typescript
export interface ValidationEntity {
  id?: string;
  consultation_number?: string;
  requested: string;
  created: string;
  valid: boolean | null;
  query: string;
  country: CountryEntity;
  company: null | {
    name: string | null;
    address: string | null;
  };
  pending: boolean;
  valid_format: boolean;
  requester: null | {
    country_code: string;
    vat_number: string;
  };
}
```

### Validate VAT Number

VAT number validation is implemented inside `validate` function, which accepts only 1 parameter - vat number string. As the response, it returns the complete `Validations` entity.

Example:

```typescript
try {
  const validationResult = await vatzen.validations.validate('LU123455');
  if (validationResult.valid) {
    console.log('Validated company: ': validationResult.company.name);
  }
} catch (e: ErrorEntity) {}
```

Returns `ValidationEntity`.

### Create Validation

If you want to validate VAT number and store the validation, you can use `createValidation` function, which accepts VAT number as a parameter and returns VAT Entity.

Example:

```typescript
try {
  const validationResult = await vatzen.validations.createValidation('LU123455');
  if (validationResult.valid) {
    console.log('Validated company: ': validationResult.company.name);
  }
} catch (e: ErrorEntity) {}
```

Returns `ValidationEntity`.

### Get validation by id

Returns stored validation object by id. Implemented in `getValidationById` function.

```typescript
try {
  const validation = await vatzen.validations.getValidationById('dgy13wjbhbj342');
  console.log('Fetched Validation:': validation);
} catch (e: ErrorEntity) {}
```

Returns `ValidationEntity`.

### Get all validation

If you want to fetch all validations, you can use `getAll` function, which accepts optional options object with the following optional parameters:

| key           | type      | description                                     |
|---------------|-----------|-------------------------------------------------|
| `limit`       | `number`  | Limit for pagination                            |
| `page`        | `number`  | Page number, starting from 1                    |

Returns:

```typescript
interface GetAllValidationsResponse {
  pagination: PaginationEntity;
  validations: ValidationEntity[];
}
```