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

## Rates

Before using the endpoint, you can familiarize yourself with our [Rates endpoint documentation](https://documentation.vatzen.com/api/vat-rates).

All the rates function are available inside `VatZen` objec inside `rates` parameter. For example `vatzen.rates.find`.

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