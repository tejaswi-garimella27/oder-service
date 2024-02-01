import { CONSTANTS } from "../ApiConstants";
import { OrderService } from "../services/orderService";
import { Order } from "../types/order";

describe('OrderService', () => {
    let orderService: OrderService;
    
    beforeEach(() => {
        orderService = new OrderService();
      });

    afterEach(() => {
      orderService['orders'] = [];
    });

describe('createInternalOrders', () => {
    test('should create an internal order and return it', () => {
      const products = ['Painkiller', 'Advil'];
      const pharmacyOrderId = '123456';

      const order = orderService.createInternalOrders(products, pharmacyOrderId);

      // Verify that the created order has the correct properties
      expect(order.id).toBeDefined();
      expect(order.products).toEqual(products);
      expect(order.pharmacyOrderId).toBe(pharmacyOrderId);

      // Verify that the order is added to the internal orders list
      const internalOrders = orderService.getInternalOrders();
      expect(internalOrders).toContain(order);
    });
  });



  describe('getInternalOrders', () => {
    test('should return an empty array if no internal orders exist', () => {
      const internalOrders = orderService.getInternalOrders();

      expect(internalOrders).toEqual([]);
    });
    test('should return the list of internal orders', () => {
        const mockOrders: Order[] = [
          { id: '1', products: ['Antibiotics'], pharmacyOrderId: `${Date.now.toString()}` },
          { id: '2', products: ['Painkiller'], pharmacyOrderId: `${Date.now.toString()}` },
        ];
  
        orderService['orders'] = mockOrders;
  
        const internalOrders = orderService.getInternalOrders();
  
        expect(internalOrders).toEqual(mockOrders);
      });
    });

    describe('createInternalOrders', () => {
        test('should throw an error if products array is empty', () => {
          const emptyProducts: string[] = [];
          const pharmacyOrderId = '123';
    
          expect(() => orderService.createInternalOrders(emptyProducts, pharmacyOrderId)).toThrow(CONSTANTS.INVALID_PRODUCTS_LENGTH.toString());
        })
    })
})