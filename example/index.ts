import VatZen from '../src/index';

const vatzenClient = new VatZen({
  apiKey: 'YOUR_API_KEY',
});

async function testRatesEndpoints() {
  const twoEUVatRates = await vatzenClient.rates.getAll({
    limit: 2,
    memberState: true,
  });
  console.log('EU Vat Rates: ', twoEUVatRates);

  const deVatRates = await vatzenClient.rates.getByCountryCode('DE');
  console.log('DE VAT Rates: ', deVatRates);

  const rateByName = await vatzenClient.rates.find({ countryName: 'Spain' });
  console.log('VAT Rates for Spain', rateByName);
}

async function testValidationsEndpoints() {
  const validationResult = await vatzenClient.validations.validate(
    'LU26375245',
  );
  console.log('Validation results: ', validationResult);

  const createdValidation = await vatzenClient.validations.createValidation(
    'LU26375245',
  );
  console.log('Created validation ID: ', createdValidation.id);

  if (createdValidation.id) {
    const retrievedValidation = await vatzenClient.validations.getValidationById(
      createdValidation.id,
    );
    console.log('Retrieved validation: ', retrievedValidation);
  }

  const allMyValidations = await vatzenClient.validations.getAll();
  console.log('All Validations: ', allMyValidations);
}

async function runExample() {
  try {
    await testRatesEndpoints();
    await testValidationsEndpoints();
  } catch (e) {
    console.log('Something went wrong: ', e?.error?.message || 'Unknown error');
  }
}

runExample();
