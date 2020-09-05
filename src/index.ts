import ApiClient from './api/api-client';

import Rates from './endpoints/rates';
import Validations from './endpoints/validations';
import Prices from './endpoints/prices';

export { VatCategory } from './api/api-interfaces';

interface VatZenOptions {
  apiKey: string;
}

class VatZen {
  private apiClient = new ApiClient();

  public rates = new Rates(this.apiClient);
  public validations = new Validations(this.apiClient);
  public prices = new Prices(this.apiClient);

  constructor(private options: VatZenOptions) {
    this.apiClient.init(this.options.apiKey);
  }
}

export default VatZen;
