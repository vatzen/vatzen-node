import ApiClient from './api-client';
import {
  PaginationEntity,
  ErrorEntity,
  ValidationEntity,
} from './api-interfaces';

class Validations {
  constructor(private apiClient: ApiClient) {}

  async validate(vatNumber: string): Promise<ValidationEntity> {
    const apiResponse = await this.apiClient.get(`validate/${vatNumber}`);

    return this.formatResponse(apiResponse);
  }

  async createValidation(vatNumber: string): Promise<ValidationEntity> {
    const apiResponse = await this.apiClient.post(`validations`, undefined, {
      vat_number: vatNumber,
    });

    return this.formatResponse(apiResponse);
  }

  async getValidationById(validationId: string): Promise<ValidationEntity> {
    const apiResponse = await this.apiClient.get(`validations/${validationId}`);

    return this.formatResponse(apiResponse);
  }

  async getAll(options?: {
    limit?: number;
    page?: number;
  }): Promise<{
    pagination: PaginationEntity;
    rates: ValidationEntity[];
  }> {
    const apiResponse = await this.apiClient.get('validations', {
      limit: options?.limit,
      page: options?.page,
    });

    return this.formatResponse(apiResponse);
  }

  private async formatResponse(apiResponse: Response) {
    const responseJson = await apiResponse.json();
    if (apiResponse.status === 200) {
      return responseJson;
    } else {
      throw responseJson;
    }
  }
}

export default Validations;
