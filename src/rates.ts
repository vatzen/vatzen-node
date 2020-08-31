import ApiClient from './api-client';
import { PaginationEntity, RateEntity, ErrorEntity } from './api-interfaces';

class Rates {
  constructor(private apiClient: ApiClient) {}

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

    const responseJson = await apiResponse.json();
    if (apiResponse.status === 200) {
      return responseJson;
    } else {
      throw responseJson;
    }
  }

  async getByCountryCode(countryCode: string): Promise<RateEntity> {
    const apiResponse = await this.apiClient.get(`rate/${countryCode}`);

    const responseJson = await apiResponse.json();
    if (apiResponse.status === 200) {
      return responseJson;
    } else {
      throw responseJson;
    }
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

    const responseJson = await apiResponse.json();
    if (apiResponse.status === 200) {
      return responseJson;
    } else {
      throw responseJson;
    }
  }
}

export default Rates;
