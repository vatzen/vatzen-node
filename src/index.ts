import ApiClient from './api-client';

import Rates from './rates';
import Validations from './validations';
import Prices from './prices';

export { VatCategory } from './api-interfaces';

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
