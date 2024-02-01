export interface Pharmacy {
  integrationName: string;
  name: string;
  address: string;
  city: string;
  state: string;
  zipcode: string;
  country: string;
  fax: string;
  phone: string;
}

export interface HealthMartOrderPayload {
    healthMartId: string;
    healthMartProduct: string;
    healthMartQuantity: number;
    healthMartCustomerInfo: HealthmartCustomerInfo;
  }
  
  type HealthmartCustomerInfo = {
    healthMartCustName: string;
    healthMartCustAddress: string;
    healthMartCustCity: string;
    healthMartCustState: string;
    healthMartCustZipcode: string;
    healthMartCustCountry: string;
  };
  
  export interface QuickCareOrderPayload {
    quickCareId: string;
    quickCareProduct: string;
    quickCareQuantity: number;
    quickCareUserData: QuickCareUserData;
  }
  
  type QuickCareUserData = {
    quickCareUserName: string;
    quickCareUserAddress: string;
    quickCareUserCity: string;
    quickCareUserState: string;
    quickCareUserZipcode: string;
    quickCareUserCountry: string;
  };
  
  export interface CarePlusOrderPayload {
    carePlusId: string;
    carePlusProduct: string;
    carePlusQuantity: number;
    carePlusClientInfo: CarePlusClientInfo;
  }
  
  type CarePlusClientInfo = {
    carePlusClientName: string;
    carePlusClientAddress: string;
    carePlusClientCity: string;
    carePlusClientState: string;
    carePlusClientZipcode: string;
    carePlusClientCountry: string;
  };
  