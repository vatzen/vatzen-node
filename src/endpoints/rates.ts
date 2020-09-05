import ApiClient from '../api/api-client';
import {
  PaginationEntity,
  RateEntity,
  ErrorEntity,
} from '../api/api-interfaces';
import { Endpoint } from './endpoint';

class Rates extends Endpoint {
  constructor(private apiClient: ApiClient) {
    super();
  }

  async getAll(options?: {
    limit?: number;
    page?: number;
    memberState?: boolean;
  }): Promise<{
    pagination: PaginationEntity;
    rates: RateEntity[];
  }> {
    const apiResponse = await this.apiClient.get('rates', {
      limit: options?.limit,
      page: options?.page,
      member_state: options?.memberState,
    });

    return this.formatResponse(apiResponse);
  }

  async getByCountryCode(countryCode: string): Promise<RateEntity> {
    const apiResponse = await this.apiClient.get(`rate/${countryCode}`);

    return this.formatResponse(apiResponse);
  }

  async find(options: {
    countryCode?: string;
    countryName?: string;
    ipAddress?: string;
    useClientIp?: boolean;
  }): Promise<RateEntity> {
    const apiResponse = await this.apiClient.get('rate', {
      country_code: options?.countryCode,
      country_name: options?.countryName,
      ip_address: options?.ipAddress,
      use_client_ip: options.useClientIp,
    });

    return this.formatResponse(apiResponse);
  }
}

export default Rates;
