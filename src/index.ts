import ApiClient from './api-client';

import Rates from './rates';
import Validations from './validations';

interface VatZenOptions {
  apiKey: string;
}

class VatZen {
  private apiClient = new ApiClient();

  public rates = new Rates(this.apiClient);
  public validations = new Validations(this.apiClient);

  constructor(private options: VatZenOptions) {
    this.apiClient.init(this.options.apiKey);
  }
}
