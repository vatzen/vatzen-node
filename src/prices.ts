import ApiClient from './api-client';
import { PaginationEntity, PriceEntity, VatCategory } from './api-interfaces';
import { Endpoint } from './endpoint';

class Prices extends Endpoint {
  constructor(private apiClient: ApiClient) {
    super();
  }

  async calculate(options: {
    amount: number;
    vatIncluded?: boolean;
    category?: VatCategory;
    countryCode?: string;
    countryName?: string;
    ipAddress?: string;
    useClientIp?: boolean;
  }): Promise<PriceEntity> {
    const apiResponse = await this.apiClient.get(`price`, {
      amount: options.amount,
      vat_included: options?.vatIncluded,
      category: options?.category,
      country_code: options?.countryCode,
      country_name: options?.countryName,
      ip_address: options?.ipAddress,
      use_client_ip: options?.useClientIp,
    });

    return this.formatResponse(apiResponse);
  }

  async createPriceCalculation(options: {
    amount: number;
    vatIncluded?: boolean;
    category?: VatCategory;
    countryCode?: string;
    countryName?: string;
    ipAddress?: string;
    useClientIp?: boolean;
  }): Promise<PriceEntity> {
    const apiResponse = await this.apiClient.post(`prices`, {
      amount: options.amount,
      vat_included: options?.vatIncluded,
      category: options?.category,
      country_code: options?.countryCode,
      country_name: options?.countryName,
      ip_address: options?.ipAddress,
      use_client_ip: options?.useClientIp,
    });

    return this.formatResponse(apiResponse);
  }

  async getPriceCalculationById(priceId: string): Promise<PriceEntity> {
    const apiResponse = await this.apiClient.get(`prices/${priceId}`);

    return this.formatResponse(apiResponse);
  }

  async getAll(options?: {
    limit?: number;
    page?: number;
  }): Promise<{
    pagination: PaginationEntity;
    rates: PriceEntity[];
  }> {
    const apiResponse = await this.apiClient.get('prices', {
      limit: options?.limit,
      page: options?.page,
    });

    return this.formatResponse(apiResponse);
  }
}

export default Prices;
