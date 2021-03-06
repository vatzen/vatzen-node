export enum VatCategory {
  'audiobook' = 'audiobook',
  'broadcasting' = 'broadcasting',
  'ebook' = 'ebook',
  'eperiodical' = 'eperiodical',
  'eservice' = 'eservice',
  'telecommunication' = 'telecommunication',
}

export interface CountryEntity {
  code: string;
  name: string;
  local_name: string;
  member_state: boolean;
}

export interface RateEntity {
  standart_rate: number;
  currency: string;
  country: CountryEntity;
  categories: {
    [categoryName in VatCategory]: number | undefined;
  };
}

export interface PaginationEntity {
  total: number;
  has_more: boolean;
}

export enum ErrorTypes {
  missing_api_key = 'missing_api_key',
  invalid_api_key = 'invalid_api_key',
  usage_limit_reached = 'usage_limit_reached',
  invalid_input = 'invalid_input',
  invalid_ip_address = 'invalid_ip_address',
  could_not_resolve_ip = 'could_not_resolve_ip',
  invalid_country_code = 'invalid_country_code',
  invalid_amount = 'invalid_amount',
}

export interface ErrorEntity {
  statusCode: number;
  success: false;
  error: {
    code: number;
    type: ErrorTypes;
    message: string;
  };
}

export interface ValidationEntity {
  id?: string;
  consultation_number?: string;
  requested: string;
  created: string;
  valid: boolean | null;
  query: string;
  country: CountryEntity;
  company: null | {
    name: string | null;
    address: string | null;
  };
  pending: boolean;
  valid_format: boolean;
  requester: null | {
    country_code: string;
    vat_number: string;
  };
}

export interface PriceCalculationRequest {
  amount: number;
  vat_included: boolean;
}
export interface PriceEntity {
  id?: string;
  amount: {
    total_incl_vat: 0;
    total_excl_vat: 0;
    vat_amount: 0;
  };
  category: VatCategory;
  vat_rate: 0;
  country: CountryEntity;
  requested: PriceCalculationRequest;
  success: true;
}
