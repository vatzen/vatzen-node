import ApiClient from './api-client';

import Rates from './rates';

interface VatZenOptions {
  apiKey: string;
}

class VatZen {
  private apiClient = new ApiClient();

  public rates = new Rates(this.apiClient);

  constructor(private options: VatZenOptions) {
    this.apiClient.init(this.options.apiKey);
  }
}
