import axios, { AxiosError, AxiosResponse } from "axios";
import { PharmacyService } from "../services/pharmacyService";
import { Pharmacy } from "../types/pharmacy";
import { ENV_VARIABLE } from "../utils/env";
import { HealthMartOrderPayload } from "../types/pharmacy";

jest.mock("axios");

describe("PharmacyService", () => {
  let pharmacyService: PharmacyService;

  beforeEach(() => {
    pharmacyService = new PharmacyService("mocked-base-url");
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe("getPharmacyList", () => {
    test("getPharmacyList - should return pharmacy list from API", async () => {
      const mockedPharmacyList: Pharmacy[] = [
        {
          integrationName: "healthmart",
          name: "Pharmacy A",
          address: "somewhere in canada",
          city: "toronto",
          state: "toronto",
          zipcode: "12lk12lk",
          country: "canada",
          fax: "",
          phone: "437676767",
        },
        {
          integrationName: "careplus",
          name: "Pharmacy B",
          address: "somewhere in canada",
          city: "toronto",
          state: "toronto",
          zipcode: "12lk12lk",
          country: "canada",
          fax: "",
          phone: "437676768",
        },
      ];

      (
        axios.get as jest.MockedFunction<typeof axios.get>
      ).mockResolvedValueOnce({
        data: mockedPharmacyList,
      } as AxiosResponse);

      const result = await pharmacyService.getPharmacyList();

      expect(result).toEqual(mockedPharmacyList);
    });

    test("getPharmacyList - should handle API errors and throw an error", async () => {
      (
        axios.get as jest.MockedFunction<typeof axios.get>
      ).mockRejectedValueOnce({
        response: { status: 500, data: "Internal Server Error" },
      } as unknown as AxiosResponse);

      await expect(pharmacyService.getPharmacyList()).rejects.toMatchObject({
        response: {
          data: expect.stringContaining("Internal Server Error"),
        },
      });
    });
  });
});

describe("pharmacyService", () => {
  const mockedBaseUrl = ENV_VARIABLE.PHARMACY_BASE_URL;
  const pharmacyService = new PharmacyService(mockedBaseUrl);

  afterEach(() => {
    jest.resetAllMocks();
  });

  it("createOrder - should create a Healthmart Order", async () => {
    const mockedPharmacyServiceName = "healthmart";
    const orderPayload: HealthMartOrderPayload = {
      healthMartId: `${Date.now.toString()}`,
      healthMartProduct: "PainkillerTestTablet",
      healthMartQuantity: 4,
      healthMartCustomerInfo: {
        healthMartCustName: "JOHNNY DEERRyyyy",
        healthMartCustAddress: "123 Main Street",
        healthMartCustCity: "Cityville",
        healthMartCustState: "State",
        healthMartCustZipcode: "12345",
        healthMartCustCountry: "Country",
      },
    };
    const mockedResponse = {
      data: orderPayload,
      status: 200,
      statusText: "OK",
      headers: {},
      config: {},
    };
    (axios.post as jest.MockedFunction<typeof axios.post>).mockResolvedValue(
      mockedResponse
    );

    const result = await pharmacyService.createOrder(
      mockedPharmacyServiceName,
      orderPayload
    );
    expect(axios.post).toHaveBeenCalledWith(
      `${mockedBaseUrl}/${mockedPharmacyServiceName.toLowerCase()}/orders`,
      orderPayload
    );
    expect(result).toEqual(orderPayload);
  });
  it("getOrderById - should make a GET request to the correct URL", async () => {
    const mockedOrderId = "1706739930984";
    const mockedPharmacyServiceName = "healthmart";
    const expectedUrl = `${mockedBaseUrl}/${mockedPharmacyServiceName}/orders/${mockedOrderId}`;

    const mockedOrderData = { id: mockedOrderId };
    const mockedResponse = {
      data: mockedOrderData,
      status: 200,
      statusText: "OK",
      headers: {},
      config: {},
    };

    (axios.get as jest.MockedFunction<typeof axios.get>).mockResolvedValue(
      mockedResponse
    );
    const result = await pharmacyService.getOrderById(
      mockedPharmacyServiceName,
      mockedOrderId
    );

    expect(axios.get).toHaveBeenCalledWith(expectedUrl);
    expect(result).toEqual(mockedOrderData);
  });

  it("getOrders - should make a GET request to the correct URL", async () => {
    const mockedPharmacyName = "careplus";
    const expectedUrl = `${mockedBaseUrl}/${mockedPharmacyName}/orders`;

    const mockedOrdersList = {
      carePlusId: "1706627712538",
      carePlusProduct: "Antibiotics",
      carePlusQuantity: 2,
    };
    const mockedResponse = {
      data: mockedOrdersList,
      status: 200,
      statusText: "OK",
      headers: {},
      config: {},
    };

    (axios.get as jest.MockedFunction<typeof axios.get>).mockResolvedValue(
      mockedResponse
    );
    const result = await pharmacyService.getOrders(mockedPharmacyName);

    expect(axios.get).toHaveBeenCalledWith(expectedUrl);
    expect(result).toEqual(mockedOrdersList);

    const differentPharmacyName = "randompharmacy";
    expect(axios.get).not.toHaveBeenCalledWith(
      `${mockedBaseUrl}/${differentPharmacyName.toLowerCase()}/orders`
    );
  });

  it("getOrders - Test for null or undefined data", async () => {
    const mockedPharmacyName = "careplus";
    (axios.get as jest.MockedFunction<typeof axios.get>).mockResolvedValueOnce({
      data: null,
      status: 200,
      statusText: "OK",
      headers: {},
      config: {},
    });
    await expect(
      pharmacyService.getOrders(mockedPharmacyName)
    ).rejects.toThrow();
  });

  it("getOrders - should handle server error", async () => {
    const mockedPharmacyName = "quickcare";

    (axios.get as jest.MockedFunction<typeof axios.get>).mockRejectedValueOnce({
      response: { status: 500, data: "Internal Server Error" },
    } as AxiosError);

    await expect(
      pharmacyService.getOrders(mockedPharmacyName)
    ).rejects.toMatchObject({
      response: {
        data: expect.stringContaining("Internal Server Error"),
      },
    });
  });

  it("getOrderById - should handle server error", async () => {
    const mockedPharmacyName = "quickcare";
    const mockOrderId: string = "1700909209093";

    (axios.get as jest.MockedFunction<typeof axios.get>).mockRejectedValueOnce({
      response: { status: 500, data: "Internal Server Error" },
    } as AxiosError);

    await expect(
      pharmacyService.getOrderById(mockedPharmacyName, mockOrderId)
    ).rejects.toMatchObject({
      response: {
        data: expect.stringContaining("Internal Server Error"),
      },
    });
  });

  it("CreateOrder - should handle server error", async () => {
    const mockedPharmacyName = "quickplus";
    const products = {} as HealthMartOrderPayload;

    (
      axios.post as jest.MockedFunction<typeof axios.post>
    ).mockRejectedValueOnce({
      response: { status: 500, data: "Internal Server Error" },
    } as AxiosError);

    await expect(
      pharmacyService.createOrder(mockedPharmacyName, products)
    ).rejects.toMatchObject({
      response: {
        data: expect.stringContaining("Internal Server Error"),
      },
    });
  });

  it("getOrderById - Test for null or undefined data", async () => {
    const mockedPharmacyName = "careplus";
    const mockOrderId: string = "1700909209093";
    (axios.get as jest.MockedFunction<typeof axios.get>).mockResolvedValueOnce({
      data: null,
      status: 200,
      statusText: "OK",
      headers: {},
      config: {},
    });
    await expect(
      pharmacyService.getOrderById(mockedPharmacyName, mockOrderId)
    ).rejects.toThrow();
  });

  it("createOrder - Test for null or undefined data", async () => {
    const mockedPharmacyName = "careplus";
    const products = {} as HealthMartOrderPayload;
    (axios.get as jest.MockedFunction<typeof axios.get>).mockResolvedValueOnce({
      data: null,
      status: 200,
      statusText: "OK",
      headers: {},
      config: {},
    });
    await expect(
      pharmacyService.createOrder(mockedPharmacyName, products)
    ).rejects.toThrow();
  });
});
