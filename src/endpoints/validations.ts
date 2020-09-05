import ApiClient from '../api/api-client';
import { PaginationEntity, ValidationEntity } from '../api/api-interfaces';
import { Endpoint } from './endpoint';

class Validations extends Endpoint {
  constructor(private apiClient: ApiClient) {
    super();
  }

  async validate(vatNumber: string): Promise<ValidationEntity> {
    const apiResponse = await this.apiClient.get(`validate/${vatNumber}`);

    return this.formatResponse(apiResponse);
  }

  async createValidation(vatNumber: string): Promise<ValidationEntity> {
    const apiResponse = await this.apiClient.post(`validations`, {
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
}

export default Validations;
